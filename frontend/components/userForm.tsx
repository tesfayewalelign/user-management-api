'use client';
import { useState, FormEvent } from 'react';
import { createUser } from '@/lib/api';

interface UserFormProps {
  onUserCreated: () => void;
}

export default function UserForm({ onUserCreated }: UserFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return alert('Please fill all fields');

    try {
      await createUser({ name, email, password });
      setName('');
      setEmail('');
      setPassword('');
      onUserCreated();
    } catch (error) {
      alert('Error creating user');
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-gray-50 p-6 rounded-xl shadow-md border border-gray-200"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Add New User</h2>

    <div>
  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
    Name
  </label>
  <input
    id="name"
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="Enter full name"
    required
    className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>


     
      <div>
  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
    Email
  </label>
  <input
    id="email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Enter email address"
    required
    className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>


      <div>
  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
    Password
  </label>
  <input
    id="password"
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Enter password"
    required
    className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>


     
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
      >
         Create User
      </button>
    </form>
  );
}
