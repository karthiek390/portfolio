import RedProjectCard from "./ProjectCard";

const PROJECTS = [
  {
    title: "DICOM Local Viewer",
    description: "Local-first medical imaging platform. Securely view MRI, CT, X-ray, PET and more with zero cloud dependency. OHIF + Orthanc stack, Docker Compose, browser-driven workflow.",
    techStack: ["Vue 3", "Vite", "Node.js", "Express", "Orthanc", "OHIF", "Docker Compose", "Nginx"],
    githubUrl: "https://github.com/karthiek390/dicom-local-viewer",
  },
  {
    title: "CICD Stats Watcher",
    description: "GitHub Marketplace Action for self-hosted runners. Tracks storage, Docker, CPU, memory, and inode metrics across named workflow steps. Generates downloadable CI reports.",
    techStack: ["GitHub Actions", "Bash", "Python", "HTML Reports", "Linux", "Docker"],
    githubUrl: "https://github.com/karthiek390/cicd-stats-watcher",
    liveUrl: "https://github.com/marketplace/actions/cicd-stats-watcher",
  },
  {
    title: "Tic-Tac-Toe AI Coach",
    description: "Full-stack trainer that logs every move, analyzes decisions, and delivers coaching feedback to help players improve. Flask backend + React frontend, deployed to Vercel + Render.",
    techStack: ["React", "Tailwind CSS", "Vite", "TypeScript", "Flask", "SQLAlchemy", "SQLite"],
    githubUrl: "https://github.com/karthiek390/tic-tac-toe",
    liveUrl: "https://tic-tac-toe-roan-nine-56.vercel.app/",
  },
  {
    title: "Family Network Filtering",
    description: "Raspberry Pi 5 running Pi-hole as a network-wide DNS server. Separate filtering groups for kids (strict blocklists) and adults (ad/tracker only). Centralized — no per-device config.",
    techStack: ["Raspberry Pi 5", "Pi-hole", "DNS", "Cloudflare", "DHCP", "Network Security"],
  },
  {
    title: "Home Media Server",
    description: "Revived desktop turned secure homelab. TrueNAS SCALE + ZFS storage, Jellyfin streaming with NVIDIA GTX 1650 GPU transcoding, WireGuard/Tailscale VPN plan, least-privilege networking.",
    techStack: ["TrueNAS SCALE", "ZFS", "Jellyfin", "FFmpeg", "NVIDIA GTX 1650", "WireGuard", "Tailscale"],
  },
];

export default function RedProjectsGrid() {
  return (
    <section id="projects" style={{ padding: "6rem 2.5rem", maxWidth: "1100px", margin: "0 auto" }}>
      <p style={{ color: "#003B00", fontSize: "0.7rem", letterSpacing: "0.15em",
        marginBottom: "0.5rem", fontFamily: "JetBrains Mono, monospace" }}>
        // MAINFRAME_PENETRATIONS
      </p>
      <h2 style={{ color: "#00FF41", fontFamily: "JetBrains Mono, monospace",
        fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem",
        textShadow: "0 0 12px #00FF4155" }}>
        Extracted Projects
      </h2>
      <p style={{ color: "#00802B", fontSize: "0.82rem", marginBottom: "3rem",
        fontFamily: "JetBrains Mono, monospace" }}>
        Software. Automation. Infrastructure.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
        {PROJECTS.map((p) => <RedProjectCard key={p.title} {...p} />)}
      </div>
    </section>
  );
}
