import { useState } from "react";
import { getPassage } from "../services/api.ts";
import type { BiblePassage } from "../types.ts";
import PassageResult from "./PassageResult.tsx";
function PassageSearch() {
    const [reference, setReference] = useState<string>("");
    const [passage, setPassage] = useState<BiblePassage | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    
    async function handleSearch() {
    const searchReference = reference.trim();
    


    if (searchReference === "") {
        setError("Please enter a Bible reference.");
        return;
    }

    setLoading(true);
    setError("");
    setPassage(null);

    try {
        const result = await getPassage(searchReference);
        setPassage(result);
    } catch (error) {
        console.error(error);
        setError("Unable to retrieve the passage.");
    } finally {
        setLoading(false);
    }
}

    return (
    <section className="search-card">
        <h2>Search Scripture</h2>
        <p className="search-description">
            Enter a Bible reference to begin exploring.
        </p>

        <form
    className="search-controls"
    onSubmit={(event) => {
        event.preventDefault();
        handleSearch();
    }}
>
    <input
        type="text"
        placeholder="John 3:16"
        value={reference}
        onChange={(event) => setReference(event.target.value)}
    />

    <button type="submit" disabled={loading}>
        {loading ? "Searching..." : "Search"}
    </button>
</form>

        {loading && <p>Retrieving Scripture...</p>}

        {!passage && !loading && !error && (
            <p className="search-placeholder">
                Enter a Bible reference above to begin reading.
            </p>
        )}

        {error && <p className="search-error">{error}</p>}

        {passage && (
            <PassageResult
                key={passage.reference}
                passage={passage}
             />
        )}
    </section>
);
}
export default PassageSearch;
