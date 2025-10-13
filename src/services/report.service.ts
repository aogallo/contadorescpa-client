import api from './api';
import {
  ReportFilters,
  AccountPayableReportItem,
  ReportSummary,
} from 'types/report';
import { ApiResponse } from 'types/common';

export const reportService = {
  /**
   * Gets accounts payable report with filters
   * @param filters - Report filters
   * @returns Array of report items
   */
  getAccountsPayableReport: async (
    filters: ReportFilters
  ): Promise<AccountPayableReportItem[]> => {
    const response = await api.get<ApiResponse<AccountPayableReportItem[]>>(
      '/reports/accounts-payable',
      { params: filters }
    );
    return response.data.data;
  },

  /**
   * Gets accounts payable report summary
   * @param filters - Report filters
   * @returns Report summary with totals
   */
  getAccountsPayableSummary: async (filters: ReportFilters): Promise<ReportSummary> => {
    const response = await api.get<ApiResponse<ReportSummary>>(
      '/reports/accounts-payable/summary',
      { params: filters }
    );
    return response.data.data;
  },

  /**
   * Exports accounts payable report to Excel
   * @param filters - Report filters
   * @returns Blob containing the Excel file
   */
  exportAccountsPayableToExcel: async (filters: ReportFilters): Promise<Blob> => {
    const response = await api.get('/reports/accounts-payable/export', {
      params: filters,
      responseType: 'blob',
    });
    return response.data;
  },

  /**
   * Exports accounts payable report to PDF
   * @param filters - Report filters
   * @returns Blob containing the PDF file
   */
  exportAccountsPayableToPDF: async (filters: ReportFilters): Promise<Blob> => {
    const response = await api.get('/reports/accounts-payable/export/pdf', {
      params: filters,
      responseType: 'blob',
    });
    return response.data;
  },
};

