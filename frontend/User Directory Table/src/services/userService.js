import axios from 'axios';

const API_BASE_URL = 'https://reqres.in/api';

// Mock data as fallback
const mockUsers = [
  {
    id: 1,
    email: "george.bluth@reqres.in",
    first_name: "George",
    last_name: "Bluth",
    avatar: "https://reqres.in/img/faces/1-image.jpg"
  },
  {
    id: 2,
    email: "janet.weaver@reqres.in",
    first_name: "Janet",
    last_name: "Weaver",
    avatar: "https://reqres.in/img/faces/2-image.jpg"
  },
  {
    id: 3,
    email: "emma.wong@reqres.in",
    first_name: "Emma",
    last_name: "Wong",
    avatar: "https://reqres.in/img/faces/3-image.jpg"
  },
  {
    id: 4,
    email: "eve.holt@reqres.in",
    first_name: "Eve",
    last_name: "Holt",
    avatar: "https://reqres.in/img/faces/4-image.jpg"
  },
  {
    id: 5,
    email: "charles.morris@reqres.in",
    first_name: "Charles",
    last_name: "Morris",
    avatar: "https://reqres.in/img/faces/5-image.jpg"
  },
  {
    id: 6,
    email: "tracey.ramos@reqres.in",
    first_name: "Tracey",
    last_name: "Ramos",
    avatar: "https://reqres.in/img/faces/6-image.jpg"
  },
  {
    id: 7,
    email: "michael.lawson@reqres.in",
    first_name: "Michael",
    last_name: "Lawson",
    avatar: "https://reqres.in/img/faces/7-image.jpg"
  },
  {
    id: 8,
    email: "lindsay.ferguson@reqres.in",
    first_name: "Lindsay",
    last_name: "Ferguson",
    avatar: "https://reqres.in/img/faces/8-image.jpg"
  },
  {
    id: 9,
    email: "tobias.funke@reqres.in",
    first_name: "Tobias",
    last_name: "Funke",
    avatar: "https://reqres.in/img/faces/9-image.jpg"
  },
  {
    id: 10,
    email: "byron.fields@reqres.in",
    first_name: "Byron",
    last_name: "Fields",
    avatar: "https://reqres.in/img/faces/10-image.jpg"
  },
  {
    id: 11,
    email: "george.edwards@reqres.in",
    first_name: "George",
    last_name: "Edwards",
    avatar: "https://reqres.in/img/faces/11-image.jpg"
  },
  {
    id: 12,
    email: "rachel.howell@reqres.in",
    first_name: "Rachel",
    last_name: "Howell",
    avatar: "https://reqres.in/img/faces/12-image.jpg"
  }
];

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add request interceptor for debugging
apiClient.interceptors.request.use(
  (config) => {
    console.log('Making API request:', config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
apiClient.interceptors.response.use(
  (response) => {
    console.log('API response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export const userService = {
  // Fetch users with pagination
  async getUsers(page = 1, perPage = 6) {
    try {
      const response = await apiClient.get('/users', {
        params: {
          page,
          per_page: perPage
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      console.log('Falling back to mock data...');
      
      // Return mock data as fallback
      const startIndex = (page - 1) * perPage;
      const endIndex = startIndex + perPage;
      const paginatedUsers = mockUsers.slice(startIndex, endIndex);
      
      return {
        page,
        per_page: perPage,
        total: mockUsers.length,
        total_pages: Math.ceil(mockUsers.length / perPage),
        data: paginatedUsers
      };
    }
  },

  // Fetch all users (for client-side filtering and sorting)
  async getAllUsers() {
    try {
      const allUsers = [];
      let page = 1;
      let hasMorePages = true;

      while (hasMorePages) {
        const response = await apiClient.get('/users', {
          params: {
            page,
            per_page: 6
          }
        });

        allUsers.push(...response.data.data);
        hasMorePages = page < response.data.total_pages;
        page++;
      }

      return {
        data: allUsers,
        total: allUsers.length,
        total_pages: Math.ceil(allUsers.length / 6)
      };
    } catch (error) {
      console.error('Error fetching all users:', error);
      console.log('Falling back to mock data...');
      
      // Return mock data as fallback
      return {
        data: mockUsers,
        total: mockUsers.length,
        total_pages: Math.ceil(mockUsers.length / 6)
      };
    }
  },

  // Get user by ID
  async getUserById(id) {
    try {
      const response = await apiClient.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      console.log('Falling back to mock data...');
      
      // Return mock data as fallback
      const user = mockUsers.find(u => u.id === parseInt(id));
      if (user) {
        return { data: user };
      } else {
        throw new Error(`User with ID ${id} not found.`);
      }
    }
  }
};