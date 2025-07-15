// import Prompt from "@models/prompt";
// import { connectToDB } from "@utils/database";

// export const dynamic = 'force-dynamic';

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

import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';
export const revalidate = 0;


export const GET = async (request) => {
    try {
        await connectToDB()

        const prompts = await Prompt.find({}).populate('creator')

        // Force fresh response headers
        return new Response(JSON.stringify(prompts), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
                'Surrogate-Control': 'no-store',
            },
        });

    } catch (error) {
        console.error('Error fetching prompts:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to fetch prompts' }),
            { status: 500 }
        );
    }
}

