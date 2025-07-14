"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";
import Loading from "@app/profile/[id]/loading";

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className='mt-16 prompt_layout'>
            {data.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    );
};

const Feed = () => {

    const [allPosts, setAllPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    // Search states
    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await fetch("/api/prompt");
            // const response = await fetch(`/api/prompt?t=${Date.now()}`, {
            //     cache: 'no-store',
            //     next: { revalidate: 0 } // Next.js 13+ specific
            // });
            if (!response.ok) {
                throw new Error(`Failed to fetch prompts: ${response.status}`);
            }
            const data = await response.json();

            // Handle empty or invalid data
            if (!data || !Array.isArray(data)) {
                setAllPosts([]);
                return;
            }

            setAllPosts(data);
        } catch (err) {
            console.error('Fetch error:', err);
            setError(err.message || "An error occurred while fetching prompts.");
        } finally {
            setIsLoading(false); // loading set to false after fetching data
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const filterPrompts = (searchtext) => {
        const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
        return allPosts.filter(
            (item) =>
                regex.test(item.creator.username) ||
                regex.test(item.tag) ||
                regex.test(item.prompt)
        );
    };

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        // debounce method
        setSearchTimeout(
            setTimeout(() => {
                const searchResult = filterPrompts(e.target.value);
                setSearchedResults(searchResult);
            }, 500)
        );
    };

    const handleTagClick = (tagName) => {
        setSearchText(tagName);

        const searchResult = filterPrompts(tagName);
        setSearchedResults(searchResult);
    };

    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input
                    type='text'
                    placeholder='Search for a tag, prompt or a username'
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className='search_input peer'
                />
            </form>

            {/* All Prompts */}
            {isLoading ? (
                <Loading />
            ) : error ? (
                <div className="text-center mt-8 mb-12">

                    <div className="text-red-500 text-center"> Oops! Something went wrong. Please refresh the page</div>
                    {/* <button
                            onClick={() => {
                                setIsLoading(true);
                                setError(null);
                                fetchPosts();
                            }}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Try Again
                        </button> */}
                </div>
            ) : searchText ? (
                <PromptCardList
                    data={searchedResults}
                    handleTagClick={handleTagClick}
                />
            ) : (
                <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
            )}
        </section>
    );
};

export default Feed;

// Feed.jsx
// "use client";

// import { useState, useEffect, useCallback } from "react";
// import PromptCard from "./PromptCard";
// import Loading from "@app/profile/[id]/loading";

// const PromptCardList = ({ data, handleTagClick }) => {
//     return (
//         <div className='mt-16 prompt_layout'>
//             {data.map((post) => (
//                 <PromptCard
//                     key={post._id}
//                     post={post}
//                     handleTagClick={handleTagClick}
//                 />
//             ))}
//         </div>
//     );
// };

// const Feed = () => {
//     const [allPosts, setAllPosts] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [retryCount, setRetryCount] = useState(0);
//     const maxRetries = 3;

//     // Search states
//     const [searchText, setSearchText] = useState("");
//     const [searchTimeout, setSearchTimeout] = useState(null);
//     const [searchedResults, setSearchedResults] = useState([]);

//     const fetchPosts = useCallback(async () => {
//         console.log(`🔄 Fetching posts... (Attempt ${retryCount + 1}/${maxRetries})`);

//         try {
//             const response = await fetch("/api/prompt", {
//                 cache: 'no-store',
//                 signal: AbortSignal.timeout(25000), // 25 second timeout
//             });

//             const responseText = await response.text();
//             console.log('Response status:', response.status);

//             if (!response.ok) {
//                 let errorMessage = `Server error: ${response.status}`;
//                 try {
//                     const errorData = JSON.parse(responseText);
//                     errorMessage = errorData.error || errorData.details || errorMessage;
//                 } catch (e) {
//                     console.error('Could not parse error response:', responseText);
//                 }
//                 throw new Error(errorMessage);
//             }

//             const data = JSON.parse(responseText);
//             console.log('✅ Successfully fetched', data.length, 'posts');

//             setAllPosts(data);
//             setError(null);
//             setRetryCount(0);
//             setIsLoading(false);
//         } catch (err) {
//             console.error('❌ Fetch error:', err.message);

//             // If we haven't exceeded max retries, try again
//             if (retryCount < maxRetries - 1) {
//                 const nextRetry = retryCount + 1;
//                 setRetryCount(nextRetry);

//                 // Exponential backoff: 1s, 2s, 4s
//                 const delay = Math.pow(2, retryCount) * 1000;
//                 console.log(`⏳ Retrying in ${delay / 1000} seconds...`);

//                 setTimeout(() => {
//                     fetchPosts();
//                 }, delay);
//             } else {
//                 // Max retries exceeded
//                 console.error('❌ Max retries exceeded');
//                 setError(`Unable to load prompts after ${maxRetries} attempts. ${err.message}`);
//                 setIsLoading(false);
//             }
//         }
//     }, [retryCount]);

//     useEffect(() => {
//         console.log('🚀 Feed component mounted');
//         fetchPosts();
//     }, []); // Only run on mount

//     // Manual retry function
//     const handleManualRetry = () => {
//         console.log('👆 Manual retry triggered');
//         setRetryCount(0);
//         setError(null);
//         setIsLoading(true);
//         fetchPosts();
//     };


//     const filterPrompts = (searchtext) => {
//         const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
//         return allPosts.filter(
//             (item) =>
//                 regex.test(item.creator.username) ||
//                 regex.test(item.tag) ||
//                 regex.test(item.prompt)
//         );
//     };

//     const handleSearchChange = (e) => {
//         clearTimeout(searchTimeout);
//         setSearchText(e.target.value);

//         // debounce method
//         setSearchTimeout(
//             setTimeout(() => {
//                 const searchResult = filterPrompts(e.target.value);
//                 setSearchedResults(searchResult);
//             }, 500)
//         );
//     };

//     const handleTagClick = (tagName) => {
//         setSearchText(tagName);

//         const searchResult = filterPrompts(tagName);
//         setSearchedResults(searchResult);
//     };


//     return (
//         <section className='feed'>
//             <form className='relative w-full flex-center'>
//                 <input
//                     type='text'
//                     placeholder='Search for a tag, prompt or a username'
//                     value={searchText}
//                     onChange={handleSearchChange}
//                     required
//                     className='search_input peer'
//                 />
//             </form>

//             {isLoading ? (
//                 <div className="mt-16 text-center">
//                     <Loading />
//                     {retryCount > 0 && (
//                         <p className="mt-4 text-gray-600">
//                             Attempting to connect... (Attempt {retryCount + 1}/{maxRetries})
//                         </p>
//                     )}
//                 </div>
//             ) : error ? (
//                 <div className="text-center mt-8">
//                     <div className="text-red-500 mb-4">{error}</div>
//                     <button
//                         onClick={handleManualRetry}
//                         className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
//                     >
//                         Try Again
//                     </button>
//                 </div>
//             ) : searchText ? (
//                 <PromptCardList
//                     data={searchedResults}
//                     handleTagClick={handleTagClick}
//                 />
//             ) : (
//                 <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
//             )}
//         </section>
//     );
// };