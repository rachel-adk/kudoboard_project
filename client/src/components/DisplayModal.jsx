import React from "react";
import 'ModalDisplay.css'

const ModalDisplay = ({onClose}) => {
  return (
    <div className="modal" onClick={onClose}>
        <div className="modalContent"
            onClick={e => e.stopPropagation()}>
                <h1>{props.title}</h1>
                <img className="modalImage" src={props.image} alt={props.title}/>
                <p>Author: {props.author}</p>
                <p>Description: {props.description}</p>
        </div>
    </div>
  )
};
