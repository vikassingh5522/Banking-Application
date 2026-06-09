import IconifyIcon from 'components/base/IconifyIcon';
import { marketingFeatures, trustHighlights } from 'data/public-site';
import { Link } from 'react-router-dom';
import paths from 'routes/path';

const HomePage = () => {
  return (
    <div className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="m-0 text-sm font-black uppercase tracking-[0.2em] text-bank-blue">
              Platform Home
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-bank-ink md:text-5xl">
              Everything your finance team needs to run daily operations.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              ConnectBank brings banking, approvals, collections, compliance, and reports into a
              single workspace built for business speed.
            </p>
            <Link
              to={paths.login}
              className="mt-7 inline-flex rounded-full bg-bank-blue px-7 py-3 text-sm font-black text-white no-underline shadow-lg shadow-blue-200 hover:bg-blue-700"
            >
              Open Dashboard
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {marketingFeatures.map((feature) => (
              <div key={feature.title} className="rounded-3xl bg-white p-6 shadow-sm">
                <IconifyIcon icon={feature.icon} width={26} color="#2563EB" />
                <h2 className="mt-4 text-lg font-black text-bank-ink">{feature.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{feature.description}</p>
              </div>
            ))}
            <div className="rounded-3xl bg-bank-navy p-6 text-white shadow-soft">
              <IconifyIcon icon="lucide:shield-check" width={26} />
              <h2 className="mt-4 text-lg font-black">Built for trust</h2>
              <p className="mt-2 text-sm leading-6 text-blue-100">
                Keep every workflow auditable, permissioned, and ready for finance reviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="rounded-[2rem] bg-slate-50 p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-4">
              {trustHighlights.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-white p-4">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                    <IconifyIcon icon="lucide:check" width={18} />
                  </span>
                  <span className="text-sm font-bold text-bank-ink">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
