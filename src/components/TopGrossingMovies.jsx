import React, { useState, useEffect } from 'react';

import PosterCard from './PosterCard';

function TopGrossingMovies() {
    const [movies, setMovies] = useState([]);

    const formatRevenue = (revenue) => {
        return revenue.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        });
    };

    useEffect(() => {
        const fetchTopGrossing = async () => {
            try {
                const apiUrl = `https://${import.meta.env.VITE_API_URL}/getTopGrossingMovies`;

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

        fetchTopGrossing();
    }, []);
    return (
        <>
            <div className="flex">
                    {movies.map((movie) => (
                        <PosterCard
                            className="m-2"
                            key={movie.id}
                            posterUrl={movie.poster_path}
                            title={movie.title}
                            revenue={formatRevenue(movie.revenue)}
                            id={movie.movie_id} />
                    ))}
                </div>
        </>
    )
}

export default TopGrossingMovies;