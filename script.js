const tabs = document.querySelectorAll(".nav-btn");
const sections = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        if (tab.classList.contains("active")) {
            return;
        }

        const current = document.querySelector(".tab-content.active");
        if (current) {
            current.style.opacity = "0";
            setTimeout(() => {
                current.classList.remove("active");
                current.style.display = "none";
            }, 0.1);
        }

        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const targetId =
            tab.id === "about-btn" ? "about" :
            tab.id === "resume-btn" ? "resume" : "website";
        const next = document.getElementById(targetId);

        next.style.display = "block";
        next.classList.add("active");
        next.style.opacity = "0";
        setTimeout(() => next.style.opacity = "1", 0.1);

        window.scrollTo({ top: 0, behavior: "smooth" });

    });
});

function adjustMainHeight() {
  const header = document.querySelector(".header");
  const main = document.querySelector("main");

  if (header && main) {
    const headerHeight = header.offsetHeight;
    main.style.maxHeight = `calc(100vh - ${headerHeight}px)`;
  }
}

window.addEventListener("load", adjustMainHeight);
window.addEventListener("resize", adjustMainHeight);
