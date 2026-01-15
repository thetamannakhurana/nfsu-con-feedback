'use client';
import { useState, useEffect } from 'react';

export default function Feedback() {
  const [participantInfo, setParticipantInfo] = useState(null);
  const [activePanels, setActivePanels] = useState([]);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState({});

  const panels = [
    {
      id: 1,
      title: 'Panel 1: Cybersecurity Fundamentals',
      questions: [
        'Was the content relevant and informative?',
        'Did the speaker present clearly and effectively?',
        'Was the session well-organized and structured?',
        'Did you find the examples and case studies helpful?',
        'Would you recommend this session to others?',
        'Was the technical depth appropriate for the audience?',
        'Did the speaker engage with the audience effectively?',
        'Were your questions addressed satisfactorily?',
        'Was the pace of presentation suitable?',
        'Did you learn new concepts or techniques?',
        'Were the visual aids (slides/demos) effective?',
        'Was the time allocated for this panel sufficient?',
        'Did the content meet your expectations?',
        'Were real-world applications discussed adequately?',
        'Did the speaker demonstrate subject expertise?',
        'Was the Q&A session productive?',
        'Would you attend advanced sessions on this topic?',
        'Did the panel address current industry challenges?',
        'Were practical takeaways provided?',
        'Overall, was this panel valuable to you?'
      ]
    },
    {
      id: 2,
      title: 'Panel 2: Threat Intelligence & Analysis',
      questions: [
        'Was the topic engaging and relevant?',
        'Did the panel address current cyber threats?',
        'Was there adequate time for discussion?',
        'Were your questions answered satisfactorily?',
        'Did you gain new insights into threat intelligence?',
        'Was the presentation style effective?',
        'Did the content meet your expectations?',
        'Was the technical depth appropriate?',
        'Did the panel provide actionable takeaways?',
        'Would you attend a similar session?',
        'Were case studies and examples relatable?',
        'Did speakers demonstrate practical experience?',
        'Was the analysis methodology explained clearly?',
        'Did you learn about new threat vectors?',
        'Were mitigation strategies discussed effectively?',
        'Was the panel interactive and engaging?',
        'Did the content align with industry standards?',
        'Were tools and techniques demonstrated?',
        'Would you implement learnings in your work?',
        'Overall, was this panel beneficial?'
      ]
    },
    {
      id: 3,
      title: 'Panel 3: Incident Response & Forensics',
      questions: [
        'Was the presentation style effective and clear?',
        'Did the content meet your learning expectations?',
        'Was the technical depth appropriate for you?',
        'Did the panel provide actionable takeaways?',
        'Would you attend similar forensics sessions?',
        'Were incident response procedures explained well?',
        'Did speakers share practical experience?',
        'Was the forensic methodology clear?',
        'Did you learn about investigation techniques?',
        'Were evidence handling practices covered?',
        'Was the panel content up-to-date?',
        'Did examples demonstrate real scenarios?',
        'Were tools and technologies discussed?',
        'Did the Q&A session add value?',
        'Was the response framework explained clearly?',
        'Did you gain confidence in handling incidents?',
        'Were legal aspects addressed adequately?',
        'Was the session well-paced?',
        'Would you recommend this to colleagues?',
        'Overall, did this panel enhance your skills?'
      ]
    },
    {
      id: 4,
      title: 'Panel 4: Future of Cybersecurity',
      questions: [
        'Was the session valuable and insightful?',
        'Did the speakers demonstrate expertise?',
        'Was the Q&A session productive?',
        'Did you learn something new about future trends?',
        'Would you like more sessions on emerging topics?',
        'Were AI/ML applications in security discussed?',
        'Did the panel cover quantum computing threats?',
        'Was the future outlook realistic and practical?',
        'Did speakers address skill development needs?',
        'Were career opportunities in cybersecurity explored?',
        'Was innovation in security technologies covered?',
        'Did the panel discuss regulatory changes?',
        'Were emerging threat landscapes analyzed?',
        'Did you gain insights into industry direction?',
        'Was the content forward-thinking?',
        'Were predictions backed by data/research?',
        'Did speakers inspire further learning?',
        'Was the panel\'s vision actionable?',
        'Would you prepare differently after this session?',
        'Overall, did this panel shape your perspective?'
      ]
    }
  ];

  useEffect(() => {
    const info = localStorage.getItem('participantInfo');
    if (!info) {
      window.location.href = '/';
      return;
    }
    setParticipantInfo(JSON.parse(info));
    checkActivePanels();
    const interval = setInterval(checkActivePanels, 30000);
    return () => clearInterval(interval);
  }, []);

  const checkActivePanels = async () => {
    try {
      const res = await fetch('/api/active-panels');
      const data = await res.json();
      setActivePanels(data.activePanels || []);
    } catch (error) {
      console.error('Error checking panels:', error);
    }
  };

  const handleResponseChange = (panelId, questionIndex, field, value) => {
    setResponses(prev => ({
      ...prev,
      [`panel${panelId}_q${questionIndex}`]: {
        ...prev[`panel${panelId}_q${questionIndex}`],
        [field]: value
      }
    }));
  };

  const submitPanelFeedback = async (panelId) => {
    setLoading(true);
    try {
      const panel = panels.find(p => p.id === panelId);
      const panelResponses = panel.questions.map((question, idx) => ({
        question,
        answer: responses[`panel${panelId}_q${idx}`]?.answer || '',
        comment: responses[`panel${panelId}_q${idx}`]?.comment || ''
      }));

      await fetch('/api/submit-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...participantInfo,
          panelId,
          panelTitle: panel.title,
          responses: panelResponses,
          timestamp: new Date().toISOString()
        })
      });

      setSubmitted(prev => ({ ...prev, [panelId]: true }));
      alert(`Feedback submitted successfully for ${panel.title}!`);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!participantInfo) {
    return (
      <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e27] relative overflow-hidden py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 font-['Inter',system-ui,sans-serif]">
      {/* Background animations */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:50px_50px] animate-grid-move"></div>
      <div className="absolute top-0 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full filter blur-[80px] sm:blur-[120px] animate-float-1"></div>
      <div className="absolute bottom-1/4 left-1/4 w-40 h-40 sm:w-80 sm:h-80 bg-cyan-500/10 rounded-full filter blur-[60px] sm:blur-[100px] animate-float-2"></div>
      
      {/* Scan lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent animate-scan-line"></div>
      <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent animate-scan-line-slow"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* User Card */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-cyan-500/30 rounded-xl sm:rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.15)] sm:shadow-[0_0_50px_rgba(6,182,212,0.15)] p-4 sm:p-6 mb-4 sm:mb-6 animate-fade-in relative overflow-hidden">
          <div className="absolute top-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-cyan-400/50"></div>
          <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-cyan-400/50"></div>
          
          <div className="flex items-center gap-3 sm:gap-4 relative z-10">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(14,165,233,0.5)] sm:shadow-[0_0_30px_rgba(14,165,233,0.5)] flex-shrink-0">
              <span className="text-xl sm:text-2xl text-white font-bold">{participantInfo.name.charAt(0)}</span>
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 tracking-wide truncate">
                Welcome, <span className="text-cyan-400">{participantInfo.name}</span>
              </h1>
              <p className="text-slate-400 font-medium tracking-wide text-xs sm:text-sm md:text-base truncate">
                {participantInfo.designation} • {participantInfo.organization}
              </p>
            </div>
          </div>
        </div>

        {activePanels.length === 0 ? (
          <div className="backdrop-blur-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-cyan-500/30 rounded-xl sm:rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.15)] sm:shadow-[0_0_50px_rgba(6,182,212,0.15)] p-8 sm:p-12 text-center animate-pulse-slow relative overflow-hidden">
            <div className="absolute top-0 left-0 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-l-2 border-cyan-400/30"></div>
            <div className="absolute top-0 right-0 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-r-2 border-cyan-400/30"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-l-2 border-cyan-400/30"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-r-2 border-cyan-400/30"></div>
            
            <div className="text-5xl sm:text-6xl md:text-8xl mb-4 sm:mb-6">⏳</div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 tracking-wide px-2">
              No Active Panels Yet
            </h2>
            <p className="text-slate-400 text-sm sm:text-base md:text-lg mb-3 sm:mb-4 tracking-wide px-2">
              Please wait for a panel to end before providing feedback.
            </p>
            <div className="inline-flex items-center gap-2 text-cyan-400 font-semibold tracking-wide text-xs sm:text-sm">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
              Auto-refreshing every 30 seconds
            </div>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {panels
              .filter(panel => activePanels.includes(panel.id))
              .map((panel, index) => (
                <div 
                  key={panel.id} 
                  className="backdrop-blur-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-cyan-500/30 rounded-xl sm:rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.15)] sm:shadow-[0_0_50px_rgba(6,182,212,0.15)] p-4 sm:p-6 animate-slide-in relative overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-cyan-400/50"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-cyan-400/50"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-cyan-400/50"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-cyan-400/50"></div>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 pb-4 border-b border-cyan-500/20 relative z-10 gap-3 sm:gap-0">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(14,165,233,0.5)] sm:shadow-[0_0_30px_rgba(14,165,233,0.5)] flex-shrink-0">
                        <span className="text-lg sm:text-xl text-white font-bold">{panel.id}</span>
                      </div>
                      <h2 className="text-base sm:text-xl md:text-2xl font-bold text-white tracking-wide break-words">
                        {panel.title}
                      </h2>
                    </div>
                    {submitted[panel.id] && (
                      <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(6,182,212,0.5)] animate-bounce-in uppercase tracking-wider flex-shrink-0">
                        Submitted
                      </span>
                    )}
                  </div>

                  {!submitted[panel.id] ? (
                    <>
                      <div className="space-y-4 sm:space-y-5 relative z-10">
                        {panel.questions.map((question, idx) => (
                          <div key={idx} className="bg-slate-900/50 border border-blue-500/20 rounded-lg sm:rounded-xl p-3 sm:p-5 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] relative">
                            <p className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base flex items-start gap-2 sm:gap-3 tracking-wide">
                              <span className="text-cyan-400 flex-shrink-0 font-bold text-sm sm:text-base">{idx + 1}.</span>
                              <span>{question}</span>
                            </p>
                            
                            <div className="flex gap-4 sm:gap-6 mb-3 sm:mb-4">
                              <label className="flex items-center cursor-pointer group">
                                <input
                                  type="radio"
                                  name={`panel${panel.id}_q${idx}`}
                                  value="Yes"
                                  onChange={(e) => handleResponseChange(panel.id, idx, 'answer', e.target.value)}
                                  className="mr-2 sm:mr-3 w-4 h-4 sm:w-5 sm:h-5 text-cyan-500 focus:ring-cyan-500 cursor-pointer bg-slate-800 border-cyan-500/50"
                                  required
                                />
                                <span className="text-slate-300 font-bold group-hover:text-cyan-400 transition-colors tracking-wide uppercase text-xs sm:text-sm">Yes</span>
                              </label>
                              
                              <label className="flex items-center cursor-pointer group">
                                <input
                                  type="radio"
                                  name={`panel${panel.id}_q${idx}`}
                                  value="No"
                                  onChange={(e) => handleResponseChange(panel.id, idx, 'answer', e.target.value)}
                                  className="mr-2 sm:mr-3 w-4 h-4 sm:w-5 sm:h-5 text-cyan-500 focus:ring-cyan-500 cursor-pointer bg-slate-800 border-cyan-500/50"
                                  required
                                />
                                <span className="text-slate-300 font-bold group-hover:text-cyan-400 transition-colors tracking-wide uppercase text-xs sm:text-sm">No</span>
                              </label>
                            </div>

                            <textarea
                              placeholder="Add your comments here (optional)"
                              onChange={(e) => handleResponseChange(panel.id, idx, 'comment', e.target.value)}
                              className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-slate-900/80 border border-blue-500/30 rounded-lg sm:rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 text-white placeholder-slate-600 tracking-wide text-sm sm:text-base"
                              rows="2"
                            />
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => submitPanelFeedback(panel.id)}
                        disabled={loading}
                        className="w-full relative group mt-4 sm:mt-6"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 rounded-lg sm:rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold py-3 px-4 sm:py-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-300 uppercase tracking-[0.15em] sm:tracking-[0.2em] text-xs sm:text-sm md:text-base">
                          {loading ? (
                            <span className="flex items-center justify-center gap-2 sm:gap-3">
                              <svg className="animate-spin h-5 w-5 sm:h-6 sm:w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Submitting...
                            </span>
                          ) : (
                            <>
                              <span className="hidden sm:inline">Submit {panel.title} Feedback</span>
                              <span className="sm:hidden">Submit Feedback</span>
                            </>
                          )}
                        </div>
                      </button>
                    </>
                  ) : (
                    <div className="text-center py-6 sm:py-8 relative z-10">
                      <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">✓</div>
                      <p className="text-slate-300 text-sm sm:text-base md:text-lg font-semibold tracking-wide px-2">
                        Thank you for your valuable feedback on <span className="text-cyan-400">{panel.title}</span>
                      </p>
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-6 sm:mt-8 pb-4 space-y-1 sm:space-y-2 px-2">
          <p className="text-slate-500 text-xs sm:text-sm tracking-wide">
            © National Forensic Sciences University, Delhi Campus
          </p>
          <p className="text-slate-600 text-[10px] sm:text-xs tracking-wider">
            Created and Managed by <span className="text-cyan-500/70 font-medium">Tamanna Khurana</span>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.6s ease-out forwards;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        @keyframes bounce-in {
          0% { transform: scale(0); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
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
