import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';

import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';

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
            {isLoading && <Loader />}
            {isError && <ErrorMessage />}
            <MovieGrid onSelect={openModal} movies={movies} />
            {selectedMovie && <MovieModal movie={selectedMovie} onClose={closeModal} />}
            <Toaster />
            {}
        </>
    );
}

export default App;
