import React, { useEffect, useState } from 'react';
import '../style/movie.css';
import Alert from 'sweetalert2';

function Movie() {
    const [movieList, setMovieList] = useState([]);
    const [inputValue, setInputValue] = useState('');

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

    const fetchMovies = async (query = '') => {
        try {
            console.log(`Fetching movies with query: ${query}`);
            const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=4809c298151f2a5613663465a0b0fa88&query=${query}`);
            const json = await res.json();
            console.log('Movies fetched:', json.results);
            setMovieList(json.results);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    useEffect(() => {
        fetchMovies(); // Fetch all movies when the component mounts
    }, []);

    const handleInputChange = (e) => {
        const query = e.target.value;
        setInputValue(query);
        console.log('Input value changed:', query);
        fetchMovies(query); // Fetch movies based on user input
    };

    return (
        <div>
            <div className="containerForm">
                <h1 className='baslik'>Movie Lists</h1>
                <form className='form'>
                    <input
                        className='input'
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder='Ne aramak istemiştiniz?'
                    />
                    <button className='searchTrailer' type="button">Ara</button>
                </form>
            </div>

            <div className="cards">
                {movieList && movieList.length > 0 ? (
                    movieList.map(movie => (
                        <div key={movie.id}>
                            <div className="movie-card">
                                <a href="#" onClick={() => showAlert(movie)} >
                                    <img
                                        style={{ height: "400px", width: "300px" }}
                                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                        alt={movie.title}
                                    />
                                </a>
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
                ) : inputValue ? (
                    <p>No results found for "{inputValue}"</p>
                ) : (
                    null
                )}
            </div>
        </div>
    );
}

export default Movie;
