import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { ArrowLeft, Clock, Copy, List, Mail, Plus, Slack, MessageCircleMore, ListCheck } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { toast } from 'sonner';

function InterviewLink({interview_Id, formData}) {
    const url = process.env.NEXT_PUBLIC_HOST_URL + '/' + interview_Id;
    
    const GetInterviewUrl = () => {
        return url;
    }
    
    const onCopyLink = async() => {
        await navigator.clipboard.writeText(url);
        toast('Link Copied to Clipboard!');
    }

    return (
        <div className=' flex items-center justify-center mt-12 flex-col gap-5'>
            <Image src={'/check.png'} alt='check'
                width={200}
                height={200}
                className=' w-[50px] h-[50px] md:w-[80px] md:h-[80px] '
            />

            <h2 className=' font-bold text-lg'>Your AI Interview is Ready!</h2>
            <p>Share this link with your candidates to start the interview process</p>

            <div className=' w-full rounded-xl p-6 mt-6 bg-white shadow-md flex flex-col gap-5'>
                <div className=' flex flex-col items-center justify-between sm:flex-row gap-2'>
                    <h2 className=' font-bold text-xl'>Interview Link</h2>
                    <h2 className=' text-primary text-sm bg-blue-200 rounded-xl px-2 p-1'>Valid for 30 days</h2>
                </div>
                <div className=' mt-3 flex flex-col sm:flex-row gap-3'>
                    <Input defaultValue={GetInterviewUrl()} disabled={true} />
                    <Button className=' cursor-pointer' onClick={()=>onCopyLink()}><Copy/> Copy Link</Button>
                </div>
                <hr className=' my-5' />

                <div className=' flex gap-5 flex-col sm:flex-row items-center'>
                    <h2 className=' flex gap-2 text-sm text-gray-500 items-center'><Clock className=' h-4 w-4' />{formData?.duration}</h2>
                    <h2 className=' flex gap-2 text-sm text-gray-500 items-center'><List className=' h-4 w-4' />10 Questions</h2>
                </div>
            </div>

            <div className=' mt-7 p-5 rounded-lg bg-white shadow-md w-full'>
                <h2 className=' font-bold text-center sm:text-left mb-5'>Share Via</h2>
                <div className=' flex flex-col sm:flex-row gap-7 mt-2'>
                    <Button className='cursor-pointer' variant={'outline'} onClick={() => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=&su=Interview Invitation&body=Hi, please join the interview using this link: ${url}`, '_blank')}>
                        <Mail /> Email
                    </Button>
                    <Button className='cursor-pointer' variant={'outline'} onClick={() => window.open(`https://slack.com/app_redirect?channel=general`, '_blank')}>
                        <Slack /> Slack
                    </Button>
                    <Button className='cursor-pointer' variant={'outline'} onClick={() => window.open(`https://api.whatsapp.com/send?text=Hi, please join the interview using this link: ${url}`, '_blank')}>
                        <MessageCircleMore /> WhatsApp
                    </Button>
                </div>
            </div>

            <div className=' flex flex-col sm:flex-row w-full gap-5 items-center justify-between mt-6'>
                <Link href={'/dashboard'}>
                    <Button className=' cursor-pointer' variant={'outline'}><ArrowLeft /> Back to Dashboard</Button>
                </Link>
                <Link href={'/all-interview'}>
                    <Button className=' cursor-pointer' ><ListCheck /> All Interviews</Button>
                </Link>
            </div>
        </div>
    )
}

export default InterviewLink
