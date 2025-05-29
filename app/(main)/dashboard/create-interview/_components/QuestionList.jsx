"use client"
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import QuestionListContainer from './QuestionListContainer';
import { supabase } from '@/services/supabaseClient';
import { useUser } from '@/app/provider';
import { v4 as uuidv4 } from 'uuid';

function QuestionList({formData, onCreateLink}) {
    const [loading, setLoading] = useState(true);
    const [saveLoading, setSaveLoading] = useState(false);
    const [questionList, setQuestionList] = useState();
    const {user} = useUser();
    const interviewId = uuidv4();

    useEffect(()=>{
        if(formData){
            GenerateQuestionList();
        }
    },[formData]);

    const GenerateQuestionList = async() => {
        setLoading(true);
        try{
            const result = await axios.post('/api/ai-model',{
                ...formData
            });
            const Content = result.data.content;
            const FINAL_CONTENT = Content.replace('```json','').replace('```','');

            setQuestionList(JSON.parse(FINAL_CONTENT)?.interviewQuestions);
            setLoading(false);
        }catch(e){
            toast('Server Error, Try Again!')
            setLoading(false);
        }
    }

    const onFinish = async() => {
        setSaveLoading(true);
        const { data, error } = await supabase
        .from('Interviews')
        .insert([
            {
                ...formData,
                questionList: questionList,
                userEmail: user?.email,
                interviewId: interviewId
            },
        ])
        .select()

        // Update User's Credits
        const userUpdate = await supabase
        .from('Users')
        .update({ credits: Number(user?.credits) - 1 })
        .eq('email', user?.email)
        .select()
        
        setSaveLoading(false);
        onCreateLink(interviewId);
    }


    return (
        <div>
            {
                loading ?
                <div className=' p-5 bg-blue-100 rounded-xl border border-gray-100 flex gap-5 items-center'>
                    <Loader2Icon className=' animate-spin' />
                    <div>
                        <h2 className=' font-medium'>Generating Interview Questions...</h2>
                        <p className=' text-primary'>Our AI is crafting personalized questions based on your job position.</p>
                    </div>
                </div> :
                <div className=' mt-5 '>
                    <Button onClick={()=>onFinish()} className=' w-full mt-2 cursor-pointer' disabled={saveLoading}>
                        {saveLoading && <Loader2Icon className=' animate-spin mr-2' />}
                        {saveLoading ? 'Creating...' : 'Creating Interview Link & Finish'}
                    </Button>
                    {
                        questionList?.length > 0 && <QuestionListContainer questionList={questionList}/>
                    }
                </div>
            }
        </div>
    )
}

export default QuestionList
