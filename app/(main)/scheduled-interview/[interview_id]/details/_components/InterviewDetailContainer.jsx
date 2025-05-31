import { Calendar, Clock } from 'lucide-react'
import moment from 'moment'
import React from 'react'

function InterviewDetailContainer({interviewDetail}) {
    // Helper function to parse and format types
    const formatTypes = (typeString) => {
        try {
            const parsedTypes = JSON.parse(typeString);
            if (Array.isArray(parsedTypes)) {
                return parsedTypes.join(', ');
            }
            return parsedTypes;
        } catch (error) {
            return typeString;
        }
    };

    return (
        <div className='p-3 sm:p-4 md:p-5 bg-white rounded-lg border mt-5 w-full'>
            <h2 className='font-bold uppercase text-sm sm:text-base md:text-lg break-words'>
                {interviewDetail?.jobPosition}
            </h2>

            <div className='mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-6'>
                <div className='flex-1 min-w-0'>
                    <h2 className='text-xs sm:text-sm text-gray-500'>Duration</h2>
                    <h2 className='flex text-xs sm:text-sm font-bold items-center gap-2 mt-1'>
                        <Clock className='h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0' /> 
                        <span className='break-words'>{interviewDetail?.duration}</span>
                    </h2>
                </div>
                
                <div className='flex-1 min-w-0'>
                    <h2 className='text-xs sm:text-sm text-gray-500'>Created At</h2>
                    <h2 className='flex text-xs sm:text-sm font-bold items-center gap-2 mt-1'>
                        <Calendar className='h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0' /> 
                        <span className='break-words'>
                            {moment(interviewDetail?.created_at).format('MMM DD, yyyy')}
                        </span>
                    </h2>
                </div>
                
                {interviewDetail?.type && (
                    <div className='flex-1 min-w-0'>
                        <h2 className='text-xs sm:text-sm text-gray-500'>Type</h2>
                        <h2 className='flex text-xs sm:text-sm font-bold items-start gap-2 mt-1'>
                            <Clock className='h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 mt-0.5' /> 
                            <span className='break-words leading-relaxed'>
                                {formatTypes(interviewDetail?.type)}
                            </span>
                        </h2>
                    </div>
                )}
            </div>

            <div className='mt-5'>
                <h2 className='font-bold text-sm sm:text-base'>Job Description</h2>
                <p className='text-xs sm:text-sm leading-5 sm:leading-6 mt-2 break-words'>
                    {interviewDetail?.jobDescription}
                </p>
            </div>

            <div className='mt-5'>
                <h2 className='font-bold text-sm sm:text-base'>Interview Questions</h2>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mt-3'>
                    {interviewDetail?.questionList?.map((item, index) => (
                        <div key={index} className='p-2 sm:p-3 bg-gray-50 rounded-md'>
                            <h2 className='text-xs sm:text-sm leading-5 sm:leading-6 break-words'>
                                <span className='font-semibold text-gray-700'>{index + 1}.</span> {item?.question}
                            </h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default InterviewDetailContainer