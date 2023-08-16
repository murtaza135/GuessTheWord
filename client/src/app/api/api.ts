import http from './http';

type ResponseObject = {
  value: number;
};

export const getWins = async () => {
  const response = await http("http://localhost:3001/wins");
  const data: ResponseObject = await response.json();
  return data.value;
};

export const getLosses = async () => {
  const response = await http("http://localhost:3001/losses");
  const data: ResponseObject = await response.json();
  return data.value;
};

export const updateWins = async (numWins: number) => {
  const response = await http('http://localhost:3001/wins', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ value: numWins })
  });
  const data: ResponseObject = await response.json();
  return data.value;
};

export const updateLosses = async (numLosses: number) => {
  const response = await http('http://localhost:3001/losses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ value: numLosses })
  });
  const data: ResponseObject = await response.json();
  return data.value;
};