import React, { useState } from 'react';
import '../../assets/scss/components/_three-dot-button.scss';

const ThreeDotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="three-dot-button">
      <button onClick={() => setIsOpen(!isOpen)}>
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </button>
      {isOpen && (
        <div className="popup-menu">
          <div> Pay </div>
          <div> See More </div>
        </div>
      )}
    </div>
  );
};

export default ThreeDotButton;
