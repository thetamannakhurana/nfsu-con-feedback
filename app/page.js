'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    organization: '',
    phone: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [fontIndex, setFontIndex] = useState(0);

  // Tech-focused monospace and code-style fonts
  const cyberFonts = [
    'font-["Courier_New",monospace] font-normal',
    'font-["Monaco",monospace] font-normal',
    'font-["Consolas",monospace] font-normal',
    'font-["Source_Code_Pro",monospace] font-light',
    'font-["Roboto_Mono",monospace] font-light',
    'font-["JetBrains_Mono",monospace] font-normal',
    'font-["Fira_Code",monospace] font-light',
    'font-["IBM_Plex_Mono",monospace] font-normal',
    'font-["Space_Mono",monospace] font-normal',
    'font-["Anonymous_Pro",monospace] font-normal',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFontIndex((prev) => (prev + 1) % cyberFonts.length);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      localStorage.setItem('participantInfo', JSON.stringify(formData));
      
      await fetch('/api/record-entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      router.push('/feedback');
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e27] relative overflow-hidden font-['Inter',system-ui,sans-serif]">
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.05)_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:50px_50px] animate-grid-move"></div>
      
      {/* Multiple glowing orbs - responsive sizing */}
      <div className="absolute top-0 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-blue-500/20 rounded-full filter blur-[80px] sm:blur-[120px] animate-float-1"></div>
      <div className="absolute bottom-0 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-cyan-500/20 rounded-full filter blur-[80px] sm:blur-[120px] animate-float-2"></div>
      <div className="absolute top-1/2 left-1/2 w-36 h-36 sm:w-72 sm:h-72 bg-blue-400/15 rounded-full filter blur-[60px] sm:blur-[100px] animate-float-3"></div>
      
      {/* Animated lines */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent animate-scan-line"></div>
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-scan-line-slow"></div>
      <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent animate-scan-line-reverse"></div>
      
      {/* Corner decorations - hidden on very small screens */}
      <div className="hidden sm:block absolute top-4 left-4 w-12 h-12 sm:w-20 sm:h-20 border-t-2 border-l-2 border-cyan-500/30"></div>
      <div className="hidden sm:block absolute top-4 right-4 w-12 h-12 sm:w-20 sm:h-20 border-t-2 border-r-2 border-cyan-500/30"></div>
      <div className="hidden sm:block absolute bottom-4 left-4 w-12 h-12 sm:w-20 sm:h-20 border-b-2 border-l-2 border-cyan-500/30"></div>
      <div className="hidden sm:block absolute bottom-4 right-4 w-12 h-12 sm:w-20 sm:h-20 border-b-2 border-r-2 border-cyan-500/30"></div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8 animate-fade-in">
            <div className="mb-4 sm:mb-6 inline-block">
              <div className="relative">
                {/* NFSU Logo */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-white rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(14,165,233,0.5)] sm:shadow-[0_0_50px_rgba(14,165,233,0.5)] p-2">
                  <img 
                    src="/nfsu-logo.png" 
                    alt="NFSU Logo" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // Fallback if image not found
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<span class="text-blue-600 font-bold text-2xl">NFSU</span>';
                    }}
                  />
                </div>
                <div className="absolute inset-0 w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-30 animate-pulse-glow"></div>
              </div>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 tracking-wider transition-all duration-300 flex flex-wrap items-center justify-center gap-1">
              <span className="text-cyan-400/60 text-xl sm:text-2xl md:text-3xl font-light">&lt;/</span>
              <span 
                className={`bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-text-glow ${cyberFonts[fontIndex]}`}
              >
                Cyber Conference
              </span>
              <span className="text-cyan-400/60 text-xl sm:text-2xl md:text-3xl font-light">&gt;</span>
            </h1>
            
            <p className="text-cyan-400/80 font-medium text-xs sm:text-sm md:text-base tracking-[0.15em] sm:tracking-[0.2em] uppercase mt-3 sm:mt-4 px-2">
              National Forensic Sciences University
            </p>
            <p className="text-blue-400/70 font-semibold text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] uppercase mt-2 px-2">Panel Feedback System</p>
            <div className="mt-3 sm:mt-4 h-1 w-24 sm:w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-pulse"></div>
          </div>

          {/* Form Card */}
          <div className="backdrop-blur-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-cyan-500/30 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.15)] sm:shadow-[0_0_50px_rgba(6,182,212,0.15)] p-6 sm:p-8 animate-slide-up relative overflow-hidden">
            {/* Card corner accents */}
            <div className="absolute top-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-cyan-400/50"></div>
            <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-cyan-400/50"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-cyan-400/50"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-cyan-400/50"></div>
            
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 relative z-10">
              <div className="group">
                <label className="block text-xs sm:text-sm font-bold text-cyan-400 mb-2 uppercase tracking-[0.15em] sm:tracking-[0.2em] flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-slate-900/50 border-2 border-blue-500/30 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 text-white placeholder-slate-500 font-medium tracking-wide text-sm sm:text-base"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="group">
                <label className="block text-xs sm:text-sm font-bold text-cyan-400 mb-2 uppercase tracking-[0.15em] sm:tracking-[0.2em] flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                  Designation
                </label>
                <input
                  type="text"
                  required
                  value={formData.designation}
                  onChange={(e) => setFormData({...formData, designation: e.target.value})}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-slate-900/50 border-2 border-blue-500/30 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 text-white placeholder-slate-500 font-medium tracking-wide text-sm sm:text-base"
                  placeholder="Your designation"
                />
              </div>

              <div className="group">
                <label className="block text-xs sm:text-sm font-bold text-cyan-400 mb-2 uppercase tracking-[0.15em] sm:tracking-[0.2em] flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                  Organization
                </label>
                <input
                  type="text"
                  required
                  value={formData.organization}
                  onChange={(e) => setFormData({...formData, organization: e.target.value})}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-slate-900/50 border-2 border-blue-500/30 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 text-white placeholder-slate-500 font-medium tracking-wide text-sm sm:text-base"
                  placeholder="Your organization"
                />
              </div>

              <div className="group">
                <label className="block text-xs sm:text-sm font-bold text-cyan-400 mb-2 uppercase tracking-[0.15em] sm:tracking-[0.2em] flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-slate-900/50 border-2 border-blue-500/30 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 text-white placeholder-slate-500 font-medium tracking-wide text-sm sm:text-base"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div className="group">
                <label className="block text-xs sm:text-sm font-bold text-cyan-400 mb-2 uppercase tracking-[0.15em] sm:tracking-[0.2em] flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-slate-900/50 border-2 border-blue-500/30 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 text-white placeholder-slate-500 font-medium tracking-wide text-sm sm:text-base"
                  placeholder="your.email@example.com"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full relative group mt-6"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold py-3 px-4 sm:py-4 sm:px-6 rounded-xl transition-all duration-300 uppercase tracking-[0.15em] sm:tracking-[0.2em] shadow-lg text-sm sm:text-base">
                  {loading ? (
                    <span className="flex items-center justify-center gap-2 sm:gap-3">
                      <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <span className="hidden sm:inline">Continue to Feedback</span>
                      <span className="sm:hidden">Continue</span>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  )}
                </div>
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 sm:mt-8 pb-4 px-2">
            <p className="text-slate-500 text-xs sm:text-sm tracking-wide">
              © National Forensic Sciences University, Delhi Campus
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300;400&family=Roboto+Mono:wght@300;400&family=JetBrains+Mono:wght@400;500&family=Fira+Code:wght@300;400&family=IBM+Plex+Mono:wght@400;500&family=Space+Mono:wght@400;700&family=Anonymous+Pro:wght@400;700&display=swap');
        
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-float-1 {
          animation: float-1 8s ease-in-out infinite;
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 30px) scale(1.05); }
          66% { transform: translate(30px, -20px) scale(0.95); }
        }
        .animate-float-2 {
          animation: float-2 10s ease-in-out infinite;
        }
        @keyframes float-3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.2); }
        }
        .animate-float-3 {
          animation: float-3 6s ease-in-out infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out 0.2s both;
        }
        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(34, 211, 238, 0.5), 0 0 40px rgba(34, 211, 238, 0.3); }
          50% { text-shadow: 0 0 30px rgba(34, 211, 238, 0.8), 0 0 60px rgba(34, 211, 238, 0.5); }
        }
        .animate-text-glow {
          animation: text-glow 2s ease-in-out infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        @keyframes scan-line {
          0% { transform: translateY(-100vh); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        .animate-scan-line {
          animation: scan-line 8s linear infinite;
        }
        .animate-scan-line-slow {
          animation: scan-line 12s linear infinite;
        }
        @keyframes scan-line-reverse {
          0% { transform: translateY(100vh); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
        .animate-scan-line-reverse {
          animation: scan-line-reverse 10s linear infinite;
        }
        @keyframes grid-move {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }
        .animate-grid-move {
          animation: grid-move 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
