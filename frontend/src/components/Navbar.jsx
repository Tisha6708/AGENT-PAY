function Navbar() {
  return (
    <nav className="flex justify-between items-center">
      <h1 className="text-3xl font-bold text-violet-700">AgentPay</h1>

      <button className="px-5 py-2 rounded-xl border border-violet-200 hover:bg-violet-50 transition">
        Login
      </button>
    </nav>
  );
}

export default Navbar;