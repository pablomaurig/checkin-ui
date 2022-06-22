import { useContext } from 'react';
import { AuthContext } from '../../../context/Auth.context';

const HasPermission = ({
  children,
  fallback = null,
  requiredPermissions,
}: any) => {
  const { user } = useContext(AuthContext);
  let authorized = false;

  if (requiredPermissions.length) {
    const hasPermission = requiredPermissions.find(
      (permission: string): boolean => {
        return user?.role === permission;
      }
    );

    if (hasPermission) {
      authorized = true;
    }
  } else {
    authorized = true;
  }

  return authorized ? children : fallback;
};

export default HasPermission;
