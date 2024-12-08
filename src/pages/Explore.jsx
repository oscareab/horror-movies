import { useState, useEffect } from "react";

import Navbar from "../components/NavBar";
import PosterCard from "../components/PosterCard";

function Explore() {
    const [movies, setMovies] = useState([]);
    const [sort, setSort] = useState('release_date');
    const [order, setOrder] = useState('desc');
    const [page, setPage] = useState(0);

    useEffect(() => {
        const sortSelect = document.getElementById('sortSelect');
        const orderSelect = document.getElementById('orderSelect');

        sortSelect.addEventListener('change', (e) => {
            setSort(e.target.value);
        });

        orderSelect.addEventListener('change', (e) => {
            setOrder(e.target.value);
        });

        const fetchMovies = async () => {
            try {
                const apiUrl = `https://${import.meta.env.VITE_API_URL}/getSortedMovies?sortBy=${sort}&order=${order}&page=${page}`;

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

        fetchMovies();
    }, [sort, order, page]);

    const nextPage = () => {
        setPage(page + 1);

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const previousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            <Navbar />
            <div className="container w-screen h-[70vh] mx-auto">
                <div className="bg-primary rounded ">
                    <p className='text-xl mx-6 text-black'>Explore</p>
                </div>

                <div className="flex justify-end">
                    <div className="m-2">
                        <label htmlFor="sortSelect">Sort by</label>
                        <select className="select" id="sortSelect" defaultValue="release_date">
                            <option value="title">Title</option>
                            <option value="vote_average">Vote Average</option>
                            <option value="vote_count">Vote Count</option>
                            <option value="release_date">Release Date</option>
                            <option value="revenue">Revenue</option>
                            <option value="runtime">Runtime</option>
                            <option value="budget">Budget</option>
                        </select>
                    </div>

                    <div className="m-2">
                        <label htmlFor="orderSelect">Order</label>
                        <select className="select" id="orderSelect" defaultValue="desc">
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
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

                <div className="flex justify-center">
                    <button
                        className="m-2 p-2 bg-primary rounded text-white"
                        onClick={() => {
                            previousPage();
                        }}
                    >
                        &larr;
                    </button>
                    <button
                        className="m-2 p-2 bg-primary rounded text-white"
                        onClick={() => {
                            nextPage();
                        }}
                    >
                        &rarr;
                    </button>
                </div>
            </div>
        </>
    )
}

export default Explore;