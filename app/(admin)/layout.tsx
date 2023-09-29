import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Provider from "@/components/Provider";
import AdminNav from "@/components/_AdminNav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Provider>
        <AdminNav />
        <div>{children}</div>
      </Provider>
    </main>
  );
}
