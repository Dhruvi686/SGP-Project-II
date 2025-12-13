export const metadata = {
  title: 'My Bookings',
  description: 'View and manage your trip bookings',
};

export default function BookingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  );
}
