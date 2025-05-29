import { QUESTIONS_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req){
    const {jobPosition, jobDescription, duration, type} = await req.json();
    const FINAL_PROMPT = QUESTIONS_PROMPT
    .replaceAll('{{jobTitle}}', jobPosition)
    .replaceAll('{{jobDescription}}', jobDescription)
    .replaceAll('{{duration}}', duration)
    .replaceAll('{{type}}', type);


    try{
        const openai = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY
        })
    
        const completion = await openai.chat.completions.create({
            model: "google/gemma-3n-e4b-it:free",
            messages: [
                { role: "user", content: FINAL_PROMPT }
            ],
        })

        return NextResponse.json(completion.choices[0].message);
    }catch(e){
        return NextResponse.json(e);
    }
}