export interface DocumentType {
  id: number;
  name: string;
  code: string;
  description?: string;
}

export interface Account {
  id: number;
  name: string;
  code: string;
  type?: string;
  description?: string;
}

