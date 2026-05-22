import { useNavigate } from 'react-router-dom';
import { BrainIcon } from '../icons/BrainIcon';

const highlights = [
  {
    title: 'Capture anything fast',
    description: 'Save links, tweets, and videos before they disappear into your tabs.',
  },
  {
    title: 'Find context instantly',
    description: 'Organize ideas into one clean brain instead of hunting through bookmarks.',
  },
  {
    title: 'Share a curated stream',
    description: 'Turn your saved knowledge into a public or private share link in seconds.',
  },
];

const metrics = [
  { value: '3 formats', label: 'text, video, and social posts in one place' },
  { value: '1 click', label: 'to create a clean shareable link' },
  { value: 'Zero clutter', label: 'a calm workspace built for recall' },
];

const steps = [
  {
    number: '01',
    title: 'Collect',
    description: 'Drop in the links and thoughts that matter before you lose them.',
  },
  {
    number: '02',
    title: 'Organize',
    description: 'Keep everything in one searchable place with simple filters.',
  },
  {
    number: '03',
    title: 'Share',
    description: 'Publish a thoughtful collection when you want to show your work.',
  },
];

function HomeAction({
  label,
  onClick,
  variant = 'primary',
}: {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}) {
  const base = 'rounded-full px-5 py-3 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7164c0]';
  const styles =
    variant === 'primary'
      ? 'bg-[#7164c0] text-white shadow-lg shadow-[#7164c0]/25 hover:-translate-y-0.5 hover:bg-[#5f52b7]'
      : 'bg-white/80 text-slate-800 ring-1 ring-slate-200 hover:bg-white hover:-translate-y-0.5';

  return (
    <button type="button" onClick={onClick} className={`${base} ${styles}`}>
      {label}
    </button>
  );
}

export function Home() {
  const navigate = useNavigate();
  const isAuthenticated = Boolean(localStorage.getItem('sb_token'));

  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f4ff] text-slate-900">
      <div className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(113,100,192,0.20),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(226,135,67,0.15),_transparent_28%),linear-gradient(180deg,_#fcfbff_0%,_#f6f1ff_100%)]" />
        <div className="absolute left-[-8rem] top-24 -z-10 h-72 w-72 rounded-full bg-[#7164c0]/20 blur-3xl" />
        <div className="absolute right-[-6rem] top-80 -z-10 h-80 w-80 rounded-full bg-[#f0c987]/25 blur-3xl" />

        <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-6 lg:px-10">
          <div className="flex items-center gap-3">
            <BrainIcon />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7164c0]">Second Brain</p>
              <p className="text-xs text-slate-500">A calmer way to keep what matters</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <HomeAction label={isAuthenticated ? 'Open dashboard' : 'Sign in'} onClick={() => navigate(isAuthenticated ? '/dashboard' : '/signin')} variant="secondary" />
            <HomeAction label={isAuthenticated ? 'Manage content' : 'Get started'} onClick={() => navigate(isAuthenticated ? '/dashboard' : '/signup')} />
          </div>
        </header>

        <main className="mx-auto grid max-w-7xl gap-14 px-6 pb-20 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10 lg:pt-16">
          <section className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#7164c0]/20 bg-white/75 px-4 py-2 text-sm text-slate-700 shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[#7164c0]" />
              Collect ideas. Keep context. Share the good stuff.
            </div>

            <h1 className="mt-6 max-w-2xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              A beautiful home for the things you want to remember.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              Second Brain turns scattered links, notes, and videos into one focused place so you can save faster, find faster, and share with intention.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <HomeAction label={isAuthenticated ? 'Go to dashboard' : 'Create your account'} onClick={() => navigate(isAuthenticated ? '/dashboard' : '/signup')} />
              <HomeAction label="Sign in" onClick={() => navigate('/signin')} variant="secondary" />
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-white/70 bg-white/75 p-4 shadow-[0_12px_40px_rgba(18,15,40,0.08)] backdrop-blur">
                  <div className="text-2xl font-semibold text-slate-950">{metric.value}</div>
                  <div className="mt-1 text-sm leading-6 text-slate-600">{metric.label}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="relative">
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-[#7164c0]/15 via-white to-[#f0c987]/20 blur-2xl" />
            <div className="rounded-[2rem] border border-white/80 bg-white/80 p-4 shadow-[0_24px_80px_rgba(18,15,40,0.14)] backdrop-blur-xl">
              <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-white/60">Your brain, organized</p>
                    <h2 className="mt-2 text-2xl font-semibold">A focused board for saved ideas</h2>
                  </div>
                  <div className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">Live</div>
                </div>

                <div className="mt-4 space-y-3">
                  {[
                    { title: 'Saved: Product teardown video', tag: 'youtube', color: 'bg-[#7164c0]' },
                    { title: 'Saved: Article worth revisiting', tag: 'text', color: 'bg-[#f0c987]' },
                    { title: 'Saved: Tweet thread with insight', tag: 'twitter', color: 'bg-[#9bc2ff]' },
                  ].map((item) => (
                    <div key={item.title} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                      <div>
                        <div className="text-sm text-white/55">{item.tag}</div>
                        <div className="mt-1 font-medium text-white">{item.title}</div>
                      </div>
                      <span className={`h-3 w-3 rounded-full ${item.color}`} />
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl border border-dashed border-white/15 bg-white/5 p-4">
                  <div className="text-sm text-white/60">Share link</div>
                  <div className="mt-2 break-all text-sm text-white/90">/share/your-public-brain</div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
          <div className="grid gap-5 md:grid-cols-3">
            {highlights.map((item) => (
              <article key={item.title} className="rounded-[1.75rem] border border-white/80 bg-white/78 p-6 shadow-[0_18px_50px_rgba(18,15,40,0.08)] backdrop-blur">
                <div className="h-11 w-11 rounded-2xl bg-[#7164c0]/10" />
                <h3 className="mt-5 text-xl font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-6 rounded-[2rem] border border-white/80 bg-slate-950/95 p-8 text-white shadow-[0_24px_90px_rgba(18,15,40,0.16)] md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-white/55">How it works</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">A simple flow that keeps your focus intact.</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {steps.map((step) => (
                <div key={step.number} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="text-xs font-semibold tracking-[0.22em] text-white/45">{step.number}</div>
                  <h3 className="mt-3 text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/65">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-[2rem] border border-[#7164c0]/15 bg-white px-6 py-6 shadow-[0_18px_50px_rgba(18,15,40,0.08)] md:flex-row md:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-[#7164c0]">Ready when you are</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">Build your second brain from the first link you save.</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <HomeAction label={isAuthenticated ? 'Open dashboard' : 'Start free'} onClick={() => navigate(isAuthenticated ? '/dashboard' : '/signup')} />
              <HomeAction label="See sign in" onClick={() => navigate('/signin')} variant="secondary" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}