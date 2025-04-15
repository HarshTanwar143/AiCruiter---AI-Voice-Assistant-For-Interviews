import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useState,useEffect } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { InterviewType } from '@/services/Constants'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'


function FormContainer({onHandleInputChange, GoToNext}) {
    const [interviewType,setInterviewType] = useState([]);

    useEffect(()=>{
        if(interviewType){
            onHandleInputChange("type",interviewType);
        }
    }, [interviewType]);


    const addInterviewType = (type) => {
        const data = interviewType.includes(type);

        if(!data){
            setInterviewType(prev=>[...prev,type]);
        }
        else{
            const result = interviewType.filter(item => item !== type);
            setInterviewType(result);
        }
    }


    return (
        <div className=' bg-white rounded-2xl p-10'>
            <div>
                <h2 className=' font-bold'>Job Position</h2>
                <Input placeholder='e.g. Full Stack Developer' className=' mt-2' onChange={(event)=>onHandleInputChange("jobPosition", event.target.value)} />
            </div>
            <div className=' mt-5'>
                <h2 className=' font-bold'>Job Description</h2>
                <Textarea placeholder='Enter details for job description' className=' h-[200px] mt-2' onChange={(event)=>onHandleInputChange("jobDescription", event.target.value)} />
            </div>
            <div className=' mt-5'>
                <h2 className=' font-bold'>Interview Duration</h2>
                <Select onValueChange={(value)=>onHandleInputChange("duration", value)}>
                    <SelectTrigger className="w-full mt-2 cursor-pointer">
                        <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem className=' cursor-pointer' value="5 Min">5 Min</SelectItem>
                        <SelectItem className=' cursor-pointer' value="15 Min">15 Min</SelectItem>
                        <SelectItem className=' cursor-pointer' value="30 Min">30 Min</SelectItem>
                        <SelectItem className=' cursor-pointer' value="45 Min">45 Min</SelectItem>
                        <SelectItem className=' cursor-pointer' value="60 Min">60 Min</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className=' mt-5'>
                <h2 className=' font-bold'>Interview Type</h2>
                <div className=' flex flex-wrap gap-3 mt-2'>
                    {
                        InterviewType.map((type,index)=>(
                                <div key={index} className={` flex items-center gap-2 border p-1 px-4  cursor-pointer rounded-2xl ${interviewType.includes(type.title) ? " bg-blue-200 text-primary hover:bg-blue-100 " : "hover:bg-secondary"}`} 
                                onClick={()=>addInterviewType(type.title)}>
                                    <type.icon className=' h-4 w-4'/>
                                    <span>{type.title}</span>
                                </div>
                        ))
                    }
                </div>
            </div>
            <div className=' mt-10 shadow-lg '>
                <Button className=' w-full cursor-pointer' onClick={()=>GoToNext()}>
                    Generate Question <ArrowRight />
                </Button>
            </div>
        </div>
    )
}

export default FormContainer
