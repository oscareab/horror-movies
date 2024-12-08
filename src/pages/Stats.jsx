import Navbar from "../components/NavBar";
import TopGrossingMovies from "../components/TopGrossingMovies";
import TopGrossingProductionCompanies from "../components/TopGrossingProductionCompanies";
import RevenueByDecade from "../components/RevenueByDecade";
import TopGenres from "../components/TopGenres";
import MoviesByDecade from "../components/MoviesByDecade";

function Stats() {

    return (
        <>
            <Navbar />
            <div className="container mx-auto">
                <div className="bg-primary rounded my-2">
                    <p className='text-xl mx-6 text-black'>Top Grossing Production Companies</p>
                </div>
                <TopGrossingProductionCompanies />

                <div className="bg-primary rounded my-2">
                    <p className='text-xl mx-6 text-black'>Revenue by Decade</p>
                </div>
                <RevenueByDecade />

                <div className="bg-primary rounded my-2">
                    <p className='text-xl mx-6 text-black'>Movies per Decade</p>
                </div>
                <MoviesByDecade />

                <div className="bg-primary rounded">
                    <p className='text-xl mx-6 text-black'>Most Popular Subgenres</p>
                </div>
                <TopGenres />

                <div className="bg-primary rounded my-2">
                    <p className='text-xl mx-6 text-black'>Top Grossing Movies</p>
                </div>
                <TopGrossingMovies />
            </div>
        </>

    )
}

export default Stats;