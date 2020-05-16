export interface IPostingTitleArgs {
  title: string;
  cursor: string;
  limit: number;
}

export interface IPostingIdArgs {
  id: string;
}

export interface IQueries {
  title: { $regex: string; $options: string };
}

export interface IAddPostingArgs {
  title: string;
  price: number;
  phone: string;
  description: string;
  category: string;
  condition: string;
  city: string;
}

export interface IEditPostingArgs extends IAddPostingArgs {
  id: string;
}
