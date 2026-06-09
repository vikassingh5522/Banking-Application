import IconifyIcon from 'components/base/IconifyIcon';
import { marketingFeatures, publicStats } from 'data/public-site';
import { Link } from 'react-router-dom';
import paths from 'routes/path';

const LandingPage = () => {
  return (
    <div>
      <section className="relative overflow-hidden bg-white">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-100 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-24">
          <div className="relative z-10">
            <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-bank-blue">
              Business banking, payments, tax, and insights in one place
            </span>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-tight tracking-tight text-bank-ink md:text-6xl">
              A modern finance command center for Indian businesses.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              ConnectBank helps owners and finance teams manage accounts, collections, payouts,
              invoices, GST reminders, payroll, and business health from one secure dashboard.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to={paths.signup}
                className="rounded-full bg-bank-blue px-7 py-3 text-center text-sm font-black text-white no-underline shadow-xl shadow-blue-200 transition hover:bg-blue-700"
              >
                Start Free
              </Link>
              <Link
                to="/home"
                className="rounded-full border border-slate-200 bg-white px-7 py-3 text-center text-sm font-black text-bank-ink no-underline transition hover:border-bank-blue hover:text-bank-blue"
              >
                Explore Platform
              </Link>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
              {publicStats.map((stat) => (
                <div key={stat.label}>
                  <p className="m-0 text-2xl font-black text-bank-ink">{stat.value}</p>
                  <p className="m-0 mt-1 text-xs font-semibold text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 rounded-[2rem] border border-slate-200 bg-slate-50 p-4 shadow-soft">
            <div className="rounded-[1.5rem] bg-bank-navy p-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="m-0 text-sm text-blue-100">Today&apos;s balance</p>
                  <p className="m-0 mt-2 text-3xl font-black">Rs.2,45,75,000</p>
                </div>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                  <IconifyIcon icon="lucide:landmark" width={24} />
                </span>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {['Collections', 'Payments', 'GST Due', 'Credit Limit'].map((item, index) => (
                  <div key={item} className="rounded-2xl bg-white/10 p-4">
                    <p className="m-0 text-xs text-blue-100">{item}</p>
                    <p className="m-0 mt-2 text-lg font-black">
                      {index === 0
                        ? 'Rs.18.7L'
                        : index === 1
                          ? 'Rs.7.8L'
                          : index === 2
                            ? '5 days'
                            : '36.8%'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 rounded-[1.5rem] bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="m-0 font-black text-bank-ink">Cash flow health</p>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                  Good
                </span>
              </div>
              <div className="mt-5 flex h-32 items-end gap-3">
                {[62, 44, 72, 51, 84, 68, 76].map((height) => (
                  <div key={height} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className="w-full rounded-t-xl bg-gradient-to-t from-blue-600 to-cyan-400"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {marketingFeatures.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-bank-blue">
                <IconifyIcon icon={feature.icon} width={22} />
              </span>
              <h2 className="mt-5 text-xl font-black text-bank-ink">{feature.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
