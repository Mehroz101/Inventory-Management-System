  // Function to get query parameters
  export const getQueryParams = (search) => {
    const params = new URLSearchParams(search);
    return {
      saleId: params.get('saleId'),
    };
  };
