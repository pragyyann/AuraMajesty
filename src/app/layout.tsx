import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Aura Majesty Studio | Luxury Hair, Beauty & Grooming in Ghaziabad",
  description: "A premium unisex salon experience crafted for modern beauty, confidence, and self-care. Book premium hair styling, skin rituals, bridal makeup, and grooming services at Indirapuram, Ghaziabad.",
  keywords: ["salon", "luxury salon", "unisex salon", "haircut", "hair coloring", "facials", "bridal makeup", "men grooming", "Ghaziabad", "Indirapuram"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-bg-salon text-text-primary antialiased">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
