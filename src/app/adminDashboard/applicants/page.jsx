'use client';

import { useState } from 'react';
import styles from './applicants.module.css';

const sampleApplicants = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    nic: '123456789V',
    income: 50000,
    score: 700,
    status: 'Pending',
    date: '2025-05-01',
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    nic: '987654321V',
    income: 60000,
    score: 680,
    status: 'Approved',
    date: '2025-05-02',
  },
  {
    id: 3,
    name: 'Charlie Lee',
    email: 'charlie@example.com',
    nic: '456789123V',
    income: 55000,
    score: 720,
    status: 'Rejected',
    date: '2025-05-03',
  },
];

export default function ApplicantsPage() {
  const [applicants, setApplicants] = useState(sampleApplicants);
  const [selected, setSelected] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [minScoreFilter, setMinScoreFilter] = useState('');
  const [maxScoreFilter, setMaxScoreFilter] = useState('');

  const filteredApplicants = applicants.filter((a) => {
    const statusMatch = statusFilter === 'All' || a.status === statusFilter;
    const minScoreMatch = minScoreFilter === '' || a.score >= Number(minScoreFilter);
    const maxScoreMatch = maxScoreFilter === '' || a.score >= Number(maxScoreFilter);
    return statusMatch && minScoreMatch && maxScoreMatch;
  });

  const handleAccept = () => {
    if (!selected) return;
    const updated = applicants.map((a) =>
      a.id === selected.id ? { ...a, status: 'Approved' } : a
    );
    setApplicants(updated);
    setSelected({ ...selected, status: 'Approved' });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Loan Applicants</h1>
  
      <div className={styles.filters}>
        <label>
          Status:
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
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
            placeholder="e.g. 700"
            value={maxScoreFilter}
            onChange={(e) => setMaxScoreFilter(e.target.value)}
          />
        </label>

        <button className={styles.filterBtn} onClick={handleAccept}>
            Filter
        </button>
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
              <p className={styles.detailP}><strong>Applied On:</strong> {selected.date}</p>
              {selected.status === 'Pending' && (
                <button className={styles.acceptBtn} onClick={handleAccept}>
                  Accept Loan
                </button>
              )}
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
