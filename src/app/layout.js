import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/component/Header";
import Footer from "@/component/Footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Alcabi | Portal Cliente",
    description: "Portal de autogestión para clientes de Alcabi",
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Header />
                <main className="min-h-[calc(100vh-130px)]">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
