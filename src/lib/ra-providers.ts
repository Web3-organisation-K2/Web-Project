import { AuthProvider, DataProvider } from 'ra-core';
import { SESSIONS, SPEAKERS } from '@/lib/mock-data';

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

// Simple in-memory storage for our mock data
let mockData = {
  sessions: [...SESSIONS],
  speakers: [...SPEAKERS],
};

export const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const data = mockData[resource as keyof typeof mockData] || [];
    return {
      data: data as any,
      total: data.length,
    };
  },
  getOne: async (resource, params) => {
    const data = mockData[resource as keyof typeof mockData] || [];
    const record = data.find((item: any) => item.id === params.id);
    return { data: record as any };
  },
  getMany: async (resource, params) => {
    const data = mockData[resource as keyof typeof mockData] || [];
    const records = data.filter((item: any) => params.ids.includes(item.id));
    return { data: records as any };
  },
  getManyReference: async (resource, params) => {
    const data = mockData[resource as keyof typeof mockData] || [];
    const records = data.filter((item: any) => item[params.target] === params.id);
    return { data: records as any, total: records.length };
  },
  create: async (resource, params) => {
    const newRecord = { ...params.data, id: `${resource}-${Date.now()}` };
    if (mockData[resource as keyof typeof mockData]) {
      (mockData[resource as keyof typeof mockData] as any[]).push(newRecord);
    }
    return { data: newRecord as any };
  },
  update: async (resource, params) => {
    const data = mockData[resource as keyof typeof mockData];
    if (data) {
      const index = data.findIndex((item: any) => item.id === params.id);
      if (index !== -1) {
        data[index] = { ...data[index], ...params.data };
        return { data: data[index] as any };
      }
    }
    return { data: params.data as any };
  },
  updateMany: async (resource, params) => {
    const data = mockData[resource as keyof typeof mockData];
    if (data) {
      params.ids.forEach(id => {
        const index = data.findIndex((item: any) => item.id === id);
        if (index !== -1) {
          data[index] = { ...data[index], ...params.data };
        }
      });
    }
    return { data: params.ids };
  },
  delete: async (resource, params) => {
    const data = mockData[resource as keyof typeof mockData];
    let deletedRecord = params.previousData;
    if (data) {
      const index = data.findIndex((item: any) => item.id === params.id);
      if (index !== -1) {
        deletedRecord = data[index] as any;
        data.splice(index, 1);
      }
    }
    return { data: deletedRecord as any };
  },
  deleteMany: async (resource, params) => {
    if (mockData[resource as keyof typeof mockData]) {
      mockData[resource as keyof typeof mockData] = mockData[resource as keyof typeof mockData].filter(
        (item: any) => !params.ids.includes(item.id)
      ) as any;
    }
    return { data: params.ids };
  },
};