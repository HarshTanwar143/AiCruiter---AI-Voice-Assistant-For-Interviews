"use client";
import { useUser } from '@/app/provider';
import { supabase } from '@/services/supabaseClient'
import React, { useEffect, useState } from 'react'
import InterviewCard from '../dashboard/_components/InterviewCard';
import { Plus, Video } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PageLoader from '@/services/PageLoader';

function ScheduledInterview() {
    const [interviewList, setInterviewList] = useState();
    const [loading, setLoading] = useState(true);
    const { user } = useUser();

    useEffect(() => {
        user && GetInterviewList();
    }, [user]);

    const GetInterviewList = async () => {
        const result = await supabase.from('Interviews')
            .select('jobPosition,duration,interviewId,Interview-feedback(userEmail)')
            .eq('userEmail', user?.email)
            .order('id', { ascending: false });

            setInterviewList(result.data);
            setLoading(false);
    }

    return (
        loading ? <PageLoader load={loading} /> :
        <div className=' my-5'>
            <h2 className=' font-bold text-2xl'>All Scheduled Interviews</h2>

            {
                interviewList?.length==0 ?
                <div className=' p-5 flex flex-col gap-3 items-center mt-5 bg-white rounded-xl'>
                    <Video className=' h-10 w-10 text-primary' />
                    <h2>You don't have any interview created!</h2>
                    <Link href={'/dashboard/create-interview'}>
                        <Button className=' cursor-pointer'><Plus/> Create New Interview</Button>
                    </Link>
                </div> :
                <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
                    {
                        interviewList?.map((interview, index) => (
                            <InterviewCard key={index} interview={interview} viewDetail={true} />
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default ScheduledInterview
