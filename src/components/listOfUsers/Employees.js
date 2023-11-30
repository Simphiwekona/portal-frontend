import React, { useState, useEffect } from 'react';
import './employee.css'


function Employees() {
  const [employeeData, setEmployeeData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCriteria, setFilterCriteria] = useState('');

  const fetchData = () => {
    fetch("http://localhost:8080/api/v1/getAll")
      .then(response => response.json())
      .then(data => setEmployeeData(data))
      .catch(error => console.error('Error fetching data: ', error));
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const filteredEmployees = employeeData.filter(employee => {
    const fullName = `${employee.firstName} ${employee.lastName}`;
    return (
      fullName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterCriteria === '' || employee.jobTitle === filterCriteria)
    );
  });

  return (
    <div className='employeeList mt-5'>
      <div className='mb-3 search'>
        <input
          type='text'
          placeholder='Search'
          className='form-control'
          id='searchInput'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>First Name</th>
            <th scope='col'>Last Name</th>
            <th scope='col'>Job Title</th>
            <th scope='col'>Description</th>
            <th scope='col'>Email</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.documentId}>
              <th scope='row'>{employee.documentId}</th>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.jobTitle}</td>
              <td>{employee.description}</td>
              <td>{employee.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Employees;