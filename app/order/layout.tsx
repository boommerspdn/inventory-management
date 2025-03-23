export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="size-full px-6 py-8">{children}</div>;
}
