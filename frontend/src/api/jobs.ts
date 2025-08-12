import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function fetchJobs(params = {}) {
  const res = await axios.get(`${API_URL}/jobs`, { params });
  return res.data;
}

export async function fetchJob(id: string) {
  const res = await axios.get(`${API_URL}/jobs/${id}`);
  return res.data;
}

export async function createJob(data: any) {
  const res = await axios.post(`${API_URL}/jobs`, data);
  return res.data;
}

export async function updateJob(id: string, data: any) {
  const res = await axios.put(`${API_URL}/jobs/${id}`, data);
  return res.data;
}
