import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-900 mb-4">
        Welcome to CODEENGINEER ADMIN PANEL
      </h1>
      <Link
        href="/signin"
        className="bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 text-center"
      >
        Get Started
      </Link>
    </div>
  );
}
