export interface AccountPayable {
  id: number;
  providerId: number;
  companyId: number;
  documentTypeId: number;
  accountId: number;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  exento: number;
  importation: number;
  service: number;
  asset: number;
  total: number;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AccountPayableFormValues {
  providerId: number | string;
  companyId: number | string;
  documentTypeId: number | string;
  accountId: number | string;
  invoiceNumber: string;
  invoiceDate: Date | null;
  dueDate: Date | null;
  exento: string | number;
  importation: string | number;
  service: string | number;
  asset: string | number;
  description: string;
}

