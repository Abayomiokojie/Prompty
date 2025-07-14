// app/api/health/route.js
import { connectToDB } from "@utils/database";

export const dynamic = 'force-dynamic';

export const GET = async () => {
    try {
        await connectToDB();
        return new Response(JSON.stringify({
            status: 'healthy',
            timestamp: new Date().toISOString()
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({
            status: 'unhealthy',
            error: error.message
        }), {
            status: 503,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};