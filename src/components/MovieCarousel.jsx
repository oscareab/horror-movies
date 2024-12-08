import React from 'react';
import PosterCard from './PosterCard';

function MovieCarousel({ movies }) {
    return (
        <div className="carousel rounded-box h-full w-full">
            {movies.map((movie, id) => (
                <div className="carousel-item m-3 h-full w-64" key={id}>
                    <PosterCard
                        key={movie.movie_id}
                        title={movie.title}
                        posterUrl={movie.poster_path}
                        id={movie.movie_id}
                    />
                </div>
            ))}
        </div>
    );
}


export default MovieCarousel;