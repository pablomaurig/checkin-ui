import {
  Button,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  List,
  ListItem,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  useDisclosure,
  IconButton,
  Icon,
  Box,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { ImStarFull } from 'react-icons/im';
import { AuthContext } from '../../../context/Auth.context';
import {
  createSurvey,
  getSurveyByBookingId,
} from '../../../services/surveys.service';
import { Booking, Spent } from '../../../types/booking.types';

interface CheckinHomeProps {
  booking: Booking | null;
  spents: Spent[] | null;
}

export const CheckinHome = ({ booking, spents }: CheckinHomeProps) => {
  const { user } = useContext(AuthContext);
  const [checkoutDone, setCheckoutDone] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isSurveyOpen,
    onOpen: onSurveyOpen,
    onClose: onSurveyClose,
  } = useDisclosure();
  const {
    isOpen: isFinishOpen,
    onOpen: onFinishOpen,
    onClose: onFinishClose,
  } = useDisclosure();
  const bookingEndDate = new Date(booking?.endDate as string);
  const todayDate = new Date();

  const handleSurvey = () => {
    onSurveyOpen();
    onClose();
  };

  const handleFinishSurvey = async (value: any) => {
    if (user && booking) {
      try {
        const survey = {
          ...value,
          bookingId: booking?.id,
        };
        const response = await createSurvey(survey as any, user.token);
        if (response.status === 200) {
          setCheckoutDone(true);
          onSurveyClose();
        } else {
          onOpen();
        }
      } catch (e) {
        console.error(e);
      }
    }
    onClose();
    onFinishOpen();
  };

  const handleCheckout = async () => {
    if (user) {
      if (!checkoutDone) {
        try {
          const response = await getSurveyByBookingId(
            booking?.id as number,
            user.token
          );
          if (response.status === 200) {
            setCheckoutDone(true);
          } else {
            onOpen();
          }
        } catch (e) {
          console.error(e);
        }
      } else {
        onFinishOpen();
      }
    }
  };

  const SURVEY = ['Atención', 'Limpieza', 'Alojamiento'];

  const Survey = () => {
    const [surveys, setSurveys] = useState({});

    const updateSurvey = (id: number, number: number) => {
      setSurveys(prevStep => ({
        ...prevStep,
        [`answer${id}`]: `${number}`,
      }));
    };
    return (
      <>
        <ModalBody>
          <Box>
            <Text>{SURVEY[0]}</Text>
            <StarRating id='1' callback={updateSurvey} />
            <br />
            <Text>{SURVEY[1]}</Text>
            <StarRating id='2' callback={updateSurvey} />
            <br />
            <Text>{SURVEY[2]}</Text>
            <StarRating id='3' callback={updateSurvey} />
          </Box>
        </ModalBody>
        <ModalFooter justifyContent={'center'}>
          <Button onClick={() => handleFinishSurvey(surveys)}>
            Finalizar encuesta
          </Button>
        </ModalFooter>
      </>
    );
  };

  const StarRating = ({ id, callback }: { id: string; callback: Function }) => {
    const [rating, setRating] = useState(0);

    const handleCallback = (index: number) => {
      setRating(index);
      callback(id, index);
    };

    return (
      <Flex justifyContent={'space-around'}>
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <IconButton
              key={index}
              onClick={() => handleCallback(index)}
              icon={
                <Icon
                  color={index <= rating ? 'yellow.300' : 'gray.100'}
                  h={7}
                  w={7}
                  as={ImStarFull}
                />
              }
              variant={'ghost'}
              aria-label={'Encuesta'}
            />
          );
        })}
      </Flex>
    );
  };

  return (
    booking && (
      <Flex
        direction={'column'}
        justifyContent={'space-between'}
        height={'100%'}
        flex={'1'}
      >
        <List spacing={2}>
          <ListItem>
            <Text as={'span'} fontWeight={'bold'}>
              Dirección del hotel:{' '}
            </Text>
            Av. Libertador 1234, Buenos Aires
          </ListItem>
          <ListItem>
            <Text as={'span'} fontWeight={'bold'}>
              Teléfono recepción:{' '}
            </Text>
            54325432
          </ListItem>
          <hr />
          <ListItem>
            <Text as={'span'} fontWeight={'bold'}>
              Horario desayuno:{' '}
            </Text>
            de 7hs a 10hs
          </ListItem>
          <ListItem>
            <Text as={'span'} fontWeight={'bold'}>
              Horario almuerzo:{' '}
            </Text>
            de 12hs a 14:30hs
          </ListItem>
          <ListItem>
            <Text as={'span'} fontWeight={'bold'}>
              Horario cena:{' '}
            </Text>
            de 20:30hs a 22:30hs
          </ListItem>
          <hr />
          <ListItem>
            <Text as={'span'} fontWeight={'bold'}>
              Número de reserva:{' '}
            </Text>
            {booking.bookingNumber}
          </ListItem>
          <ListItem>
            <Text as={'span'} fontWeight={'bold'}>
              Habitación:{' '}
            </Text>
            {booking.roomId
              ? booking.room?.name
              : 'No cuenta con habitación asignada aún'}
          </ListItem>
          {booking.roomId && (
            <ListItem>
              <Text as={'span'} fontWeight={'bold'}>
                Camas simples:{' '}
              </Text>
              {booking.room?.singleBeds}
            </ListItem>
          )}
          {booking.roomId && (
            <ListItem>
              <Text as={'span'} fontWeight={'bold'}>
                Camas dobles:{' '}
              </Text>
              {booking.room?.doubleBeds}
            </ListItem>
          )}
          <ListItem>
            <Text as={'span'} fontWeight={'bold'}>
              Red de Wifi:{' '}
            </Text>
            Hotel
          </ListItem>
          <ListItem>
            <Text as={'span'} fontWeight={'bold'}>
              Contraseña de Wifi:{' '}
            </Text>
            123456
          </ListItem>
          <ListItem>
            <Text as={'span'} fontWeight={'bold'}>
              Horario de checkout:{' '}
            </Text>
            10:30hs
          </ListItem>
          <hr />
          <ListItem>
            <Text as={'span'} fontWeight={'bold'}>
              Fecha de ingreso:{' '}
            </Text>
            {new Date(booking.startDate).toLocaleDateString('es')}
          </ListItem>
          <ListItem>
            <Text as={'span'} fontWeight={'bold'}>
              Fecha de egreso:{' '}
            </Text>
            {new Date(booking.endDate).toLocaleDateString('es')}
          </ListItem>
          {booking.roomId !== null && spents !== null && spents.length > 0 && (
            <>
              <ListItem>
                <Text as={'span'} fontWeight={'bold'}>
                  Consumos durante la estadía:{' '}
                </Text>
              </ListItem>
              <TableContainer>
                <Table variant='simple' size='sm'>
                  <Thead>
                    <Tr>
                      <Th>Detalle</Th>
                      <Th isNumeric>Costo</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {spents.map(item => (
                      <Tr key={item.id}>
                        <Td>{item.description}</Td>
                        <Td isNumeric>${item.amount}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                  <Tfoot>
                    <Tr>
                      <Th>Total</Th>
                      <Th isNumeric>
                        ${spents.reduce((a, b) => a + Number(b.amount), 0)}
                      </Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </TableContainer>
            </>
          )}
        </List>
        {bookingEndDate <= todayDate && (
          <Button onClick={handleCheckout}>Realizar checkout</Button>
        )}
        <Modal
          onClose={onSurveyClose}
          closeOnOverlayClick={false}
          size={'xs'}
          isOpen={isSurveyOpen}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <>
              <ModalHeader>Encuesta de satisfacción</ModalHeader>
              <Survey />
            </>
          </ModalContent>
        </Modal>
        <Modal
          onClose={onClose}
          closeOnOverlayClick={false}
          size={'xs'}
          isOpen={isOpen}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <>
              <ModalHeader>Realizar checkout</ModalHeader>
              <ModalBody>
                <Text>
                  Para finalizar complete la siguiente encuesta de satisfacción
                </Text>
              </ModalBody>
              <ModalFooter justifyContent={'center'}>
                <Button onClick={handleSurvey}>Realizar encuesta</Button>
              </ModalFooter>
            </>
          </ModalContent>
        </Modal>
        <Modal
          onClose={onFinishClose}
          closeOnOverlayClick={false}
          size={'xs'}
          isOpen={isFinishOpen}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Checkout realizado con éxito</ModalHeader>
            <ModalBody>
              <Text>
                Por favor diríjase a recepción para finalizar su estadía.
              </Text>
            </ModalBody>
            <ModalFooter justifyContent={'center'}>
              <Button onClick={onFinishClose}>Cerrar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    )
  );
};
