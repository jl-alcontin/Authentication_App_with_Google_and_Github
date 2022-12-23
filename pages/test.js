import { useState, useEffect } from 'react';
import { getSession } from "next-auth/react";

const Test = () => {
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
        <h5 key={user._id}>ID:{user._id} USERNAME:{user.username} EMAIL:{user.email}</h5>
      ))}
    </div>
  );
}
export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        premanent: false,
      },
    };
  }
  // authorize user return session
  return {
    props: { session },
  };
}
export default Test;