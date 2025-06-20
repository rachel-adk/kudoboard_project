import React from 'react'
import './KudoBoard.css'
import { Link } from 'react-router-dom';

const KudoBoard = ({board, onDelete}) => {
    return (
        <div className="board">
            <div className='boardImage'>
                <img src="https://picsum.photos/200/300?random=1" alt="boardImage" />
            </div>

            <div className='boardInfo'>
                <h2>{board.title}</h2>
                <h3>{board.author}</h3>
                <h4>{board.description}</h4>
                <Link className='openButton' to={`/boards/${board.id}`}>Open</Link>
                {onDelete && (
                     <button onClick={() => onDelete(board.id)}>Delete</button>

                )

                }


            </div>
        </div>
    )
}
export default KudoBoard;
