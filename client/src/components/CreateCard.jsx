import { useState } from "react";
import { getGif } from "../api/backend_data";


const CreateCard = ({ onCreate }) => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [gifResults, setGifResults] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    author: "",
    gifURL: "",
  });

  useEffect(() => {
    const fetchGif = async () => {
      if (searchQuery.trim() === "") return;
      try {
        const gifs = await getGif(searchQuery);
        setGifResults(gifs);
      } catch (error) {
        console.error(error);
      }
    };
    fetchGif();
  }, [searchQuery]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGifClick = (url) => {
    setFormData((prev) => ({
      ...prev,
      gifURL: url,
    }));
    setGifResults([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, message, gifURL } = formData;
    if (!title || !message || !gifURL) {
      alert("Please fill in all fields");
      return;
    }
    onCreate(formData);
    setShowModal(false);
    setSearchQuery("");
    setFormData({
      title: "",
      message: "",
      author: "",
      gifURL: "",
    });
    setGifResults([]);
    setSearchQuery("");
  };

  return (
    <>
      <button onClick={() => setShowModal(true)}>Create Card</button>
      {showModal && (
        <div className="modalOverlay" onClick={() => setShowModal(false)}>
          <div className="modalContent" onClick={() => e.stopPropagation()}>
            onClick={(event) => event.stopPropagation()}
            <h2>Create your own Card!</h2>
            <form className="board-form" onSubmit={handleSubmit}>
              <input
                name="title"
                placeholder="Enter the card title"
                value={formData.title}
                onChange={handleChange}
                required
              />

              <input
                name="message"
                placeholder="Enter card message"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                placeholder="Search GIFs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="gifResults">
                {gifResults.map((gif) => (
                  <img
                    key={gif.id}
                    src={gif.images.downsized.url}
                    alt="gif"
                    onClick={() => handleGifClick(gif.images.downsized.url)}
                  />
                ))}
              </div>
              <input
                name="author"
                placeholder="Enter author(not required)"
                value={formData.author}
              />
              <button type="submit" className="createButton">
                Create Card
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default CreateBoard;
