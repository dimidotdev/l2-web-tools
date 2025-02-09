import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-8 text-white shadow-lg flex items-center">
      <div className="container mx-auto items-center">
        <Link href="/" className="p-2">Home</Link>
        <Link href="/nads" className="p-2">NADs List</Link>
      </div>
    </nav>
  );
}