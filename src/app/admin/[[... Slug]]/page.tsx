'use client';


import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  CreateGuesser,
  ShowGuesser,
} from 'react-admin';
import { CalendarDays, Mic, DoorOpen, ListChecks, MessageSquare } from 'lucide-react';

import { authProvider, dataProvider } from '@/lib/ra-providers';

const eventSyncTheme = {
  palette: {
    mode: 'dark' as const,
    primary: { main: '#39FF14' }, 
    secondary: { main: '#FF8C00' }, 
    background: {
      default: '#0a0a0a', 
      paper: '#141414',
    },
  },
};


const Dashboard = () => (
  <div style={{ padding: 24 }}>
    <h2 style={{ marginBottom: 8 }}>Bienvenue sur EventSync Admin 👋</h2>
    <p style={{ opacity: 0.7 }}>
      Utilise le menu à gauche pour gérer les événements, sessions, salles,
      intervenants et questions.
    </p>
  </div>
);


function RedirectToCustomLogin() {
  if (typeof window !== 'undefined') {
    window.location.href = '/admin/login';
  }
  return null;
}

export default function AdminPage() {
  return (
    <Admin
   
      basename="/admin"
     
      authProvider={authProvider}
      dataProvider={dataProvider}

      theme={eventSyncTheme}
     
      dashboard={Dashboard}
   
      requireAuth
      loginPage={RedirectToCustomLogin}
    >
 

      <Resource
        name="events" 
        list={ListGuesser}
        edit={EditGuesser}
        create={CreateGuesser}
        show={ShowGuesser}
        icon={CalendarDays}
        options={{ label: 'Événements' }}
      />

      <Resource
        name="sessions" 
        list={ListGuesser}
        edit={EditGuesser}
        create={CreateGuesser}
        show={ShowGuesser}
        icon={ListChecks}
        options={{ label: 'Sessions' }}
      />

      <Resource
        name="rooms" 
        list={ListGuesser}
        edit={EditGuesser}
        create={CreateGuesser}
        show={ShowGuesser}
        icon={DoorOpen}
        options={{ label: 'Salles' }}
      />

      <Resource
        name="speakers" 
        list={ListGuesser}
        edit={EditGuesser}
        create={CreateGuesser}
        show={ShowGuesser}
        icon={Mic}
        options={{ label: 'Intervenants' }}
      />

      <Resource
        name="questions" 
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
        icon={MessageSquare}
        options={{ label: 'Questions' }}
      
      />
    </Admin>
  );
}
