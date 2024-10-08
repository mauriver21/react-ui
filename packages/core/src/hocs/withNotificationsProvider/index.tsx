import { NotificationsProvider } from '@components';

export const withNotificationsProvider = <T,>(Component: React.FC<T>) => {
  return (props: T & JSX.IntrinsicAttributes) => {
    return (
      <NotificationsProvider>
        <Component {...props} />
      </NotificationsProvider>
    );
  };
};
