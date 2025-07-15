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

    // Search states
    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await fetch(`/api/prompt?ts=${Date.now()}`);

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
            setError(null); // Clear any previous errors
        } catch (err) {
            console.error('Fetch error:', err);
            setError(err.message || "An error occurred while fetching prompts.");

            // Directly trigger reload after 5 seconds
            console.log('Error detected, will reload in 5 seconds...');
            setTimeout(() => {
                console.log('Reloading page now...');
                window.location.href = window.location.href; // Alternative reload method
            }, 5000);
        } finally {
            setIsLoading(false);
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
                    <div className="text-gray-600 text-sm animate-pulse">
                        Retrying...
                    </div>
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
