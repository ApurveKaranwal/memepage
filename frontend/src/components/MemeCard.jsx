export default function MemeCard({ meme }) {
  return (
    <div>
      <img src={meme.imageUrl} alt="meme" width="300" />
      <p>{meme.caption}</p>
      <p>{meme.username}</p>

      <button>👍 {meme.upvotes}</button>
      <button>👎 {meme.downvotes}</button>
    </div>
  );
}