export default function Navbar({ onUpload }) {
    return (
        <div>
            <h2>Meme Page</h2>
            <button onClick={onUpload}>Upload Meme</button>
        </div>
    );
}