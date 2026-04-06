import { useState, useEffect } from "react";
import axios from "axios";

export default function Home(){
  const [memes, setMemes] = useState([]);
  useEffect(() => {
    async function fetchMemes(){
      const res = await axios.get("http://localhost:5000/api/memes")
      setMemes(res.data);
    }

    fetchMemes();
  }, []);
  return (
    <div>
      <h1>Meme Page</h1>

      {memes.map((meme) => (
        <div key={meme._id}>
          <img src = {meme.imageUrl} alt="meme" width="300" />
          <p>{meme.caption}</p>
          <p>{meme.username}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

