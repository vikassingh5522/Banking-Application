import IconifyIcon from 'components/base/IconifyIcon';
import { publicNavLinks } from 'data/public-site';
import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import paths from 'routes/path';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-full px-4 py-2 text-sm font-semibold transition',
    isActive
      ? 'bg-blue-50 text-bank-blue'
      : 'text-slate-600 hover:bg-slate-100 hover:text-bank-ink',
  ].join(' ');

const PublicLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="public-site min-h-screen bg-slate-50 text-bank-ink">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link to="/" className="flex items-center gap-3 no-underline">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-bank-blue text-white shadow-lg shadow-blue-200">
              <IconifyIcon icon="lucide:landmark" width={22} />
            </span>
            <span>
              <span className="block text-lg font-black tracking-tight text-bank-ink">
                ConnectBank
              </span>
              <span className="block text-xs font-semibold text-slate-500">for Business</span>
            </span>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {publicNavLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className={linkClass} end={link.path === '/'}>
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to={paths.login}
              className="rounded-full px-5 py-2 text-sm font-bold text-slate-700 no-underline transition hover:bg-slate-100"
            >
              Login
            </Link>
            <Link
              to={paths.signup}
              className="rounded-full bg-bank-blue px-5 py-2 text-sm font-bold text-white no-underline shadow-lg shadow-blue-200 transition hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-bank-ink md:hidden"
            onClick={() => setIsOpen((open) => !open)}
            aria-label="Toggle navigation"
          >
            <IconifyIcon icon={isOpen ? 'lucide:x' : 'lucide:menu'} width={20} />
          </button>
        </nav>

        {isOpen ? (
          <div className="border-t border-slate-100 bg-white px-5 py-4 md:hidden">
            <div className="flex flex-col gap-2">
              {publicNavLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={linkClass}
                  end={link.path === '/'}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-3">
                <Link
                  to={paths.login}
                  className="rounded-full border border-slate-200 px-4 py-2 text-center text-sm font-bold text-slate-700 no-underline"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to={paths.signup}
                  className="rounded-full bg-bank-blue px-4 py-2 text-center text-sm font-bold text-white no-underline"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between lg:px-8">
          <p className="m-0">(c) 2026 ConnectBank. Modern business banking for growing teams.</p>
          <div className="flex gap-4">
            <Link className="text-slate-500 no-underline hover:text-bank-blue" to="/about">
              About
            </Link>
            <Link className="text-slate-500 no-underline hover:text-bank-blue" to="/contact">
              Contact
            </Link>
            <Link className="text-slate-500 no-underline hover:text-bank-blue" to={paths.login}>
              Login
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
