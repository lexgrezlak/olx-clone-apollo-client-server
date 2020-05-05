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
  email: string;
  name?: string;
  __typename: string;
}
