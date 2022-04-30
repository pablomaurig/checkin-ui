import { ReactElement } from 'react';
import HasPermission from '../HasPermission';
import { Navigate } from 'react-router-dom';

interface RouteWithPermissionsDefaultProps {
  children: ReactElement;
  fallback: string;
  // path: string;
  requiredPermissions: string[];
}

type RouteWithPermissionsProps = RouteWithPermissionsDefaultProps;
type Props = RouteWithPermissionsProps;

const RouteWithPermissions = (
  props: RouteWithPermissionsProps
): ReactElement => {
  const { children, fallback, requiredPermissions } = props as Props;
  const redirectTo = <Navigate to={fallback} />;
  return (
    <HasPermission
      requiredPermissions={requiredPermissions}
      fallback={redirectTo}
    >
      {children}
    </HasPermission>
  );
};

export default RouteWithPermissions;
