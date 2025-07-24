import Link from 'next/link';
import Button from '@/components/Button';
import Counter from '@/components/Counter';

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white py-8 text-center">
        <h1 className="text-4xl font-bold mb-2">Welcome to My Summer Project</h1>
        <p className="text-lg">Your one-stop destination for learning and fun!</p>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center space-y-6">
        <div className="bg-white rounded-lg shadow p-8 max-w-xl w-full text-center">
          <h2 className="text-2xl font-bold mb-4">About This Project</h2>
          <p className="mb-6 text-gray-700">
            Explore my summer project! Check out the different sections using the navigation above.
          </p>
          <Link href="/projects" className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-semibold">
            View Projects
          </Link>
        </div>
        <div className="flex space-x-4">
          <Button text="click" className="bg-blue-500" />
          <Button text="clc" className="bg-amber-500" />
        </div>
        <Counter />
      </main>
      <footer className="bg-gray-900 text-white text-center py-4">
        &copy; 2025 My Summer Project
      </footer>
    </div>
  );
}