// import Prompt from "@models/prompt";
// import { connectToDB } from "@utils/database";

// export const dynamic = 'force-dynamic';
// export const runtime = 'nodejs'; // Ensure Node.js runtime, not Edge

// export const GET = async (request) => {
//     try {
//         await connectToDB()

//         const prompts = await Prompt.find({}).populate('creator')

//         return new Response(JSON.stringify(prompts), { status: 200 })

//     } catch (error) {
//         console.error('Error fetching prompts:', error);
//         return new Response("Failed to fetch all prompts", { status: 500 })
//     }
// }

// app/api/prompt/route.js
import Prompt from "@models/prompt";
import connectToDB from "@utils/database";

// CRITICAL: These exports prevent Next.js from statically optimizing this route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; // Ensure Node.js runtime, not Edge

export async function GET(request) {
    try {
        await connectToDB();

        const prompts = await Prompt.find({})
            .populate('creator')
            .sort({ createdAt: -1 })
            .lean() // Use lean() for better performance
            .exec();

        return Response.json(prompts);
    } catch (error) {
        console.error('Database Error:', error);
        return Response.json(
            { error: 'Failed to fetch prompts' },
            { status: 500 }
        );
    }
}