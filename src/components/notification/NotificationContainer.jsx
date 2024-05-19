import React, { createContext, useContext, useState, useCallback } from 'react';
import Notification from './Notification';
import './Notifications.css';

const NotificationContext = createContext();

export const useNotifications = () => {
  return useContext(NotificationContext);
};

const NotificationProvider = ({ children, position = 'bottom-right' }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((type, icon, value) => {
    setNotifications(prev => [
      ...prev,
      { id: Date.now(), type, icon, value },
    ]);
  }, []);

  const removeNotification = useCallback(id => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={addNotification}>
      <div className={`notification-container ${position}`}>
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            id={notification.id}
            type={notification.type}
            icon={notification.icon}
            value={notification.value}
            onRemove={removeNotification}
          />
        ))}
      </div>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationProvider };
export default NotificationProvider;
