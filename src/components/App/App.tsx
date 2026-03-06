import SearchBar from '../SearchBar/SearchBar';

function App() {
    const handleRequest = (data: string) => {
        console.log('App: ', data);
    };
    return (
        <>
            <SearchBar onSubmit={handleRequest} />
        </>
    );
}

export default App;
