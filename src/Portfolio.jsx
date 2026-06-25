import { useState, useEffect, useCallback } from "react";

const data = {
  name: "Dwi Duta Mahardewantoro",
  role: "Database Engineer",
  location: "Jakarta, Indonesia",
  company: "PT Neural Technologies Indonesia",
  bio: "I design and automate data pipelines at PT Neural Technologies Indonesia — from ETL orchestration and data migration to real-time integration and analytics-ready warehouses.",
  skills: ["Apache Airflow", "Apache NiFi", "PostgreSQL", "MySQL", "ClickHouse", "Python", "SQL", "Pandas", "ETL Development", "Workflow Automation"],
  experience: [
    { role: "Database Engineer", company: "PT Neural Technologies Indonesia", desc: "Builds and manages ETL pipelines and data integrations supporting scalable, efficient data systems." },
    { role: "Data Scientist", company: "PT Neural Technologies Indonesia", desc: "Processes and analyzes data to generate insights, forecasting, and anomaly detection." },
    { role: "Data Analyst Intern", company: "PT Bank Rakyat Indonesia (BRI)", desc: "Analyzed certification exam reports and supported certification activities as a facilitator at LSP BRI." },
  ],
  education: {
    school: "Universitas Muhammadiyah Jakarta",
    degree: "Bachelor of Informatics Engineering",
    period: "2020 – 2024",
    gpa: "3.70 / 4.00",
  },
  projects: [
    {
      title: "Adaptive Projection",
      client: "Telkomsel",
      desc: "Forecasting and monitoring system for telco payload traffic. Automatically predicts nationwide traffic growth to end-of-year using time series models, and flags significant deviations from expected patterns early.",
      objective: "Predict payload traffic growth and provide early anomaly indicators vs. forecast baseline.",
      insight: "Traffic spikes at national events (e.g. Eid). Forecast to 2026 projects payload nearing 80K TB — on track with client targets. MAPE: 4.54%",
      stats: [],
      images: [
        { url: "/images/telecom_forecast_payload_20260513.png", caption: "Actual vs forecast time series chart" },
        { url: "/images/process_flow_adaptive_projection.png", caption: "Process flow adaptive projection" },
      ],
    },
    {
      title: "Sandbox Unification",
      client: "Telkomsel",
      desc: "Developed a PostgreSQL (Citus) Data Warehouse as a single source of truth, consolidating data from 40+ systems via automated Apache NiFi pipelines to support analytics, reporting, and decision-making.",
      objective: "Eliminate data silos and build a centralized, analytics-ready warehouse at scale.",
      insight: "40% faster data integration and 50% reduction in manual operations after full automation.",
      stats: [
        { num: "40+", label: "Datasets unified" },
        { num: "25M+", label: "Records / day" },
        { num: "50%", label: "Less manual work" },
      ],
      images: [
        { url: "/images/sandbox_unification_architecture.png", caption: "PostgreSQL Citus data warehouse architecture" },
        { url: "/images/pipeline_process_ran_cell_week.png", caption: "Radio Weekly ETL pipeline in Apache NiFi" },
      ],
    },
    {
      title: "Sandbox ETL & Data Integration",
      client: "Personal",
      desc: "End-to-end personal project simulating a production data engineering environment — from data generation and ingestion through transformation, validation, and storage in PostgreSQL.",
      objective: "Simulate a full production ETL environment with modular layer architecture.",
      insight: "Fully automated pipeline using Apache NiFi with CSV/SFTP ingestion, transformation, validation, and centralized PostgreSQL storage.",
      stats: [],
      images: [
        { url: "/images/system_architecture.png", caption: "ETL architecture layer diagram" },
        { url: "/images/pipeline_process_revenue_city_day.png", caption: "Apache NiFi pipeline flow" },
      ],
    },
  ],
  certs: [
    { issuer: "Stanford · Coursera", name: "Machine Learning Specialization", date: "Apr 2023" },
    { issuer: "DeepLearning.AI · Coursera", name: "TensorFlow Developer Professional Certificate", date: "May 2023" },
    { issuer: "DeepLearning.AI · Coursera", name: "TensorFlow: Data and Deployment Specialization", date: "May 2023" },
    { issuer: "DeepLearning.AI · Coursera", name: "Structuring Machine Learning Projects", date: "May 2023" },
    { issuer: "Udemy", name: "Introduction to Apache NiFi | Cloudera DataFlow HDF 2.0", date: "Mar 2026" },
    { issuer: "TensorFlow", name: "TensorFlow Developer Certificate", date: "Sep 2023 – Sep 2026" },
  ],
  contact: {
    phone: "+62 812 2687 5848",
    email: "dwiduta.mahardewantoro@gmail.com",
    linkedin: "https://www.linkedin.com/in/dwidutam/",
    linkedinLabel: "linkedin.com/in/dwidutam",
  },
};

const styles = {
  root: { fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: "#fff", color: "#111", minHeight: "100vh", fontSize: 16 },
  nav: { position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", borderBottom: "1px solid #f0f0f0", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 52 },
  navBrand: { fontSize: 14, fontWeight: 600, letterSpacing: "-0.02em", color: "#111" },
  navLinks: { display: "flex", gap: "2rem" },
  navLink: { fontSize: 13, color: "#888", textDecoration: "none", cursor: "pointer", background: "none", border: "none", fontFamily: "inherit", padding: 0, transition: "color 0.15s" },
  section: { padding: "5rem 2rem", maxWidth: 760, margin: "0 auto" },
  hero: { padding: "7rem 2rem 5rem", maxWidth: 760, margin: "0 auto" },
  eyebrow: { fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", marginBottom: "1rem" },
  h1: { fontSize: 44, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.08, marginBottom: "1.25rem", color: "#0a0a0a" },
  heroDesc: { fontSize: 16, color: "#555", lineHeight: 1.75, maxWidth: 540, marginBottom: "2rem" },
  chipRow: { display: "flex", flexWrap: "wrap", gap: 8 },
  chip: { fontSize: 12, padding: "4px 12px", borderRadius: 999, border: "1px solid #e8e8e8", color: "#666", background: "#fafafa" },
  divider: { border: "none", borderTop: "1px solid #f0f0f0", margin: 0 },
  sectionLabel: { fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#bbb", marginBottom: "2rem" },
  aboutGrid: { display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "3rem" },
  blockTitle: { fontSize: 12, fontWeight: 600, color: "#999", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: "0.75rem" },
  expItem: { paddingBottom: "1.25rem", marginBottom: "1.25rem", borderBottom: "1px solid #f5f5f5" },
  expRole: { fontSize: 14, fontWeight: 600, color: "#111" },
  expCompany: { fontSize: 13, color: "#888", marginTop: 2 },
  expDesc: { fontSize: 13, color: "#999", lineHeight: 1.65, marginTop: 6 },
  eduCard: { border: "1px solid #f0f0f0", borderRadius: 12, padding: "1rem 1.25rem" },
  eduSchool: { fontSize: 14, fontWeight: 600, color: "#111" },
  eduDegree: { fontSize: 13, color: "#777", marginTop: 3 },
  eduMeta: { fontSize: 12, color: "#bbb", marginTop: 8 },
  projectItem: { borderTop: "1px solid #f0f0f0", padding: "2.5rem 0" },
  projectHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" },
  projectTitle: { fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em", color: "#0a0a0a" },
  clientTag: { fontSize: 11, padding: "3px 10px", borderRadius: 999, border: "1px solid #ebebeb", color: "#bbb", whiteSpace: "nowrap" },
  projectDesc: { fontSize: 14, color: "#666", lineHeight: 1.75, marginBottom: "1.25rem" },
  projectMeta: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  metaBlock: { background: "#fafafa", borderRadius: 10, padding: "0.875rem 1rem" },
  metaLabel: { fontSize: 10, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 5 },
  metaVal: { fontSize: 13, color: "#666", lineHeight: 1.6 },
  statRow: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginTop: "1rem" },
  statBox: { background: "#f7f7f7", borderRadius: 10, padding: "1rem" },
  statNum: { fontSize: 22, fontWeight: 600, letterSpacing: "-0.03em", color: "#111" },
  statLbl: { fontSize: 11, color: "#bbb", marginTop: 3 },
  slideshow: { position: "relative", borderRadius: 12, overflow: "hidden", background: "#f0f0f0", marginBottom: "1.25rem", userSelect: "none" },
  slideshowImg: { width: "100%", height: 240, objectFit: "contain", display: "block" },
  slideshowOverlay: { position: "absolute", inset: 0, opacity: 0, transition: "opacity 0.25s ease", pointerEvents: "none" },
  slideshowOverlayVisible: { opacity: 1, pointerEvents: "auto" },
  slideshowCaption: { position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: 12, padding: "8px 14px" },
  slideshowBtn: { position: "absolute", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.9)", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "#333" },
  slideshowDots: { position: "absolute", bottom: 36, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 6 },
  dot: { width: 6, height: 6, borderRadius: "50%", border: "none", cursor: "pointer", padding: 0, transition: "background 0.2s" },
  certCard: { border: "1px solid #f0f0f0", borderRadius: 12, padding: "1rem 1.125rem" },
  certIssuer: { fontSize: 10, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 },
  certName: { fontSize: 13, fontWeight: 500, lineHeight: 1.4, color: "#222" },
  certDate: { fontSize: 11, color: "#ccc", marginTop: 8 },
  contactList: { display: "flex", flexDirection: "column", gap: 16 },
  contactItem: { display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "#555", textDecoration: "none" },
  contactIcon: { width: 36, height: 36, borderRadius: 8, border: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", background: "#fafafa", flexShrink: 0 },
  footer: { borderTop: "1px solid #f0f0f0", padding: "2rem", textAlign: "center", fontSize: 12, color: "#ccc", maxWidth: 760, margin: "0 auto" },
};

function NavLink({ label, target }) {
  const scroll = () => document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
  return <button style={styles.navLink} onClick={scroll}>{label}</button>;
}

function Chip({ label }) {
  return <span style={styles.chip}>{label}</span>;
}

function Hero() {
  return (
    <div style={styles.hero}>
      <p style={styles.eyebrow}>{data.role} · {data.location}</p>
      <h1 style={styles.h1}>Building data systems<br />that scale.</h1>
      <p style={styles.heroDesc}>{data.bio}</p>
      <div style={styles.chipRow}>
        {data.skills.map((s) => <Chip key={s} label={s} />)}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" style={styles.section}>
      <p style={styles.sectionLabel}>About</p>
      <div style={styles.aboutGrid}>
        <div>
          <p style={styles.blockTitle}>Experience</p>
          {data.experience.map((e, i) => (
            <div key={i} style={{ ...styles.expItem, ...(i === data.experience.length - 1 ? { borderBottom: "none", paddingBottom: 0, marginBottom: 0 } : {}) }}>
              <div style={styles.expRole}>{e.role}</div>
              <div style={styles.expCompany}>{e.company}</div>
              <div style={styles.expDesc}>{e.desc}</div>
            </div>
          ))}
        </div>
        <div>
          <p style={styles.blockTitle}>Education</p>
          <div style={styles.eduCard}>
            <div style={styles.eduSchool}>{data.education.school}</div>
            <div style={styles.eduDegree}>{data.education.degree}</div>
            <div style={styles.eduMeta}>{data.education.period} · GPA {data.education.gpa}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Slideshow({ images }) {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);

  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length]);

  useEffect(() => {
    if (hovered) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next, hovered]);

  const overlayStyle = {
    ...styles.slideshowOverlay,
    ...(hovered ? styles.slideshowOverlayVisible : {}),
  };

  return (
    <div
      style={styles.slideshow}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={images[current].url}
        alt={images[current].caption}
        style={styles.slideshowImg}
      />
      <div style={overlayStyle}>
        <button
          style={{ ...styles.slideshowBtn, left: 10 }}
          onClick={(e) => { e.stopPropagation(); prev(); }}
          aria-label="Previous image"
        >
          {"<"}
        </button>
        <button
          style={{ ...styles.slideshowBtn, right: 10 }}
          onClick={(e) => { e.stopPropagation(); next(); }}
          aria-label="Next image"
        >
          {">"}
        </button>
        <div style={styles.slideshowDots}>
          {images.map((_, i) => (
            <button
              key={i}
              style={{ ...styles.dot, background: i === current ? "#fff" : "rgba(255,255,255,0.5)" }}
              onClick={() => setCurrent(i)}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
        <div style={styles.slideshowCaption}>{images[current].caption}</div>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" style={styles.section}>
      <p style={styles.sectionLabel}>Projects</p>
      {data.projects.map((p, i) => (
        <div key={i} style={{ ...styles.projectItem, ...(i === data.projects.length - 1 ? { borderBottom: "1px solid #f0f0f0" } : {}) }}>
          <div style={styles.projectHeader}>
            <span style={styles.projectTitle}>{p.title}</span>
            <span style={styles.clientTag}>{p.client}</span>
          </div>
          {p.images && p.images.length > 0 && <Slideshow images={p.images} />}
          <p style={styles.projectDesc}>{p.desc}</p>
          <div style={styles.projectMeta}>
            <div style={styles.metaBlock}>
              <div style={styles.metaLabel}>Objective</div>
              <div style={styles.metaVal}>{p.objective}</div>
            </div>
            <div style={styles.metaBlock}>
              <div style={styles.metaLabel}>Insight</div>
              <div style={styles.metaVal}>{p.insight}</div>
            </div>
          </div>
          {p.stats.length > 0 && (
            <div style={styles.statRow}>
              {p.stats.map((s, j) => (
                <div key={j} style={styles.statBox}>
                  <div style={styles.statNum}>{s.num}</div>
                  <div style={styles.statLbl}>{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

function Certs() {
  return (
    <section id="certs" style={styles.section}>
      <p style={styles.sectionLabel}>Certifications</p>
      <div style={styles.certGrid}>
        {data.certs.map((c, i) => (
          <div key={i} style={styles.certCard}>
            <div style={styles.certIssuer}>{c.issuer}</div>
            <div style={styles.certName}>{c.name}</div>
            <div style={styles.certDate}>{c.date}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactIcon({ type }) {
  const icons = {
    phone: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l1.07-.93a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    email: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    linkedin: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  };
  return <div style={styles.contactIcon}>{icons[type]}</div>;
}

function Contact() {
  return (
    <section id="contact" style={styles.section}>
      <p style={styles.sectionLabel}>Contact</p>
      <div style={styles.contactList}>
        <a href={`tel:${data.contact.phone}`} style={styles.contactItem}>
          <ContactIcon type="phone" />
          {data.contact.phone}
        </a>
        <a href={`mailto:${data.contact.email}`} style={styles.contactItem}>
          <ContactIcon type="email" />
          {data.contact.email}
        </a>
        <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" style={styles.contactItem}>
          <ContactIcon type="linkedin" />
          {data.contact.linkedinLabel}
        </a>
      </div>
    </section>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = ["about", "projects", "certs", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setActiveSection(id); }, { threshold: 0.3 });
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <div style={styles.root}>
      <nav style={styles.nav}>
        <span style={styles.navBrand}>{data.name}</span>
        <div style={styles.navLinks}>
          {[["About", "about"], ["Projects", "projects"], ["Certs", "certs"], ["Contact", "contact"]].map(([label, target]) => (
            <NavLink key={target} label={label} target={target} />
          ))}
        </div>
      </nav>

      <Hero />
      <hr style={styles.divider} />
      <About />
      <hr style={styles.divider} />
      <Projects />
      <hr style={styles.divider} />
      <Certs />
      <hr style={styles.divider} />
      <Contact />

      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} Dwi Duta Mahardewantoro · Database Engineer</p>
      </footer>
    </div>
  );
}