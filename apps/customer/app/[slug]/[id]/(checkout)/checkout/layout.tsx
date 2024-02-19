import Nav from "@customer/components/Nav";
import Footer from "@customer/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      {/* <Nav /> */}
      {children}
      {/* <Footer /> */}
    </main>
  );
}
