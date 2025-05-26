"use client"
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { Clock, Info, Loader2Icon, Video } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import { supabase } from '@/services/supabaseClient'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { InterviewDataContext } from '@/context/InterviewDataContext'

function Interview() {
    const params = useParams();
    const router = useRouter();
    const {interviewInfo, setInterviewInfo} = useContext(InterviewDataContext);
    const { interview_Id } = params;
    const [interviewDetails, setInterviewDetails] = useState();
    const [loading, setLoading] = useState(false);
    const [loadingInterview, setLoadingInterview] = useState(false);
    const [userName, setUserName] = useState();
    const [userEmail, setUserEmail] = useState();

    useEffect(() => {
        interview_Id && getInterviewDetails();
    }, [interview_Id]);

    const getInterviewDetails = async () => {
        setLoading(true);
        try {
            let { data: Interviews, error } = await supabase
                .from('Interviews')
                .select('jobPosition,jobDescription,duration,type,questionList,userEmail')
                .eq('interviewId', interview_Id)

            setInterviewDetails(Interviews[0]);
            setLoading(false);
            if (Interviews?.length === 0) {
                toast.error('Incorrect Interview Link');
                router.push('/');
                return;
            }
        } catch (e) {
            toast.error('Error fetching interview details');
        }
    }

    const onJoinInterview = async () => {
        if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(userEmail)) {
            toast.error("Please enter a valid Gmail address ending with @gmail.com");
            return;
        }

        setLoadingInterview(true);
        let { data: Interviews, error } = await supabase
        .from('Interviews')
        .select("*")
        .eq('interviewId', interview_Id)

        // console.log('Interviews:', Interviews[0]);
        setInterviewInfo({
            userName: userName,
            userEmail: userEmail,
            interviewData: Interviews[0]
        });

        setLoadingInterview(false);
        router.push(`/interview/${interview_Id}/start`);
    }

    return (
        <>
            {
                loading ?
                    <div className='h-screen flex justify-center items-center text-xl'>
                        <Loader2Icon className='animate-spin' />
                    </div> :
                    <div className='flex justify-center px-4 sm:px-6 md:px-10 lg:px-16 py-10'>
                        <div className='w-full max-w-3xl bg-white shadow-2xl shadow-blue-300 rounded-lg p-6 sm:p-8 md:p-10 flex flex-col items-center gap-4'>
                            <Image src='/logo.png' width={160} height={80} alt='logo' className='w-32 sm:w-48' />
                            <h2 className='font-bold text-lg sm:text-xl text-center'>AI Powered Interview Platform</h2>
                            <Image src='/interview.jpg' width={450} height={450} alt='interview' className='rounded-lg w-full max-w-md' />
                            <h2 className='font-bold text-lg sm:text-xl text-center'>{interviewDetails?.jobPosition}</h2>
                            <p className='flex items-center gap-2 text-sm text-gray-500'><Clock className='h-4 w-4' />{interviewDetails?.duration}</p>
                            <div className=' w-full'>
                                <p className='text-base sm:text-lg font-semibold text-center'>Enter Your Full Name</p>

                                <Input
                                    placeholder='e.g. Michael John'
                                    className='text-center w-full'
                                    onChange={(event) => setUserName(event.target.value)}
                                />
                            </div>
                            <div className=' w-full'>
                                <p className='text-base sm:text-lg font-semibold text-center'>Enter Your Email</p>

                                <Input
                                    placeholder='e.g. John@gmail.com'
                                    className='text-center w-full'
                                    onChange={(event) => setUserEmail(event.target.value)}
                                    type="email"
                                    pattern="^[a-zA-Z0-9._%+-]+@gmail\.com$"
                                    title="Please enter a valid Gmail address ending with @gmail.com"
                                />

                            </div>
                            <div className='bg-blue-100 p-4 rounded-lg mt-4 w-full'>
                                <div className='flex gap-2 font-bold text-base sm:text-lg items-center'><Info /> Before You Begin</div>
                                <ul className='text-blue-500 list-disc list-inside text-sm sm:text-base mt-2'>
                                    <li>Test your camera and microphone</li>
                                    <li>Ensure you have a stable internet connection</li>
                                    <li>Find a quiet place for interview</li>
                                </ul>
                            </div>
                            <Button
                                className='bg-blue-600 text-white font-semibold rounded-lg px-4 py-2 mt-4 w-full cursor-pointer hover:bg-blue-500 transition duration-200 ease-in-out flex items-center justify-center gap-2'
                                disabled={loading || !userName || !userEmail}
                                onClick={onJoinInterview}
                            >
                                {loadingInterview ? <Loader2Icon className=' animate-spin' /> : <Video />} Join Interview
                            </Button>
                        </div>
                    </div>
            }
        </>
    )
}

export default Interview
