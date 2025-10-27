# User Directory Table

A React web application that fetches and displays user data from the ReqRes API with advanced filtering, sorting, and pagination features.

## Features

✅ **User Data Display**: Fetches and displays user information in a clean table format  
✅ **Search Functionality**: Search users by name or email  
✅ **Sorting**: Sort users by ID, name, or email (ascending/descending)  
✅ **Pagination**: Navigate through multiple pages of users  
✅ **Filtering**: Filter users by email domain, first letter, or last name  
✅ **Loading Spinner**: Shows loading state while fetching data  
✅ **Mobile Responsive**: Optimized for mobile and tablet devices  
✅ **Error Handling**: Graceful error handling with user-friendly messages  

<img width="1849" height="927" alt="Screenshot 2025-10-27 201454" src="https://github.com/user-attachments/assets/b0efd3f3-21f5-4c3e-b551-24f5549188ce" />

<img width="1834" height="871" alt="Screenshot 2025-10-27 201515" src="https://github.com/user-attachments/assets/54a003a3-87c4-4cae-9cba-e81283b6dfe7" />


## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone or download this project
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Running the Application

Start the development server:

```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

### Building for Production

To create a production build:

```bash
npm run build
```

## API Integration

This application integrates with the ReqRes API:
- **Base URL**: `https://reqres.in/api/users`
- **Features**: Fetches all available users and implements client-side filtering/sorting
- **Error Handling**: Graceful fallback for API failures

## Usage

### Search
- Use the search bar to find users by first name, last name, or email
- Search is case-insensitive and works in real-time

### Sorting
- Click on column headers (ID, Name, Email) to sort
- Click again to reverse the sort order
- Visual indicators show current sort direction

### Filtering
- Select filter type from dropdown:
  - **Email Domain**: Filter by email domain (e.g., "reqres.in")
  - **First Letter**: Filter by first letter of first name
  - **Last Name**: Filter by last name
- Enter filter value in the input field
- Use "Clear All" to reset all filters

### Pagination
- Navigate through pages using Previous/Next buttons
- Click page numbers to jump to specific pages
- Shows current page range and total items

## Technical Details

### Technologies Used
- **React 18**: Modern React with hooks
- **Axios**: HTTP client for API requests
- **CSS3**: Custom styling with responsive design
- **ES6+**: Modern JavaScript features

### Project Structure
```
src/
├── components/
│   ├── LoadingSpinner.js
│   ├── Pagination.js
│   ├── SearchBar.js
│   └── UserTable.js
├── services/
│   └── userService.js
├── App.js
├── index.js
└── index.css
```

### Key Features Implementation
- **State Management**: React hooks for local state
- **Performance**: useMemo for expensive calculations
- **Responsive Design**: CSS Grid and Flexbox
- **Accessibility**: Semantic HTML and keyboard navigation
- **Error Boundaries**: Graceful error handling

