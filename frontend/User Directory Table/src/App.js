import React, { useState, useEffect, useMemo } from 'react';
import { userService } from './services/userService';
import UserTable from './components/UserTable';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterType, setFilterType] = useState('all');
  const [filterValue, setFilterValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [usingMockData, setUsingMockData] = useState(false);

  // Fetch all users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await userService.getAllUsers();
        setUsers(response.data);
        setUsingMockData(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        // Check if we're using mock data (no error message means fallback was used)
        if (err.message.includes('mock data')) {
          setUsingMockData(true);
          setUsers([]);
        } else {
          setError('Failed to fetch users. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter and search users
  const filteredUsers = useMemo(() => {
    let filtered = [...users];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply additional filters
    if (filterType !== 'all' && filterValue) {
      switch (filterType) {
        case 'domain':
          filtered = filtered.filter(user => 
            user.email.toLowerCase().includes(filterValue.toLowerCase())
          );
          break;
        case 'firstLetter':
          filtered = filtered.filter(user => 
            user.first_name.toLowerCase().startsWith(filterValue.toLowerCase())
          );
          break;
        case 'lastName':
          filtered = filtered.filter(user => 
            user.last_name.toLowerCase().startsWith(filterValue.toLowerCase())
          );
          break;
        default:
          break;
      }
    }

    return filtered;
  }, [users, searchTerm, filterType, filterValue]);

  // Sort users
  const sortedUsers = useMemo(() => {
    if (!sortField) return filteredUsers;

    return [...filteredUsers].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Handle nested properties
      if (sortField === 'name') {
        aValue = `${a.first_name} ${a.last_name}`;
        bValue = `${b.first_name} ${b.last_name}`;
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [filteredUsers, sortField, sortDirection]);

  // Paginate users
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedUsers.slice(startIndex, endIndex);
  }, [sortedUsers, currentPage, itemsPerPage]);

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1); // Reset to first page when sorting
  };

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle filter
  const handleFilter = (type, value) => {
    setFilterType(type);
    setFilterValue(value);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate total pages
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

  if (loading) {
    return (
      <div className="container">
        <div className="header">
          <h1>User Directory Table</h1>
          <p>Loading user data...</p>
        </div>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="header">
          <h1>User Directory Table</h1>
        </div>
        <div className="error-message">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header">
        <h1>User Directory Table</h1>
        <p>Browse and manage user information from ReqRes API</p>
        {usingMockData && (
          <div style={{ 
            background: '#f39c12', 
            color: 'white', 
            padding: '10px', 
            borderRadius: '5px', 
            marginTop: '10px',
            fontSize: '14px'
          }}>
            ⚠️ Using mock data - API connection failed
          </div>
        )}
      </div>

      <SearchBar 
        onSearch={handleSearch}
        onFilter={handleFilter}
        filterType={filterType}
        filterValue={filterValue}
      />

      <UserTable 
        users={paginatedUsers}
        onSort={handleSort}
        sortField={sortField}
        sortDirection={sortDirection}
      />

      {sortedUsers.length === 0 && (
        <div className="no-results">
          No users found matching your criteria.
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        totalItems={sortedUsers.length}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}

export default App;
