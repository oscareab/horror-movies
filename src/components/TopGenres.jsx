import { useEffect, useState } from 'react';

function TopGenres() {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchTopGenres = async () => {
            try {
                const apiUrl = `https://${import.meta.env.VITE_API_URL}/getPopularGenres`;

                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }

                const data = await response.json();
                setGenres(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchTopGenres();
    }, []);

    return (
    <div className="flex justify-center">
        {genres.map((genre) => (
            <div key={genre.name} className="bg-secondary p-2 rounded-lg shadow-lg m-2">
                <p className="text-center text-xl">{genre.name}</p>
                <p className="text-center">{genre.genre_count} movies</p>
            </div>
        ))}
    </div>
    )
}

export default TopGenres;