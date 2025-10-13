import { Company } from './company';

export interface Provider {
  id: number;
  name: string;
  nit: string;
  address: string;
  email: string;
  phone: string;
  creditDay: number;
  companies: Company[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProviderFormValues {
  id?: number;
  name: string;
  nit: string;
  address: string;
  email: string;
  phone: string;
  creditDay: number;
}

