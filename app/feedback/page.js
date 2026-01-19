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
      title: 'Panel 1: The Current State of Cybersecurity Education',
      questions: [
        { type: 'rating', text: 'How relevant was the topic in the current cybersecurity landscape in India?' },
        { type: 'rating', text: 'How would you rate the quality of this panel\'s discussion?' },
        { type: 'rating', text: 'How would you rate the expertise and clarity of the panelist?' },
        { type: 'rating', text: 'How would you rate the depth of the technical/strategic discussion?' },
        { type: 'rating', text: 'To what extent did this panel provide you with new, actionable insights or factual data that you were previously unaware of?' },
        { type: 'rating', text: 'How effective was the session in connecting you with the right mentors or peers?' },
        { type: 'rating', text: 'How effectively did the panel assess the strengths and weaknesses of the current landscape of cybersecurity education?' },
        { 
          type: 'mcq', 
          text: 'In your opinion, what is the most important thing that needs to be improved/included in Indian Cyber Education right now?',
          options: ['Curriculum', 'Labs', 'FDPs', 'Certifications', 'Others']
        },
        { type: 'yesno', text: 'Do you feel the need for improvement in teaching pedagogy for cybersecurity awareness in India?' },
        { type: 'rating', text: 'How do you rate the industry efforts on Cybersecurity education and awareness in India?' },
        { 
          type: 'mcq', 
          text: 'What do you perceive as the most significant roadblock of the panel discussion "The Current State of Cybersecurity Education"?',
          options: [
            'Lack of a standardized national curriculum',
            'Limited infrastructure and funding in schools',
            'Rapidly Evolving Threats leading to a disconnect from the academic syllabus',
            'Lack of Cyber Awareness among citizens',
            'Other'
          ]
        },
        { type: 'yesno', text: 'Would you want a "Deep Dive" workshop on this specific panel topic at the next conference?' },
        { type: 'rating', text: 'What is your overall rating for this specific panel session?' },
        { type: 'comment', text: 'What is one "Key Takeaway" from today that you would like to get implemented in your organization/institute?' },
        { type: 'comment', text: 'Do you have any other suggestions/remarks for the conference?' }
      ]
    },
    {
      id: 2,
      title: 'Panel 2: Designing a Future-Ready Cybersecurity Curriculum',
      questions: [
        { type: 'rating', text: 'How relevant was the topic in the current cybersecurity landscape in India?' },
        { type: 'rating', text: 'How would you rate the quality of this panel\'s discussion?' },
        { type: 'rating', text: 'How would you rate the expertise and clarity of the panelist?' },
        { type: 'rating', text: 'How would you rate the depth of the technical/strategic discussion?' },
        { type: 'rating', text: 'To what extent did this panel provide you with new, actionable insights or factual data that you were previously unaware of?' },
        { type: 'rating', text: 'How effective was the session in connecting you with the right mentors or peers?' },
        { type: 'rating', text: 'How effectively did the panel assess the strengths and weaknesses of the current landscape of cybersecurity education?' },
        { 
          type: 'mcq', 
          text: 'In your opinion, what is the most important thing that needs to be improved/included in Indian Cyber Education right now?',
          options: ['Curriculum', 'Labs', 'FDPs', 'Certifications', 'Others']
        },
        { type: 'yesno', text: 'Do you feel the need for improvement in teaching pedagogy for cybersecurity awareness in India?' },
        { 
          type: 'mcq', 
          text: 'Do you prefer a Standardized National Curriculum (one syllabus for all) or University Autonomy (institutes design their own)?',
          options: ['Standardized National Curriculum', 'University Autonomy']
        },
        { 
          type: 'mcq', 
          text: 'What do you believe is the ideal update cycle for a cyber curriculum to remain \'Future-Ready\'?',
          options: [
            'Every 6 Months',
            'Annually',
            'Every 2-3 Years',
            'Real-time (Continuous updates via Industry Partners)'
          ]
        },
        { type: 'yesno', text: 'Can we establish a \'Student Cyber Volunteer Corps\' where students earn credits for managing helplines such as \'1930\'?' },
        { 
          type: 'mcq', 
          text: 'What do you perceive as the most significant roadblock of the panel discussion "Designing a Future-Ready Cybersecurity Curriculum"?',
          options: [
            'Acute Teacher shortage',
            'Inadequate teacher training',
            'Digital divide and infrastructure gaps',
            'Uneven implementation and funding issues',
            'Others'
          ]
        },
        { type: 'yesno', text: 'Would you want a "Deep Dive" workshop on this specific panel topic at the next conference?' },
        { type: 'rating', text: 'What is your overall rating for this specific panel session?' },
        { type: 'comment', text: 'What is one "Key Takeaway" from today that you would like to get implemented in your organization/institute?' },
        { type: 'comment', text: 'Do you have any other suggestions/remarks for the conference?' }
      ]
    },
    {
      id: 3,
      title: 'Panel 3: Attracting talent to cybersecurity: Challenges and Opportunities',
      questions: [
        { type: 'rating', text: 'How relevant was the topic in the current cybersecurity landscape in India?' },
        { type: 'rating', text: 'How would you rate the quality of this panel\'s discussion?' },
        { type: 'rating', text: 'How would you rate the expertise and clarity of the panelist?' },
        { type: 'rating', text: 'How would you rate the depth of the technical/strategic discussion?' },
        { type: 'rating', text: 'To what extent did this panel provide you with new, actionable insights or factual data that you were previously unaware of?' },
        { type: 'rating', text: 'How effective was the session in connecting you with the right mentors or peers?' },
        { type: 'rating', text: 'How effectively did the panel assess the strengths and weaknesses of the current landscape of cybersecurity education?' },
        { 
          type: 'mcq', 
          text: 'In your opinion, what is the most important thing that needs to be improved/included in Indian Cyber Education right now?',
          options: ['Curriculum', 'Labs', 'FDPs', 'Certifications', 'Others']
        },
        { type: 'yesno', text: 'Do you feel the need for improvement in teaching pedagogy for cybersecurity awareness in India?' },
        { type: 'yesno', text: 'Do you feel there is a significant gap between the number of people who consider careers in cybersecurity and those in SDE/AI/ML/Data Science?' },
        { type: 'yesno', text: 'Does the current education curriculum (up to Senior Secondary level) cover enough cybersecurity fundamentals to invoke interest in talented students about the field?' },
        { 
          type: 'mcq', 
          text: 'What would you consider a major obstacle for someone aspiring to be a cybersecurity professional?',
          options: [
            'Payscale',
            'Weak advertisement (As in the field being niche)',
            'Pricing of Certifications',
            'Infrastructural restrictions'
          ]
        },
        { 
          type: 'mcq', 
          text: 'What do you perceive as the most significant roadblock of the panel discussion "Attracting talent to cybersecurity: Challenges and Opportunities"?',
          options: [
            'Uncompetitive salaries and reluctance to upscale',
            'Lack of soft skills and niche expertise',
            'Poor awareness and stigma',
            'Regional skill disparities',
            'Others'
          ]
        },
        { type: 'yesno', text: 'Would you want a "Deep Dive" workshop on this specific panel topic at the next conference?' },
        { type: 'rating', text: 'What is your overall rating for this specific panel session?' },
        { type: 'comment', text: 'What is one "Key Takeaway" from today that you would like to get implemented in your organization/institute?' },
        { type: 'comment', text: 'Do you have any other suggestions/remarks for the conference?' }
      ]
    },
    {
      id: 4,
      title: 'Panel 4: Bridging Academia and Industry in Cybersecurity Education',
      questions: [
        { type: 'rating', text: 'How relevant was the topic in the current cybersecurity landscape in India?' },
        { type: 'rating', text: 'How would you rate the quality of this panel\'s discussion?' },
        { type: 'rating', text: 'How would you rate the expertise and clarity of the panelist?' },
        { type: 'rating', text: 'How would you rate the depth of the technical/strategic discussion?' },
        { type: 'rating', text: 'To what extent did this panel provide you with new, actionable insights or factual data that you were previously unaware of?' },
        { type: 'rating', text: 'How effective was the session in connecting you with the right mentors or peers?' },
        { type: 'rating', text: 'How effectively did the panel assess the strengths and weaknesses of the current landscape of cybersecurity education?' },
        { 
          type: 'mcq', 
          text: 'In your opinion, what is the most important thing that needs to be improved/included in Indian Cyber Education right now?',
          options: ['Curriculum', 'Labs', 'FDPs', 'Certifications', 'Others']
        },
        { type: 'yesno', text: 'Do you feel the need for improvement in teaching pedagogy for cybersecurity awareness in India?' },
        { type: 'yesno', text: 'Did the discussion provide actionable insights on how academic programs can better align with real-world cybersecurity threats?' },
        { type: 'rating', text: 'On a scale of 1-5, how severe is the disconnect between academia and industry?' },
        { 
          type: 'mcq', 
          text: 'What do you perceive as the most significant roadblock of the panel discussion "Bridging Academia and Industry in Cybersecurity Education"?',
          options: [
            'Curriculum misalignment',
            'Gaps in industry-academia collaboration',
            'Evaluation criteria mismatch',
            'Lack of startup ecosystem integration',
            'Others'
          ]
        },
        { type: 'yesno', text: 'Would you want a "Deep Dive" workshop on this specific panel topic at the next conference?' },
        { type: 'rating', text: 'What is your overall rating for this specific panel session?' },
        { type: 'comment', text: 'What is one "Key Takeaway" from today that you would like to get implemented in your organization/institute?' },
        { type: 'comment', text: 'What is one topic related to cybersecurity education that was not covered but should be included in future panels?' },
        { type: 'rating', text: 'In your opinion, did all of the panel discussions align with the objectives of the conference "Roadmap for Cybersecurity Education and Talent Development"?' },
        { type: 'comment', text: 'Do you have any other suggestions/remarks for the conference?' }
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

  const handleResponseChange = (panelId, questionIndex, value) => {
    setResponses(prev => ({
      ...prev,
      [`panel${panelId}_q${questionIndex}`]: value
    }));
  };

  const submitPanelFeedback = async (panelId) => {
    const panel = panels.find(p => p.id === panelId);
    
    // Check if all questions are answered
    const allAnswered = panel.questions.every((_, idx) => 
      responses[`panel${panelId}_q${idx}`]
    );

    if (!allAnswered) {
      alert('Please answer all questions before submitting.');
      return;
    }

    setLoading(true);
    try {
      const panelResponses = panel.questions.map((question, idx) => ({
        question: question.text,
        type: question.type,
        answer: responses[`panel${panelId}_q${idx}`] || ''
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
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* User Card */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-cyan-500/30 rounded-xl sm:rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.15)] sm:shadow-[0_0_50px_rgba(6,182,212,0.15)] p-4 sm:p-6 mb-4 sm:mb-6 animate-fade-in relative overflow-hidden">
          <div className="absolute top-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-cyan-400/50"></div>
          <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-cyan-400/50"></div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 relative z-10">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(14,165,233,0.5)] sm:shadow-[0_0_30px_rgba(14,165,233,0.5)] flex-shrink-0">
              <span className="text-xl sm:text-2xl text-white font-bold">{participantInfo.name.charAt(0)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 tracking-wide">
                Welcome, <span className="text-cyan-400">{participantInfo.name}</span>
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                <p className="text-slate-400 font-medium">
                  <span className="text-cyan-400/70">Designation:</span> {participantInfo.designation}
                </p>
                <p className="text-slate-400 font-medium">
                  <span className="text-cyan-400/70">Organization:</span> {participantInfo.organization}
                </p>
                <p className="text-slate-400 font-medium">
                  <span className="text-cyan-400/70">Phone:</span> {participantInfo.phone}
                </p>
                <p className="text-slate-400 font-medium truncate">
                  <span className="text-cyan-400/70">Email:</span> {participantInfo.email}
                </p>
              </div>
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
                          <div key={idx} className="bg-slate-900/50 border border-blue-500/20 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:border-cyan-400/50 transition-all duration-300">
                            <p className="font-semibold text-white mb-3 text-xs sm:text-sm md:text-base flex items-start gap-2">
                              <span className="text-cyan-400 flex-shrink-0 font-bold">{idx + 1}.</span>
                              <span>{question.text}</span>
                            </p>
                            
                            {/* Rating Type */}
                            {question.type === 'rating' && (
                              <div className="flex gap-1 sm:gap-2 justify-start flex-wrap">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                  <button
                                    key={rating}
                                    type="button"
                                    onClick={() => handleResponseChange(panel.id, idx, rating)}
                                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg font-bold text-sm sm:text-base transition-all duration-300 ${
                                      responses[`panel${panel.id}_q${idx}`] === rating
                                        ? rating === 1 ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                                        : rating === 2 ? 'bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.5)]'
                                        : rating === 3 ? 'bg-yellow-500 text-white shadow-[0_0_15px_rgba(234,179,8,0.5)]'
                                        : rating === 4 ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                                        : 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]'
                                      : 'bg-slate-800/50 text-slate-400 border border-slate-700 hover:border-cyan-400/50 hover:text-white'
                                    }`}
                                  >
                                    {rating}
                                  </button>
                                ))}
                              </div>
                            )}

                            {/* Yes/No Type */}
                            {question.type === 'yesno' && (
                              <div className="flex gap-3 sm:gap-4">
                                <button
                                  type="button"
                                  onClick={() => handleResponseChange(panel.id, idx, 'Yes')}
                                  className={`px-6 py-2 sm:px-8 sm:py-3 rounded-lg font-bold text-sm sm:text-base transition-all duration-300 ${
                                    responses[`panel${panel.id}_q${idx}`] === 'Yes'
                                      ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]'
                                      : 'bg-slate-800/50 text-slate-400 border border-slate-700 hover:border-cyan-400/50 hover:text-white'
                                  }`}
                                >
                                  Yes
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleResponseChange(panel.id, idx, 'No')}
                                  className={`px-6 py-2 sm:px-8 sm:py-3 rounded-lg font-bold text-sm sm:text-base transition-all duration-300 ${
                                    responses[`panel${panel.id}_q${idx}`] === 'No'
                                      ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]'
                                      : 'bg-slate-800/50 text-slate-400 border border-slate-700 hover:border-cyan-400/50 hover:text-white'
                                  }`}
                                >
                                  No
                                </button>
                              </div>
                            )}

                            {/* MCQ Type */}
                            {question.type === 'mcq' && (
                              <div className="space-y-2">
                                {question.options.map((option, optIdx) => (
                                  <button
                                    key={optIdx}
                                    type="button"
                                    onClick={() => handleResponseChange(panel.id, idx, option)}
                                    className={`w-full text-left px-4 py-3 rounded-lg font-medium text-xs sm:text-sm transition-all duration-300 ${
                                      responses[`panel${panel.id}_q${idx}`] === option
                                        ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)] border-2 border-cyan-400'
                                        : 'bg-slate-800/50 text-slate-300 border border-slate-700 hover:border-cyan-400/50 hover:bg-slate-800'
                                    }`}
                                  >
                                    {String.fromCharCode(97 + optIdx)}. {option}
                                  </button>
                                ))}
                              </div>
                            )}

                            {/* Comment Type */}
                            {question.type === 'comment' && (
                              <textarea
                                placeholder="Enter your response here..."
                                value={responses[`panel${panel.id}_q${idx}`] || ''}
                                onChange={(e) => handleResponseChange(panel.id, idx, e.target.value)}
                                className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-slate-900/80 border border-blue-500/30 rounded-lg sm:rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 text-white placeholder-slate-600 tracking-wide text-xs sm:text-sm min-h-[80px] sm:min-h-[100px]"
                                rows="3"
                              />
                            )}
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
                              <span className="hidden sm:inline">Submit Feedback</span>
                              <span className="sm:hidden">Submit</span>
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
        <div className="text-center mt-6 sm:mt-8 pb-4 px-2">
          <p className="text-slate-500 text-xs sm:text-sm tracking-wide">
            © National Forensic Sciences University, Delhi Campus
          </p>
          <p className="text-slate-600 text-[10px] sm:text-xs tracking-wide">
    Created and managed by Tamanna Khurana
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
