export interface Company {
  id: number;
  name: string;
  nit: string;
  address: string;
  phone: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CompanyState {
  selectedCompany: Company | null;
  companies: Company[];
}

