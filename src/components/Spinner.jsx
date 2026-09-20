export default function Spinner() {
    return (
        <div className="loading-screen" role="status" aria-label="Loading Pokemon">
            <div className="loading-ball"><span /></div>
            <p>Loading the index...</p>
        </div>
    );
}
