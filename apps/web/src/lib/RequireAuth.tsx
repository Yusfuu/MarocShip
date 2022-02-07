import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from 'app/hooks';
type Props = {
  redirectTo: string;
  Role: string;
};

export const RequireAuth: FC<Props> = ({ redirectTo, Role }) => {
  const payload = useAppSelector((state) => state.user.payload);
  return Role === payload?.role ? (
    <Outlet />
  ) : (
    <Navigate to={redirectTo} replace />
  );
};
