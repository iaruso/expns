import React, { useEffect } from 'react';
import './Notifications.css';

const Notification = ({ id, type, value, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(id);
    }, 10000);

    return () => clearTimeout(timer);
  }, [id, onRemove]);

  return (
    <div className={`notification ${type}`} onClick={() => onRemove(id)}>
      {value}
    </div>
  );
};

export default Notification;
