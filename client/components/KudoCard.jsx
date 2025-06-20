import{ useState } from "react";
import { upvoteCard,  togglePin } from "../api/backend_data";
import "./KudoCards.css";


function KudoCard({ card, onDelete, onUpvote }) {
  const [isPinned, setIsPinned] = useState(card.pinned);
  const [upvotes, setUpvotes] = useState(card.upvotes);

  const handleUpvote = async () => {
    try {
      await upvoteCard(card.id);
      setUpvotes((prev) => prev + 1);
      if (onUpvote) onUpvote(card.id);
    } catch (error) {
      console.error("Error upvoting card:", error);
    }
  }

  const handleClickPin = async () => {
    try {
      const pinnedCard = await togglePin(card.id);
      setIsPinned(pinnedCard.pinned);
    } catch (error) {
      console.error("Error upvoting card:", error);
    }
  };

  return (
    <div className="kudoCard">
        <div>
          <img src={card.gif} alt={card.title} />
          <button
            className={isPinned ? 'pinned' : 'unpinned'}
            onClick={handleClickPin}>
              📌
            </button >
          <h3>{card.message}</h3>
          <p>{card.author}</p>
          <button className="deleteButton" onClick={() => onDelete(card.id)}>
            Delete
          </button>
          <button className="upvoteButton" onClick={handleUpvote}>
            Upvote: {upvotes}
            </button>
        </div>
    </div>
  );
};

export default KudoCard;
