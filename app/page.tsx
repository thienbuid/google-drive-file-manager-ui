import Image from "next/image";
import GoogleDriveManager from "./components/FileManager";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-between sm:p-0 2xl:p-24 bg-black text-gray-950 break-words">
      <GoogleDriveManager />
    </main>
  );
}
