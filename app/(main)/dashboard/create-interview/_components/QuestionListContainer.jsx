import React from 'react'

const QuestionListContainer = ({questionList}) => {
    return (
        <div className=' flex flex-col gap-2 mt-5'>
            <h2 className=' text-lg font-bold mt-3 uppercase text-center '>Generated Interview Questions</h2>
            {
                questionList.map((item,index) => (
                    <div key={index} className=' p-3 bg-white rounded-lg mt-2 shadow-md'>
                        <h2 className=' font-medium text-lg'>{index+1}. {item.question}</h2>
                        <p className=' mt-2 text-sm text-primary'><span className=' font-bold'>Type: </span> {item.type}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default QuestionListContainer
