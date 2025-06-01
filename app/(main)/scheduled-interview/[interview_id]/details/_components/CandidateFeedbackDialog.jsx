import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

function CandidateFeedbackDialog({ candidate }) {
    const feedback = candidate?.feedback?.feedback

    const sendMsg = () => {
        const message = feedback?.RecommendationMsg || "No recommendation message provided."
        window.location.href = `mailto:?subject=Interview Feedback&body=${encodeURIComponent(message)}`
    }

    return (
        <Dialog>
            <DialogTrigger>
                <Button variant='outline' className='cursor-pointer text-primary w-full sm:w-auto'>View Report</Button>
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Feedback</DialogTitle>
                    <DialogDescription asChild>
                        <div className='mt-5 space-y-6'>
                            {/* Candidate Info */}
                            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                                <div className='flex items-center gap-4'>
                                    <h2 className='bg-primary p-3 px-4.5 font-bold text-white uppercase rounded-full'>
                                        {candidate.userName[0]}
                                    </h2>
                                    <div>
                                        <h2 className='font-bold'>{candidate?.userName}</h2>
                                        <h2 className='text-sm text-gray-500'>{candidate?.userEmail}</h2>
                                    </div>
                                </div>
                                <h2 className='text-primary text-2xl font-bold'>
                                    {feedback?.rating?.totalRating}/10
                                </h2>
                            </div>

                            {/* Skills Assessment */}
                            <div>
                                <h2 className='font-bold mb-3'>Skills Assessment</h2>
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                                    <div>
                                        <h2 className='flex justify-between'>Technical Skills <span>{feedback?.rating?.technicalSkills}/10</span></h2>
                                        <Progress value={feedback?.rating?.technicalSkills * 10} className='mt-1' />
                                    </div>
                                    <div>
                                        <h2 className='flex justify-between'>Communication Skills <span>{feedback?.rating?.communication}/10</span></h2>
                                        <Progress value={feedback?.rating?.communication * 10} className='mt-1' />
                                    </div>
                                    <div>
                                        <h2 className='flex justify-between'>Problem Solving <span>{feedback?.rating?.problemSolving}/10</span></h2>
                                        <Progress value={feedback?.rating?.problemSolving * 10} className='mt-1' />
                                    </div>
                                    <div>
                                        <h2 className='flex justify-between'>Experience <span>{feedback?.rating?.experience}/10</span></h2>
                                        <Progress value={feedback?.rating?.experience * 10} className='mt-1' />
                                    </div>
                                </div>
                            </div>

                            {/* Summary */}
                            <div>
                                <h2 className='font-bold mb-2'>Performance Summary</h2>
                                <div className='p-4 bg-secondary rounded-md'>
                                    <p>{feedback?.summary}</p>
                                </div>
                            </div>

                            {/* Recommendation */}
                            <div className={`p-4 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${feedback?.Recommendation === 'No' ? 'bg-red-100' : 'bg-green-100'}`}>
                                <div>
                                    <h2 className={`font-bold ${feedback?.Recommendation === 'No' ? 'text-red-700' : 'text-green-700'}`}>
                                        Recommendation Msg
                                    </h2>
                                    <p className={`mt-2 font-bold ${feedback?.Recommendation === 'No' ? 'text-red-500' : 'text-green-500'}`}>
                                        {feedback?.RecommendationMsg}
                                    </p>
                                </div>
                                <Button
                                    onClick={sendMsg}
                                    className={`w-full sm:w-auto ${feedback?.Recommendation === 'No' ? 'bg-red-700 hover:bg-red-500' : 'bg-green-700 hover:bg-green-500'}`}
                                >
                                    Send Msg
                                </Button>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default CandidateFeedbackDialog
