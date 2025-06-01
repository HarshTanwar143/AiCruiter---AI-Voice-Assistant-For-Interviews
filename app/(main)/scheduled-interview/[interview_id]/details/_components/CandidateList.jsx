import moment from 'moment'
import React from 'react'
import CandidateFeedbackDialog from './CandidateFeedbackDialog'

function CandidateList({ candidateList }) {
    return (
        <div>
            <h2 className="font-bold my-5 text-center sm:text-left">
                Candidates ({candidateList?.length})
            </h2>
            {candidateList?.length > 0 ? (
                candidateList?.map((item, index) => (
                    <div
                        key={index}
                        className="p-4 sm:p-5 flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 mb-5 bg-white rounded-lg shadow-sm transition-all"
                    >
                        {/* Candidate Info */}
                        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 w-full sm:w-auto text-center sm:text-left">
                            <div className="bg-primary text-white font-bold uppercase rounded-full flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 text-lg">
                                {item.userName[0]}
                            </div>
                            <div className="flex flex-col items-center sm:items-start">
                                <h2 className="font-semibold text-base sm:text-lg">
                                    {item?.userName}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Completed On:{' '}
                                    {moment(item?.created_at).format('MMM DD, YYYY')}
                                </p>
                            </div>
                        </div>

                        {/* Feedback Section */}
                        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-fit mt-3 sm:mt-0 text-center sm:text-left">
                            <span className="text-green-600 font-bold text-base sm:text-lg">
                                {item?.feedback?.feedback?.rating?.totalRating}/10
                            </span>
                            <div className="w-full sm:w-auto">
                                <CandidateFeedbackDialog candidate={item} />
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                // Empty State
                <div className="bg-white rounded-lg border border-gray-200 p-8 sm:p-12 text-center">
                    <div className="max-w-md mx-auto">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg
                                className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                            No candidates yet
                        </h3>
                        <p className="text-sm sm:text-base text-gray-500">
                            Candidates who complete the assessment will appear here.
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CandidateList
