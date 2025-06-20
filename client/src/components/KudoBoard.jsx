import React from 'react'
import './KudoBoard.css'
import { Link } from 'react-router-dom';

const KudoBoard = ({board, onDelete}) => {
    return (
        <div className="board">
            <div className='boardImage'>
                <img src={board.image} alt="boardImage" />
            </div>

            <div className='boardInfo'>
                <h2>{board.title}</h2>
                <h3>{board.author}</h3>
                <h4>{board.description}</h4>
                <Link className='openBoard' to={`/boards/${board.id}`}>Open</Link>
                {onDelete && (
                     <button onClick={() => onDelete(board.id)}>Delete</button>

                )

                }


            </div>
        </div>
    )
}
export default KudoBoard;
