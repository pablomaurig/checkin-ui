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
import { MdOutlineLocationOn, MdOutlinePhone, MdOutlineFreeBreakfast, MdOutlineDining, 
MdInfoOutline, MdFreeCancellation, MdSchedule, MdToday, MdWifi, MdPassword, MdOutlineListAlt, MdSingleBed, MdOutlineKingBed, MdOutlineRoomService } from 'react-icons/md';
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
  const dayToday = new Date();
  const bookingEndDate = new Date(booking?.endDate as string);
  const threeDaysBefore = new Date(
    bookingEndDate.getFullYear(),
    bookingEndDate.getMonth(),
    bookingEndDate.getDate() - 3
  );

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
            onFinishOpen();
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
          <Button onClick={() => handleFinishSurvey(surveys)} bg='purple.200' color= 'purple.700' border='1px' borderColor = 'purple.500'>
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
          <Flex>
          <Icon as={MdOutlineLocationOn} fontSize='16' mr={4}/>
          <ListItem fontWeight={'200'} >
            <Text as={'span'} fontWeight={'400'} color= 'purple.800'>
              Dirección del hotel:{' '}
            </Text>
            Av. Libertador 1234, Buenos Aires
          </ListItem>
          </Flex>
          <Flex>
          <Icon as={MdOutlinePhone} fontSize='16' mr={4}/>
          <ListItem fontWeight={'200'} >
            <Text as={'span'} fontWeight={'400'} color= 'purple.800'>
            Teléfono recepción:{' '}
            </Text>
            +54 11 4444 4444
          </ListItem>
          </Flex>
          <hr />
          <Flex>
          <Icon as={MdOutlineFreeBreakfast} fontSize='16' mr={4}/>
          <ListItem fontWeight={'200'}>
            <Text as={'span'} fontWeight={'400'} color= 'purple.800'>
              Horario desayuno:{' '}
            </Text>
            de 7hs a 10hs
          </ListItem>
          </Flex>
          <Flex>
          <Icon as={MdOutlineDining} fontSize='16' mr={4}/>
          <ListItem fontWeight={'200'}>
            <Text as={'span'} fontWeight={'400'} color= 'purple.800'>
              Horario almuerzo:{' '}
            </Text>
            de 12hs a 14:30hs
          </ListItem>
          </Flex>
          <Flex>
          <Icon as={MdOutlineDining} fontSize='16' mr={4}/>            
          <ListItem fontWeight={'200'}>
            <Text as={'span'} fontWeight={'400'} color= 'purple.800'>
              Horario cena:{' '}
            </Text>
            de 20:30hs a 22:30hs
          </ListItem>
          </Flex>
          <hr />
          <Flex>
          <Icon as={MdInfoOutline} fontSize='16' mr={4}/>            
          <ListItem fontWeight={'200'}>
            <Text as={'span'} fontWeight={'400'} color= 'purple.800'>
              Número de reserva:{' '}
            </Text>
            {booking.bookingNumber}
          </ListItem>
          </Flex>
          <Flex>
          <Icon as={MdOutlineRoomService} fontSize='16' mr={4}/>
          <ListItem fontWeight={'200'}>
            <Text as={'span'} fontWeight={'400'} color= 'purple.800'>
              Habitación:{' '}
            </Text>
            {booking.roomId
              ? booking.room?.name
              : 'No cuenta con habitación asignada aún'}
          </ListItem>
          </Flex>
          {booking.roomId && (
            <Flex>
               <Icon as={MdSingleBed} fontSize='16' mr={4}/>
               <ListItem fontWeight={'200'}>
              <Text as={'span'} fontWeight={'400'} color= 'purple.800'>
                Camas simples:{' '}
              </Text>
              {booking.room?.singleBeds}
            </ListItem>
            </Flex>
          )}
          {booking.roomId && (
            <Flex>
              <Icon as={MdOutlineKingBed} fontSize='16' mr={4}/>
            <ListItem fontWeight={'200'}>
              <Text as={'span'} fontWeight={'400'} color= 'purple.800'>
                Camas dobles:{' '}
              </Text>
              {booking.room?.doubleBeds}
            </ListItem>
            </Flex>
          )}
          <Flex>
          <Icon as={MdWifi} fontSize='16' mr={4}/>
          <ListItem fontWeight={'200'}>
            <Text as={'span'} fontWeight={'400'} color= 'purple.800'>
              Red de Wifi:{' '}
            </Text>
            Hotel
          </ListItem>
          </Flex>
          <Flex>
          <Icon as={MdPassword} fontSize='16' mr={4}/>
          <ListItem fontWeight={'200'}>
            <Text as={'span'} fontWeight={'400'} color= 'purple.800'>
              Contraseña de Wifi:{' '}
            </Text>
            123456
          </ListItem>
          </Flex>
          <Flex>
          <Icon as={MdSchedule} fontSize='16' mr={4}/>
          <ListItem fontWeight={'200'}>
            <Text as={'span'} fontWeight={'400'} color= 'purple.800'>
              Horario de checkout:{' '}
            </Text>
            10:30hs
          </ListItem>
          </Flex>
          <hr />
          <Flex>
          <Icon as={MdToday} fontSize='16' mr={4}/>
          <ListItem fontWeight={'200'}>
            <Text as={'span'} fontWeight={'400'} color= 'purple.800'>
              Fecha de ingreso:{' '}
            </Text>
            {new Date(booking.startDate).toLocaleDateString('es-AR')}
          </ListItem>
          </Flex>
          <Flex>
          <Icon as={MdFreeCancellation} fontSize='16' mr={4}/>
          <ListItem fontWeight={'200'}>
            <Text as={'span'} fontWeight={'400'} color= 'purple.800'>
              Fecha de egreso:{' '}
            </Text>
            {new Date(booking.endDate).toLocaleDateString('es-AR')}
          </ListItem>
          </Flex>
          {booking.roomId !== null && spents !== null && spents.length > 0 && (
            <>
              <Flex>
              <Icon as={MdOutlineListAlt} fontSize='16' mr={4}/>
              <ListItem fontWeight={'200'}>
                <Text as={'span'} fontWeight={'400'} color= 'purple.800'>
                  Consumos durante la estadía:{' '}
                </Text>
              </ListItem>
              </Flex>
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
        {dayToday >= threeDaysBefore && (
          <Button onClick={handleCheckout} bg='purple.200' color= 'purple.700' border='1px' borderColor = 'purple.500'>Realizar Check-Out</Button>
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
              <ModalHeader>Realizar Check-Out</ModalHeader>
              <ModalBody>
                <Text>
                  Para finalizar complete la siguiente encuesta de satisfacción
                </Text>
              </ModalBody>
              <ModalFooter justifyContent={'center'}>
                <Button onClick={handleSurvey} bg='purple.200' color= 'purple.700' border='1px' borderColor = 'purple.500'>Realizar encuesta</Button>
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
            <ModalHeader>Check-Out realizado con éxito</ModalHeader>
            <ModalBody>
              <Text>
                Por favor diríjase a recepción para finalizar su estadía.
              </Text>
            </ModalBody>
            <ModalFooter justifyContent={'center'}>
              <Button onClick={onFinishClose} bg='purple.200' color= 'purple.700' border='1px' borderColor = 'purple.500'>Cerrar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    )
  );
};
