import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/Auth.context';
import { PendingBooking } from './steps/PendingBooking';
import { Booking, GetBooking, Spent } from '../../types/booking.types';
import { useToast } from '@chakra-ui/react';
import {
  getBookingById,
  getBookingByNameAndBookingNumber,
  getBookingSpentById,
} from '../../services/bookings.service';
import { CheckinHome } from './steps/CheckinHome';
import { CheckinForm } from './steps/CheckinForm';

const Home = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [spents, setSpents] = useState<Spent[] | null>(null);
  const toast = useToast();

  const getBookingByParams = async (
    checkinParams: GetBooking,
    actions: any
  ) => {
    if (user) {
      try {
        const response = await getBookingByNameAndBookingNumber(
          checkinParams,
          user.token
        );
        if (response.status === 200) {
          const booking = await response.json();

          setBooking(booking);
        } else {
          const bookingError = await response.json();
          toast({
            title: bookingError.message,
            description: 'Intente más tarde',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
    actions.setSubmitting(false);
  };

  const fetchUsertBooking = async (bookingId: number) => {
    if (user) {
      try {
        if (user && bookingId) {
          const response = await getBookingById(bookingId, user?.token);
          if (response.status === 200) {
            const _booking = await response.json();
            setBooking(_booking);
          } else {
            toast({
              title: 'Error al cargar reserva',
              status: 'error',
              duration: 9000,
              isClosable: true,
            });
          }
          const spentResponse = await getBookingSpentById(
            bookingId as number,
            user?.token
          );
          if (spentResponse.status === 200) {
            const _spents: Spent[] = await spentResponse.json();
            setSpents(_spents);
          } else {
            toast({
              title: 'Error al cargar habitación',
              status: 'error',
              duration: 9000,
              isClosable: true,
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (user?.bookingId) {
      fetchUsertBooking(Number(user?.bookingId));
    }
  }, []);

  return user?.bookingId !== null ? (
    <CheckinHome booking={booking} spents={spents} />
  ) : booking !== null ? (
    <CheckinForm booking={booking} user={user} updateUser={updateUser} />
  ) : (
    <PendingBooking getBooking={getBookingByParams} />
  );
};

export default Home;
