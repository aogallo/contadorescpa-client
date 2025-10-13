interface CalculateValuesParams {
  exento: number | string;
  importation: number | string;
  service: number | string;
  asset: number | string;
}

/**
 * Calculates the total for an account payable
 * Total = asset + importation + service - exento
 * @param values - Object containing the different value types
 * @returns The calculated total
 */
export const calculateTotal = ({
  exento,
  importation,
  service,
  asset,
}: CalculateValuesParams): number => {
  const exentoNum = Number(exento) || 0;
  const importationNum = Number(importation) || 0;
  const serviceNum = Number(service) || 0;
  const assetNum = Number(asset) || 0;

  // Exento is subtracted because it represents a discount/exemption
  return assetNum + importationNum + serviceNum - exentoNum;
};

/**
 * Formats a number to a fixed number of decimal places
 * @param value - The number to format
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted number as string
 */
export const formatNumber = (value: number, decimals = 2): string => {
  return value.toFixed(decimals);
};

/**
 * Safely parses a string or number to a number
 * @param value - The value to parse
 * @param defaultValue - Default value if parsing fails
 * @returns The parsed number or default value
 */
export const safeParseNumber = (
  value: string | number | undefined,
  defaultValue = 0
): number => {
  if (value === undefined || value === null || value === '') {
    return defaultValue;
  }

  const parsed = Number(value);
  return isNaN(parsed) ? defaultValue : parsed;
};

