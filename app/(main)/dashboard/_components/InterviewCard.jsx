import { Button } from '@/components/ui/button'
import { ArrowRight, Copy, Send } from 'lucide-react'
import moment from 'moment'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'

function InterviewCard({interview, viewDetail=false}) {
    const CopyLink = () => {
        const url = process.env.NEXT_PUBLIC_HOST_URL+ "/" + interview?.interviewId;
        navigator.clipboard.writeText(url);
        toast("Link Copied!");
    }

    const SendLink = () => {
        window.location.href = `mailto:?subject=Interview Link&body=Join the interview using this link: ${process.env.NEXT_PUBLIC_HOST_URL}/${interview?.interviewId}`;
    }

    return (
        <div className=' p-5 bg-white rounded-lg border'>
            <div className=' flex items-center justify-between'>
                <div className=' w-[30px] h-[30px] rounded-full bg-primary'></div>
                <h2 className=' text-sm text-gray-500 font-semibold'>{moment(interview?.created_at).format('DD MMM YYYY')}</h2>
            </div>
            <h2 className=' mt-3 font-bold text-lg'>
                {interview?.jobPosition}
            </h2>
            <div className=' flex justify-between items-center'>
                <h2 className=' mt-2'>{interview?.duration}</h2>
                {
                    viewDetail &&
                    <span className=' text-green-600 font-bold'>{interview['Interview-feedback']?.length} Candidates</span>
                }
            </div>
            {
                !viewDetail ?
                <div className=' flex gap-3 w-full mt-3'>
                    <Button variant='outline' className=' w-[50%] cursor-pointer' onClick={CopyLink}><Copy /> Copy Link</Button>
                    <Button className=' w-[50%] cursor-pointer' onClick={SendLink}><Send /> Send</Button>
                </div> :
                <Link href={'/scheduled-interview/' + interview?.interviewId + '/details'} className=' w-full'>
                    <Button variant='outline' className=' mt-3 w-full cursor-pointer'>View Detail <ArrowRight /></Button>
                </Link>

            }
        </div>
    )
}

export default InterviewCard
