import { BriefcaseBusinessIcon, Calendar, Code2Icon, GroupIcon, LayoutDashboard, List, Puzzle, Settings, User2Icon, WalletCards } from "lucide-react";

export const SideBarOptions = [
    {
        name: 'Dashboard',
        icon: LayoutDashboard,
        path: '/dashboard'
    },
    {
        name: 'Scheduled Interview',
        icon: Calendar,
        path: '/scheduled-interview'
    },
    {
        name: 'All Interview',
        icon: List,
        path: '/all-interview'
    },
    {
        name: 'Billing',
        icon: WalletCards,
        path: '/billing'
    },
    {
        name: 'Settings',
        icon: Settings,
        path: '/settings'
    },
]

export const InterviewType = [
    {
        title: 'Technical',
        icon: Code2Icon
    },
    {
        title: 'Behavioral',
        icon: User2Icon
    },
    {
        title: 'Experience',
        icon: BriefcaseBusinessIcon
    },
    {
        title: 'Problem Solving',
        icon: Puzzle
    },
    {
        title: 'Leadership',
        icon: GroupIcon
    },
]

export const PricingPlan = [
    {
        link: 'https://buy.stripe.com/test_14AeVfb7r2uaeAV8aA6sw03',
        price: 200.00,
        priceId: 'price_1RTjVIQ6mzsMDGrDr7GbwFAa',
        credits: 8,
        plan: 'Monthly Plan'
    },
    {
        link: 'https://buy.stripe.com/test_00w4gB1wRgl0gJ3gH66sw04',
        price: 700.00,
        priceId: 'price_1RTjmoQ6mzsMDGrDuwnp9t3a',
        credits: 35,
        plan: '3 Months Plan'
    },
    {
        link: 'https://buy.stripe.com/test_cNi28ta3n8Sy78tduU6sw02',
        price: 2500.00,
        priceId: 'price_1RTjOeQ6mzsMDGrDPowuWVlc',
        credits: 100,
        plan: 'Yearly Plan'
    }
]

export const QUESTIONS_PROMPT = `You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of high-quality interview questions:
Job Title: {{jobTitle}}
Job Description: {{jobDescription}}
Interview Duration: {{duration}}
Interview Type: {{type}}

Your task:
Analyze the job description to identify key responsibilities, required skills, and expected experience.
Generate a list of interview questions depends on interview duration
Adjust the number and depth of questions to match the interview duration.
Ensure the questions match the tone and structure of a real-life {{type}} interview.
Format your response in JSON format with array list of questions.
format: interviewQuestions=[
{
question:",
type: '{{type}}'
}, {
...
}]

The goal is to create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role.`

export const FEEDBACK_PROMPT = `{{conversation}}
    Depends on this Interview Conversation between assitant and user, Give me feedback for user interview. Give me rating out of 10
    for technical Skills, Communication, Problem Solving, Experience, totalRating. Also give me summary in 3 lines about the interview and one line 
    to let me know whether is recommended for hire or not with msg. Give me response in JSON format
    {
        feedback: {
            rating: {
                technicalSkills: <Rate out of 10 based on user response>,
                communication: <Rate out of 10 based on user response>,
                problemSolving: <Rate out of 10 based on user response>,
                experience: <Rate out of 10 based on user response>,
                totalRating: <Rate out of 10 based on user response without fraction>
            },
            summary:<in 3 Line>,
            Recommendation:<Only give Yes or No without any explanation, Yes or No shows this candidate is recommended for hire or not>,
            RecommendationMsg: <Give a short message to let me know why this candidate is recommended or not>
        }
    }
`