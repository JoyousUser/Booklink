import { useAppContext } from '../appContext';
import { Navigate } from 'react-router-dom';


const AdminRoute = ({ children }) => {
  const { state } = useAppContext();

  if (!state.user || state.user.role !== 'Admin') {
    return <Navigate to="/home" />;
  }

  return <>{children}</>;
};

export default AdminRoute;