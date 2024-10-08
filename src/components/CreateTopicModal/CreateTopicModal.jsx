import React, { useState, useRef, useEffect } from 'react';
import './CreateTopicModal.css';

function CreateTopicModal({ onClose, onAddTopic }) {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const modalRef = useRef();

  const colors = ["#B38BFA", "#FF79F2", "#43E6FC", "#F19576", "#0047FF", "#6691FF"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '') {
      alert('Topic name cannot be empty');
      return;
    }
    if (selectedColor.trim() === '') {
      alert('Choose a color');
      return;
    }

    const words = name.trim().split(' ');
    const initials = (words[0][0] + (words[1] ? words[1][0] : '')).toUpperCase();

    onAddTopic(initials, name, selectedColor);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal" ref={modalRef}>
        <h2>Create New group</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Group Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter topic name"
            />
          </div>
          <div className="form-group color">
            <label>Choose Colour</label>
            <div className="color-picker">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className="color-circle"
                  style={{
                    backgroundColor: color,
                    border:
                      selectedColor === color ? "1px solid black" : "none",
                  }}
                  onClick={() => setSelectedColor(color)}
                ></div>
              ))}
            </div>
          </div>
          <button className='modal-submit' type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}

export default CreateTopicModal;
