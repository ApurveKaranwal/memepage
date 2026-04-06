import { useState } from "react";
import axios from "axios";

export default function UploadModal({ closeModal }) {
    const [caption, setCaption ] = useState("");
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("caption", caption);
        formData.append("image", image);

        await axios.post("http://localhost:5000/api/memes", formData);
        closeModal();
        window.location.reload();
    };

    return (
        <div>
            <h3>Upload Meme</h3>

            <form onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                />

            <br/>

            <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            />

            <br/>

            <button type="submit">Upload</button>
            <button type="button" onClick={closeModal}>Cancel</button>
            </form>
        </div>
    );
}