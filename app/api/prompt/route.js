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
// app/api/prompt/route.js
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const dynamic = 'force-dynamic';
export const maxDuration = 30; // Increase timeout to 30 seconds

export const GET = async (request) => {
    console.log('🟦 API /api/prompt called at:', new Date().toISOString());

    try {
        console.log('🟨 Attempting database connection...');
        await connectToDB();
        console.log('✅ Database connected successfully');

        console.log('🟨 Fetching prompts from database...');
        const prompts = await Prompt.find({}).populate('creator').lean();
        console.log('✅ Found', prompts.length, 'prompts');

        return new Response(JSON.stringify(prompts), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    } catch (error) {
        console.error('❌ Error in GET /api/prompt:', error);
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);

        return new Response(
            JSON.stringify({
                error: 'Failed to fetch prompts',
                details: error.message,
                timestamp: new Date().toISOString()
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