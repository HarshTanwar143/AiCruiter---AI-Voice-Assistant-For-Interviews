import moment from 'moment'
import React from 'react'
import CandidateFeedbackDialog from './CandidateFeedbackDialog'

function CandidateList({candidateList}) {
    return (
        <div>
            <h2 className=' font-bold my-5'>Candidates ({candidateList?.length})</h2>
            {
                candidateList?.map((item, index) => (
                    <div key={index} className=' p-5 flex gap-3 justify-between items-center bg-white rounded-lg'>
                        <div className=' flex items-center gap-5'>
                            <h2 className=' bg-primary p-3 px-4.5 font-bold text-white uppercase rounded-full'>{item.userName[0]}</h2>
                            <div>
                                <h2 className=' font-bold'>{item?.userName}</h2>
                                <h2 className=' text-sm text-gray-500'>Completed On: {moment(item?.created_at).format('MMM DD, yyyy')}</h2>
                            </div>
                        </div>
                        <div className=' flex items-center gap-3'>
                            <h2 className=' text-green-600 font-bold'>{item?.feedback?.feedback?.rating?.totalRating}/10</h2>
                            <CandidateFeedbackDialog candidate={item} />
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default CandidateList
