"use client"
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { Mic, Phone, Timer, Loader2Icon } from 'lucide-react'; 
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import Vapi from "@vapi-ai/web";
import InterviewEndDialog from './_components/InterviewEndDialog';
import { toast } from 'sonner';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { supabase } from '@/services/supabaseClient';

function StartInterview() {
    const {interviewInfo, setInterviewInfo} = useContext(InterviewDataContext);
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY);
    const [activeUser, setActiveUser] = useState(false);
    const [conversation, setConversation] = useState();
    const [loading, setLoading] = useState(false);
    const {interview_Id} = useParams();
    const router = useRouter();
    const [secondsElapsed, setSecondsElapsed] = useState(0);
    const [intervalId, setIntervalId] = useState(null);

    // Format timer as HH:MM:SS
    const formatTime = (totalSeconds) => {
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };


    useEffect(() => {
        interviewInfo && startCall();
    }, [interviewInfo]);

    const startCall = async() => {
        let questionList = '';
        interviewInfo?.interviewData?.questionList.forEach((item, index) => {
            questionList += item?.question + (index < interviewInfo.interviewData.questionList.length - 1 ? ', ' : '');
        });


        const assistantOptions = {
            name: "AI Recruiter",
            firstMessage: "Hi "+ interviewInfo?.userName +", how are you? Ready for your interview on "+ interviewInfo?.interviewData?.jobPosition +"?",
            transcriber: {
                provider: "deepgram",
                model: "nova-2",
                language: "en-US",
            },
            voice: {
                provider: "playht",
                voiceId: "jennifer"
            },
            model: {
                provider: "openai",
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: `
                            You are an AI Voice assistant conducting interviews. Your job is to ask candidates provided interview
                            questions, assess their responses. Begin the conversation with a friendly introduction, setting a relaxed
                            yet professional tone. Example: "Hey there! Welcome to your ${interviewInfo?.interviewData?.jobPosition} interview. Let's get started
                            with a few questions!" Ask one question at a time and wait for the candidate's response before proceeding.
                            Keep the questions clear and concise. Below are the questions list.
                            Questions: ${questionList}
                            If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
                            "Need a hint? Think about how React tracks component updates!"
                            Provide brief, encouraging feedback after each answer. Example:
                            "Nice! That's a solid answer."
                            "Hmm, not quite! Want to try again?"
                            Keep the conversation natural and engaging use casual phrases like "Alright, next up..." or "Let's tackle a tricky one!"
                            "That was great! You handled some tough questions well. Keep sharpening your skills!"
                            End on a positive note:
                            "Thanks for chatting! Hope to see you crushing projects soon!"
                            Key Guidelines:
                            i). Be friendly, engaging, and witty.
                            ii). Keep responses short and natural, like a real conversation.
                            iii). Adapt based on the candidate's confidence level.
                            iv). Ensure the interview remains focused on ${interviewInfo?.interviewData?.jobPosition}.
                        `
                    }
                ]
            }
        };

        await vapi.start(assistantOptions);
        const id = setInterval(() => {
            setSecondsElapsed(prev => prev + 1);
        }, 1000);
        setIntervalId(id);
    }

    useEffect(() => {
        return () => {
            clearInterval(intervalId);
        };
    }, [intervalId]);


    const stopInterview = () => {
        try {
            clearInterval(intervalId);
            
            // Stop the vapi call
            toast("Interview Ended... Please Wait...");
            vapi.stop();
            GenerateFeedback();
        } catch (error) {
            toast('Error stopping interview');
        }
    }

    useEffect(() => {
        const handleMessage = (message) => {
            if(message?.conversation){
                const convoString = JSON.stringify(message.conversation);
                setConversation(convoString);
            }
        };

        vapi.on('message', handleMessage);
        vapi.on('call-start', () => {
            toast("Call Connected...");
        });
        vapi.on('speech-start', () => {
            setActiveUser(false);
        });
        vapi.on('speech-end', () => {
            setActiveUser(true);
        });
        vapi.on('speech-end', () => {
            setActiveUser(true);
        });


        //  Clean up the listener
        return () => {
            vapi.off("message", handleMessage);
            vapi.off("call-start", () => console.log("END"));
            vapi.off("speech-start", () => console.log("END"));
            vapi.off("speech-end", () => console.log("END"));
            vapi.off("speech-end", () => console.log("END"));
        }
    }, []);

    const GenerateFeedback = async () => {
        setLoading(true);

        try {
            const result = await axios.post('/api/ai-feedback', {
                conversation: conversation
            });

            const Content = result.data.content;
            const FINAL_CONTENT = Content.replace('```json', '').replace('```', '');

            // Save To Database
            const { data, error } = await supabase
                .from('Interview-feedback')
                .insert([
                    { 
                        userName: interviewInfo?.userName,
                        userEmail: interviewInfo?.userEmail,
                        interview_id: interview_Id,
                        feedback: JSON.parse(FINAL_CONTENT),
                        recommended: false
                    },
                ])
                .select();

            if (error) {
                toast.error("Failed to save feedback, Conversation is too short!");
                setLoading(false);
                return;
            }
            
            setLoading(false);
            toast.success("Feedback generated successfully!");
            router.push('/interview/' + interview_Id + '/completed');
        } catch (error) {
            setLoading(false);
            toast.error("Conversation is too short to generate feedback!");
            router.push('/interview/' + interview_Id + '/completed');
        }
    }

  return (
    <div className="px-4 py-10 sm:px-6 md:px-10 lg:px-20 xl:px-40 2xl:px-56">
      <h2 className="font-bold text-lg sm:text-xl flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2">
        <span>AI Interview Session</span>
        <span className="flex gap-2 items-center text-sm text-gray-600">
          <Timer />
          {formatTime(secondsElapsed)}
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
        {/* AI Recruiter Card */}
        <div className="bg-white min-h-[300px] sm:h-[350px] md:h-[400px] rounded-lg border shadow-xl flex flex-col items-center justify-center gap-3 text-gray-500 p-5">
          <div className="relative">
            {!activeUser && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />
            )}
            <Image
              src="/ai.jpg"
              alt="ai"
              width={100}
              height={100}
              className="w-14 h-14 sm:w-[60px] sm:h-[60px] object-cover rounded-full"
            />
          </div>
          <h2 className="text-center text-sm sm:text-base">AI Recruiter</h2>
        </div>

        {/* User Card */}
        <div className="bg-white min-h-[300px] sm:h-[350px] md:h-[400px] rounded-lg border shadow-xl flex flex-col items-center justify-center gap-3 text-gray-500 p-5">
          <div className="relative">
            {activeUser && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />
            )}
            <h2 className="text-xl sm:text-2xl bg-primary text-white p-3 rounded-full uppercase px-5">
              {interviewInfo?.userName?.[0]}
            </h2>
          </div>
          <h2 className="text-center text-sm sm:text-base">
            {interviewInfo?.userName}
          </h2>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center mt-10 gap-5">
        <Mic className="h-10 w-10 sm:h-12 sm:w-12 p-3 text-white bg-gray-500 rounded-full cursor-pointer" />
        <InterviewEndDialog stopInterview={stopInterview}>
          <span>
            {loading ? (
              <Loader2Icon className="h-10 w-10 sm:h-12 sm:w-12 p-3 bg-red-500 text-white rounded-full animate-spin" />
            ) : (
              <Phone className="h-10 w-10 sm:h-12 sm:w-12 p-3 bg-red-500 text-white rounded-full cursor-pointer" />
            )}
          </span>
        </InterviewEndDialog>
      </div>

      <h2 className="text-gray-400 text-xs sm:text-sm text-center mt-5">
        {loading ? 'Generating feedback...' : 'Interview in Progress...'}
      </h2>
    </div>
  )
}

export default StartInterview