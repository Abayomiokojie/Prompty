import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const dynamic = 'force-dynamic';

export const GET = async (request) => {
    try {
        await connectToDB()

        const prompts = await Prompt.find({}).populate('creator')

        return new Response(JSON.stringify(prompts), { status: 200 })

    } catch (error) {
        console.error('Error fetching prompts:', error);
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}


