export interface ReportFilters {
  companyId?: number;
  providerId?: number;
  startDate?: string;
  endDate?: string;
  documentTypeId?: number;
}

export interface AccountPayableReportItem {
  id: number;
  invoiceNumber: string;
  providerName: string;
  invoiceDate: string;
  dueDate: string;
  total: number;
  status: string;
}

export interface ReportSummary {
  totalAmount: number;
  totalRecords: number;
  paidAmount: number;
  pendingAmount: number;
}

