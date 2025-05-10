'use client';

import { useEffect, useState } from 'react';
import styles from './customerList.module.css';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', nic: '', email: '', income: '', score: '' });
  const [searchKeyword, setSearchKeyword] = useState('');

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const fetchCustomers = async (keyword = '') => {
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Unauthorized',
        text: 'Token missing. Please log in again.',
      });
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/admin/all-customer${keyword ? `?keyword=${keyword}` : ''}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success && Array.isArray(response.data.body)) {
        const transformed = response.data.body.map((c) => ({
          id: c.id,
          name: c.name,
          nic: c.nic,
          email: c.email,
          income: c.income,
          score: c.creditScore,
        }));
        setCustomers(transformed);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to fetch customers',
          text: response.data.message || 'Unexpected API response.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Server error while fetching customers',
      });
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    alert(id);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
      const response = await axios.delete(`http://localhost:8080/admin/delete-customer`, {
        params: { customerId: id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        setCustomers(customers.filter((c) => c.id !== id));
        if (editingId === id) setEditingId(null);
      } else {
        console.error('Delete failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting customer:', error.response?.data?.message || error.message);
    }
  };

  const handleEdit = (customer) => {
    setEditingId(customer.id);
    setForm(customer);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Unauthorized',
        text: 'Token missing. Please log in again.',
      });
      return;
    }
  
    try {
      const response = await axios.put(
        `http://localhost:8080/admin/update-customer?cusId=${editingId}`,
        {
          name: form.name,
          nic: form.nic,
          email: form.email,
          income: form.income,
          creditScore: form.score, // Map frontend score to backend's expected 'creditScore'
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Customer Updated',
          timer: 1500,
          showConfirmButton: false,
        });
  
        // Update customer list
        setCustomers(customers.map((c) => (c.id === editingId ? { ...form, id: editingId } : c)));
        setEditingId(null);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: response.data.message || 'Unknown error',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Server error during update',
      });
    }
  };
  

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:8080/admin/search-customer?cusKeyword=${searchKeyword}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data.success && Array.isArray(response.data.body)) {
        const transformed = response.data.body.map((c) => ({
          id: c.id,
          name: c.name,
          nic: c.nic,
          email: c.email,
          income: c.income,
          score: c.creditScore,
        }));
        setCustomers(transformed);
      } else {
        console.log('No customers found');
      }
    } catch (error) {
      console.error('Error during search:', error);
    }
  };
  

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Customers</h1>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search by name, NIC or email..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <ul className={styles.list}>
        {customers.map((customer) => (
          <li key={customer.id} className={styles.card}>
            {editingId === customer.id ? (
              <form onSubmit={handleUpdate} className={styles.form}>
                <input className={styles.inputFl} name="name" value={form.name} onChange={handleChange} required />
                <input className={styles.inputFl} name="nic" value={form.nic} onChange={handleChange} required />
                <input className={styles.inputFl} name="email" value={form.email} onChange={handleChange} required />
                <input className={styles.inputFl} type="number" name="income" value={form.income} onChange={handleChange} required />
                <input className={styles.inputFl} type="number" name="score" value={form.score} onChange={handleChange} required />
                <button className={styles.svBtn} type="submit">Save</button>
              </form>
            ) : (
              <>
                <p><strong>Name:</strong> {customer.name}</p>
                <p><strong>NIC:</strong> {customer.nic}</p>
                <p><strong>Email:</strong> {customer.email}</p>
                <p><strong>Income:</strong> Rs. {customer.income}</p>
                <p><strong>Score:</strong> {customer.score}</p>
                <div className={styles.actions}>
                  <button className={styles.btns} onClick={() => handleEdit(customer)}>Update</button>
                  <button onClick={() => handleDelete(customer.id)} className={styles.delete}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
