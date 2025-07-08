'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditUserPage() {
  const { id } = useParams();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!id || !apiUrl) return;

    fetch(`${apiUrl}/users/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('User not found');
        return res.json();
      })
      .then(data => {
        setName(data.name);
        setEmail(data.email);
      })
      .catch(err => {
        console.error('Error fetching user:', err);
        alert('Failed to load user');
      });
  }, [id, apiUrl]);

  const handleUpdate = async () => {
    if (!apiUrl) return;

    try {
      const res = await fetch(`${apiUrl}/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        alert('Failed to update: ' + (error.error || 'Unknown error'));
        return;
      }

      alert('User updated successfully!');
      router.push('/');
    } catch (error) {
      alert('Network error during update');
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white p-8 rounded-xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center"> Edit User</h2>

     
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          id="name"
          className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter new name"
        />
      </div>

     
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          id="email"
          className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter new email"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password <span className="text-gray-400 text-xs">(Leave blank to keep current)</span>
        </label>
        <input
          id="password"
          className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter new password"
        />
      </div>

      <button
        onClick={handleUpdate}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
      >
         Update User
      </button>
    </div>
  );
}
