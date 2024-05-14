import React, { useEffect, useState } from 'react';
import '../style/movie.css'

function Movie() {
    const [movieList, setMovieList] = useState([]);

    const fetchMovies = async () => {
        try {
            const res = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=4809c298151f2a5613663465a0b0fa88');
            const json = await res.json();

            if (!res.ok) {
                throw new Error('Failed to fetch movie data');
            }

            setMovieList(json.results);
        } catch (error) {
            console.error('Error fetching movie data:', error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <div>
            <h1>Movie List</h1>
            <div className="movie-container">
                {movieList.length > 0 ? (
                    movieList.map(movie => (
                        <div key={movie.id} className="movie-card">
                            <h2>{movie.title}</h2>
                            {movie.poster_path ? (
                                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                            ) : (
                                <p>No poster available</p>
                            )}
                        </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default Movie;
