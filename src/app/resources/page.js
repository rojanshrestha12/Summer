'use client';
import { useState, useEffect } from "react";

export default function Page() {
    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [tag, setTag] = useState("");
    const [searchingByTag, setSearchingByTag] = useState(false);

    const fetchQuote = async (tagValue = "") => {
        setLoading(true);
        setError("");
        setQuote(null);
        setSearchingByTag(!!tagValue.trim());

        let url = "https://quoteslate.vercel.app/api/quotes/random";
        if (tagValue.trim()) {
            url = `https://quoteslate.vercel.app/api/quotes/random?tags=${encodeURIComponent(tagValue.trim())}`;
        }

        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error("Network response was not ok");

            const data = await res.json();

            // The API always returns a single object (not an array)
            if (data && data.quote && data.author) {
                setQuote(data);
            } else {
                setError(tagValue ? "No quote found for this tag." : "No quote found.");
            }
        } catch (err) {
            setError("Failed to fetch quote.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuote();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold mb-4">Quote of the Day</h1>
            <div className="bg-white rounded-lg shadow p-8 max-w-xl w-full text-center">
                <div className="mb-6">
                    <button
                        onClick={() => fetchQuote()}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        disabled={loading}
                        aria-label="Fetch random quote"
                    >
                        {loading && !searchingByTag ? "Loading..." : "Get New Quote"}
                    </button>
                </div>

                <div className="mb-6 flex flex-col sm:flex-row gap-2 justify-center items-center">
                    <input
                        type="text"
                        value={tag}
                        onChange={e => setTag(e.target.value)}
                        placeholder="Enter tag (e.g. love, technology)"
                        className="border rounded px-3 py-2 w-60"
                        disabled={loading}
                        aria-label="Tag input"
                    />
                    <button
                        onClick={() => fetchQuote(tag)}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        disabled={loading || !tag.trim()}
                        aria-label="Search by tag"
                    >
                        {loading && searchingByTag ? "Searching..." : "Search by Tag"}
                    </button>
                </div>

                {error && <div className="text-red-600 mb-4">{error}</div>}

                {quote && (
                    <div className="text-lg text-gray-800">
                        <p className="mb-2">{quote.quote}</p>
                        <p className="text-gray-600">- {quote.author || "Unknown"}</p>
                    </div>
                )}

                {!quote && !loading && !error && (
                    <div className="text-gray-500">No quote to display.</div>
                )}
            </div>
        </div>
    );
}
