'use client';

import { useState } from 'react';
import UserForm from '@/components/userForm';
import UserList from '@/components/userList';

export default function HomePage() {
 
  const [refresh, setRefresh] = useState(false);

  return (
    <main className="max-w-4xl mx-auto px-6 py-10 bg-white shadow-xl rounded-2xl mt-10 border border-gray-200">
  <h1 className="text-4xl font-extrabold mb-10 text-center text-indigo-700 tracking-tight">
     User Management System
  </h1>

  <section className="mb-12">
    <UserForm onUserCreated={() => setRefresh(!refresh)} />
  </section>

  <section>
    <UserList key={refresh ? 'r1' : 'r2'} />
  </section>
</main>
  )
}
