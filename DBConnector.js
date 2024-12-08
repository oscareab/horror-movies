import mysql from 'mysql2'

export class DBConnector {
    constructor() {
        this.db = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'supersandy',
            database: 'movies'
        });

        this.db.connect((err) => {
            if (err) throw err;
            console.log('Connected to MySQL database');
        });
    }

    getGenreID(req, res) {
        const name = req.query.name;

        if (!name) {
            res.status(400).json({ error: 'Missing name parameter' });
            return;
        }

        this.db.query('SELECT genre_id FROM Genre WHERE name = ?', [name], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Database query error' });
            } else {
                if (results.length == 0) {
                    res.status(404).json({ error: 'Genre not found' });
                } else {
                    res.json(results);
                }
            }
        });
    }

    addGenre(req, res) {
        const name = req.query.name;

        if (!name) {
            res.status(400).json({ error: 'Missing name parameter' });
            return;
        }

        this.db.query('INSERT INTO Genre (name) VALUES (?)', [name], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Database query error' });
            } else {
                res.json({ message: `Genre ${name} added successfully` });
            }
        });
    }

    addKeyword(req, res) {
        const keyword = req.query.keyword;

        if (!keyword) {
            res.status(400).json({ error: 'Missing keyword parameter' });
            return;
        }

        this.db.query('INSERT INTO Keyword (keyword) VALUES (?)', [keyword], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Database query error' });
            } else {
                res.json({ message: `Keyword ${keyword} added successfully` });
            }
        });
    }

    getKeywordID(req, res) {
        const keyword = req.query.keyword;

        if (!keyword) {
            res.status(400).json({ error: 'Missing keyword parameter' });
            return;
        }

        this.db.query('SELECT keyword_id FROM Keyword WHERE keyword = ?', [keyword], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Database query error' });
            } else {
                if (results.length == 0) {
                    res.status(404).json({ error: 'Keyword not found' });
                } else {
                    res.json(results);
                }
            }
        });
    }

    addProductionCompany(req, res) {
        const name = req.query.name;

        if (!name) {
            res.status(400).json({ error: 'Missing name parameter' });
            return;
        }

        this.db.query('INSERT INTO Production_Company (name) VALUES (?)', [name], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Database query error' });
            } else {
                res.json({ message: `Production company ${name} added successfully` });
            }
        });
    }

    getProductionCompanyID(req, res) {
        const name = req.query.name;

        if (!name) {
            res.status(400).json({ error: 'Missing name parameter' });
            return;
        }

        this.db.query('SELECT production_company_id FROM Production_Company WHERE name = ?', [name], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Database query error' });
            } else {
                if (results.length == 0) {
                    res.status(404).json({ error: 'Production company not found' });
                } else {
                    res.json(results);
                }
            }
        });
    }

    addMovie(req, res) {
        const id = req.query.id;
        const title = req.query.title;
        const vote_average = req.query.vote_average;
        const vote_count = req.query.vote_count;
        const released_status = req.query.released_status;
        const release_date = req.query.release_date;
        const revenue = req.query.revenue;
        const runtime = req.query.runtime;
        const budget = req.query.budget;
        const original_language = req.query.original_language;
        const overview = req.query.overview;
        const popularity = req.query.popularity;
        const poster_path = req.query.poster_path;

        if (!id || !title || !vote_average || !vote_count || !released_status || !release_date || !revenue || !runtime || !budget || !original_language || !overview || !popularity || !poster_path) {
            res.status(400).json({ error: 'Missing parameter' });
            return;
        }

        this.db.query(
            'INSERT INTO Movie (movie_id, title, vote_average, vote_count, released_status, release_date, revenue, runtime, budget, original_language, overview, popularity, poster_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [id, title, vote_average, vote_count, released_status, release_date, revenue, runtime, budget, original_language, overview, popularity, poster_path],
            (err, results) => {
                if (err) {
                    console.error('Error executing query:', err);
                    res.status(500).json({ error: 'Database query error' });
                } else {
                    res.json({ message: `Movie ${title} added successfully` });
                }
            }
        );
    }

    joinMovieGenre(req, res) {
        const movie_id = req.query.movie_id;
        const genre_id = req.query.genre_id;

        if (!movie_id || !genre_id) {
            res.status(400).json({ error: 'Missing parameter' });
            return;
        }

        this.db.query(
            'INSERT INTO Movie_Genres (movie_id, genre_id) VALUES (?, ?)',
            [movie_id, genre_id],
            (err, results) => {
                if (err) {
                    console.error('Error executing query:', err);
                    res.status(500).json({ error: 'Database query error' });
                } else {
                    res.json({ message: `Movie ${movie_id} joined with genre ${genre_id} successfully` });
                }
            }
        );
    }

    joinMovieKeyword(req, res) {
        const movie_id = req.query.movie_id;
        const keyword_id = req.query.keyword_id;

        if (!movie_id || !keyword_id) {
            res.status(400).json({ error: 'Missing parameter' });
            return;
        }

        this.db.query(
            'INSERT INTO Movie_Keywords (movie_id, keyword_id) VALUES (?, ?)',
            [movie_id, keyword_id],
            (err, results) => {
                if (err) {
                    console.error('Error executing query:', err);
                    res.status(500).json({ error: 'Database query error' });
                } else {
                    res.json({ message: `Movie ${movie_id} joined with keyword ${keyword_id} successfully` });
                }
            }
        );
    }

    joinMovieProductionCompany(req, res) {
        const movie_id = req.query.movie_id;
        const production_company_id = req.query.production_company_id;

        if (!movie_id || !production_company_id) {
            res.status(400).json({ error: 'Missing parameter' });
            return;
        }

        this.db.query(
            'INSERT INTO Movie_Production_companies (movie_id, production_company_id) VALUES (?, ?)',
            [movie_id, production_company_id],
            (err, results) => {
                if (err) {
                    console.error('Error executing query:', err);
                    res.status(500).json({ error: 'Database query error' });
                } else {
                    res.json({ message: `Movie ${movie_id} joined with production company ${production_company_id} successfully` });
                }
            }
        );
    }

    getFeaturedMovies(req, res) {
        this.db.query('select * from movie where vote_count > 1000 order by vote_average desc limit 30', (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Database query error' });
            } else {
                res.json(results);
            }
        });
    }

    getNewMovies(req, res) {
        this.db.query('select * from movie where released_status = "released" and vote_count > 50 order by release_date desc limit 30', (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Database query error' });
            } else {
                res.json(results);
            }
        });
    }

    getVintageMovies(req, res) {
        this.db.query("select * from movie where release_date < '1970-1-1' and vote_count > 100 order by vote_average desc limit 30", (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Database query error' });
            } else {
                res.json(results);
            }
        });
    }

    getMovie(req, res) {
        const id = req.query.id;

        if (!id) {
            res.status(400).json({ error: 'Missing id parameter' });
            return;
        }

        this.db.query('select * from movie where movie_id = ?', [id], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Database query error' });
            } else {
                if (results.length == 0) {
                    res.status(404).json({ error: 'Movie not found' });
                } else {
                    res.json(results);
                }
            }
        });
    }

    getMovieGenres(req, res) {
        const id = req.query.id;

        if (!id) {
            res.status(400).json({ error: 'Missing id parameter' });
            return;
        }

        const query = `
            SELECT genre.genre_id, genre.name
            FROM genre
            JOIN movie_genres ON genre.genre_id = movie_genres.genre_id
            WHERE movie_genres.movie_id = ?
        `;

        this.db.query(query, [id], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Database query error' });
            } else {
                if (results.length == 0) {
                    res.status(404).json({ error: 'No genres found for this movie' });
                } else {
                    res.json(results);
                }
            }
        });
    }

    getMovieKeywords(req, res) {
        const id = req.query.id;

        if (!id) {
            res.status(400).json({ error: 'Missing id parameter' });
            return;
        }

        const query = `
            SELECT keyword.keyword_id, keyword.keyword
            FROM keyword
            JOIN movie_keywords ON keyword.keyword_id = movie_keywords.keyword_id
            WHERE movie_keywords.movie_id = ?
        `;

        this.db.query(query, [id], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Database query error' });
            } else {
                if (results.length == 0) {
                    res.status(404).json({ error: 'No genres found for this movie' });
                } else {
                    res.json(results);
                }
            }
        });
    }

    searchMovies(req, res) {
        const query = req.query.query;

        if (!query) {
            res.status(400).json({ error: 'Missing query parameter' });
            return;
        }

        this.db.query('select * from movie where title like ? and popularity > 5 order by popularity desc', [`${query}%`], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Database query error' });
            } else {
                if (results.length == 0) {
                    res.status(404).json({ error: 'Movie not found' });
                } else {
                    res.json(results);
                }
            }
        });
    }

    getSortedMovies(req, res) {
        const sortBy = req.query.sortBy;
        const order = req.query.order;
        const page = req.query.page;

        if (!sortBy || !order || !page) {
            res.status(400).json({ error: 'Missing parameter' });
            return;
        }

        let query = `select title, poster_path, movie_id from movie where original_language = "en" and popularity > 5 order by ${sortBy} ${order} limit 30 offset ${page * 30}`;

        this.db.query(query, (err, results) => {

            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Database query error' });
            } else {
                if (results.length == 0) {
                    res.status(404).json({ error: 'No results' });
                } else {
                    res.json(results);
                }
            }
        });
    }

    getTopGrossingMovies(req, res) {
        this.db.query('select * from movie where vote_count > 1000 order by revenue desc limit 5', (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Database query error' });
            } else {
                res.json(results);
            }
        });
    }

    getTopGrossingProductionCompanies(req, res) {
        let query =
            `SELECT 
                pc.name AS production_company_name, 
                SUM(m.revenue) AS revenue
            FROM 
                production_company pc
            JOIN 
                movie_production_companies mpc ON pc.production_company_id = mpc.production_company_id
            JOIN 
                movie m ON mpc.movie_id = m.movie_id
            GROUP BY 
                pc.name
            ORDER BY 
                revenue DESC
            LIMIT 5;
        `;

        this.db.query(query, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Database query error' });
            } else {
                res.json(results);
            }
        });
    }

    getRevenueByDecade(req, res) {
        let query =
            `SELECT 
                FLOOR(YEAR(release_date) / 10) * 10 AS decade,
                SUM(revenue) AS revenue
            FROM 
                movie
            WHERE 
                revenue > 0
            GROUP BY 
                decade
            ORDER BY 
                decade;
        `;

        this.db.query(query, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Database query error' });
            } else {
                res.json(results);
            }
        });
    }

    getPopularGenres(req, res) {
        let query = `
            SELECT 
                g.name, 
                COUNT(mg.movie_id) AS genre_count
            FROM 
                genre g
            JOIN 
                movie_genres mg ON g.genre_id = mg.genre_id
            JOIN 
                movie m ON mg.movie_id = m.movie_id
            WHERE 
                g.name != 'Horror'
            GROUP BY 
                g.name
            ORDER BY 
                genre_count DESC
            LIMIT 5;
        `;

        this.db.query(query, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Database query error' });
            } else {
                res.json(results);
            }
        });
    }

    getMoviesByDecade(req, res) {
        let query =
            `SELECT 
                FLOOR(YEAR(release_date) / 10) * 10 AS decade,
                COUNT(title) AS movie_count
            FROM 
                movie
            GROUP BY 
                decade
            ORDER BY 
                decade;
        `;

        this.db.query(query, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).json({ error: 'Database query error' });
            } else {
                res.json(results);
            }
        });
    }
}
