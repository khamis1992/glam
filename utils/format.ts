/**
 * Format a number as currency
 * @param value Number to format
 * @param currency Currency symbol
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number, currency: string = '$'): string => {
  return `${currency}${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
};

/**
 * Format a date string
 * @param dateString Date string to format
 * @param format Format to use
 * @returns Formatted date string
 */
export const formatDate = (dateString: string, format: 'short' | 'medium' | 'long' = 'medium'): string => {
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    return dateString; // Return original string if invalid date
  }
  
  switch (format) {
    case 'short':
      return date.toLocaleDateString();
    case 'long':
      return date.toLocaleDateString(undefined, { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    case 'medium':
    default:
      return date.toLocaleDateString(undefined, { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
  }
};

/**
 * Format a time string
 * @param timeString Time string to format
 * @returns Formatted time string
 */
export const formatTime = (timeString: string): string => {
  const date = new Date(`2000-01-01T${timeString}`);
  
  if (isNaN(date.getTime())) {
    return timeString; // Return original string if invalid time
  }
  
  return date.toLocaleTimeString(undefined, { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
};