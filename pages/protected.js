import { getSession } from 'next-auth/react';

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default function ProtectedPage({ session }) {
  return (
    <div>
      <h1>Welcome, {session.user.name}!</h1>
      {/* Show options for logged-in users */}
    </div>
  );
}
