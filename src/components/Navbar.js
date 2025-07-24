import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-bold">
          My First Summer Project 
        </Link>
        <div>
          <Link href="/about" className="text-white hover:text-white px-3 font-semibold">
            About
          </Link>
          <Link href="/contact" className="text-white hover:text-white px-3 font-semibold">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}