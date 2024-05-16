import React, { useEffect, useState } from 'react';
import '../style/movie.css';
import Alert from 'sweetalert2';

function Movie() {
    const [movieList, setMovieList] = useState([]);
    const [inputValue, setInputValue] = useState('');

    // SweetAlert ile alert daha güzel bir şekilde yapıldı.
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

    // API'den filmlerin getirilmesi ve key'e göre arama yapılıyor.
    const fetchMovies = async (key = '') => {
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=4809c298151f2a5613663465a0b0fa88&query=${key}`);
        const json = await res.json();
        setMovieList(json.results);
    };

    // Sayfa yüklendiğinde boşken filmleri getirmesi için.
    useEffect(() => {
        const fetchStartMovies = async () => {
            const res = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=4809c298151f2a5613663465a0b0fa88');
            const json = await res.json();
            setMovieList(json.results);
        };
        fetchStartMovies();
    }, []);

    // Inputa girilen değeri alıp fetchMovies fonksiyonuna parametre olarak atayarak arama yapılan filmleri getirir.
    const handleInputChange = (e) => {
        const searchValue = e.target.value;
        setInputValue(searchValue);
        fetchMovies(searchValue);
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
                {movieList.length > 0 && (
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
                )}
            </div>
        </div>
    );
}

export default Movie;
