import React from 'react';
import { useAuth } from "../../context/AuthContext";
import {Bell, User, Menu} from 'lucide-react';

const Header = ({ toggleSidebar }) => {
  const { user } = useAuth();

  return <header className="sticky top-0 z-40 w-full h-16 bg-white/90 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
    <div className="flex items-center justify-between h-full px-6">
      <button 
        onClick={toggleSidebar}
        className="md:hidden inline-flex items-center justify-center w-10 h-10 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-200"
        aria-label="Toggle sidebar"
      >
        <Menu size={20} strokeWidth={2}/>
      </button>

      <div className="hidden md:block" />

      <div className="flex items-center gap-2 pl-3 border-l border-slate-200/60">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
          <User size={16} strokeWidth={2.5} />
        </div>
        <div className="hidden sm:block">
          <p className="text-sm font-semibold text-slate-900 leading-tight">{user?.username || 'User'}</p>
          <p className="text-xs text-slate-500 leading-tight">{user?.email || ''}</p>
        </div>
      </div>
    </div>
  </header>
  
}

export default Header

