import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/NavBar";

function Movie() {
    const { id } = useParams();
    const [movie, setMovie] = useState([]);
    const [genres, setGenres] = useState([]);
    const [keywords, setKeywords] = useState([]);
    const imagePath = 'https://image.tmdb.org/t/p/w200';

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const apiUrl = `https://${import.meta.env.VITE_API_URL}/getMovie?id=${id}`;

                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }

                const data = await response.json();
                setMovie(data[0]);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        const fetchGenres = async () => {
            try {
                const apiUrl = `https//${import.meta.env.VITE_API_URL}/getMovieGenres?id=${id}`;

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

        const fetchKeywords = async () => {
            try {
                const apiUrl = `https://${import.meta.env.VITE_API_URL}/getMovieKeywords?id=${id}`;

                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }

                const data = await response.json();
                setKeywords(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovie();
        fetchKeywords();
        fetchGenres();
    }, [id]);

    function formatNumber(num) {
        if (!num) return 'N/A';
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    function formatDate(date) {
        if (!date) return 'N/A';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    }

    return (
        <>
            <Navbar />
            <div className="container w-screen h-[70vh] mx-auto">
                <div className="bg-primary rounded m-2">
                    <p className='text-3xl p- m-6 text-black'>{movie.title}</p>
                </div>
                <div className="grid grid-cols-2 h-full">
                    <div className="flex justify-center m-2">
                        <img className="object-cover" src={imagePath + movie.poster_path} alt={movie.title} />
                    </div>
                    <div>
                        <p className="text-white m-2">{movie.overview}</p>
                        <p className="text-white m-2">Release Date: {formatDate(movie.release_date)}</p>
                        <p className="text-white m-2">Rating: {movie.vote_average} ({movie.vote_count} ratings)</p>
                        <p className="text-white m-2">Runtime: {movie.runtime} minutes</p>
                        <p className="text-white m-2">Revenue: ${formatNumber(movie.revenue)}</p>
                        <p className="text-white m-2">Budget: ${formatNumber(movie.budget)}</p>


                        <div className="carousel rounded-box w-full overflow-x-auto flex space-x-4 p-2 scrollbar-hide">
                            {genres.map((genre) => (
                                <div
                                    key={genre.id}
                                    className="carousel-item flex-shrink-0 scroll-snap-align-center">
                                    <span className="bg-secondary rounded-full px-3 py-1 text-sm font-semibold text-white">
                                        {genre.name}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="carousel rounded-box w-full overflow-x-auto flex space-x-4 p-2 scrollbar-hide">
                            {keywords.map((keyword) => (
                                <div
                                    key={keyword.id}
                                    className="carousel-item flex-shrink-0 scroll-snap-align-center">
                                    <span className="bg-accent rounded-full px-3 py-1 text-sm font-semibold text-white">
                                        {keyword.keyword}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Movie;