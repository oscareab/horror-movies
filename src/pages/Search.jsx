import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import NavBar from '../components/NavBar';
import PosterCard from '../components/PosterCard';

function Search() {
    const { query } = useParams();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchSearch = async () => {
            try {
                const apiUrl = `https://${import.meta.env.VITE_API_URL}/searchMovies?query=${query}`;

                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }

                const data = await response.json();
                setMovies(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchSearch();
    }, [query]);
    return (
        <>
            <NavBar />
            <div className="container h-[70vh] w-screen mx-auto">
                <div className="bg-primary rounded m-2 text-center">
                    <p className='text-3xl p- m-6 text-black'>Search results for "{query}"</p>
                </div>

                <div className="grid grid-cols-6 gap-4 justify-between">
                    {movies.map((movie) => (
                        <PosterCard
                            key={movie.id}
                            posterUrl={movie.poster_path}
                            title={movie.title}
                            id={movie.movie_id} />
                    ))}
                </div>

            </div>
        </>
    );
}

export default Search;