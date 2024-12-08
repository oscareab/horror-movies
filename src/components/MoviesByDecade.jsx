import { useEffect, useState } from 'react';

function MoviesByDecade() {
    const [decades, setDecades] = useState([]);

    useEffect(() => {
        const fetchMoviesByDecade = async () => {
            try {
                const apiUrl = `https://${import.meta.env.VITE_API_URL}/getMoviesByDecade`;

                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }

                const data = await response.json();
                setDecades(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMoviesByDecade();
    }, []);

    return (
        <div className="flex justify-center">
            <div className='carousel carousel-center'>
                {decades.map((decade) => (
                    <div key={decade.decade} className="bg-secondary p-2 rounded-lg shadow-lg m-2">
                        <p className="text-center text-xl">{decade.decade}</p>
                        <p className="text-center">{decade.movie_count} movies</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MoviesByDecade;