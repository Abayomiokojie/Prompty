
import '@styles/globals.css'
import Nav from "@components/Nav"
import Provider from "@components/Provider"
import { Analytics } from "@vercel/analytics/next"

export const metadata = {
    title: "Prompty",
    description: " Discover & Share AI prompts with the world.",
};

export const dynamic = 'force-dynamic'

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <Analytics />
                <Provider>
                    <div className="main">
                        <div className="gradient" />
                    </div>
                    <main className="app">
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>

        </html>

    )
}

export default RootLayout;
