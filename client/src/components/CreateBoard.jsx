import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Forms.css';


const CreateBoard = ({ onCreate }) => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        author: "",
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:3000/boards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
        }
            throw new Error('Failed to create board');
        })
        .then(data=> {
            console.log(data);
            onCreate();
            setShowModal(false);
        })
        .catch(error => {
            console.error(error);
        })
    }

    return (
        <>
        <button onClick={() => setShowModal(true)}>Create your own board</button>
        {showModal && (
            <div className="modalOverlay">
                <div className='modalContent'>
                    <h2>Create your own Board!</h2>
                    <form className="board-form" onSubmit={handleSubmit}>
                        <label>
                            Title:
                            <input
                                name="title"
                                value={formData.title}
                                onChange={(e) => SetTitle(e.target.value)}
                                required
                            />
                        </label>

                        <label>
                            Category:
                            <select
                            value={category}
                            onChange={handleChange}
                        >
                            <option value="">Choose a Category</option>
                            <option value="Thank you">Thank yoi</option>
                            <option value="Celebration">Celebration</option>
                            <option value="Inspiration">Inspiration</option>
                            </select>

                        </label>

                        <label>
                            Author:
                            <input
                            name="author"
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                            />
                        </label>

                        <div className="form-buttons">
                            <button type="submit">Submit</button>
                            <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        )}
    </>
);
};
export default CreateBoard;
