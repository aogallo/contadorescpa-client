export interface Client {
  id: number;
  name: string;
  nit: string;
  address: string;
  email: string;
  phone: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ClientFormValues {
  name: string;
  nit: string;
  address: string;
  email: string;
  phone: string;
}

