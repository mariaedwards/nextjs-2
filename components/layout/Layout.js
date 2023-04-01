import MainHeader from './MainHeader';
import Notification from '@/components/ui/Notification';
import NotificationContext from '@/store/NotificationContext';
import { useContext } from 'react';

function Layout(props) {
  const notificationContext = useContext(NotificationContext);
  const activeNotification = notificationContext.notification;
  return (
    <>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </>
  );
}

export default Layout;
