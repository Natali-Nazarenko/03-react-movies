import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';

import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import { fetchMovies } from '../../services/movieService';

import css from '../Loader/Loader.module.css';
import style from '../ErrorMessage/ErrorMessage.module.css';

import type { Movie } from '../types/movie';

const notify = () => toast.error('No movies found for your request.');

function App() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const handleRequest = async (request: string) => {
        try {
            setIsLoading(true);
            setIsError(false);
            setMovies([]);

            const arrMovies = await fetchMovies(request);

            if (arrMovies.length === 0) {
                notify();
                return;
            }
            setMovies(arrMovies);
        } catch {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const openModal = (movie: Movie) => {
        setSelectedMovie(movie);
    };
    const closeModal = () => setSelectedMovie(null);

    return (
        <>
            <SearchBar onSubmit={handleRequest} />
            {isLoading && <p className={css.text}>Loading movies, please wait...</p>}
            {isError && <p className={style.text}>There was an error, please try again...</p>}
            <MovieGrid onSelect={openModal} movies={movies} />
            {selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal} />}
            <Toaster />
            {}
        </>
    );
}

export default App;
