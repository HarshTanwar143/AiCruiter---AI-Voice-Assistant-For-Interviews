import { PhoneCallIcon, VideoIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function CreateOptions() {
    return (
        <div className=' grid grid-cols-2 gap-5'>
            <Link href={'/dashboard/create-interview'} className=' w-full bg-white p-5 rounded-xl cursor-pointer hover:scale-95 duration-400'>
                <div className=' p-2 bg-blue-200 w-fit rounded-md'>
                    <VideoIcon className=' text-primary ' />
                </div>
                <h2 className=' my-2 font-bold text-lg'>Create New Interview</h2>
                <p className=' text-gray-500 font-semibold'>Create AI interviews and schedule them with candidates</p>
            </Link>

            <div className=' w-full bg-white p-5 rounded-xl hover:scale-95 duration-400'>
                <div className=' p-2 bg-blue-200 w-fit rounded-md'>
                    <PhoneCallIcon className=' text-primary ' />
                </div>
                <h2 className=' my-2 font-bold text-lg'>Create Phone Screening Call</h2>
                <p className=' text-gray-500 font-semibold'>Schedule phone screening calls with potential candidates</p>
            </div>
        </div>
    )
}

export default CreateOptions
