  // Function to get query parameters
  export const getQueryParams = (search) => {
    const params = new URLSearchParams(search);
    return {
      saleId: params.get('saleId'),
    };
  };
  export function formatDate(dateString) {
    const date = new Date(dateString);
  
    const day = date.getDate(); // Get the day of the month (1-31)
    const month = date.toLocaleString('default', { month: 'short' }); // Get the month name (e.g., November)
    const year = date.getFullYear(); // Get the full year (e.g., 2020)
  
    return `${day}-${month}-${year}`;
  }