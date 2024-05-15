import { create } from 'zustand';
import { TypeUser } from '../types/TypeUser';

interface UsersState {
  users: TypeUser[];
  setUsers: (users: TypeUser[]) => void;
  loading: boolean;

  getUsers: () => Promise<void>;

  createUser: (userData:any) => Promise<void>;
}

export const useStoreUsers = create<UsersState>()((set, get) => ({
  users: [],
  setUsers: (usersData) => set({ users: usersData }),
  loading: true,

  // get
  getUsers: async () => {
    const responseUser = await fetch(
      'https://jsonplaceholder.typicode.com/users'
    );

    const dataUsers = await responseUser.json();
    set({ users: dataUsers });
    set({ loading: false });
  },

  // post
  createUser: async (userData) => {
    const url = 'https://example.com/api/users';
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    };

    try {
      const response = await fetch(url, requestOptions);
      console.log(response);
      if (!response.ok) {
        throw new Error('Ошибка создания пользователя');
      }
      const data = await response.json();
      // return data;
      console.log(data) ;

    } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
      throw error;
    }
  },
}));
