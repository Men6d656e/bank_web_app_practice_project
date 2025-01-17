import MobileNavbar from "@/components/MobileNavbar";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const logedIn = { firstName : "Akash" , lastName : "Mirza"};
  return (
    <main className="flex h-screen w-full font-inter">
        <Sidebar user={logedIn} />

        <div className="flex size-full flex-col">
          <div className="root-layout">
            <Image src="/icons/logo.svg" alt="logo" width={30} height={30} />
            <div>
              <MobileNavbar user={logedIn} />
            </div>
          </div>
        {children}
        </div>
    </main>
  );
}
