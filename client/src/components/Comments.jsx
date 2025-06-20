import React, { useEffect, useState } from "react";
import { getComments, postComments } from "../api/backend_data";
import "./Comments.css";

const Comments = ({ onClick, onClose, card, boardId }) => {
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const loadComments = async () => {
      console.log("Loading comments for card: ", card);
      try {
        const data = await getComments(card.id);
        setComments(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (card?.id) loadComments();
  }, [card]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const commentData = {
      message,
      author: author || "Anonymous",
    };

    try {
      const newComment = await postComments(boardId, card.id, commentData);
      setComments([...comments, newComment]);
      setMessage("");
      setAuthor("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modalOverlay" onClick={onClick}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn-comment" onClick={onClick}>
          Close
        </button>

        <h2>Comments: {card?.title}</h2>
        <p>{card?.author}</p>
        <p>{card?.description}</p>
        {card?.gif && (
          <img src={card.gif} alt="Card GIF" className="modal-gif" />
        )}

        <h3>Comments</h3>
        <ul className="commentList">
          {comments.length === 0 && <li>No comments yet</li>}
          {comments.map((comment, index) => (
            <li key={index}>
              <p>{comment.message}</p>
              <p>
                <i>- {comment.author}</i>
              </p>
            </li>
          ))}
        </ul>

        <form onSubmit={handleSubmit} className="comment-form">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Add a comment"
            required
          />
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Your name (optional)"
          />
          <button type="submit" className="post-comment">
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comments;
