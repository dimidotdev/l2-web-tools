import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-100 p-2 mb-5 text-white shadow-lg flex items-center">
      <div className="container mb-4 mt-4 items-center text-black">
        <Link href="/" className="p-2">Home</Link>
        <Link href="/nads" className="p-2">NADs List</Link>
      </div>
    </nav>
  );
}