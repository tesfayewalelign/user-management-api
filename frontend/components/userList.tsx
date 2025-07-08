'use client';

import { useEffect, useState } from 'react';
import { fetchUsers, deleteUser, User } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  const loadUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      alert('Failed to load users');
      console.error(error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      alert('Failed to delete user');
      console.error(error);
    }
  };

  const handleEdit = (id: number) => {
    if (!id) return;
    router.push(`/edit/${id}`);
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800"> User List</h2>

      {users.length === 0 ? (
        <p className="text-center text-gray-500 italic">No users found.</p>
      ) : (
        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between bg-white border border-gray-200 rounded-xl shadow-sm px-6 py-4 hover:shadow-md transition"
            >
              <div>
                <p className="text-lg font-medium text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(user.id)}
                  className="px-3 py-1 text-sm font-medium bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition"
                >
                   Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="px-3 py-1 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                >
                   Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
