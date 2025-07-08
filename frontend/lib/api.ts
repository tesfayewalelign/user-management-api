const API_URL = process.env.NEXT_PUBLIC_API_URL || '';


export interface User {
  id: number;
  name: string;
  email: string;
}


export interface CreateUserData {
  name: string;
  email: string;
  password: string; 
}

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${API_URL}/users`);
  if (!res.ok) throw new Error('Failed to fetch users');
  
  const users: User[] = await res.json();
  
 
  return users.map(user => {
    const { password, ...safeUser } = user as any;
    return safeUser;
  });
}

export async function createUser(user: CreateUserData): Promise<void> {
  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error('Failed to create user');
}

export async function deleteUser(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete user');
}











