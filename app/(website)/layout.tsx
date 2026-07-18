import Navbar from "@/components/common/navbar";
import Footer from "@/components/web-componets/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
       <Navbar/> 
      <div className="bg-[#F4FAFA]">{children}</div>
       <Footer/>
    </div>
  );
}
