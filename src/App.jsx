import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Activity, Terminal, CheckCircle2, Bot, LineChart, FileText, Menu, X } from 'lucide-react';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

const LegalPage = ({ title, content }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#F2F0E9] text-[#1A1A1A] flex flex-col">
      <div className="noise-overlay" />
      <nav className="fixed top-6 left-0 w-full z-50 transition-all duration-300">
        <div className="mx-auto px-4 md:px-16 max-w-7xl">
          <div className="rounded-full px-8 py-4 w-full flex items-center justify-between border border-[#1A1A1A]/10 bg-[#F2F0E9]/80 backdrop-blur-xl shadow-sm">
            <a href="#" className="text-xl font-bold text-heading tracking-tight text-[#1A1A1A]">Automilly.</a>
            <a href="#" className="text-sm font-medium hover:text-[#CC5833] flex items-center gap-2 flex-row-reverse"><ArrowRight className="w-4 h-4 rotate-180" /> Back to Home</a>
          </div>
        </div>
      </nav>
      <main className="pt-48 pb-32 px-4 md:px-16 max-w-4xl mx-auto relative z-10 flex-1">
        <h1 className="text-4xl md:text-6xl text-heading font-bold mb-16 tracking-tight">{title}</h1>
        <div className="prose prose-lg prose-neutral max-w-none font-medium leading-relaxed whitespace-pre-wrap text-[#1A1A1A]/80">
          {content}
        </div>
      </main>

      <footer className="bg-[#1A1A1A] text-[#F2F0E9] pt-16 pb-8 px-8 md:px-16 rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-bold text-heading tracking-tight mb-2">Automilly.</h2>
              <p className="text-[#F2F0E9]/50 text-sm max-w-xs">Custom automation workflows for regulated industries.</p>
            </div>
            <div className="flex gap-8 text-sm font-medium text-[#F2F0E9]/60">
              <a href="#/privacy" className="hover:text-[#F2F0E9] transition-colors">Privacy Policy</a>
              <a href="#/terms" className="hover:text-[#F2F0E9] transition-colors">Terms of Service</a>
              <a href="#/dpa" className="hover:text-[#F2F0E9] transition-colors">DPA</a>
            </div>
          </div>
          <div className="border-t border-[#F2F0E9]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-[#F2F0E9]/40">
            <p>&copy; {new Date().getFullYear()} Automilly LLC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  const container = useRef(null);

  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const handleHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    const handleScroll = () => setNavScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // States for Shuffler Card
  const [shufflerCards, setShufflerCards] = useState([
    { id: 1, title: 'Workflow Audits', desc: '-40% overhead detected', z: 30, y: 0, scale: 1, opacity: 1 },
    { id: 2, title: 'Resource allocation', desc: '+15hrs saved weekly', z: 20, y: 12, scale: 0.95, opacity: 0.7 },
    { id: 3, title: 'Process redundancies', desc: 'Eliminated bottlenecks', z: 10, y: 24, scale: 0.9, opacity: 0.4 }
  ]);

  // Telemetry Typewriter State
  const [typewriterText, setTypewriterText] = useState('');
  const typeIdxRef = useRef(0);
  const fullText = "Lead received → CRM updated → Follow-up sent in 12s... Task routed → Team notified → Status: complete.";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo('.hero-anim',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 1, ease: 'power3.out', delay: 0.2 }
      );

      // Philosophy SplitText simulation (since actual SplitText is premium)
      gsap.fromTo('.philosophy-statement',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: '#philosophy',
            start: 'top 70%'
          }
        }
      );

      // Protocol Stacking
      const protocolCards = gsap.utils.toArray('.protocol-card');
      protocolCards.forEach((card, i) => {
        if (i < protocolCards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: 'top top',
            end: 'bottom top',
            endTrigger: '.protocol-section',
            pin: true,
            pinSpacing: false,
            id: `pin-${i}`,
            invalidateOnRefresh: true,
          });

          // Fade and blur card underneath
          gsap.to(card, {
            scale: 0.9,
            opacity: 0.5,
            filter: 'blur(10px)',
            scrollTrigger: {
              trigger: protocolCards[i + 1],
              start: 'top bottom',
              end: 'top top',
              scrub: true
            }
          });
        } else {
          ScrollTrigger.create({
            trigger: card,
            start: 'top top',
            end: '+=100%',
            pin: true,
          });
        }
      });
    }, container);

    // Shuffler Logic
    const shufflerInterval = setInterval(() => {
      setShufflerCards(prev => {
        const next = [...prev];
        const last = next.pop();
        next.unshift(last);
        return next;
      });
    }, 3000);

    // Typewriter logic
    typeIdxRef.current = 0;
    setTypewriterText('');
    const typeInterval = setInterval(() => {
      if (typeIdxRef.current < fullText.length) {
        setTypewriterText(fullText.slice(0, typeIdxRef.current + 1));
        typeIdxRef.current++;
      } else {
        // Reset after complete
        typeIdxRef.current = 0;
        setTypewriterText('');
      }
    }, 50);

    return () => {
      ctx.revert();
      clearInterval(shufflerInterval);
      clearInterval(typeInterval);
    };
  }, []);

  if (currentHash === '#/privacy') return <LegalPage title="Privacy Policy" content={`Last Updated: March 2026\n\nAutomilly LLC ("we," "us," or "our") respects your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.\n\nINFORMATION WE COLLECT\nWe may collect personal information that you provide to us, such as your name, email address, and company details when you book a call or interact with our services.\n\nHOW WE USE YOUR INFORMATION\nWe use the information we collect to:\n- Provide, operate, and maintain our services.\n- Improve, personalize, and expand our services.\n- Communicate with you, including for customer service and marketing.\n\nDATA SECURITY\nWe implement industry-standard security measures to protect your personal information.`} />;

  if (currentHash === '#/terms') return <LegalPage title="Terms of Service" content={`Last Updated: March 2026\n\nBy accessing or using Automilly's services, you agree to be bound by these Terms of Service.\n\nUSE OF SERVICES\nYou agree to use our services only for lawful purposes and in accordance with these Terms. You are responsible for ensuring your systems are compatible with our automation tools.\n\nINTELLECTUAL PROPERTY\nThe platform, its original content, features, and functionality are owned by Automilly LLC and are protected by international copyright, trademark, and other intellectual property laws.\n\nLIMITATION OF LIABILITY\nIn no event shall Automilly LLC be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, or goodwill.`} />;

  if (currentHash === '#/dpa') return <LegalPage title="Data Processing Addendum" content={`Last Updated: March 2026\n\nThis Data Processing Addendum ("DPA") forms part of the Terms of Service between Automilly LLC and the customer.\n\nSCOPE OF PROCESSING\nAutomilly will process personal data solely to the extent necessary to provide the services as described in the service agreement.\n\nSECURITY MEASURES\nWe maintain comprehensive administrative, physical, and technical safeguards to protect the security, confidentiality, and integrity of personal data.\n\nSUBPROCESSORS\nThe customer agrees that we may engage subprocessors to process personal data. We will remain fully liable for all obligations subcontracted to, and all acts and omissions of, the subprocessor.`} />;

  return (
    <div ref={container} className="relative w-full min-h-screen">
      <div className="noise-overlay" />

      {/* A. NAVBAR */}
      <nav id="navbar" className="fixed top-6 left-0 w-full z-50 transition-all duration-300 pointer-events-none">
        <div className="mx-auto px-4 md:px-16 max-w-7xl">
          <div className={`pointer-events-auto rounded-full px-8 py-4 w-full flex items-center justify-between border transition-all duration-300 ${navScrolled ? 'bg-[#F2F0E9]/60 backdrop-blur-xl border-[#1A1A1A]/10 shadow-sm' : 'border-transparent'}`}>
            <div className={`text-xl font-bold text-heading tracking-tight transition-colors duration-300 ${navScrolled ? 'text-[#1A1A1A]' : 'text-[#F2F0E9]'}`}>Automilly.</div>
            <div className={`hidden md:flex items-center gap-8 text-sm font-medium transition-colors duration-300 ${navScrolled ? 'text-[#1A1A1A]/70' : 'text-[#F2F0E9]/80'}`}>
              <a href="#features" className={`hover:-translate-y-[1px] transition-all ${navScrolled ? 'hover:text-[#1A1A1A]' : 'hover:text-[#F2F0E9]'}`}>Solutions</a>
              <a href="#philosophy" className={`hover:-translate-y-[1px] transition-all ${navScrolled ? 'hover:text-[#1A1A1A]' : 'hover:text-[#F2F0E9]'}`}>Philosophy</a>
              <a href="#protocol" className={`hover:-translate-y-[1px] transition-all ${navScrolled ? 'hover:text-[#1A1A1A]' : 'hover:text-[#F2F0E9]'}`}>Process</a>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://cal.com/automilly/growth-mapping-call" className="magnetic-btn btn-slide bg-[#CC5833] text-[#F2F0E9] px-6 py-2.5 rounded-full text-sm font-bold hidden md:flex items-center gap-2">
                <span className="slide-bg"></span>
                <span className="btn-slide-content flex items-center gap-2">Book Call <ArrowRight className="w-4 h-4" /></span>
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden transition-colors duration-300 ${navScrolled ? 'text-[#1A1A1A]' : 'text-[#F2F0E9]'}`}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="pointer-events-auto md:hidden mt-2 mx-4">
            <div className="bg-[#F2F0E9] rounded-3xl p-6 border border-[#1A1A1A]/10 shadow-lg flex flex-col gap-4">
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-[#1A1A1A] font-medium py-2 hover:text-[#CC5833] transition-colors">Solutions</a>
              <a href="#philosophy" onClick={() => setMobileMenuOpen(false)} className="text-[#1A1A1A] font-medium py-2 hover:text-[#CC5833] transition-colors">Philosophy</a>
              <a href="#protocol" onClick={() => setMobileMenuOpen(false)} className="text-[#1A1A1A] font-medium py-2 hover:text-[#CC5833] transition-colors">Process</a>
              <a href="https://cal.com/automilly/growth-mapping-call" className="bg-[#CC5833] text-[#F2F0E9] px-6 py-3 rounded-full text-sm font-bold text-center mt-2">
                Book a Call
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* B. HERO SECTION */}
      <section className="relative h-[100dvh] w-full flex items-end pb-24 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] via-[#2E4036] to-[#1A1A1A]" />
        {/* Subtle dot grid */}
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(#F2F0E9 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        {/* Accent glow */}
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#CC5833]/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#2E4036]/30 blur-[100px]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-16">
          <div className="w-full flex flex-col items-start gap-6 px-8">
            <div className="hero-anim text-[#F2F0E9]">
              <h1 className="flex flex-col gap-0 leading-[0.9]">
                <span className="text-heading font-semibold tracking-tight text-3xl md:text-5xl lg:text-7xl">We automate your</span>
                <span className="text-drama text-5xl md:text-8xl lg:text-[9rem] text-[#CC5833]">Operations.</span>
              </h1>
            </div>
            <p className="hero-anim text-lg md:text-xl text-[#F2F0E9]/80 max-w-xl font-light leading-relaxed">
              Your team wastes 15+ hours a week on tasks a machine should handle. We build custom workflows that fix that.
            </p>
            <div className="hero-anim mt-4">
              <a href="#features" className="magnetic-btn bg-[#F2F0E9] text-[#2E4036] px-8 py-4 rounded-full text-sm font-bold tracking-wide uppercase flex items-center gap-3">
                See How It Works
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* C. FEATURES — Interactive Functional Artifacts */}
      <section id="features" className="py-32 px-4 md:px-16 bg-[#F2F0E9]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-heading text-4xl font-bold tracking-tight text-[#1A1A1A]">What We Automate.</h2>
            <p className="text-lg text-[#1A1A1A]/60 mt-4 max-w-xl">We find what's slowing your team down and build workflows that handle it automatically.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Card 1: Diagnostic Shuffler (Cost Reduction) */}
            <div className="bg-white rounded-[2rem] p-8 border border-[#1A1A1A]/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-[400px] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#2E4036]/10 text-[#2E4036] flex items-center justify-center mb-6">
                  <Activity size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-heading font-bold text-xl mb-2">Cost Reduction</h3>
                <p className="text-[#1A1A1A]/60 text-sm">Cut manual work and eliminate repetitive tasks that drain your team.</p>
              </div>
              <div className="relative h-40 w-full flex items-end justify-center perspective-[1000px]">
                {shufflerCards.map((card, idx) => (
                  <div
                    key={card.id}
                    className="absolute w-full bg-[#FAFAFA] border border-[#1A1A1A]/10 rounded-2xl p-4 shadow-sm transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                    style={{
                      transform: `translateY(-${card.y}px) scale(${card.scale})`,
                      zIndex: card.z,
                      opacity: card.opacity
                    }}
                  >
                    <div className="text-xs font-bold text-[#1A1A1A]/50 mb-1">{card.title}</div>
                    <div className="text-data text-sm text-[#2E4036] font-medium">{card.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2: Telemetry Typewriter (Improved Outcomes) */}
            <div className="bg-white rounded-[2rem] p-8 border border-[#1A1A1A]/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-[400px] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#CC5833]/10 text-[#CC5833] flex items-center justify-center mb-6">
                  <Terminal size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-heading font-bold text-xl mb-2">Improved Outcomes</h3>
                <p className="text-[#1A1A1A]/60 text-sm">Real-time dashboards and automated reporting so you always know what's working.</p>
              </div>
              <div className="w-full bg-[#1A1A1A] rounded-2xl p-4 h-40 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#CC5833] animate-pulse"></div>
                  <span className="text-data text-[10px] text-[#F2F0E9]/50 uppercase tracking-wider">Live Feed</span>
                </div>
                <p className="text-data text-sm text-[#CC5833]">
                  {typewriterText}<span className="animate-ping text-[#F2F0E9]">_</span>
                </p>
              </div>
            </div>

            {/* Card 3: Cursor Protocol Scheduler (Increased Productivity) */}
            <div className="bg-white rounded-[2rem] p-8 border border-[#1A1A1A]/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-[400px] flex flex-col justify-between overflow-hidden relative group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#2E4036]/10 text-[#2E4036] flex items-center justify-center mb-6">
                  <CheckCircle2 size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-heading font-bold text-xl mb-2">Increased Productivity</h3>
                <p className="text-[#1A1A1A]/60 text-sm">Automate lead follow-ups, scheduling, and data entry so your team focuses on real work.</p>
              </div>

              <div className="w-full h-40 relative">
                <div className="grid grid-cols-7 gap-1 h-12 mb-4">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                    <div key={i} className={`flex items-center justify-center text-xs font-bold rounded-md ${i === 3 ? 'bg-[#CC5833]/20 text-[#CC5833]' : 'bg-[#FAFAFA] text-[#1A1A1A]/40'}`}>
                      {d}
                    </div>
                  ))}
                </div>
                <div className="w-full h-8 bg-[#2E4036] rounded-lg flex items-center justify-center text-[#F2F0E9] text-xs font-bold hover:bg-[#CC5833] transition-colors cursor-pointer">
                  Activate Protocol
                </div>
                {/* Simulated Cursor Animation using CSS */}
                <div className="absolute w-4 h-4 text-[#1A1A1A] animate-[cursor-path_4s_infinite_ease-in-out]">
                  <svg viewBox="0 0 24 24" fill="currentColor" stroke="white" strokeWidth="2" className="drop-shadow-md pb-[10px] pr-[10px]"><path d="M5.5 2.5L20 10.5L12.5 13.5L9 21.5L5.5 2.5Z" /></svg>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* D. PHILOSOPHY — The Manifesto */}
      <section id="philosophy" className="relative py-48 px-4 md:px-16 bg-[#1A1A1A] overflow-hidden">
        {/* Parallax texture */}
        <div className="absolute inset-0 opacity-10 mix-blend-overlay">
          <img src="https://images.unsplash.com/photo-1511204094038-1647e33e14a1?auto=format&fit=crop&q=80" alt="Texture" className="w-full h-[150%] object-cover object-center -translate-y-[10%]" data-speed="0.5" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-12">
          <p className="philosophy-statement text-[#F2F0E9]/60 text-heading text-xl md:text-2xl font-light">
            Most agencies sell you a tool. <span className="text-[#F2F0E9]">We build the system around it.</span>
          </p>
          <p className="philosophy-statement text-drama text-[#F2F0E9] text-5xl md:text-7xl lg:text-8xl leading-none">
            Automation that <span className="text-[#CC5833]">actually</span> works.
          </p>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-24 px-4 md:px-16 bg-[#F2F0E9]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-heading text-3xl md:text-4xl font-bold tracking-tight text-[#1A1A1A] mb-16 text-center">Results That Speak.</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-[2rem] p-8 border border-[#1A1A1A]/5 shadow-sm">
              <div className="text-drama text-5xl text-[#CC5833] mb-2">15+</div>
              <p className="text-heading font-semibold text-lg mb-1">Hours Saved Weekly</p>
              <p className="text-[#1A1A1A]/50 text-sm">Average time reclaimed per client through automated lead routing and follow-ups.</p>
            </div>
            <div className="bg-white rounded-[2rem] p-8 border border-[#1A1A1A]/5 shadow-sm">
              <div className="text-drama text-5xl text-[#CC5833] mb-2">40%</div>
              <p className="text-heading font-semibold text-lg mb-1">Reduction in Manual Work</p>
              <p className="text-[#1A1A1A]/50 text-sm">Clients see an average 40% drop in repetitive operational overhead within 30 days.</p>
            </div>
            <div className="bg-white rounded-[2rem] p-8 border border-[#1A1A1A]/5 shadow-sm">
              <div className="text-drama text-5xl text-[#CC5833] mb-2">3x</div>
              <p className="text-heading font-semibold text-lg mb-1">Faster Lead Response</p>
              <p className="text-[#1A1A1A]/50 text-sm">Speed-to-lead automations that respond in under 60 seconds, 24/7.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#2E4036] rounded-[2rem] p-8 md:p-10">
              <p className="text-[#F2F0E9]/90 text-base leading-relaxed mb-6">"Working with Stepan was an outstanding experience from start to finish. He was tasked with building a sophisticated customer portal using Softr, Airtable, and Make for one of the largest customers in the United States, and he not only delivered, but went above and beyond."</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#CC5833]/20 flex items-center justify-center text-[#CC5833] font-bold text-sm">GH</div>
                <div>
                  <p className="text-[#F2F0E9] font-semibold text-sm">Greg Hartgraves</p>
                  <p className="text-[#F2F0E9]/40 text-xs">WECS</p>
                </div>
              </div>
            </div>
            <div className="bg-[#2E4036] rounded-[2rem] p-8 md:p-10">
              <p className="text-[#F2F0E9]/90 text-base leading-relaxed mb-6">"It was a pure pleasure to work with Stepan on my project. He is a good communicator, very responsive and independent thinker, proposing solutions beyond instructions given to ensure the best possible outcome for the client."</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#CC5833]/20 flex items-center justify-center text-[#CC5833] font-bold text-sm">MS</div>
                <div>
                  <p className="text-[#F2F0E9] font-semibold text-sm">Maximilian Stella</p>
                  <p className="text-[#F2F0E9]/40 text-xs">R+ Capital</p>
                </div>
              </div>
            </div>
            <div className="bg-[#2E4036] rounded-[2rem] p-8 md:p-10">
              <p className="text-[#F2F0E9]/90 text-base leading-relaxed mb-6">"Working with Stepan was an excellent experience from start to finish. He is professional, highly skilled, and incredibly reliable. Communication was seamless, deadlines were met without issue, and the quality of work exceeded expectations."</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#CC5833]/20 flex items-center justify-center text-[#CC5833] font-bold text-sm">TP</div>
                <div>
                  <p className="text-[#F2F0E9] font-semibold text-sm">Thomas Purdy</p>
                  <p className="text-[#F2F0E9]/40 text-xs">Citizenship360</p>
                </div>
              </div>
            </div>
            <div className="bg-[#2E4036] rounded-[2rem] p-8 md:p-10">
              <p className="text-[#F2F0E9]/90 text-base leading-relaxed mb-6">"Stepan was exceptionally good at understanding the project requirements and delivered a final project that met my expectations. His attention to detail was exceptional. Will definitely work with Stepan on future projects."</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#CC5833]/20 flex items-center justify-center text-[#CC5833] font-bold text-sm">RG</div>
                <div>
                  <p className="text-[#F2F0E9] font-semibold text-sm">Ross Guzovich</p>
                  <p className="text-[#F2F0E9]/40 text-xs">Outsource CFO</p>
                </div>
              </div>
            </div>
            <div className="bg-[#2E4036] rounded-[2rem] p-8 md:p-10">
              <p className="text-[#F2F0E9]/90 text-base leading-relaxed mb-6">"Stepan works extremely hard and always hard great creative solutions to get the job done!"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#CC5833]/20 flex items-center justify-center text-[#CC5833] font-bold text-sm">JA</div>
                <div>
                  <p className="text-[#F2F0E9] font-semibold text-sm">Josh Andrews</p>
                  <p className="text-[#F2F0E9]/40 text-xs">Copy Culture</p>
                </div>
              </div>
            </div>
            <div className="bg-[#2E4036] rounded-[2rem] p-8 md:p-10">
              <p className="text-[#F2F0E9]/90 text-base leading-relaxed mb-6">"Stepan is diligent, a good communicator and knew how to accomplish everything he promised. I will seek him out again in the future if I need to develop a GHL instance further."</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#CC5833]/20 flex items-center justify-center text-[#CC5833] font-bold text-sm">SG</div>
                <div>
                  <p className="text-[#F2F0E9] font-semibold text-sm">Scott Guild</p>
                  <p className="text-[#F2F0E9]/40 text-xs">All Western Mortgage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* E. PROTOCOL — Sticky Stacking Archive */}
      <section id="protocol" className="protocol-section relative bg-[#F2F0E9]">

        {/* Card 1 */}
        <div className="protocol-card min-h-screen w-full flex items-center justify-center sticky top-0 bg-[#F2F0E9]">
          <div className="w-[90%] max-w-5xl rounded-[3rem] bg-[#2E4036] p-12 md:p-24 shadow-2xl flex flex-col md:flex-row items-center gap-16 relative overflow-hidden">
            {/* Abstract rotating graphic */}
            <div className="absolute right-[-10%] top-[-20%] opacity-20 text-[#CC5833] animate-[spin_40s_linear_infinite]">
              <svg width="400" height="400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
                <circle cx="50" cy="50" r="40" />
                <circle cx="50" cy="50" r="30" />
                <circle cx="50" cy="50" r="20" />
                <path d="M50 0 L50 100 M0 50 L100 50 M15 15 L85 85 M15 85 L85 15" />
              </svg>
            </div>

            <div className="relative z-10 flex-1">
              <span className="text-data text-[#CC5833] font-medium tracking-widest mb-4 block">01 / DISCOVERY</span>
              <h2 className="text-heading text-4xl md:text-5xl font-bold text-[#F2F0E9] mb-4">Audit Your Workflows</h2>
              <p className="text-[#F2F0E9]/70 text-lg max-w-md">We map your current processes end to end: CRM, lead routing, follow-ups, reporting. Then we pinpoint exactly where automation saves the most time.</p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="protocol-card min-h-screen w-full flex items-center justify-center sticky top-0 bg-[#F2F0E9]">
          <div className="w-[90%] max-w-5xl rounded-[3rem] bg-[#CC5833] p-12 md:p-24 shadow-2xl flex flex-col md:flex-row items-center gap-16 relative overflow-hidden">
            {/* Grid scanner graphic */}
            <div className="absolute left-0 bottom-0 w-full h-1/2 opacity-20">
              <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#1A1A1A 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
              <div className="absolute top-0 w-full h-1 bg-[#F2F0E9] animate-[scanner_3s_ease-in-out_infinite_alternate]" />
            </div>

            <div className="relative z-10 flex-1 ml-auto">
              <span className="text-data text-[#1A1A1A] font-medium tracking-widest mb-4 block">02 / BUILD</span>
              <h2 className="text-heading text-4xl md:text-5xl font-bold text-[#F2F0E9] mb-4">Build & Integrate</h2>
              <p className="text-[#F2F0E9]/90 text-lg max-w-md">We build custom automations in Make.com and GoHighLevel, connect your tools, and set up AI-powered workflows tailored to your industry.</p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="protocol-card min-h-screen w-full flex items-center justify-center sticky top-0 bg-[#F2F0E9]">
          <div className="w-[90%] max-w-5xl rounded-[3rem] bg-white p-12 md:p-24 shadow-2xl flex flex-col md:flex-row items-center gap-16 relative border border-[#1A1A1A]/10">
            {/* EKG pulse graphic */}
            <div className="absolute top-[30%] left-[-5%] w-[110%] opacity-10 pointer-events-none">
              <svg width="100%" height="200" viewBox="0 0 1000 200" preserveAspectRatio="none">
                <path stroke="#CC5833" strokeWidth="4" fill="none" className="animate-[dash_2s_linear_infinite]"
                  d="M0,100 L300,100 L320,50 L350,150 L380,30 L410,170 L430,100 L1000,100" />
              </svg>
            </div>

            <div className="relative z-10 flex-1 text-center md:text-left">
              <span className="text-data text-[#2E4036] font-medium tracking-widest mb-4 block">03 / LAUNCH</span>
              <h2 className="text-heading text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">Launch & Support</h2>
              <p className="text-[#1A1A1A]/60 text-lg max-w-md mx-auto md:mx-0">We deploy everything into your live environment, train your team, and provide ongoing support to keep your automations running smoothly.</p>
            </div>
          </div>
        </div>

        {/* Card 4 — CTA */}
        <div className="protocol-card min-h-screen w-full flex items-center justify-center sticky top-0 bg-[#F2F0E9]">
          <div className="w-[90%] max-w-5xl rounded-[3rem] bg-[#1A1A1A] p-12 md:p-24 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#F2F0E9 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            <div className="absolute top-[-30%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#CC5833]/15 blur-[80px]" />
            <div className="relative z-10 flex flex-col items-center">
              <span className="text-data text-[#CC5833] font-medium tracking-widest mb-4 block">04 / START</span>
              <h2 className="text-heading text-4xl md:text-5xl font-bold tracking-tight text-[#F2F0E9] mb-4">Ready to automate?</h2>
              <p className="text-lg text-[#F2F0E9]/60 max-w-xl mb-8">Book a free 30-minute growth mapping call. We'll show you exactly where automation saves you time and money.</p>
              <a href="https://cal.com/automilly/growth-mapping-call" className="magnetic-btn inline-flex items-center gap-3 bg-[#CC5833] text-[#F2F0E9] px-10 py-5 rounded-full text-lg font-bold">
                Book Your Free Call <ArrowRight className="w-5 h-5" />
              </a>
              <p className="text-sm text-[#F2F0E9]/30 mt-6">No commitment. No sales pitch. Just a clear plan.</p>
            </div>
          </div>
        </div>

      </section>

      {/* G. FOOTER */}
      <footer className="bg-[#1A1A1A] text-[#F2F0E9] pt-24 pb-12 px-8 md:px-16 rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Automilly.</h2>
              <p className="text-[#F2F0E9]/50 max-w-sm mb-8">Custom automation workflows for regulated industries. We help teams save time, reduce errors, and scale faster.</p>

              {/* System Status */}
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#2E4036]/20 rounded-full border border-[#2E4036]/50">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </div>
                <span className="text-data text-xs text-emerald-400 uppercase tracking-widest">System Operational</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-[#F2F0E9]/40 tracking-widest text-xs uppercase text-data">Navigation</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><a href="#features" className="hover:text-[#CC5833] transition-colors">Solutions</a></li>
                <li><a href="#philosophy" className="hover:text-[#CC5833] transition-colors">Philosophy</a></li>
                <li><a href="#protocol" className="hover:text-[#CC5833] transition-colors">Protocol</a></li>
                <li><a href="https://cal.com/automilly/growth-mapping-call" className="hover:text-[#CC5833] transition-colors">Book a Call</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-[#F2F0E9]/40 tracking-widest text-xs uppercase text-data">Legal</h4>
              <ul className="space-y-4 text-sm font-medium text-[#F2F0E9]/60">
                <li><a href="#/privacy" className="hover:text-[#F2F0E9] transition-colors">Privacy Policy</a></li>
                <li><a href="#/terms" className="hover:text-[#F2F0E9] transition-colors">Terms of Service</a></li>
                <li><a href="#/dpa" className="hover:text-[#F2F0E9] transition-colors">Data Processing Addendum</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#F2F0E9]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-[#F2F0E9]/40">
            <p>&copy; {new Date().getFullYear()} Automilly LLC. All rights reserved.</p>
            <p className="text-data">V.1.0.4.7</p>
          </div>
        </div>
      </footer>


    </div >
  );
}

export default App;
