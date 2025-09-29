import axios from "axios";

const API = "http://localhost:8000/api/v1";

export function setToken(token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export function clearToken() {
  delete axios.defaults.headers.common["Authorization"];
}

export const login = (data) => axios.post(`${API}/auth/token/`, data);
export const register = (data) => axios.post(`${API}/auth/register/`, data);
export const getNotes = () => axios.get(`${API}/notes/`);
export const addNote = (note) => axios.post(`${API}/notes/`, note);
export const deleteNote = (id) => axios.delete(`${API}/notes/${id}/`);

