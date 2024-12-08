import React, { useState, useEffect } from 'react';
import Navbar from '../components/NavBar.jsx'
import MovieCarousel from '../components/MovieCarousel.jsx';

function Home() {
    const [featuredMovies, setFeaturedMovies] = useState([]);
    const [newMovies, setNewMovies] = useState([]);
    const [vintageMovies, setVintageMovies] = useState([]);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const apiUrl = `https://${import.meta.env.VITE_API_URL}/getFeaturedMovies`;

                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }

                const data = await response.json();
                setFeaturedMovies(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        const fetchNew = async () => {
            try {
                const apiUrl = `https://${import.meta.env.VITE_API_URL}/getNewMovies`;

                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }

                const data = await response.json();
                setNewMovies(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        const fetchVintage = async () => {
            try {
                const apiUrl = `https://${import.meta.env.VITE_API_URL}/getVintageMovies`;

                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }

                const data = await response.json();
                setVintageMovies(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchFeatured();
        fetchNew();
        fetchVintage();
    }, []);

    return (
        <>
            <Navbar />

            <div className="container w-screen mx-auto">
                <div className="bg-primary rounded">
                    <p className='text-xl mx-6 text-black'>Featured</p>
                </div>
                <div className="h-3/4 w-full">
                    <MovieCarousel movies={featuredMovies} />
                </div>

                <div className="bg-primary rounded">
                    <p className='text-xl mx-6 text-black'>New</p>
                </div>
                <div className="h-3/4 w-full">
                    <MovieCarousel movies={newMovies} />
                </div>

                <div className="bg-primary rounded">
                    <p className='text-xl mx-6 text-black'>Vintage</p>
                </div>
                <div className="h-3/4 w-full">
                    <MovieCarousel movies={vintageMovies} />
                </div>
            </div>
        </>
    )
}

export default Home;