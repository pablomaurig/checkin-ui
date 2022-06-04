import { Survey } from '../types/surveys.types';

const URI = process.env.REACT_APP_API_URI;

export const getSurveys = async (token: string): Promise<Survey[]> => {
  const response = await fetch(`${URI}/surveys`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const surveys = await response.json();

  return surveys;
};
