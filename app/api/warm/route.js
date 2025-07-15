// app/api/warm/route.js
import connectToDB from "@utils/database";

export async function GET() {
    try {
        await connectToDB();
        return Response.json({ status: 'warm' });
    } catch (error) {
        return Response.json({ error: 'Failed to warm' }, { status: 500 });
    }
}