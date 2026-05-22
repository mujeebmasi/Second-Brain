import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { BrainIcon } from '../icons/BrainIcon';

const benefits = [
  'Save the links and posts you would otherwise lose in tabs.',
  'Keep everything in one calm workspace with filters that stay out of the way.',
  'Share a polished collection when you want to publish your thinking.',
];

interface AuthShellProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function AuthShell({ eyebrow, title, subtitle, children }: AuthShellProps) {
  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f4ff] text-slate-900">
      <div className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(113,100,192,0.20),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(226,135,67,0.14),_transparent_30%),linear-gradient(180deg,_#fcfbff_0%,_#f6f1ff_100%)]" />
        <div className="absolute left-[-7rem] top-20 -z-10 h-72 w-72 rounded-full bg-[#7164c0]/20 blur-3xl" />
        <div className="absolute right-[-5rem] bottom-10 -z-10 h-80 w-80 rounded-full bg-[#f0c987]/25 blur-3xl" />

        <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-6 lg:px-10">
          <div className="flex items-center gap-3">
            <BrainIcon />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7164c0]">Second Brain</p>
              <p className="text-xs text-slate-500">A calmer way to keep what matters</p>
            </div>
          </div>

          <Link
            to="/"
            className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur transition hover:bg-white"
          >
            Back to home
          </Link>
        </header>

        <main className="mx-auto grid max-w-7xl gap-10 px-6 pb-16 pt-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-10 lg:pb-20 lg:pt-10">
          <section className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#7164c0]/20 bg-white/75 px-4 py-2 text-sm text-slate-700 shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[#7164c0]" />
              {eyebrow}
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {title}
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              {subtitle}
            </p>

            <div className="mt-8 space-y-4 rounded-[2rem] border border-white/80 bg-white/75 p-6 shadow-[0_18px_50px_rgba(18,15,40,0.08)] backdrop-blur">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3 rounded-2xl bg-slate-950/[0.03] p-4">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#7164c0]" />
                  <p className="text-sm leading-6 text-slate-700">{benefit}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="relative">
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-[#7164c0]/15 via-white to-[#f0c987]/20 blur-2xl" />
            <div className="rounded-[2rem] border border-white/80 bg-white/85 p-4 shadow-[0_24px_80px_rgba(18,15,40,0.14)] backdrop-blur-xl">
              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 sm:p-8">
                {children}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}