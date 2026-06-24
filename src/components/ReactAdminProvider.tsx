'use client';

import React from 'react';
import { CoreAdminContext } from 'ra-core';
import { authProvider, dataProvider } from '@/lib/ra-providers';

export default function ReactAdminProvider({ children }: { children: React.ReactNode }) {
  return (
    <CoreAdminContext dataProvider={dataProvider} authProvider={authProvider}>
      {children}
    </CoreAdminContext>
  );
}
