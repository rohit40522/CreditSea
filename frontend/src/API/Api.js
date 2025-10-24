import axios from 'axios';

const API_BASE_URL = 'https://creditsea-backend-hpf6.onrender.com/api'; // Adjust if needed

export const uploadXML = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(`${API_BASE_URL}/upload-xml`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getProfiles = async () => {
  const response = await axios.get(`${API_BASE_URL}/profiles`);
  return response.data;
};
