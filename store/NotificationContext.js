import { createContext, useState, useEffect } from 'react';

const NotificationContext = createContext({
  notification: null, // {title, message, status}
  showNotification: function (notification) {},
  hideNotification: function () {},
});

export function NotificationContextProvider(props) {
  const [activeNotification, setActiveNotification] = useState();
  function showNotificationHandler(notification) {
    const { title, message, status } = notification;
    setActiveNotification({ title, message, status });
  }

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === 'success' ||
        activeNotification.status === 'error')
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [activeNotification]);

  function hideNotificationHandler() {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
