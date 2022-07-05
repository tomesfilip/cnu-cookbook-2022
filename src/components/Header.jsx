import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full bg-slate-600">
      <nav className="container mx-auto py-2 flex justify-between items-center text-white">
        <a href="/" className="text-4xl">
          Cookbook
        </a>
        <Link
          to="/prilohy"
          className="text-xl border-2 border-slate-400 rounded px-4 py-2 transition-all hover:rounded-xl hover:bg-slate-400"
        >
          Přílohy
        </Link>
      </nav>
    </header>
  );
};

export default Header;
