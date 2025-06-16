import React from 'react'
import './KudoBoard.css'
//import kudoBoardData from './kudoBoardData';

const KudoBoard = (props) => {
    return (
        <div className="board">
            <div className='boardImage'>
                <img src={props.image} alt="boardImage" />
            </div>

            <div className='boardInfo'>
                <h2>{props.title}</h2>
                <h3>{props.author}</h3>
                <h4>{props.description}</h4>

            </div>
        </div>
    )
}
export default KudoBoard;
