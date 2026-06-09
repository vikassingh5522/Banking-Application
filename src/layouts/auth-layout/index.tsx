import IconifyIcon from 'components/base/IconifyIcon';
import { publicNavLinks } from 'data/public-site';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import paths from 'routes/path';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-full px-4 py-2 text-sm font-semibold no-underline transition',
    isActive
      ? 'bg-blue-50 text-bank-blue'
      : 'text-slate-600 hover:bg-slate-100 hover:text-bank-ink',
  ].join(' ');

const AuthLayout = () => {
  const { pathname } = useLocation();
  const isSignup = pathname === paths.signup;

  return (
    <div className="public-site flex min-h-screen flex-col bg-slate-50 text-bank-ink">
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
              <NavLink
                key={link.path}
                to={link.path}
                className={navLinkClass}
                end={link.path === '/'}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={isSignup ? paths.login : paths.signup}
              className="rounded-full bg-bank-blue px-5 py-2 text-sm font-bold text-white no-underline shadow-lg shadow-blue-200 transition hover:bg-blue-700"
            >
              {isSignup ? 'Login' : 'Register'}
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-10 md:px-8">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between lg:px-8">
          <p className="m-0">(c) 2026 ConnectBank. Secure business banking starts here.</p>
          <div className="flex flex-wrap gap-4">
            <Link className="text-slate-500 no-underline hover:text-bank-blue" to="/">
              Landing
            </Link>
            <Link className="text-slate-500 no-underline hover:text-bank-blue" to="/about">
              About
            </Link>
            <Link className="text-slate-500 no-underline hover:text-bank-blue" to="/contact">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;
