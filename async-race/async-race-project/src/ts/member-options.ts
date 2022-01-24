interface Winners {
  id: number;
  wins: number;
}
interface GetRememberOptions {
  inputName: string;
  inputColor: string;
  inputNewName: string;
  inputNewColor: string;
  currentGaragePage: number;
  currentWinnersPage: number;
  totalPages: number;
  winners: Winners[];
}
export const rememberOptions: GetRememberOptions = {
  inputName: '',
  inputColor: '#ff0000',
  inputNewName: '',
  inputNewColor: '#00ffff',
  currentGaragePage: 1,
  currentWinnersPage: 1,
  totalPages: 1,
  winners: [],
};
