"use client"
import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import FormContainer from './_components/FormContainer';
import QuestionList from './_components/QuestionList';
import { toast } from 'sonner';
import InterviewLink from './_components/InterviewLink';

function CreateInterview() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState();
    const [interviewId, setInterviewId] = useState();

    const onHandleInputChange = (field,value) => {
        setFormData(prev => ({...prev, [field]: value}));
    }
    // console.log('formdata :: ',formData);


    const HandleNext = ()=>{
        if(!formData?.jobPosition || !formData?.jobDescription || !formData?.duration || formData?.type?.length===0){
            toast("Please enter all required details!")
            return;
        }
        setStep(step + 1);
    }

    const onCreateLink = (interview_Id) => {
        setInterviewId(interview_Id);
        setStep(step + 1);
    }

    return (
        <div className=' mt-10 md:px-24 lg:px-44 xl:px-56'>
            <div className=' flex gap-5 items-center'>
                <ArrowLeft onClick={()=>router.back()} className=' cursor-pointer' />
                <h2 className=' font-bold text-2xl'>Create New Interview</h2>
            </div>
            <Progress value={step*33.33} className=' my-5' />
            {
                step === 1 ?
                <FormContainer onHandleInputChange={onHandleInputChange} GoToNext={()=>HandleNext()}/> :
                (
                    step === 2 ? <QuestionList formData={formData} onCreateLink={(interview_Id) => onCreateLink(interview_Id)} /> :
                    step === 3 ? <InterviewLink interview_Id={interviewId} formData={formData} /> : null
                )
            }
        </div>
    )
}

export default CreateInterview
