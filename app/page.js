import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Navbar from "@/components/Navbar/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Navbar/>
     <div className="bg-lightPink min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-softWhite">Welcome to HealthCart</h1>
        <p className="text-lg text-gray-800 mt-4">
          Your health, our priority. Explore resources, connect with doctors, and more.
        </p>
      </div>
      <Header/>
      <Footer/>
    </>
  );
}
