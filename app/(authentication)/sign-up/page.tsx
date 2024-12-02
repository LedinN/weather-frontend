'use client';
import { IUser } from '@/app/_types/IUser';
import api from '@/utils/api';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function Signup() {
  const [user, setUser] = useState<IUser>({
    username: '',
    password: '',
    userRole: '',
  });
  const [message, setMessage] = useState<string>('');
  function handleUserChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setUser((prevData) => ({ ...prevData, [name]: value }));
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    console.log('Payload before sending:', user);
    fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(user),
    });
  }

  return (
    <>
      <div className="p-4">
        {/* <p>DEBUGGING: {user.username}</p>
        <p>DEBUGGING: {user.password}</p>
        <p>DEBUGGING: {user.userRole}</p> */}

        <header>Sign up</header>
        <section>
          <form onSubmit={onSubmit}>
            {/* USERNAME */}
            <section>
              <label htmlFor="username"></label>
              <input
                className="border"
                placeholder="username"
                type="text"
                name="username"
                onChange={handleUserChange}
              />
            </section>

            {/* PASSWORD */}
            <section>
              <label htmlFor="password"></label>
              <input
                className="border"
                placeholder="password"
                type="password"
                name="password"
                onChange={handleUserChange}
              />
            </section>

            {/* ROLE SELECT*/}
            <section>
              <label htmlFor="userRole">Role</label>
              <select
                className="border"
                name="userRole"
                onChange={handleUserChange}
              >
                <option value="ADMIN">ADMIN</option>
                <option value="USER">USER</option>
                <option value="GUEST">GUEST</option>
              </select>
            </section>

            <button className="border" type="submit">
              Register
            </button>
          </form>
        </section>
      </div>
    </>
  );
}
