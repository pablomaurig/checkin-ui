import { CreateSurvey, Survey } from '../types/surveys.types';

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

export const getSurveyByBookingId = async (
  bookingId: number,
  token: string
) => {
  const response = await fetch(`${URI}/surveys/${bookingId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export const createSurvey = async (survey: CreateSurvey, token: string) => {
  const response = await fetch(`${URI}/surveys`, {
    method: 'POST',
    body: JSON.stringify(survey),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};
