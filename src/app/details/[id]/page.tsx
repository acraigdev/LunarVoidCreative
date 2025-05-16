export default async function Details({ params }: { params: { id: string } }) {
  const { id } = await params;
  // https://firebase.google.com/docs/auth/admin/verify-id-tokens
  return (
    <div>
      <h1>Details: {id}</h1>
    </div>
  );
}
