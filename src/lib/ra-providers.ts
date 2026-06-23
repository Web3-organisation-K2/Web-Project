import { AuthProvider } from 'react-admin';

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Connexion impossible');
    }

    localStorage.setItem('user', JSON.stringify(data.user));
    return Promise.resolve();
  },

  logout: async () => {
    localStorage.removeItem('user');
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    return Promise.resolve();
  },

  checkAuth: async () => {
    const user = localStorage.getItem('user');
    if (!user) return Promise.reject();
    return Promise.resolve();
  },

  checkError: async (error) => {
    const status = error?.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('user');
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getIdentity: async () => {
    const raw = localStorage.getItem('user');
    if (!raw) return Promise.reject();
    const user = JSON.parse(raw);
    return Promise.resolve({
      id: user.id,
      fullName: user.name,
      avatar: user.avatar,
    });
  },

  getPermissions: async () => Promise.resolve(undefined),
};