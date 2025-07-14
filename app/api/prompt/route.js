import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const dynamic = 'force-dynamic';

export const revalidate = 0; // Disable caching completely
export const fetchCache = 'force-no-store';
export const GET = async (request) => {
    try {
        await connectToDB()

        const prompts = await Prompt.find({}).populate('creator')

        // return new Response(JSON.stringify(prompts), { status: 200 })
        return new Response(JSON.stringify(prompts), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                // 'Cache-Control': 'no-cache, no-store, must-revalidate',
            }
        });
    } catch (error) {
        console.error('Error fetching prompts:', error);
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}

// Find and populate all prompts