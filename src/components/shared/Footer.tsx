const Footer = () => {
  return (
    <footer className="w-full px-8 py-4 bg-slate-600 text-white">
      <div className="container mx-auto">
        <a href="https://www.cngroup.dk/" target="_blank" rel="noreferrer">
          &copy; {new Date().getFullYear()} &middot; CN Group CZ a.s.
        </a>
      </div>
    </footer>
  );
};

export default Footer;
