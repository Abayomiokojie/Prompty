import Feed from '@components/Feed'

export const dynamic = 'force-dynamic'
export const revalidate = 0;

// Pre-warm the database connection at the page level
async function warmConnection() {
    try {
        await fetch(`${process.env.NEXT_PUBLIC_URL || ''}/api/prompt`, {
            cache: 'no-store'
        });
    } catch (e) {
        console.error('Pre-warm failed:', e);
    }
}

const Home = () => {
    warmConnection();
    return (
        <section className="w-full flex-col flex flex-center">
            <h1 className="head_text text-center">
                Discover & Share
                <br className="max-md:hidden" />
                <span className="purple_gradient text-center"> AI-Powered Prompts</span>
            </h1>
            <p className="desc text-center">
                Prompty is an open-source project that aims to help you create and share your own AI-powered prompts.
            </p>

            <Feed />
        </section>
    )
}

export default Home
