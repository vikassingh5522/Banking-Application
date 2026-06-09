import IconifyIcon from 'components/base/IconifyIcon';
import { trustHighlights } from 'data/public-site';

const AboutPage = () => {
  return (
    <div className="bg-white">
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="max-w-3xl">
          <p className="m-0 text-sm font-black uppercase tracking-[0.2em] text-bank-blue">
            About ConnectBank
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-bank-ink md:text-5xl">
            We help businesses see, move, and understand money with less operational drag.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            ConnectBank is designed for companies that need more than a bank statement. Our
            platform combines account visibility, payments, collections, GST workflows, reporting,
            and AI insights so owners and finance teams can act faster.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            ['Mission', 'Make business finance simple, visible, and actionable.'],
            ['Focus', 'Help SMEs manage cash flow, compliance, and growth from one dashboard.'],
            ['Promise', 'Create secure workflows that save time without reducing control.'],
          ].map(([title, description]) => (
            <div key={title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-xl font-black text-bank-ink">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <h2 className="text-3xl font-black text-bank-ink">Built for modern finance teams</h2>
            <p className="mt-4 text-slate-600">
              Every module is designed around clarity, approvals, and traceability so businesses
              can grow without losing financial control.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {trustHighlights.map((item) => (
              <div key={item} className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-50 text-bank-blue">
                  <IconifyIcon icon="lucide:badge-check" width={20} />
                </span>
                <span className="font-bold text-bank-ink">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
