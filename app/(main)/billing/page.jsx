"use client";
import { useUser } from '@/app/provider'
import { PricingPlan } from '@/services/Constants'
import React from 'react'

function BillingCredits() {
  const { user } = useUser();

  return (
    <div className=' '>
      <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className=" grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch md:grid-cols-3 md:gap-8">
          {
            PricingPlan.map((plan, index) => (
              <div key={index} className=" shadow-primary divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-xl">
                <div className="p-6 sm:px-8">
                  <h2 className="text-lg font-medium text-gray-900">
                    {plan?.plan}
                    <span className="sr-only">Plan</span>
                  </h2>


                  <p className="mt-2 sm:mt-4">
                    <strong className="text-3xl font-bold text-gray-900 sm:text-4xl"> {plan?.price}₹ </strong>

                    <span className="text-sm font-medium text-gray-700">
                      {
                        plan?.price === 200.00 ? 'for 8 credits' :
                        plan?.price === 700.00 ? 'for 35 credits' :
                        plan?.price === 2500.00 ? 'for 100 credits' : ''
                      }
                    </span>
                  </p>

                  <a
                    className="mt-4 block rounded-sm border border-blue-600 bg-blue-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-blue-600 transition-all duration-400 focus:ring-3 focus:outline-hidden sm:mt-6"
                    href={plan?.link+'?prefilled_email='+user?.email}
                    target="_blank"
                  >
                    Get Started
                  </a>
                </div>

                <div className="p-6 sm:px-8">
                  <p className="text-lg font-medium text-gray-900 sm:text-xl">What's included:</p>

                  <ul className="mt-2 space-y-2 sm:mt-4">
                    <li className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-5 text-indigo-700 shadow-sm"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>

                      <span className="text-gray-700"> 
                        {
                          plan?.credits === 8 ? '8 Credits' :
                          plan?.credits === 35 ? '35 Credits' :
                          plan?.credits === 100 ? '100 Credits' : ''
                        }  
                      </span>
                    </li>

                    <li className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-5 text-indigo-700 shadow-sm"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>

                      <span className="text-gray-700"> 
                        {
                          plan?.credits === 8 ? '2 GB' : 
                          plan?.credits === 35 ? '5 GB' :
                          plan?.credits === 100 ? '20 GB' : ''
                        } of storage </span>
                    </li>

                    <li className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-5 text-indigo-700 shadow-sm"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>

                      <span className="text-gray-700"> Email support </span>
                    </li>

                    <li className="flex items-center gap-1">
                      {
                        plan?.credits === 8 ? 
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-5 text-red-700 shadow-sm"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg> :
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-5 text-indigo-700 shadow-sm"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                          
                      }
                      
                      <span className="text-gray-700"> Help center access </span>
                    </li>

                    <li className="flex items-center gap-1">
                      {
                        plan?.credits === 100 ?
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-5 text-indigo-700 shadow-sm"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg> :
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-5 text-red-700 shadow-sm"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      }

                      <span className="text-gray-700"> Phone support </span>
                    </li>

                    <li className="flex items-center gap-1">
                      {
                        plan?.credits === 100 ?
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-5 text-indigo-700 shadow-sm"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg> :
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-5 text-red-700 shadow-sm"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      }

                      <span className="text-gray-700"> Community access </span>
                    </li>
                  </ul>
                </div>
              </div>
            ))
          }

        </div>
      </div>
</div>
  )
}

export default BillingCredits
