document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const loader = document.querySelector(".loader");
  const navToggle = document.querySelector(".nav-toggle");
  const topbar = document.querySelector(".topbar");
  const sidePanel = document.querySelector(".side-panel");
  const sidePanelOverlay = document.querySelector(".side-panel__overlay");
  const sidePanelClose = document.querySelector(".side-panel__close");
  const navLinks = document.querySelectorAll(".side-panel__nav a");
  const typingText = document.getElementById("typing-text");
  const scrollTopButton = document.getElementById("scroll-top");
  const resumeButton = document.getElementById("resume-btn");
  const revealElements = document.querySelectorAll(".reveal");

  const typingStrings = [
    "Data Analyst",
    "Power Platform Developer",
    "AI Enthusiast",
    "Web Developer",
  ];

  let typeIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeLoop() {
    const current = typingStrings[typeIndex];
    const nextText = deleting
      ? current.slice(0, Math.max(0, charIndex - 1))
      : current.slice(0, charIndex + 1);

    typingText.textContent = nextText;
    charIndex = deleting ? charIndex - 1 : charIndex + 1;

    let delay = deleting ? 40 : 72;

    if (!deleting && charIndex === current.length) {
      delay = 1200;
      deleting = true;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      typeIndex = (typeIndex + 1) % typingStrings.length;
      delay = 300;
    }

    window.setTimeout(typeLoop, delay);
  }

  function createResumeDownload() {
    const resumeContent = `Dinesh Kumar S\nAI Student | Data Analyst | Microsoft Technologist\nLocation: Coimbatore, India\n\nSummary\nBuilding intelligent systems, automating workflows, and turning data into actionable insights.\n\nExperience\n- Lead Developer — DoMore Tech Consultancy Services\n- Data Analyst Intern — Choleric Conference\n- Developer Intern (Power Platform) — ELGi Equipments\n- Microsoft Learn Student Ambassador (LEAD)\n\nSkills\nPython, SQL, Power BI, Tableau, Power Apps, Power Automate, SharePoint, FastAPI, Azure, GCP, Git, Selenium, Playwright\n`;

    const blob = new Blob([resumeContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Dinesh_Kumar_S_Resume.txt";
    link.click();
    URL.revokeObjectURL(url);
  }

  function updateScrollButton() {
    const shouldShow = window.scrollY > 400;
    scrollTopButton.classList.toggle("is-visible", shouldShow);
  }

  function setPanelState(isOpen) {
    document.body.classList.toggle("is-panel-open", isOpen);
    sidePanel?.setAttribute("aria-hidden", String(!isOpen));
    navToggle?.setAttribute("aria-expanded", String(isOpen));
  }

  navToggle?.addEventListener("click", () => {
    const shouldOpen = !document.body.classList.contains("is-panel-open");
    setPanelState(shouldOpen);
  });

  sidePanelOverlay?.addEventListener("click", () => setPanelState(false));
  sidePanelClose?.addEventListener("click", () => setPanelState(false));

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setPanelState(false);
    });
  });

  scrollTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  resumeButton.addEventListener("click", createResumeDownload);

  window.addEventListener("scroll", updateScrollButton, { passive: true });
  updateScrollButton();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((element) => observer.observe(element));

  const particleCanvas = document.getElementById("particle-canvas");
  const context = particleCanvas.getContext("2d");
  const particles = [];
  const particleCount = 34;

  function resizeCanvas() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * particleCanvas.width,
      y: Math.random() * particleCanvas.height,
      radius: Math.random() * 2 + 0.7,
      speedX: (Math.random() - 0.5) * 0.08,
      speedY: -(Math.random() * 0.12 + 0.04),
      alpha: Math.random() * 0.35 + 0.14,
      pulse: Math.random() * Math.PI * 2,
      drift: Math.random() * 0.5 + 0.15,
      trail: Math.random() > 0.88,
      cool: Math.random() > 0.5,
    };
  }

  function initParticles() {
    particles.length = 0;
    for (let index = 0; index < particleCount; index += 1) {
      particles.push(createParticle());
    }
  }

  function drawParticles() {
    context.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

    const time = performance.now() * 0.001;

    particles.forEach((particle) => {
      particle.pulse += 0.012;
      particle.x += particle.speedX + Math.sin(time + particle.pulse) * particle.drift * 0.08;
      particle.y += particle.speedY - Math.cos(time * 0.85 + particle.pulse) * 0.02;
      const glow = 0.78 + Math.sin(time * 1.4 + particle.pulse) * 0.14;

      if (particle.x < -20) particle.x = particleCanvas.width + 20;
      if (particle.x > particleCanvas.width + 20) particle.x = -20;
      if (particle.y < -20) particle.y = particleCanvas.height + 20;
      if (particle.y > particleCanvas.height + 20) particle.y = -20;

      const fillColor = particle.cool
        ? `rgba(0, 245, 255, ${particle.alpha * glow})`
        : `rgba(138, 43, 226, ${particle.alpha * glow})`;

      context.beginPath();
      context.fillStyle = fillColor;
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();

      if (particle.trail) {
        context.beginPath();
        context.strokeStyle = particle.cool
          ? `rgba(0, 255, 159, ${particle.alpha * 0.14})`
          : `rgba(230, 230, 230, ${particle.alpha * 0.12})`;
        context.lineWidth = 1;
        context.moveTo(particle.x, particle.y);
        context.lineTo(particle.x - particle.speedX * 18, particle.y - particle.speedY * 18);
        context.stroke();
      }
    });

    requestAnimationFrame(drawParticles);
  }

  function startAnimations() {
    resizeCanvas();
    initParticles();
    drawParticles();
    typeLoop();
    body.classList.add("is-loaded");
    loader?.remove();
  }

  window.addEventListener("resize", () => {
    resizeCanvas();
    initParticles();
  });

  startAnimations();
});
