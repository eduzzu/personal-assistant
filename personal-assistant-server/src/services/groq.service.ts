import { Injectable } from "@nestjs/common";
import Groq from "groq-sdk";

@Injectable()
export class GroqService{
    private groq: Groq;
    constructor(){
        if(!process.env.GROQ_API_KEY){
            throw new Error("GROQ_API_KEY is not defined in environment variables");
        }
        this.groq = new Groq({apiKey: process.env.GROQ_API_KEY});
    }

    async getAIResponse(messages: {role: "user" | "assistant" | "system", content: string}[]){
        const response = await this.groq.chat.completions.create({
         model: "llama-3.3-70b-versatile",
            messages: messages,
            temperature: 0.7,
            max_tokens: 1024,
    });
    return response.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
}
}

