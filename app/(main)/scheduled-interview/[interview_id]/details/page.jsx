"use client"
import { useUser } from '@/app/provider';
import { supabase } from '@/services/supabaseClient';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import InterviewDetailContainer from './_components/InterviewDetailContainer';
import CandidateList from './_components/CandidateList';
import PageLoader from '@/services/PageLoader';


function page() {
    const [interviewDetail, setInterviewDetail] = useState();
    const [loading, setLoading] = useState(true);
    const {interview_id} = useParams();
    const { user } = useUser();


    useEffect(() => {
        user && GetInterviewList();
    }, [user]);

    const GetInterviewList = async () => {
        const result = await supabase.from('Interviews')
            .select('jobPosition,jobDescription,type,questionList,duration,interviewId,created_at,Interview-feedback(userEmail,userName,feedback,created_at)')
            .eq('userEmail', user?.email)
            .eq('interviewId', interview_id);

        setInterviewDetail(result?.data[0]);
        setLoading(false);
    }

    return (
        loading ? <PageLoader load={loading} /> :
        <div className=' my-5'>
            <h2 className=' font-bold text-2xl'>Interview Details</h2>
            <InterviewDetailContainer interviewDetail={interviewDetail} />
            <CandidateList candidateList={interviewDetail?.['Interview-feedback']} />
        </div>
    )
}

export default page
