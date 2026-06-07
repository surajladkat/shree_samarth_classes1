/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { ShieldAlert, LogIn, Users, ShieldCheck, UserCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function Login() {
  const { login } = useSchool();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) return;

    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await login(username.trim(), password);
      if (!res.success) {
        setErrorMsg(res.error || 'Invalid username or password.');
      }
    } catch (error) {
      setErrorMsg('A system error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 max-w-5xl mx-auto items-center py-4 lg:py-6">
      
      {/* Brand guidelines and info (5 cols) */}
      <motion.div 
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="lg:col-span-5 space-y-6 text-left"
      >
        <div className="space-y-4">
          <motion.span 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[10px] bg-gradient-to-r from-blue-650 to-indigo-650 bg-blue-600 text-white font-extrabold px-3 py-1 rounded-full uppercase tracking-wider font-mono shadow-sm inline-block"
          >
            Private Academy Hub
          </motion.span>
          <h2 id="login-heading" className="text-3xl font-black text-slate-900 tracking-tight font-sans leading-tight bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 bg-clip-text text-transparent">
            Private Class Academic Portal
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed font-normal font-sans">
            A practical academic management platform designed for tutoring and private coaching classes. Monitor course handouts, student tasks, fee ledger balances, and faculty-parent channels.
          </p>
        </div>

        {/* Friendly features instead of E2EE encryption jargon */}
        <div className="space-y-4 pt-1">
          <motion.div 
            whileHover={{ scale: 1.01, x: 4 }}
            className="flex gap-2.5 p-3.5 bg-white hover:bg-slate-50 rounded-xl border border-slate-100 transition-all cursor-pointer shadow-2xs"
          >
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg h-fit border border-blue-100">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Private Student Folders</p>
              <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed font-sans">
                Study resources, homework solutions, and teacher grading evaluations are securely processed in a private folder specific to each class grade.
              </p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.01, x: 4 }}
            className="flex gap-2.5 p-3.5 bg-white hover:bg-slate-50 rounded-xl border border-slate-100 transition-all cursor-pointer shadow-2xs"
          >
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg h-fit border border-emerald-100">
              <Users className="w-4 h-4 flex-shrink-0" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Direct Parent Connection</p>
              <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed font-sans">
                Parents are connected directly to monitor homework progress, check reports, and stay in contact with faculty.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="p-3.5 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-xl border border-dashed border-slate-200">
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider font-mono">System Status</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            <span className="text-[10px] text-slate-600 font-mono font-semibold">Online & Connected</span>
          </div>
        </div>
      </motion.div>

      {/* Login Form */}
      <motion.div 
        initial={{ opacity: 0, x: 40, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        className="lg:col-span-7 space-y-6"
      >
        
        {/* Simple Sign In Form */}
        <div className="bg-white rounded-2xl border border-blue-50 p-5 sm:p-8 shadow-[0_20px_50px_-20px_rgba(59,130,246,0.12)] hover:border-blue-100/80 transition-all duration-300 text-left space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-850 bg-clip-text text-transparent font-sans">Portal Access Gateway</h3>
            <p className="text-xs text-slate-400 mt-1 font-sans font-normal">Enter your authorized administrative, teacher, student, or parent account ID below.</p>
          </div>

          {errorMsg && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-xs flex gap-2 items-start">
              <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-600" />
              <p className="font-semibold leading-relaxed">{errorMsg}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-500 font-medium font-sans">Username (Authorized ID)</label>
              <input 
                id="login-username"
                type="text"
                required
                placeholder="e.g. admin, teacher , student,parent"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full text-xs font-mono border border-slate-200 rounded-lg p-3 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-slate-500 font-medium font-sans">Password</label>
              <input 
                id="login-password"
                type="password"
                required
                placeholder="Enter password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full text-xs font-mono border border-slate-200 rounded-lg p-3 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <motion.button
              id="login-btn"
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.01, backgroundColor: "#1e40af" }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-3 bg-blue-600 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs font-sans mt-2 hover:shadow-md"
            >
              <LogIn className="w-4 h-4" />
              {isLoading ? 'Signing In Security Check...' : 'Enter Academic Portal'}
            </motion.button>
          </form>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-1.5 text-[10px] text-slate-400 font-sans">
            <p className="font-semibold text-slate-500 text-[11px]">Notice to Staff & Parents:</p>
            <p>• Only the administrative office can register new teacher and student portals.</p>
            <p>• For initial configuration, log in with default administrator account:</p>
            <p className="font-mono bg-slate-50 p-2 rounded border border-slate-100 text-slate-600 select-all">
              Username: <strong className="text-blue-700">admin</strong><br />
              Password: <strong className="text-blue-700">admin123</strong>
            </p>
          </div>
        </div>

      </motion.div>

    </div>
  );
}
