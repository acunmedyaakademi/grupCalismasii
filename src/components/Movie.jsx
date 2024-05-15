import React, { useEffect, useState } from 'react';
import '../style/movie.css';
import Alert from 'sweetalert2';



function Movie() {
    const showAlert = (movie) => {
        Alert.fire({
            title: movie.title,
            text: movie.overview,
            imageUrl: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
            imageWidth: 400,
            imageHeight: 500,
            imageAlt: movie.title,
        });
    };

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
            <h1 className='baslik'>Movie Lists</h1>
            <div className="cards">
                {movieList.length > 0 ? (
                    movieList.map(movie => (
                        <div key={movie.id}>
                            <div className="movie-card">
                                <a href="#" onClick={() => showAlert(movie)} ><img style={{ height: "400px", width: "300px" }} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} /></a>
                                <div className="card-text">
                                    <div className='hidden'>
                                        <span>Detaylar</span> <span>İzle</span>
                                    </div>
                                    <h2>{movie.title}</h2>
                                    <div className="movie-details">
                                        <p className="detail">IMDB: {movie.vote_average}</p>
                                        <a className='trailer'>Trailer</a>
                                    </div>
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
