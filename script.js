document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const sidePanel = document.querySelector(".side-panel");
  const sidePanelOverlay = document.querySelector(".side-panel__overlay");
  const sidePanelClose = document.querySelector(".side-panel__close");
  const navLinks = document.querySelectorAll(".side-panel__nav a");
  const scrollTopButton = document.getElementById("scroll-top");
  const resumeButton = document.getElementById("resume-btn");
  const revealElements = document.querySelectorAll(".reveal");

  function setPanelState(isOpen) {
    document.body.classList.toggle("is-panel-open", isOpen);
    sidePanel?.setAttribute("aria-hidden", String(!isOpen));
    navToggle?.setAttribute("aria-expanded", String(isOpen));
  }

  function updateScrollButton() {
    const shouldShow = window.scrollY > 400;
    scrollTopButton?.classList.toggle("is-visible", shouldShow);
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

  navToggle?.addEventListener("click", () => {
    const shouldOpen = !document.body.classList.contains("is-panel-open");
    setPanelState(shouldOpen);
  });

  sidePanelOverlay?.addEventListener("click", () => setPanelState(false));
  sidePanelClose?.addEventListener("click", () => setPanelState(false));

  navLinks.forEach((link) => {
    link.addEventListener("click", () => setPanelState(false));
  });

  scrollTopButton?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  resumeButton?.addEventListener("click", createResumeDownload);

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
});
