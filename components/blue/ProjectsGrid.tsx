import { motion } from "framer-motion";
import BlueProjectCard from "./ProjectCard";

const PROJECTS = [
  {
    title: "DICOM Local Viewer",
    description:
      "A local-first medical imaging platform for securely viewing DICOM studies with lightweight deployment using OHIF, Orthanc, and a browser-driven workflow.",
    techStack: ["Vue 3", "Vite", "Node.js", "Express", "Orthanc", "OHIF", "Docker Compose", "Nginx"],
    githubUrl: "https://github.com/karthiek390/dicom-local-viewer",
    featured: true,
  },
  {
    title: "CICD Stats Watcher",
    description:
      "A GitHub Marketplace Action for self-hosted runners that captures storage, Docker, CPU, memory, and inode metrics around important workflow steps and generates downloadable CI reports.",
    techStack: ["GitHub Actions", "Bash", "Python", "HTML Reports", "Linux", "Docker"],
    githubUrl: "https://github.com/karthiek390/cicd-stats-watcher",
    liveUrl: "https://github.com/marketplace/actions/cicd-stats-watcher",
  },
  {
    title: "Tic-Tac-Toe AI Coach",
    description:
      "A full-stack training app that lets users play Tic-Tac-Toe, logs every move, and stores game history with coaching feedback to help players improve decision-making.",
    techStack: ["React", "Tailwind CSS", "Vite", "TypeScript", "Flask", "SQLAlchemy", "SQLite"],
    githubUrl: "https://github.com/karthiek390/tic-tac-toe",
    liveUrl: "https://tic-tac-toe-roan-nine-56.vercel.app/",
  },
  {
    title: "Family Network Filtering with Pi-hole",
    description:
      "A Raspberry Pi 5 based network-wide DNS filtering setup that blocks ads, malware, and inappropriate content while applying separate filtering policies for kids and adults.",
    techStack: ["Raspberry Pi 5", "Pi-hole", "DNS", "Cloudflare", "DHCP Reservations", "Network Security"],
  },
  {
    title: "Home Media Server with TrueNAS SCALE",
    description:
      "A revived desktop turned into a secure home media server with ZFS-backed storage, Jellyfin streaming, GPU-assisted transcoding, segmented networking, and a VPN-first remote access plan.",
    techStack: ["TrueNAS SCALE", "ZFS", "Jellyfin", "FFmpeg", "NVIDIA GTX 1650", "WireGuard", "Tailscale"],
  },
];

export default function BlueProjectsGrid() {
  const [featured, ...rest] = PROJECTS;

  return (
    <section
      id="projects"
      className="bp-panel-c"
      style={{ padding: "96px 64px", minHeight: "100vh" }}
    >
      <div style={{ maxWidth: "840px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <p className="bp-label" style={{ marginBottom: "12px" }}>Projects</p>
          <h2 style={{
            fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
            fontWeight: 800, color: "var(--bp-ink)",
            letterSpacing: "-0.03em", marginBottom: "0.4rem",
          }}>
            Things I&apos;ve Built
          </h2>
          <p style={{ color: "var(--bp-ink-muted)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "3rem" }}>
            Software, automation, and infrastructure — from medical imaging to homelab to AI tooling.
          </p>
        </motion.div>

        {/* Featured card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
        >
          <BlueProjectCard {...featured} featured />
        </motion.div>

        {/* 2-col grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
          {rest.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1], delay: i * 0.07 }}
            >
              <BlueProjectCard {...p} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
