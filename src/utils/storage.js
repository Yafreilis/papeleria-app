// src/utils/storage.js

const USERS_KEY = 'papeleria_users_v1';
const PRODUCTS_KEY = 'papeleria_products_v1';
const SESSION_KEY = 'papeleria_session_v1';

export function initStorage() {
  const users = JSON.parse(localStorage.getItem(USERS_KEY));
  if (!users) {
    const defaultUsers = [
      { username: 'admin', password: 'admin123', role: 'admin', name: 'Administrador' },
      { username: 'empleado', password: 'empleado123', role: 'employee', name: 'Empleado' }
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  }

  const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY));
  if (!products) {
    const sample = [
      { id: 1, name: 'Lápiz HB', category: 'Escritura', price: 0.5, stock: 150 },
      { id: 2, name: 'Cuaderno A4', category: 'Papel', price: 2.75, stock: 75 }
    ];
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(sample));
  }
}

export function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

export function getProducts() {
  return JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
}

export function saveProducts(products) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

export function saveSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function getSession() {
  return JSON.parse(localStorage.getItem(SESSION_KEY));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
