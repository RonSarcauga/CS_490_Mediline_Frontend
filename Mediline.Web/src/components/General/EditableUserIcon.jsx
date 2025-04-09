import React, { useState } from 'react';
import BaseIcon from '../common/BaseIcon';
import Button from '../common/Button';
import '../../assets/scss/components/_editable-user-icon.scss';

const EditableUserIcon = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="editable-user-icon">
      <div className="avatar-container">
        <BaseIcon />
        <div className="edit-btn">
          <Button onClick={() => setIsPopupOpen(!isPopupOpen)}>✎</Button>
        </div>
      </div>
      {isPopupOpen && (
        <div className="popup-menu">
          {/* placeholder */}
        </div>
      )}
    </div>
  );
};

export default EditableUserIcon;
