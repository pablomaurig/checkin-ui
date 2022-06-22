import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import PageTitle from '../../../components/PageTitle';
import { AuthContext } from '../../../context/Auth.context';
import { getSurveys } from '../../../services/surveys.service';
import { Survey } from '../../../types/surveys.types';

const Surveys = () => {
  const { user } = useContext(AuthContext);
  const [surveys, setSurveys] = useState<Survey[]>([]);

  const setEncuestas = async () => {
    if (user) {
      const encuestas = await getSurveys(user.token);
      setSurveys(encuestas);
    }
  };

  useEffect(() => {
    try {
      setEncuestas();
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <>
      <Flex justifyContent={'space-between'} mb={'4'}>
        <PageTitle label='Encuestas' />
      </Flex>
      <TableContainer>
        <Table size='sm'>
          <Thead>
            <Tr>
              <Th>Fecha</Th>
              <Th>Booking id</Th>
              <Th>Atención</Th>
              <Th>Limpieza</Th>
              <Th>Alojamiento</Th>
            </Tr>
          </Thead>
          <Tbody>
            {surveys.map(survey => (
              <Tr key={survey.id}>
                <Td>
                  {new Date(`${survey.createdAt}`).toLocaleDateString('es-Ar')}
                </Td>
                <Td>{survey.bookingId}</Td>
                <Td>{survey.answer1}</Td>
                <Td>{survey.answer2}</Td>
                <Td>{survey.answer3}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Surveys;
