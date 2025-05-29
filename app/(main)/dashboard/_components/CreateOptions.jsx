"use client";
import { useUser } from '@/app/provider'
import { PhoneCallIcon, VideoIcon } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';

function CreateOptions() {
    const { user } = useUser();
    const router = useRouter();

    const handleInterview = () => {
        if (!user?.credits || user?.credits < 1) {
            toast.error("You don't have enough credits! Purchase our plan to create interviews.");
            router.push('/billing');
        } else {
            router.push('/dashboard/create-interview');
        }
    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
            <div 
                onClick={handleInterview} 
                className='w-full bg-white p-5 rounded-xl cursor-pointer hover:scale-95 duration-300 shadow-md'
            >
                <div className='p-2 bg-blue-200 w-fit rounded-md'>
                    <VideoIcon className='text-primary' />
                </div>
                <h2 className='my-2 font-bold text-lg'>Create New Interview</h2>
                <p className='text-gray-500 font-semibold'>
                    Create AI interviews and schedule them with candidates
                </p>
            </div>

            <div className='w-full bg-white p-5 rounded-xl hover:scale-95 duration-300 shadow-md'>
                <div className='p-2 bg-blue-200 w-fit rounded-md'>
                    <PhoneCallIcon className='text-primary' />
                </div>
                <h2 className='my-2 font-bold text-lg'>Create Phone Screening Call</h2>
                <p className='text-gray-500 font-semibold'>
                    Schedule phone screening calls with potential candidates
                </p>
            </div>
        </div>
    )
}

export default CreateOptions;
