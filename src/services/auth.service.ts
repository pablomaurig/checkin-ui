const URI = process.env.REACT_APP_API_URI;

export const createAccount = async (email: string, password: string) => {
  const response = await fetch(`${URI}/users`, {
    method: 'POST',
    body: JSON.stringify({email: email, password: password}),
    headers: {
      'Content-Type': 'application/json'
    },
  })
  return response
}