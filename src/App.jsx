import React, { useState, useEffect, useRef } from "react";
import {
  Menu, X, Github, Linkedin, Mail, Phone, MapPin, ArrowRight, ArrowUpRight,
  Database, Cpu, MonitorSmartphone, GitBranch, Target, Wrench, FileOutput,
  TrendingUp, GraduationCap, Award, Sparkles as SparklesIcon, Layers,
  LineChart as LineChartIcon, Quote,
} from "lucide-react";

/* ---------------------------------- data ---------------------------------- */

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const SERVICES = [
  {
    icon: Database,
    title: "Data cleaning & preprocessing",
    desc: "Preparing raw, inconsistent, or incomplete datasets for reliable analysis.",
  },
  {
    icon: TrendingUp,
    title: "Exploratory data analysis",
    desc: "Finding patterns and trends, communicated through clear visualizations.",
  },
  {
    icon: Layers,
    title: "Feature engineering",
    desc: "Building statistical and rolling features that improve model accuracy.",
  },
  {
    icon: Cpu,
    title: "ML model development & evaluation",
    desc: "Comparing regression/classification models with MAE, RMSE, and R\u00B2.",
  },
  {
    icon: LineChartIcon,
    title: "Predictive maintenance analysis",
    desc: "Turning sensor and operational data into predictive maintenance workflows.",
  },
  {
    icon: MonitorSmartphone,
    title: "Desktop GUI development",
    desc: "Modular, usable desktop apps with Qt (C++) or CustomTkinter (Python).",
  },
];

const SKILLS = [
  { cat: "Programming", items: ["Python", "C++"] },
  { cat: "Data science & ML", items: ["Pandas", "NumPy", "Scikit-learn", "Seaborn", "ydata-profiling"] },
  { cat: "GUI development", items: ["Qt", "CustomTkinter"] },
  { cat: "Tools & platforms", items: ["Git", "GitHub", "VS Code", "Google Colab", "Streamlit"] },
  { cat: "Core competencies", items: ["Data Structures", "Algorithms", "OOP", "EDA", "Data Preprocessing", "Feature Engineering", "Predictive Modeling"] },
  { cat: "Soft skills", items: ["Algorithmic Problem-Solving", "Team Collaboration", "Adaptability", "Technical Communication"] },
];

const PROCESS = [
  "Explored 49 sensor and operational features across engine run-to-failure cycles.",
  "Cleaned the dataset and handled outliers using the Interquartile Range (IQR) method.",
  "Performed exploratory data analysis and visualization to understand engine degradation.",
  "Engineered rolling statistical features using a 5-cycle rolling window.",
  "Trained and compared 7 machine learning regression algorithms.",
  "Evaluated every model with MAE, RMSE, and R\u00B2, and selected the strongest performer.",
  "Deployed the final model as an interactive Streamlit application for real-time RUL predictions.",
];

const EXPERIENCE = [
  {
    role: "Machine Learning Trainee",
    org: "National Telecommunication Institute (NTI) & ITIDA",
    date: "August 2026",
    tag: "Training program",
    body: "4-week intensive program — 3 weeks technical training, 1 week freelancing. Covered EDA, preprocessing, feature engineering, visualization, regression/classification pipelines, model evaluation (MAE, RMSE, R\u00B2), and Git/GitHub workflows using Pandas, NumPy, Seaborn, and Scikit-learn. The major project was Remaining Useful Life prediction for turbofan engines — the basis of the featured case study on this page.",
  },
  {
    role: "Selected Participant",
    org: "Google Build with AI: Masr Edition",
    date: "April 2026",
    tag: "Participation",
    body: "Participated in technical sessions covering Google Cloud Platform (GCP) and AI development practices, exploring practical implementations of cloud technologies and artificial intelligence.",
  },
  {
    role: "Contestant",
    org: "Egyptian Collegiate Programming Contest (ECPC), representing Nile University",
    date: "August 2026",
    tag: "Competition",
    body: "Competed in the official regional competitive programming contest, solving algorithmic problems involving graph theory and data structures under strict time and memory constraints.",
  },
];

const SOCIAL = {
  github: "https://github.com/MostafaSaber-25",
  linkedin: "https://www.linkedin.com/in/mostafa-mohamed-saber/",
  email: "mailto:M.Mohamed2502@nu.edu.eg",
};

/* --------------------------------- helpers --------------------------------- */

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observers = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);
  return active;
}

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Reveal({ children, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function Section({ id, children, className = "", dark = false, tight = false }) {
  return (
    <section id={id} className={`scroll-mt-16 ${dark ? "bg-[#12161D] text-[#F2F1EC]" : ""} ${className}`}>
      <div className={`mx-auto max-w-5xl px-6 md:px-10 ${tight ? "py-12 md:py-16" : "py-14 md:py-20"}`}>
        <Reveal>{children}</Reveal>
      </div>
    </section>
  );
}

function Kicker({ children, dark = false }) {
  return (
    <p className={`text-[13px] font-medium tracking-wide mb-2.5 ${dark ? "text-[#7FD1CC]" : "text-[#1F6F78]"}`}>
      {children}
    </p>
  );
}

/* ---------------------------------- nav ---------------------------------- */

function Navbar({ active }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-[#FAFAF9]/85 backdrop-blur-md transition-shadow ${
        scrolled ? "border-b border-[#E4E1D8] shadow-[0_1px_0_rgba(20,26,34,0.02)]" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto max-w-5xl px-6 md:px-10 h-14 flex items-center justify-between">
        <button onClick={() => go("home")} className="font-semibold tracking-tight text-[#141A22] text-[15px]">
          Mostafa Saber
        </button>

        <ul className="hidden md:flex items-center gap-7">
          {NAV.map((n) => (
            <li key={n.id}>
              <button
                onClick={() => go(n.id)}
                className={`text-[13px] transition-colors relative py-1 ${
                  active === n.id ? "text-[#141A22]" : "text-[#6B7480] hover:text-[#141A22]"
                }`}
              >
                {n.label}
                {active === n.id && <span className="absolute -bottom-[1px] left-0 right-0 h-[1.5px] bg-[#1F6F78]" />}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <a href={SOCIAL.github} target="_blank" rel="noreferrer" aria-label="GitHub profile" className="text-[#6B7480] hover:text-[#141A22] transition-colors">
            <Github size={17} />
          </a>
          <a href={SOCIAL.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile" className="text-[#6B7480] hover:text-[#141A22] transition-colors">
            <Linkedin size={17} />
          </a>
          <button
            onClick={() => go("contact")}
            className="text-[13px] font-medium bg-[#141A22] text-[#FAFAF9] px-4 py-2 hover:bg-[#1F6F78] transition-colors"
          >
            Contact
          </button>
        </div>

        <button className="md:hidden text-[#141A22]" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((v) => !v)}>
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-[#E4E1D8] bg-[#FAFAF9]">
          <ul className="px-6 py-3 flex flex-col">
            {NAV.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => go(n.id)}
                  className={`w-full text-left py-2.5 text-[14px] ${active === n.id ? "text-[#1F6F78] font-medium" : "text-[#3E4C5E]"}`}
                >
                  {n.label}
                </button>
              </li>
            ))}
            <li className="flex items-center gap-5 pt-3 mt-2 border-t border-[#E4E1D8]">
              <a href={SOCIAL.github} target="_blank" rel="noreferrer" aria-label="GitHub profile" className="text-[#3E4C5E] py-2">
                <Github size={18} />
              </a>
              <a href={SOCIAL.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile" className="text-[#3E4C5E] py-2">
                <Linkedin size={18} />
              </a>
              <a href={SOCIAL.email} aria-label="Send email" className="text-[#3E4C5E] py-2">
                <Mail size={18} />
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

/* ---------------------------------- hero ---------------------------------- */

function DegradationCurve() {
  const ref = useRef(null);
  useEffect(() => {
    const path = ref.current;
    if (!path) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = String(len);
    path.style.strokeDashoffset = String(len);
    path.getBoundingClientRect();
    path.style.transition = "stroke-dashoffset 1.5s ease-out 0.2s";
    path.style.strokeDashoffset = "0";
  }, []);

  return (
    <svg viewBox="0 0 460 190" className="w-full h-auto" role="img" aria-label="Illustrative sensor degradation curve trending downward toward a predicted point of failure">
      <line x1="0" y1="170" x2="460" y2="170" stroke="#243040" strokeWidth="1" />
      <line x1="0" y1="125" x2="460" y2="125" stroke="#1D2733" strokeWidth="1" />
      <line x1="0" y1="80" x2="460" y2="80" stroke="#1D2733" strokeWidth="1" />
      <line x1="0" y1="35" x2="460" y2="35" stroke="#1D2733" strokeWidth="1" />
      <path
        ref={ref}
        d="M0,32 L30,36 L60,34 L90,50 L120,47 L150,64 L180,72 L210,70 L240,92 L270,104 L300,100 L330,132 L360,142 L390,158 L420,166 L450,182"
        fill="none"
        stroke="#7FD1CC"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="450" cy="182" r="4.5" fill="#7FD1CC" />
      <text x="300" y="192" fontSize="10" fill="#7A8892" fontFamily="ui-monospace, monospace">predicted RUL threshold</text>
    </svg>
  );
}

function Hero() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section id="home" className="scroll-mt-16 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{ backgroundImage: "radial-gradient(#D8D5CA 1px, transparent 1px)", backgroundSize: "22px 22px" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-5xl px-6 md:px-10 pt-12 md:pt-16 pb-12 md:pb-16">
        <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-10 md:gap-14 items-center">
          <div>
            <p className="font-mono text-xs text-[#1F6F78] mb-4 tracking-wide">Giza, Egypt</p>
            <h1 className="text-lg md:text-xl font-semibold tracking-tight text-[#141A22] mb-2.5">
              Mostafa Mohamed Saber
            </h1>
            <p className="text-[2.1rem] sm:text-5xl md:text-[3.2rem] font-semibold tracking-tight text-[#141A22] leading-[1.1]">
              I build practical software and machine learning solutions from data.
            </p>
            <p className="mt-4 text-base md:text-lg text-[#3E4C5E]">
              Python &amp; C++ Developer &middot; Data Analysis &middot; Machine Learning
            </p>
            <p className="mt-4 text-sm text-[#6B7480] max-w-md leading-relaxed">
              I help turn raw data into clean, usable information and build practical
              machine learning and desktop software solutions.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                onClick={() => go("projects")}
                className="inline-flex items-center gap-2 bg-[#141A22] text-[#FAFAF9] px-5 py-3 text-sm font-medium hover:bg-[#1F6F78] transition-colors active:scale-[0.98]"
              >
                View my work <ArrowRight size={16} />
              </button>
              <button
                onClick={() => go("contact")}
                className="inline-flex items-center gap-2 border border-[#D8D5CA] text-[#141A22] px-5 py-3 text-sm font-medium hover:border-[#1F6F78] hover:text-[#1F6F78] transition-colors active:scale-[0.98]"
              >
                Contact me
              </button>
            </div>

            <div className="mt-7 flex items-center gap-5">
              <a href={SOCIAL.github} target="_blank" rel="noreferrer" aria-label="GitHub profile" className="text-[#6B7480] hover:text-[#141A22] transition-colors">
                <Github size={19} />
              </a>
              <a href={SOCIAL.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile" className="text-[#6B7480] hover:text-[#141A22] transition-colors">
                <Linkedin size={19} />
              </a>
              <a href={SOCIAL.email} aria-label="Send email" className="text-[#6B7480] hover:text-[#141A22] transition-colors">
                <Mail size={19} />
              </a>
            </div>
          </div>

          <button
            onClick={() => go("featured-project")}
            className="text-left bg-[#12161D] border border-[#1D2733] p-5 hover:border-[#2A3644] transition-colors group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[11px] text-[#7A8892]">featured_project.rul</span>
              <ArrowUpRight size={14} className="text-[#7A8892] group-hover:text-[#7FD1CC] transition-colors" />
            </div>
            <DegradationCurve />
            <div className="mt-3 flex items-center justify-between">
              <p className="text-xs text-[#C7D3D5]">Turbofan Engine Predictive Maintenance</p>
              <span className="font-mono text-[11px] text-[#7FD1CC]">R² 0.868</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- about ---------------------------------- */

function About() {
  return (
    <Section id="about" tight>
      <div className="grid md:grid-cols-[0.85fr_1.15fr] gap-8 md:gap-12">
        <div>
          <Kicker>About</Kicker>
          <h2 className="text-2xl md:text-[1.75rem] font-semibold tracking-tight text-[#141A22] leading-tight">
            Programming and algorithms, applied to data.
          </h2>
        </div>
        <div>
          <p className="text-[#3E4C5E] leading-relaxed text-[15px]">
            I work at the intersection of programming, data analysis, and machine
            learning. My foundation is in data structures, algorithms, and
            object-oriented programming, and I apply that foundation to practical
            problems — cleaning and exploring datasets, building and evaluating
            predictive models, and writing clear, maintainable software. Based in
            Giza, Egypt, I work primarily with Python and C++ to deliver clear,
            practical technical solutions.
          </p>
        </div>
      </div>
    </Section>
  );
}

/* ---------------------------------- services ---------------------------------- */

function Services() {
  return (
    <Section id="services" className="bg-[#F3F2ED]" tight>
      <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
        <div>
          <Kicker>Services</Kicker>
          <h2 className="text-2xl md:text-[1.75rem] font-semibold tracking-tight text-[#141A22]">
            Practical help with data, models, and desktop tools
          </h2>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E4E1D8] border border-[#E4E1D8]">
        {SERVICES.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-[#F3F2ED] p-5 flex flex-col hover:bg-white transition-colors">
            <Icon size={18} className="text-[#1F6F78] mb-3" strokeWidth={1.7} />
            <h3 className="text-[14px] font-semibold text-[#141A22] mb-1.5 leading-snug">{title}</h3>
            <p className="text-[13px] text-[#6B7480] leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------------------------- featured project ---------------------------------- */

function Metric({ value, label }) {
  return (
    <div className="border border-[#232E3B] bg-[#161C25] px-2 py-4 sm:p-5 text-center">
      <div className="font-mono text-xl sm:text-3xl md:text-[2.5rem] leading-none text-[#7FD1CC]">{value}</div>
      <div className="text-[10px] sm:text-[11px] mt-2 sm:mt-2.5 text-[#8FA0AC] tracking-wide">{label}</div>
    </div>
  );
}

function Fact({ children }) {
  return (
    <span className="font-mono text-[11px] px-3 py-1.5 border border-[#232E3B] text-[#C7D3D5]">
      {children}
    </span>
  );
}

function CaseBlock({ icon: Icon, title, children }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2.5 text-[#7FD1CC]">
        <Icon size={15} />
        <h3 className="text-[13px] font-semibold tracking-wide">{title}</h3>
      </div>
      <p className="text-[13.5px] text-[#B9C4C8] leading-relaxed">{children}</p>
    </div>
  );
}

function FeaturedProject() {
  return (
    <Section id="featured-project" dark tight>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
        <div>
          <Kicker dark>Featured project &middot; case study</Kicker>
          <h2 className="text-[1.6rem] md:text-[2rem] font-semibold tracking-tight leading-tight">
            Turbofan Engine Predictive Maintenance
          </h2>
        </div>
        <span className="font-mono text-[11px] px-3 py-1.5 border border-[#232E3B] text-[#8FA0AC] whitespace-nowrap mt-1">
          Academic / training project
        </span>
      </div>
      <p className="text-[#8FA0AC] text-sm max-w-xl leading-relaxed mb-8">
        Built during the NTI &amp; ITIDA machine learning training program using
        NASA's C-MAPSS FD001 dataset — not a paid client engagement.
      </p>

      <div className="grid grid-cols-3 gap-3 max-w-lg mb-6">
        <Metric value="9.998" label="MAE" />
        <Metric value="15.139" label="RMSE" />
        <Metric value="0.868" label="R²" />
      </div>

      <div className="flex flex-wrap gap-2 mb-12">
        <Fact>7 models evaluated</Fact>
        <Fact>49 features</Fact>
        <Fact>5-cycle rolling window</Fact>
        <Fact>Bagging Regressor — final model</Fact>
        <Fact>NASA C-MAPSS FD001</Fact>
      </div>

      <div className="grid sm:grid-cols-2 gap-8 mb-12">
        <CaseBlock icon={Target} title="Problem / objective">
          Predict the Remaining Useful Life (RUL) of turbofan engines from sensor
          data, to support predictive maintenance decisions rather than fixed
          maintenance schedules.
        </CaseBlock>
        <CaseBlock icon={Award} title="My role">
          Sole developer, responsible for the full workflow — from raw sensor
          data through model selection to a deployed prediction tool.
        </CaseBlock>
      </div>

      <div className="mb-12">
        <div className="flex items-center gap-2 mb-4 text-[#7FD1CC]">
          <GitBranch size={15} />
          <h3 className="text-[13px] font-semibold tracking-wide">Process / approach</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-2.5">
          {PROCESS.map((step, i) => (
            <div key={i} className="flex gap-3 border border-[#1D2733] bg-[#161C25] p-3.5">
              <span className="font-mono text-[11px] text-[#7FD1CC] shrink-0 pt-[1px]">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[13px] text-[#B9C4C8] leading-relaxed">{step}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-8">
        <CaseBlock icon={Wrench} title="Tools">
          Python, Pandas, NumPy, Scikit-learn, Seaborn, Streamlit
        </CaseBlock>
        <CaseBlock icon={FileOutput} title="Output">
          A working Streamlit application that takes engine sensor input and
          returns a real-time Remaining Useful Life prediction.
        </CaseBlock>
      </div>
      <div className="mt-8 border-t border-[#1D2733] pt-8">
        <CaseBlock icon={SparklesIcon} title="Value">
          Demonstrates how predictive maintenance can support earlier maintenance
          decisions by estimating when equipment is likely to need attention.
        </CaseBlock>
      </div>
    </Section>
  );
}

/* ---------------------------------- projects ---------------------------------- */

function Projects() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <Section id="projects" tight>
      <Kicker>Projects</Kicker>
      <h2 className="text-2xl md:text-[1.75rem] font-semibold tracking-tight text-[#141A22] mb-8">
        Selected work
      </h2>

      <div className="grid md:grid-cols-[1.3fr_1fr] gap-6">
        <button
          onClick={() => go("featured-project")}
          className="text-left border border-[#141A22] p-7 flex flex-col bg-[#141A22] text-[#F2F1EC] hover:bg-[#1F6F78] transition-colors group"
        >
          <span className="font-mono text-[11px] text-[#7FD1CC] mb-3">Academic / training project — main case study</span>
          <h3 className="text-lg font-semibold mb-2.5">Turbofan Engine Predictive Maintenance</h3>
          <p className="text-[13.5px] text-[#B9C4C8] leading-relaxed mb-5 flex-1">
            An end-to-end ML workflow predicting Remaining Useful Life for
            turbofan engines using the NASA C-MAPSS FD001 dataset — data cleaning,
            feature engineering, model comparison, and a deployed Streamlit app.
          </p>
          <div className="flex flex-wrap gap-2 mb-5">
            {["Python", "Pandas", "NumPy", "Scikit-learn", "Seaborn", "Streamlit"].map((t) => (
              <span key={t} className="text-[11px] font-mono px-2 py-1 border border-[#2A3644] text-[#C7D3D5]">{t}</span>
            ))}
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium">
            View case study <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </button>

        <div className="border border-[#E4E1D8] p-7 flex flex-col">
          <span className="font-mono text-[11px] text-[#1F6F78] mb-3">Software development</span>
          <h3 className="text-lg font-semibold text-[#141A22] mb-2.5">Desktop Graphical Applications</h3>
          <p className="text-[13.5px] text-[#6B7480] leading-relaxed mb-5 flex-1">
            Responsive desktop GUI applications built with Qt for C++ and
            CustomTkinter for Python, with modular layouts, clean architecture,
            and a focus on usability.
          </p>
          <div className="flex flex-wrap gap-2 mb-5">
            {["C++", "Qt", "Python", "CustomTkinter"].map((t) => (
              <span key={t} className="text-[11px] font-mono px-2 py-1 bg-[#F3F2ED] text-[#3E4C5E]">{t}</span>
            ))}
          </div>
          <span className="text-[13px] text-[#8B9199]">No public repository shared for this project yet.</span>
        </div>
      </div>
    </Section>
  );
}

/* ---------------------------------- experience ---------------------------------- */

function Experience() {
  return (
    <Section id="experience" className="bg-[#F3F2ED]" tight>
      <Kicker>Experience</Kicker>
      <h2 className="text-2xl md:text-[1.75rem] font-semibold tracking-tight text-[#141A22] mb-8">
        Training and participation
      </h2>

      <div className="flex flex-col gap-3">
        {EXPERIENCE.map((e) => (
          <div key={e.role} className="border border-[#E4E1D8] bg-[#FAFAF9] p-5 sm:flex sm:gap-6">
            <div className="sm:w-40 shrink-0 mb-2 sm:mb-0">
              <span className="font-mono text-[11px] text-[#1F6F78]">{e.date}</span>
              <div className="text-[11px] text-[#8B9199] mt-0.5">{e.tag}</div>
            </div>
            <div className="flex-1">
              <h3 className="text-[15px] font-semibold text-[#141A22]">{e.role}</h3>
              <p className="text-[13px] text-[#6B7480] mb-2">{e.org}</p>
              <p className="text-[13px] text-[#3E4C5E] leading-relaxed">{e.body}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------------------------- education ---------------------------------- */

function Education() {
  return (
    <Section id="education" tight>
      <div className="grid md:grid-cols-[0.85fr_1.15fr] gap-8 md:gap-12">
        <div>
          <Kicker>Education</Kicker>
          <h2 className="text-2xl md:text-[1.75rem] font-semibold tracking-tight text-[#141A22]">Foundation</h2>
        </div>
        <div className="border border-[#E4E1D8] p-6 flex items-start gap-4">
          <GraduationCap size={20} className="text-[#1F6F78] mt-0.5 shrink-0" strokeWidth={1.7} />
          <div>
            <h3 className="font-semibold text-[#141A22] text-[15px]">B.Sc. Computer Science and Information Technology</h3>
            <p className="text-[13px] text-[#6B7480] mt-1">Nile University &middot; expected graduation 2029</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Data Structures & Algorithms", "Object-Oriented Programming", "Discrete Mathematics"].map((c) => (
                <span key={c} className="text-[11px] font-mono px-2 py-1 bg-[#F3F2ED] text-[#3E4C5E]">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------------------------------- skills ---------------------------------- */

function Skills() {
  return (
    <Section id="skills" className="bg-[#F3F2ED]" tight>
      <Kicker>Skills</Kicker>
      <h2 className="text-2xl md:text-[1.75rem] font-semibold tracking-tight text-[#141A22] mb-8">
        Technical foundation
      </h2>
      <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6">
        {SKILLS.map((s) => (
          <div key={s.cat}>
            <h3 className="text-[12.5px] font-semibold text-[#141A22] mb-2.5 pb-2 border-b border-[#D8D5CA]">
              {s.cat}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {s.items.map((i) => (
                <span key={i} className="text-[12.5px] px-2.5 py-1 bg-[#FAFAF9] border border-[#E4E1D8] text-[#3E4C5E]">
                  {i}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------------------------- brand + pitch ---------------------------------- */

function BrandAndPitch() {
  return (
    <Section id="brand" dark tight>
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="border-l-2 border-[#7FD1CC] pl-5">
          <Kicker dark>Personal brand</Kicker>
          <blockquote className="text-xl md:text-2xl font-medium leading-snug text-[#F2F1EC]">
            "I solve practical problems through programming, data analysis, and
            machine learning — combining a strong algorithmic foundation with
            hands-on experience turning raw data into working, usable solutions."
          </blockquote>
        </div>
        <div className="bg-[#161C25] border border-[#232E3B] p-6">
          <div className="flex items-center gap-2 mb-3 text-[#7FD1CC]">
            <Quote size={15} />
            <Kicker dark>30-second pitch</Kicker>
          </div>
          <p className="text-[#B9C4C8] leading-relaxed text-[13.5px]">
            "Hi, I'm Mostafa — I work with Python and C++ to turn raw data into
            practical solutions. My background is in data structures, algorithms,
            and object-oriented programming, and I apply that to data analysis and
            machine learning. For example, I built a predictive maintenance
            system that estimates how much useful life a machine has left, using
            sensor data and a trained model, and deployed it as an interactive web
            app. I also build desktop applications with Qt and CustomTkinter. If
            you need someone to clean up messy data, find the patterns in it, or
            build a model or tool around it, that's exactly the kind of problem I
            like solving."
          </p>
        </div>
      </div>
    </Section>
  );
}

/* ---------------------------------- contact ---------------------------------- */

function Contact() {
  return (
    <Section id="contact" tight>
      <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-14">
        <div>
          <Kicker>Contact</Kicker>
          <h2 className="text-2xl md:text-[1.9rem] font-semibold tracking-tight text-[#141A22] mb-4 max-w-md leading-tight">
            Let's build something useful.
          </h2>
          <p className="text-[#6B7480] leading-relaxed max-w-md text-[15px]">
            Have a dataset to analyze, a prediction problem to solve, or a
            desktop tool to build? I'm open to freelance and project-based work
            involving data analysis, machine learning, or desktop applications.
          </p>
        </div>

        <div className="border border-[#E4E1D8] divide-y divide-[#E4E1D8]">
          <a href={SOCIAL.email} className="flex items-center gap-4 p-4 hover:bg-[#F3F2ED] transition-colors">
            <Mail size={17} className="text-[#1F6F78]" />
            <div>
              <div className="text-[11px] text-[#8B9199]">Email</div>
              <div className="text-[13.5px] text-[#141A22] break-all">M.Mohamed2502@nu.edu.eg</div>
            </div>
          </a>
          <div className="flex items-center gap-4 p-4">
            <Phone size={17} className="text-[#1F6F78]" />
            <div>
              <div className="text-[11px] text-[#8B9199]">Phone</div>
              <div className="text-[13.5px] text-[#141A22]">+20 109 704 5100</div>
            </div>
          </div>
          <a href={SOCIAL.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 hover:bg-[#F3F2ED] transition-colors">
            <Linkedin size={17} className="text-[#1F6F78]" />
            <div>
              <div className="text-[11px] text-[#8B9199]">LinkedIn</div>
              <div className="text-[13.5px] text-[#141A22] break-all">linkedin.com/in/mostafa-mohamed-saber</div>
            </div>
          </a>
          <a href={SOCIAL.github} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 hover:bg-[#F3F2ED] transition-colors">
            <Github size={17} className="text-[#1F6F78]" />
            <div>
              <div className="text-[11px] text-[#8B9199]">GitHub</div>
              <div className="text-[13.5px] text-[#141A22] break-all">github.com/MostafaSaber-25</div>
            </div>
          </a>
          <div className="flex items-center gap-4 p-4">
            <MapPin size={17} className="text-[#1F6F78]" />
            <div>
              <div className="text-[11px] text-[#8B9199]">Location</div>
              <div className="text-[13.5px] text-[#141A22]">Giza, Egypt</div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------------------------------- footer ---------------------------------- */

function Footer() {
  return (
    <footer className="bg-[#12161D] text-[#8FA0AC]">
      <div className="mx-auto max-w-5xl px-6 md:px-10 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <p className="text-[#F2F1EC] font-semibold text-[14px]">Mostafa Mohamed Saber</p>
          <p className="text-[12.5px] mt-0.5">Python &amp; C++ Developer &middot; Data Analysis &amp; Machine Learning</p>
        </div>
        <div className="flex items-center gap-5">
          <a href={SOCIAL.github} target="_blank" rel="noreferrer" aria-label="GitHub profile" className="hover:text-[#F2F1EC] transition-colors">
            <Github size={17} />
          </a>
          <a href={SOCIAL.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile" className="hover:text-[#F2F1EC] transition-colors">
            <Linkedin size={17} />
          </a>
          <a href={SOCIAL.email} aria-label="Send email" className="hover:text-[#F2F1EC] transition-colors">
            <Mail size={17} />
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------------------- app ---------------------------------- */

export default function Portfolio() {
  const ids = NAV.map((n) => n.id);
  const active = useScrollSpy(ids);

  return (
    <div className="min-h-screen bg-[#FAFAF9] font-sans antialiased" style={{ scrollBehavior: "smooth" }}>
      <Navbar active={active} />
      <main>
        <Hero />
        <About />
        <Services />
        <FeaturedProject />
        <Projects />
        <Experience />
        <Education />
        <Skills />
        <BrandAndPitch />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
