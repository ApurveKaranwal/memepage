import { useState, useEffect } from "react";
import axios from "axios";
import api from "../services/api";
import MemeCard from "../components/MemeCard";
import UploadModal from "../components/UploadModal";
import Navbar from "../components/Navbar"
export default function Home(){
  const [memes, setMemes] = useState([]);
  const [showModal, setShowModal] = useState([]);

  useEffect(() => { 
    async function fetchMemes(){
      const res = await axios.get("http://localhost:5000/api/memes")
      setMemes(res.data);
    }

    fetchMemes();
  }, []);

  return (
    <div>
      <Navbar onUpload={() => setShowModal(true)} />
      {showModal && (
        <UploadModal closeModal={() => setShowModal(false)} />
      )}

      <h1>All Memes</h1>

      {memes.length === 0 ? (
        <p>No Memes found</p>
      ) : (
        memes.map((meme) => (
          <MemeCard key={meme._id} meme={meme} />
        ))
      )}
    </div>
  );
}

