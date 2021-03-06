import { Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import Admin from './Admin';
import Checkin from './Checkin';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import GuestRoute from '../components/Auth/GuestRoute/GuestRoute';
import RequireAuth from '../components/Auth/RequireAuth/RequireAuth';
import RouteWithPermissions from '../components/Auth/RouteWithPermissions';
import { Permissions } from '../types/user.types';
import Surveys from './Admin/Surveys';
import Bookings from './Admin/Bookings';
import Rooms from './Admin/Rooms';
import Employees from './Admin/Employees';
import Hotel from './Hotel';
import RoomsCreate from './Admin/Rooms/RoomsCreate';
import EmployeesCreate from './Admin/Employees/EmployeesCreate';
import EmployeeEdit from './Admin/Employees/EmployeeEdit';
import RoomsEdit from './Admin/Rooms/RoomsEdit';
import BookingsCreate from './Admin/Bookings/BookingsCreate';
import SplashRoute from '../components/Splash/SplashRoute';

const Root = () => (
  <Layout>
    <Routes>
      <Route
        path='login'
        element={
          <SplashRoute>
            <GuestRoute>
              <Login />
            </GuestRoute>
          </SplashRoute>
        }
      />
      <Route
        path='registro'
        element={
          <SplashRoute>
            <GuestRoute>
              <Register />
            </GuestRoute>
          </SplashRoute>
        }
      />
      <Route
        path='/'
        element={
          <SplashRoute>
            <RequireAuth>
              <RouteWithPermissions
                fallback='/admin'
                requiredPermissions={[Permissions.customer]}
              >
                <Home />
              </RouteWithPermissions>
            </RequireAuth>
          </SplashRoute>
        }
      />
      <Route
        path='checkin-ui'
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route
        path='checkin'
        element={
          <RequireAuth>
            <Checkin />
          </RequireAuth>
        }
      />
      <Route
        path='informacion-del-hotel'
        element={
          <RequireAuth>
            <Hotel />
          </RequireAuth>
        }
      />
      <Route
        path='admin'
        element={
          <SplashRoute url='admin'>
            <RequireAuth>
              <RouteWithPermissions
                fallback='/'
                requiredPermissions={[Permissions.admin, Permissions.employee]}
              >
                <Admin />
              </RouteWithPermissions>
            </RequireAuth>
          </SplashRoute>
        }
      >
        <Route path='encuestas' element={<Surveys />} />
        <Route path='reservas' element={<Bookings />} />
        <Route path='reservas/crear' element={<BookingsCreate />} />
        <Route path='reservas/:id' element={<Bookings />} />
        <Route path='habitaciones' element={<Rooms />} />
        <Route path='habitaciones/crear' element={<RoomsCreate />} />
        <Route path='habitaciones/:id' element={<RoomsEdit />} />
        <Route path='empleados' element={<Employees />} />
        <Route path='empleados/crear' element={<EmployeesCreate />} />
        <Route path='empleados/:id' element={<EmployeeEdit />} />
      </Route>
      <Route
        path='admin/login'
        element={
          <SplashRoute url='/admin/login'>
            <GuestRoute>
              <Login />
            </GuestRoute>
          </SplashRoute>
        }
      />
      <Route
        path='*'
        element={
          <main style={{ padding: '1rem' }}>
            <p>oops nothing here!</p>
          </main>
        }
      />
    </Routes>
  </Layout>
);

export default Root;
