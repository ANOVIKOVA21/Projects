const url = 'http://127.0.0.1:3000';
const urlGarage = url + '/garage';
const urlWinners = url + '/winners';
const urlEngine = url + '/engine';

export interface CarsData {
  cars: CarData[];
  amount: string;
}
export async function getCars(page: number): Promise<CarsData> {
  const result = await fetch(`${urlGarage}?_page=${page}&_limit=7`);
  return {
    cars: await result.json(),
    amount: result.headers.get('X-Total-Count') as string,
  };
}
export async function getCar(id: number) {
  const result = await fetch(`${urlGarage}/${id}`);
  return result.json();
}
interface CarData {
  name: string;
  color: string;
  id?: number;
}
export async function createCar(car: CarData) {
  const result = await fetch(`${urlGarage}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  });
  return result.json();
}
export async function deleteCar(id: number) {
  const result = await fetch(`${urlGarage}/${id}`, { method: 'DELETE' });
  return result.json();
}
export async function updateCar(id: number, newCar: CarData) {
  const result = await fetch(`${urlGarage}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCar),
  });
  return result.json();
}
export async function startCarEngine(id: number) {
  const result = await fetch(`${urlEngine}?id=${id}&status=started`, { method: 'PATCH' });
  return result.json();
}
export async function stopCarEngine(id: number) {
  const result = await fetch(`${urlEngine}?id=${id}&status=stopped`, { method: 'PATCH' });
  return result.json();
}
export async function switchToDriveMode(id: number) {
  const result = await fetch(`${urlEngine}?id=${id}&status=drive`, { method: 'PATCH' });
  if (result.ok) return result.json();
  else return { success: false };
}
export interface WinnerData {
  id?: number;
  wins: number;
  time: number;
}
export interface WinnersData {
  winners: WinnerData[];
  amount: string;
}
export async function getWinners(page: number, sort = 'time', order = 'ASC'): Promise<WinnersData> {
  const result = await fetch(`${urlWinners}?_page=${page}&_limit=10&_sort=${sort}&_order=${order}`);
  return {
    winners: await result.json(),
    amount: result.headers.get('X-Total-Count') as string,
  };
}
export async function getWinner(id: number) {
  const result = await fetch(`${urlWinners}/${id}`);
  return result.json();
}
export async function createWinner(newWinner: WinnerData) {
  const result = await fetch(`${urlWinners}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newWinner),
  });
  return result.json();
}
export async function deleteWinner(id: number) {
  const result = await fetch(`${urlWinners}/${id}`, { method: 'DELETE' });
  return result.json();
}
export async function updateWinner(id: number, newWinner: WinnerData) {
  const result = await fetch(`${urlWinners}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newWinner),
  });
  return result.json();
}
