'use client';

import { useEffect, useState } from 'react';
import styles from './applicants.module.css';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function ApplicantsPage() {
  const [applicants, setApplicants] = useState([]);
  const [selected, setSelected] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [minScoreFilter, setMinScoreFilter] = useState('');
  const [maxScoreFilter, setMaxScoreFilter] = useState('');

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const fetchApplicants = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/all-loan', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        const transformed = response.data.body.map((a) => ({
          id: a.id,
          name: a.name,
          email: a.email,
          nic: a.nic,
          income: a.income,
          score: a.creditScore,
          status: a.status,
          amount: a.loanAmount,
          installment: a.installment,
          reason: a.reason,
          date: new Date(a.requestedDate).toISOString().split('T')[0],
        }));
        setApplicants(transformed);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to fetch applicants',
          text: response.data.message || 'Unexpected API response.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Server error while fetching applicants',
      });
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const filteredApplicants = applicants.filter((a) => {
    const statusMatch = statusFilter === 'All' || a.status === statusFilter;
    const minScoreMatch = minScoreFilter === '' || a.score >= Number(minScoreFilter);
    const maxScoreMatch = maxScoreFilter === '' || a.score <= Number(maxScoreFilter);
    return statusMatch && minScoreMatch && maxScoreMatch;
  });

  const handleCustomerHistory = async () => {
    
    try {
      const response = await axios.get('http://localhost:8080/admin/single-customer-loan', {
        params: {
          loanId: selected.id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.data.success) {
        const transformed = response.data.body.map((a) => ({
          id: a.id,
          name: a.name,
          email: a.email,
          nic: a.nic,
          income: a.income,
          score: a.creditScore,
          status: a.status,
          amount: a.loanAmount,
          installment: a.installment,
          reason: a.reason,
          date: new Date(a.requestedDate).toISOString().split('T')[0],
        }));
        setApplicants(transformed);
      } else {
        console.error('Failed to fetch loan history:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching customer loan history:', error);
    }
  };
     


  const handleAccept = async () => {
    if (!selected) return;
  
    try {
      const response = await axios.put(
        `http://localhost:8080/admin/update-status`,
        {}, 
        {
          params: {
            loanId: selected.id,
            status: 'ON GOING',
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.data.success) {
        const updated = applicants.map((a) =>
          a.id === selected.id ? { ...a, status: 'ON GOING' } : a
        );
        setApplicants(updated);
        setSelected({ ...selected, status: 'ON GOING' });
      } else {
        console.error('Failed to update status:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating loan status:', error);
    }
  };
  
  
  

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Loan Applicants</h1>

      <div className={styles.filters}>
        <label>
          Status:
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="ELIGIBLE">Eligible</option>
            <option value="NOT ELIGIBLE">Not Eligible</option>
            <option value="ON GOING">ON GOING</option>
          </select>
        </label>

        <label>
          Min Credit Score:
          <input
            type="number"
            placeholder="e.g. 700"
            value={minScoreFilter}
            onChange={(e) => setMinScoreFilter(e.target.value)}
          />
        </label>

        <label>
          Max Credit Score:
          <input
            type="number"
            placeholder="e.g. 750"
            value={maxScoreFilter}
            onChange={(e) => setMaxScoreFilter(e.target.value)}
          />
        </label>

      </div>

      <div className={styles.content}>
        <div className={styles.leftPanel}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplicants.map((applicant) => (
                <tr
                  key={applicant.id}
                  onClick={() => setSelected(applicant)}
                  className={selected?.id === applicant.id ? styles.selected : ''}
                >
                  <td>{applicant.name}</td>
                  <td>{applicant.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.rightPanel}>
          {selected ? (
            <div className={styles.details}>
              <h2>Applicant Details</h2>
              <p className={styles.detailP}><strong>Name:</strong> {selected.name}</p>
              <p className={styles.detailP}><strong>Email:</strong> {selected.email}</p>
              <p className={styles.detailP}><strong>NIC:</strong> {selected.nic}</p>
              <p className={styles.detailP}><strong>Income:</strong> Rs. {selected.income}</p>
              <p className={styles.detailP}><strong>Credit Score:</strong> {selected.score}</p>
              <p className={styles.detailP}><strong>Status:</strong> {selected.status}</p>
              <p className={styles.detailP}><strong>Amount:</strong> Rs. {selected.amount}</p>
              <p className={styles.detailP}><strong>Installment:</strong> {selected.installment}</p>
              <p className={styles.detailP}><strong>Reason:</strong> {selected.reason}</p>
              <p className={styles.detailP}><strong>Applied On:</strong> {selected.date}</p>
              
              {selected.status === 'ELIGIBLE' && (
                <button className={styles.acceptBtn} onClick={handleAccept}>
                  Accept Loan
                </button>
              )}
              <button className={styles.cusBtn} onClick={handleCustomerHistory}>
                  Customer Loan History
                </button>
            </div>
          ) : (
            <div className={styles.detailsPlaceholder}>
              <p>Select an applicant to view details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
