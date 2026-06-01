import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] bg-[size:18px_18px] opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] bg-[size:28px_28px] opacity-20 pointer-events-none" />

      <div className="relative w-full max-w-xl px-6">
        <div className="bg-white/75 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-2xl shadow-slate-200/50 overflow-hidden">
          <div className="p-8 md:p-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                <BrainCircuit className="text-white" size={22} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Aethron</p>
                <h1 className="text-xl md:text-2xl font-semibold text-slate-900">Page not found</h1>
              </div>
            </div>

            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              The link you followed doesn’t exist or may have moved.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold text-sm shadow-lg shadow-emerald-500/25 active:scale-[0.98] transition-all duration-200"
              >
                <ArrowLeft size={16} strokeWidth={2.5} />
                Back to Dashboard
              </Link>

              <Link
                to="/documents"
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 font-semibold text-sm transition-all duration-200"
              >
                Browse Documents
              </Link>
            </div>

            <div className="mt-6 text-xs text-slate-500">
              Tip: use the sidebar to navigate to different features.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

