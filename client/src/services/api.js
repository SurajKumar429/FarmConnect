const API_URL = 'http://localhost:5001/api';

// Helper function to get auth token
const getToken = () => localStorage.getItem('token');

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Something went wrong');
  }

  return response.json();
};

// Auth API
export const authAPI = {
  register: (userData) => apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  login: (credentials) => apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
};

// Farms API
export const farmsAPI = {
  getAll: () => apiCall('/farms'),
  getById: (id) => apiCall(`/farms/${id}`),
  create: (farmData) => apiCall('/farms', {
    method: 'POST',
    body: JSON.stringify(farmData),
  }),
};

// Crops API
export const cropsAPI = {
  getByFarm: (farmId) => apiCall(`/crops/farm/${farmId}`),
  create: (cropData) => apiCall('/crops', {
    method: 'POST',
    body: JSON.stringify(cropData),
  }),
};

// Expenses API
export const expensesAPI = {
  getByFarm: (farmId) => apiCall(`/expenses/farm/${farmId}`),
  getSummary: (farmId) => apiCall(`/expenses/summary/farm/${farmId}`),
  create: (expenseData) => apiCall('/expenses', {
    method: 'POST',
    body: JSON.stringify(expenseData),
  }),
};

// Diary API
export const diaryAPI = {
  getByFarm: (farmId) => apiCall(`/diary/farm/${farmId}`),
  create: (entryData) => apiCall('/diary', {
    method: 'POST',
    body: JSON.stringify(entryData),
  }),
};

// Yield API
export const yieldAPI = {
  getByCrop: (cropId) => apiCall(`/yield/crop/${cropId}`),
  create: (yieldData) => apiCall('/yield', {
    method: 'POST',
    body: JSON.stringify(yieldData),
  }),
};

// Resources API
export const resourcesAPI = {
  getByFarm: (farmId) => apiCall(`/resources/farm/${farmId}`),
  getSummary: (farmId) => apiCall(`/resources/summary/farm/${farmId}`),
  create: (resourceData) => apiCall('/resources', {
    method: 'POST',
    body: JSON.stringify(resourceData),
  }),
};

// Marketplace API
export const marketplaceAPI = {
  getAll: () => apiCall('/marketplace'),
  getMyListings: () => apiCall('/marketplace/my-listings'),
  create: (listingData) => apiCall('/marketplace', {
    method: 'POST',
    body: JSON.stringify(listingData),
  }),
};

// Market Prices API
export const marketPricesAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/market-prices?${queryString}`);
  },
};

// Learning API
export const learningAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/learning?${queryString}`);
  },
  getById: (id) => apiCall(`/learning/${id}`),
  getMyProgress: () => apiCall('/learning/progress/my-progress'),
  updateProgress: (progressData) => apiCall('/learning/progress', {
    method: 'POST',
    body: JSON.stringify(progressData),
  }),
};

