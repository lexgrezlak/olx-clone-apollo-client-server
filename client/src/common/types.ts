export interface Item {
  id: number;
  title: string;
  description: string;
  price: number;
  phone: number;
  category: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
}

export interface Account {
  user: User | null;
}
