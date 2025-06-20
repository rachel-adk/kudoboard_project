import { useState } from "react";
import { upvoteCard, togglePin } from "../api/backend_data";
import "./KudoCards.css";
import Comments from "./Comments";

function KudoCard({ card, onDelete, onUpdate, onOpenComments }) {
  const [isPinned, setIsPinned] = useState(card.pinned);
  const [upvotes, setUpvotes] = useState(card.upvotes);
  const [showModal, setShowModal] = useState(false);

  const handleUpvote = async () => {
    try {
      await upvoteCard(card.id);
      setUpvotes((prev) => prev + 1);
      if (onUpdate) onUpdate(card.id);
    } catch (error) {
      console.error("Error upvoting card:", error);
    }
  };

  const handleClickPin = async () => {
    try {
      const pinnedCard = await togglePin(card.id);
      setIsPinned(pinnedCard.pinned);
      if (onUpdate) onUpdate(pinnedCard);
      // onUpdate(pinnedCard);
      console.log("Pinned status updated:", pinnedCard.pinned);
    } catch (error) {
      console.error("Error pinning card:", error);
    }
  };

  return (
    <div
      className="kudoCard"
      onClick={(e) => {
        setShowModal(true);
      }}
    >
      <div>
        <img src={card.gif} alt={card.title} />
        <button
          className={isPinned ? "pinned" : "unpinned"}
          onClick={handleClickPin}
        >
          📌
        </button>
        <h3>{card.title}</h3>
        <h4>{card.message}</h4>
        <p>{card.author}</p>
        <button className="deleteButton" onClick={() => onDelete(card.id)}>
          Delete
        </button>
        <button className="upvoteButton" onClick={handleUpvote}>
          Upvote: {upvotes}
        </button>
        {/* {showModal && (
          <Comments
            onClick={(card) => onOpenComments(card)}
            onClose={() => {}}
            card={card}
          />
        )} */}
      </div>
    </div>
  );
}

export default KudoCard;
