import IconifyIcon from 'components/base/IconifyIcon';
import { supportChannels } from 'data/public-site';

const ContactPage = () => {
  return (
    <div className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="m-0 text-sm font-black uppercase tracking-[0.2em] text-bank-blue">
              Contact
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-bank-ink md:text-5xl">
              Talk to ConnectBank about your business banking needs.
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Reach our team for product walkthroughs, support questions, payment operations, or
              onboarding guidance.
            </p>

            <div className="mt-8 grid gap-4">
              {supportChannels.map((channel) => (
                <div key={channel.title} className="rounded-3xl bg-white p-5 shadow-sm">
                  <h2 className="text-lg font-black text-bank-ink">{channel.title}</h2>
                  <p className="mt-2 text-sm text-slate-600">{channel.detail}</p>
                  <p className="mt-3 text-sm font-black text-bank-blue">{channel.value}</p>
                </div>
              ))}
            </div>
          </div>

          <form className="rounded-[2rem] bg-white p-6 shadow-soft md:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-bold text-bank-ink">Name</span>
                <input
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-bank-blue focus:ring-4 focus:ring-blue-100"
                  placeholder="Rajesh Kumar"
                  type="text"
                />
              </label>
              <label className="block">
                <span className="text-sm font-bold text-bank-ink">Work email</span>
                <input
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-bank-blue focus:ring-4 focus:ring-blue-100"
                  placeholder="rajesh@company.com"
                  type="email"
                />
              </label>
              <label className="block">
                <span className="text-sm font-bold text-bank-ink">Company</span>
                <input
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-bank-blue focus:ring-4 focus:ring-blue-100"
                  placeholder="Sunrise Traders Pvt. Ltd."
                  type="text"
                />
              </label>
              <label className="block">
                <span className="text-sm font-bold text-bank-ink">Phone</span>
                <input
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-bank-blue focus:ring-4 focus:ring-blue-100"
                  placeholder="+91 98765 43210"
                  type="tel"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-bold text-bank-ink">Message</span>
                <textarea
                  className="mt-2 min-h-36 w-full resize-y rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-bank-blue focus:ring-4 focus:ring-blue-100"
                  placeholder="Tell us what you want to build or solve."
                />
              </label>
            </div>
            <button
              type="button"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-bank-blue px-7 py-3 text-sm font-black text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
            >
              Send Message
              <IconifyIcon icon="lucide:send" width={16} />
            </button>
            <p className="mt-4 text-xs text-slate-500">
              This form is a front-end preview and does not submit data yet.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
