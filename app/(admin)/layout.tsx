import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Provider from "@/components/Provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Provider>{children}</Provider>
    </main>
  );
}
