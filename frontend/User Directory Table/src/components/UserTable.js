import React from 'react';

const UserTable = ({ users, onSort, sortField, sortDirection }) => {
  const getSortClass = (field) => {
    if (sortField !== field) return 'sortable';
    return `sortable sort-${sortDirection}`;
  };

  const handleSort = (field) => {
    onSort(field);
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th 
              className={getSortClass('id')}
              onClick={() => handleSort('id')}
            >
              ID
            </th>
            <th 
              className={getSortClass('avatar')}
            >
              Avatar
            </th>
            <th 
              className={getSortClass('name')}
              onClick={() => handleSort('name')}
            >
              Name
            </th>
            <th 
              className={getSortClass('email')}
              onClick={() => handleSort('email')}
            >
              Email
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                <img 
                  src={user.avatar} 
                  alt={`${user.first_name} ${user.last_name}`}
                  className="user-avatar"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&background=3498db&color=fff`;
                  }}
                />
              </td>
              <td>
                <strong>{user.first_name} {user.last_name}</strong>
              </td>
              <td>{user.email}</td>
              <td>
                <button 
                  className="filter-select"
                  style={{ 
                    backgroundColor: '#3498db', 
                    color: 'white', 
                    border: 'none',
                    padding: '8px 12px',
                    fontSize: '14px'
                  }}
                  onClick={() => window.open(`mailto:${user.email}`, '_blank')}
                >
                  Contact
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
