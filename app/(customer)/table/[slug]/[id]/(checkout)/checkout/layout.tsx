import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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
