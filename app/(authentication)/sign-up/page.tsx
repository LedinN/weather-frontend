'use client';
import { IUser } from '@/app/_types/IUser';
import api from '@/utils/api';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function Signup() {
  const [user, setUser] = useState<IUser>({
    username: '',
    password: '',
    userRole: '',
  });
  const [message, setMessage] = useState('');
  const router = useRouter();

  function handleUserChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setUser((prevData) => ({ ...prevData, [name]: value }));
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    console.log('Payload before sending:', user);
    try {
      console.log('Backend URL:', process.env.NEXT_PUBLIC_BACKEND_URL);
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/user/register", {
       method: 'POST',
       headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(user),
      });
      if (response.ok) {
        setMessage('Registration successful.')
        setTimeout(() => {
          router.push('/sign-in')
        }, 2000)
      } else {
        const text = await response.text();
        setMessage('Registration failed: ' + text)
      }
    }  catch (error:any) {
      setMessage('An error ocurred: ' + error.message)
    }
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
