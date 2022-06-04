const URI = process.env.REACT_APP_API_URI;

export const createAccount = async (email: string, password: string) => {
  const response = await fetch(`${URI}/users`, {
    method: 'POST',
    body: JSON.stringify({ email: email, password: password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${URI}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email: email, password: password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};

export const resetPassword = async (email: string) => {
  const response = await fetch(`${URI}/auth/recover`, {
    method: 'POST',
    body: JSON.stringify({ email: email }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response;
};
