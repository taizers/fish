import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import { adminRole, moderatorRole } from '../constants.ts';

const PrivateAdminRoute: FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (user === null) {
    return null;
  }

  return user.login &&
    (user?.roles?.includes(adminRole) ||
      user?.roles?.includes(moderatorRole)) ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default PrivateAdminRoute;
