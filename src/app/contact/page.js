import Link from 'next/link';

export default function AboutPage() {
  return (
    <div>
      <h1>Contact Page</h1>
      <p>This is the about page of my summer project.</p>
      Go back to <Link href="/">Home</Link>
    </div>
  );
}