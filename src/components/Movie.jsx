import React, { useEffect, useState } from 'react';
import '../style/movie.css';

function Movie() {
    const [movieList, setMovieList] = useState([]);

    const fetchMovies = async () => {
        const res = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=4809c298151f2a5613663465a0b0fa88');
        const json = await res.json();
        setMovieList(json.results);
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <div>
            <h1 className='baslik'>Movie List</h1>
            <div className="cards">
                {movieList.length > 0 ? (
                    movieList.map(movie => (
                        <div key={movie.id} className="movie-card">
                            <img style={{ height: "500px", width: "400px" }} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                            <div className="card-text">
                                <div className='hidden'>
                                    <span>Detaylar</span> <span>İzle</span>
                                </div>
                                <h2>{movie.title}</h2>
                                <div className="movie-details">
                                    <span className="detail">IMDB: {movie.vote_average}</span>
                                </div>
                            </div>
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
