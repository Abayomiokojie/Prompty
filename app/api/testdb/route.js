// app/api/test-db/route.js
import connectToDB from "@utils/database";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
    console.log('Test route called at:', new Date().toISOString());

    const startTime = Date.now();

    try {
        await connectToDB();
        const connectionTime = Date.now() - startTime;

        return Response.json({
            success: true,
            connectionTime,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        return Response.json({
            success: false,
            error: error.message,
            connectionTime: Date.now() - startTime
        }, { status: 500 });
    }
}