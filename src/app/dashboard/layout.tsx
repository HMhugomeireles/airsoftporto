import { AdminMenu } from "./_components/AdminMenu";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AdminMenu />
      {children}
    </>
  );
}
