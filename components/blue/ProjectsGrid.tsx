import BlueProjectCard from "./ProjectCard";

const PROJECTS = [
  {
    title: "DICOM Local Viewer",
    description: "A local-first medical imaging platform for securely viewing DICOM studies with lightweight deployment using OHIF, Orthanc, and a browser-driven workflow.",
    techStack: ["Vue 3", "Vite", "Node.js", "Express", "Orthanc", "OHIF", "Docker Compose", "Nginx"],
    githubUrl: "https://github.com/karthiek390/dicom-local-viewer",
  },
  {
    title: "CICD Stats Watcher",
    description: "A GitHub Marketplace Action for self-hosted runners that captures storage, Docker, CPU, memory, and inode metrics around important workflow steps and generates downloadable CI reports.",
    techStack: ["GitHub Actions", "Bash", "Python", "HTML Reports", "Linux", "Docker"],
    githubUrl: "https://github.com/karthiek390/cicd-stats-watcher",
    liveUrl: "https://github.com/marketplace/actions/cicd-stats-watcher",
  },
  {
    title: "Tic-Tac-Toe AI Coach",
    description: "A full-stack training app that lets users play Tic-Tac-Toe, logs every move, and stores game history with coaching feedback to help players improve decision-making.",
    techStack: ["React", "Tailwind CSS", "Vite", "TypeScript", "Flask", "SQLAlchemy", "SQLite"],
    githubUrl: "https://github.com/karthiek390/tic-tac-toe",
    liveUrl: "https://tic-tac-toe-roan-nine-56.vercel.app/",
  },
  {
    title: "Family Network Filtering with Pi-hole",
    description: "A Raspberry Pi 5 based network-wide DNS filtering setup that blocks ads, malware, and inappropriate content while applying separate filtering policies for kids and adults across the home network.",
    techStack: ["Raspberry Pi 5", "Pi-hole", "DNS", "Cloudflare", "DHCP Reservations", "Network Security"],
  },
  {
    title: "Home Media Server with TrueNAS SCALE",
    description: "A revived desktop turned into a secure home media server with ZFS-backed storage, Jellyfin streaming, GPU-assisted transcoding, segmented networking, and a VPN-first remote access plan.",
    techStack: ["TrueNAS SCALE", "ZFS", "Jellyfin", "FFmpeg", "NVIDIA GTX 1650", "WireGuard", "Tailscale"],
  },
];

export default function BlueProjectsGrid() {
  return (
    <section id="projects" style={{ padding: "6rem 2.5rem", maxWidth: "1100px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#0F172A", marginBottom: "0.5rem" }}>
        Projects
      </h2>
      <p style={{ color: "#64748B", marginBottom: "3rem" }}>
        A selection of software, automation, and infrastructure projects I&apos;ve built.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
        {PROJECTS.map((p) => <BlueProjectCard key={p.title} {...p} />)}
      </div>
    </section>
  );
}
