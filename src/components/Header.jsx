export default function Header() {
  return (
    <header className="bg-[#1B1464] text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">The Read Shop</h1>
      <nav className="space-x-6">
        <a href="#" className="hover:underline">Home</a>
        <a href="#" className="hover:underline">Login</a>
        <a href="#" className="hover:underline">About</a>
      </nav>
    </header>
  );
}