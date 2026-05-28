```txt id="portfolio-master-copy"
SKILLS:
- Languages: Python, JavaScript, TypeScript, Java, C, Bash/Shell, SQL
- Frontend: React, Vue.js, HTML, CSS, Tailwind CSS
- Backend: Node.js, Express.js, Flask, REST APIs, GraphQL
- AI/ML: LLMs, GPT, NLP, GraphRAG, LangChain, LangGraph, Hugging Face, Prompt Engineering, Vector Databases, TensorFlow, PyTorch, Scikit-Learn, OpenCV, Computer Vision
- Cloud & DevOps: AWS, Azure, Docker, Kubernetes, GitHub Actions, CI/CD, Terraform, Ansible, Nginx, Prometheus, Grafana
- Databases: PostgreSQL, MySQL, MongoDB, Neo4j, SQLite, Redis
- Data & Visualization: Pandas, NumPy, Apache ECharts, Tableau
- Infrastructure & Security: Linux, SSH, VPN, TLS/SSL, Reverse Proxy, Access Control, Firewall Configuration, CodeQL, Semgrep
- Tools & Platforms: Git, GitHub, Prisma ORM, Kafka, Celery, OHIF Viewer, Orthanc, DICOMweb, Jira, Vercel, Render, TrueNAS SCALE

CERTIFICATIONS:
- AWS Certified Solutions Architect – Associate | AWS | 2024
- NVIDIA-Certified Associate: Generative AI & LLMs | NVIDIA | 2024
- Microsoft Certified: Azure Fundamentals | Microsoft | 2024
- NDG Linux Essentials | Cisco Networking Academy | 2023

WORK EXPERIENCE:

- Research Software Engineer | Indiana University School of Medicine | Jun 2024 – Present
  • Developed scalable full-stack research software platforms for scientific and medical imaging datasets using Vue.js, Node.js, Express.js, Prisma ORM, and PostgreSQL.
  • Designed and implemented advanced GitHub Actions CI/CD pipelines for a multi-service Docker-based platform, automating builds, linting, integration testing, preview deployments, and deployment verification workflows.
  • Built PR-driven preview environments that automatically provisioned isolated full-stack deployments and published shareable preview links, enabling faster QA and stakeholder validation.
  • Architected a reusable CI/CD observability and step-tracking system for self-hosted GitHub Actions runners, collecting runtime diagnostics, Docker/filesystem metrics, and workflow telemetry while generating downloadable CI reports for debugging and deployment analysis.
  • Designed and implemented an AI-powered test generation workflow within GitHub Actions that analyzed pull request changes and generated Playwright E2E tests using on-prem LLM APIs integrated into CI infrastructure.
  • Architected guarded validation workflows for AI-generated tests, including syntax verification, selector validation, import checks, and security scanning before automated execution in containerized CI pipelines.
  • Integrated AWS deployment into the CD pipeline using self-hosted runners, ensuring consistent, synchronized releases across on-prem production and cloud environments for scalable and reliable system access.
  • Used Terraform and Ansible to manage infrastructure, secrets, and deployment automation across AWS and Azure environments.
  • Integrated OHIF Viewer into the Bioloop portal to enable secure, browser-based DICOM visualization, with Orthanc-backed delivery of CT/MRI imaging data using DICOMweb standards.
  • Developed operational dashboards and analytics visualizations using Apache ECharts to improve monitoring, reporting, and platform usage visibility.
  • Orchestrated Bioloop integration with GRIP via Azure VMs, selectively deploying required services and establishing controlled, secure connectivity aligned with HIPAA, IU, and GRIP standards.
  • Implemented secure authentication workflows using OTP and CAPTCHA to strengthen identity verification and portal security.
  • Developed secure login and signup interfaces using Vue.js, improving authentication workflows and accessibility across the Bioloop research data management platform.
  • Refactored backend database queries to fix subtle data bugs, improve query safety, and enforce stronger data integrity guarantees.
  • Developed sorting, filtering, pagination, and protocol management features with full CRUD operations, improving performance and admin control across large-scale research datasets.
  • Built responsive, mobile-friendly frontend components and improved state management and routing consistency for smoother end-user workflows.
  • Collaborated with cross-functional research and engineering teams to deploy scalable infrastructure supporting compliant cross-institutional medical research data exchange.

- AI Engineer | Siemens Energy | Jan 2025 – Jul 2025
  • Worked on an LLM-powered fault detection and recommendation system for gas turbine maintenance using NLP, Knowledge Graphs, and Generative AI technologies.
  • Built GraphRAG architectures combining PostgreSQL and Neo4j to retrieve historical turbine faults, causes, impacts, and maintenance resolutions before generating responses.
  • Developed NLP pipelines using spaCy, Prodigy, and LLMs to extract entities and relationships from engineering logs, work orders, and maintenance documentation.
  • Designed prompt engineering workflows for fault classification, information extraction, root-cause analysis, and reasoning tasks using GPT-style models.
  • Defined and implemented ontology-driven Knowledge Graph systems to support explainable AI recommendations and predictive maintenance workflows.
  • Bootstrapped labeled datasets using few-shot prompting techniques and SME feedback, significantly reducing manual annotation effort.
  • Improved AI interpretability by generating reasoning traces and evidence paths from Knowledge Graph relationships for engineering validation.
  • Collaborated with turbine engineers and SMEs to refine active learning workflows and improve model quality for high-uncertainty maintenance cases.
  • Developed and deployed containerized AI workflows using Docker, Azure infrastructure, and CI/CD practices for scalable enterprise deployment.

- AI / Full-Stack Engineer | Future State University | May 2025 – Jul 2025
  • Built and maintained backend services using Node.js, Python, and Java-based integrations for scalable AI-driven applications.
  • Developed REST APIs supporting user workflows, automated content generation, and structured data processing systems.
  • Engineered data transformation pipelines to parse unstructured inputs into validated JSON outputs with safeguards against data leakage and abuse paths.
  • Worked on AI-integrated systems involving prompt engineering, workflow orchestration, and scalable backend infrastructure.
  • Collaborated remotely across engineering teams to improve reliability, automation, and API-driven workflows.

- Graduate Teaching Assistant | University of Central Florida | Aug 2022 – May 2024
  • Assisted students with programming, software engineering, operating systems, networking, databases, and computer science coursework.
  • Supported faculty instruction, technical grading, debugging sessions, and student mentoring across undergraduate CS courses.
  • Guided students through software development concepts, debugging strategies, and project-based learning activities.

- Machine Learning Engineer Intern | Samsung Research & Development Institute | Jul 2021 – Mar 2022
  • Led development of a machine learning-based emotion detection system for Samsung Bixby using Automatic Speech Recognition and VGG16 models with approximately 93% accuracy.
  • Processed speech datasets using MFCCs, STFT, CWT, heatmaps, and t-SNE visualization techniques for feature extraction and signal analysis.
  • Collaborated with research teams to train and evaluate machine learning models for speech-based emotion classification tasks.
  • Led a team of 3 engineers during exploratory data analysis, experimentation, and model development workflows.
  • Developed Tableau dashboards and visualizations to communicate insights and performance metrics to stakeholders.
  • Contributed to deployment workflows integrating the emotion detection system into Samsung’s Bixby voice assistant ecosystem.

- Full-Stack Developer | SANRIDGE | Jul 2021 – Oct 2021
  • Developed a Credit Card Management System using ReactJS, Redux, Express.js, and MySQL.
  • Built responsive frontend interfaces enabling bill payments, analytics dashboards, and account management workflows.
  • Developed backend APIs and integrated database systems for secure transaction and user management functionality.
  • Collaborated within a dynamic engineering team to improve usability, system performance, and frontend-backend integration.

EDUCATION:
- Master of Science in Computer Science | University of Central Florida | 2024
- Bachelor of Technology in Computer Science | KL University | 2022

PROJECTS:

- Local-First DICOM Imaging Workspace | Vue.js, Node.js, Express, Orthanc, OHIF, Docker, DICOMweb | 2026
  • Architected and developed a containerized local-first medical imaging platform for secure ingestion, analysis, management, and browser-based visualization of DICOM datasets without cloud dependency.
  • Implemented dual ingestion workflows including browser uploads and mounted-path scanning with recursive dataset analysis, metadata extraction, grouped study/series views, search/filtering, and pagination.
  • Developed asynchronous Orthanc import orchestration with live progress tracking, selective DICOM imports, and dynamic OHIF launch workflows using DICOMweb integration.
  • Built session-aware dataset browsers with persistent workspace state, recursive hierarchy navigation, and advanced file exploration systems.
  • Optimized large-scale imaging dataset handling through lightweight metadata management and asynchronous import orchestration.

- CI/CD Observability Framework | GitHub Actions, Docker, Python, Bash, DevOps, Self-hosted Runners | 2026
  • Designed and built a reusable observability framework for self-hosted GitHub Actions runners to improve CI/CD debugging, runtime visibility, and deployment traceability.
  • Implemented configuration-driven workflow step tracking, runtime telemetry collection, Docker/filesystem monitoring, and automated CI artifact generation.
  • Developed workflow inventory and validation tooling for monitoring large containerized pipelines with minimal CPU and memory overhead.

- Tic-Tac-Toe AI Coach | Python, React, Flask, SQLite, TypeScript, Minimax, Vercel, Render | 2025
  • Developed a full-stack Tic-Tac-Toe platform integrating AI opponents and post-game strategic analysis.
  • Implemented minimax and trap-based AI strategies in Python to simulate varying gameplay difficulty levels.
  • Logged moves and game outcomes in SQLite for post-game analytics and strategic insights.
  • Deployed React frontend on Vercel and Flask backend on Render for production-ready gameplay experiences.

- Homelab Media Server | TrueNAS SCALE, Jellyfin, Docker, ZFS, ffmpeg, GPU Transcoding | 2025
  • Repurposed old hardware into a fully functional TrueNAS SCALE + Jellyfin media server with resilient ZFS storage pools.
  • Configured centralized file sharing, ACL permissions, and secure internal media streaming workflows.
  • Integrated GPU-accelerated ffmpeg transcoding for optimized playback performance across multiple devices.
  • Strengthened security through VLAN segmentation, firewall rules, VPN preparation, and internal-only service configurations.
```
