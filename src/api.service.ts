import axios from "axios";

// types
interface Response {
  message: string[] | string;
  statusCode: number;
  data?: any;
}

const BASE_URL = "https://st-be.vercel.app/";

const instance = axios.create({ baseURL: BASE_URL });
instance.defaults.headers.common["Content-Type"] = `application/json`;
instance.defaults.headers.common["Accept"] = `application/json`;

export const sdk = {
  getBooks: async (): Promise<Response> => {
    const { data } = await instance.get("books");
    return data;
  },
  getBook: async (id: string): Promise<Response> => {
    const { data } = await instance.get(`book?id=${id}`);
    return data;
  },
  deleteBook: async (id: string): Promise<Response> => {
    const form = { id };
    const { data } = await instance.post(`book/delete`, form);
    return data;
  },
  createBook: async (form: {
    title: string;
    description: string;
    author: string;
    publicationYear: string;
  }): Promise<Response> => {
    const { data } = await instance.post(`book`, form);
    return data;
  },
  updateBook: async (form: {
    id: string;
    title?: string;
    description?: string;
    author?: string;
    publicationYear?: string;
  }): Promise<Response> => {
    const { data } = await instance.patch(`book`, form);
    return data;
  },
};
