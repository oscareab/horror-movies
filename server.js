import express from 'express'
import cors from 'cors'
import { DBConnector } from './DBConnector.js'

const app = express();
const PORT = 8000;
const db = new DBConnector();

app.use(express.json()); 
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile('/Users/oscaravila/Documents/school/_fall 2024/cse385/_project/dist/index.html');
});
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from the movies endpoint!' });
});

app.get('/api/addGenre', (req, res) => {
    db.addGenre(req, res);
});

app.get('/api/getGenreID', (req, res) => {
    db.getGenreID(req, res);
});

app.get('/api/addKeyword', (req, res) => {
    db.addKeyword(req, res);
});

app.get('/api/getKeywordID', (req, res) => {
    db.getKeywordID(req, res);
});

app.get('/api/addProductionCompany', (req, res) => {
    db.addProductionCompany(req, res);
});

app.get('/api/getProductionCompanyID', (req, res) => {
    db.getProductionCompanyID(req, res);
});

app.get('/api/addMovie', (req, res) => {
    db.addMovie(req, res);
});

app.get('/api/joinMovieGenre', (req, res) => {
    db.joinMovieGenre(req, res);
});

app.get('/api/joinMovieKeyword', (req, res) => {
    db.joinMovieKeyword(req, res);
});

app.get('/api/joinMovieProductionCompany', (req, res) => {
    db.joinMovieProductionCompany(req, res);
});

app.get('/api/getFeaturedMovies', (req, res) => {
    db.getFeaturedMovies(req, res);
});

app.get('/api/getNewMovies', (req, res) => {
    db.getNewMovies(req, res);
});

app.get('/api/getVintageMovies', (req, res) => {
    db.getVintageMovies(req, res);
});

app.get('/api/getMovie', (req, res) => {
    db.getMovie(req, res);
});

app.get('/api/getMovieGenres', (req, res) => {
    db.getMovieGenres(req, res);
});

app.get('/api/getMovieKeywords', (req, res) => {
    db.getMovieKeywords(req, res);
});

app.get('/api/searchMovies', (req, res) => {
    db.searchMovies(req, res);
});

app.get('/api/getSortedMovies', (req, res) => {
    db.getSortedMovies(req, res);
});

app.get('/api/getTopGrossingMovies', (req, res) => {
    db.getTopGrossingMovies(req, res);
});

app.get('/api/getTopGrossingProductionCompanies', (req, res) => {
    db.getTopGrossingProductionCompanies(req, res);
});

app.get('/api/getRevenueByDecade', (req, res) => {
    db.getRevenueByDecade(req, res);
});

app.get('/api/getPopularGenres', (req, res) => {
    db.getPopularGenres(req, res);
});

app.get('/api/getMoviesByDecade', (req, res) => {
    db.getMoviesByDecade(req, res);
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
