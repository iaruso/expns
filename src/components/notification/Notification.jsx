import './Notifications.css';
import React, { useEffect } from 'react';
import Icon from '../app/Icon';

const Notification = ({ id, type, icon, value, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(id);
    }, 10000);

    return () => clearTimeout(timer);
  }, [id, onRemove]);

  return (
    <div className={`notification ${type}`} onClick={() => onRemove(id)}>
      <Icon name={icon} />
      {value}
    </div>
  );
};

export default Notification;
