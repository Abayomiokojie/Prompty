// import Prompt from "@models/prompt";
// import { connectToDB } from "@utils/database";

// // export const dynamic = 'force-dynamic';

// // export const revalidate = 0; // Disable caching completely
// // export const fetchCache = 'force-no-store';
// export const GET = async (request) => {
//     try {
//         await connectToDB()

//         const prompts = await Prompt.find({}).populate('creator')

//         return new Response(JSON.stringify(prompts), { status: 200 })
//         // return new Response(JSON.stringify(prompts), {
//         //     status: 200,
//         //     headers: {
//         //         'Content-Type': 'application/json',
//         //         // 'Cache-Control': 'no-cache, no-store, must-revalidate',
//         //     }
//         // });
//     } catch (error) {
//         console.error('Error fetching prompts:', error);
//         return new Response("Failed to fetch all prompts", { status: 500 })
//     }
// }

// app/api/prompt/route.js
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const dynamic = 'force-dynamic';
export const maxDuration = 10;

export const GET = async (request) => {
    console.log('API route called - fetching all prompts');

    try {

        let retries = 3;
        let lastError;

        while (retries > 0) {
            try {
                await connectToDB();
                break; // Connection successful
            } catch (error) {
                lastError = error;
                retries--;
                if (retries > 0) {
                    console.log(`Connection failed, retrying... (${retries} attempts left)`);
                    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
                }
            }
        }

        if (retries === 0) {
            throw lastError;
        }

        const prompts = await Prompt.find({}).populate('creator').lean();

        return new Response(JSON.stringify(prompts), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    } catch (error) {
        console.error('Error in GET /api/prompt:', error);
        return new Response(
            JSON.stringify({
                error: 'Failed to fetch prompts',
                details: error.message
            }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
    }
}