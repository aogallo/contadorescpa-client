interface CurrencyFormatterOptions {
  region?: string;
  currency?: string;
}

/**
 * Formats a number as currency
 * @param value - The number or string to format
 * @param options - Formatting options (region and currency)
 * @returns Formatted currency string
 */
export const currencyFormatter = (
  value: number | string,
  { region = 'es-GT', currency = 'GTQ' }: CurrencyFormatterOptions = {}
): string => {
  const numericValue = Number(value);

  if (isNaN(numericValue)) {
    console.warn('Invalid number provided to currencyFormatter:', value);
    return new Intl.NumberFormat(region, {
      style: 'currency',
      currency,
    }).format(0);
  }

  return new Intl.NumberFormat(region, {
    style: 'currency',
    currency,
  }).format(numericValue);
};

/**
 * Parses a currency string to a number
 * @param currencyString - The currency string to parse
 * @returns The numeric value
 */
export const parseCurrency = (currencyString: string): number => {
  // Remove currency symbols, spaces, and thousands separators
  const cleaned = currencyString.replace(/[Q$,\s]/g, '');
  const parsed = parseFloat(cleaned);

  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Formats a number as currency for Guatemala (shorthand)
 * @param value - The number to format
 * @returns Formatted Quetzal currency string
 */
export const formatQuetzal = (value: number | string): string => {
  return currencyFormatter(value, { region: 'es-GT', currency: 'GTQ' });
};

