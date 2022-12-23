import { useState, useEffect } from 'react';

const test = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/auth/userlist');
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, []);

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  return (
    <div>
      {users.map(user => (
        <h5 key={user._id}>{user.username}</h5>
      ))}
    </div>
  );
}

export default test;