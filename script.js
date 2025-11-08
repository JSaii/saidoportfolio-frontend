const tabs = document.querySelectorAll(".nav-btn");
const sections = document.querySelectorAll(".tab-content");

const savedTabId = localStorage.getItem("activeTabId") || "about-btn";
const savedSectionId =
    savedTabId === "about-btn" ? "about" :
        savedTabId === "resume-btn" ? "resume" : "website";


document.getElementById(savedTabId).classList.add("active");
document.getElementById(savedSectionId).classList.add("active");
document.getElementById(savedSectionId).style.display = "block";
document.getElementById(savedSectionId).style.opacity = "1";


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

        localStorage.setItem("activeTabId", tab.id);

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

window.addEventListener("resize", adjustMainHeight);


const API_URL = "https://5tj3g9hzyi.execute-api.us-east-1.amazonaws.com/prod/count";
const visitorCounterText = document.querySelector(".visitor-count")

async function updateVisitorCount() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.count) {
            visitorCounterText.textContent = `Visitors : ${data.count}`;
        }
        else {
            visitorCounterText.textContent = "Visitors : ~";
        }
    } catch (err) {
        console.error("Failed to load visitor count:", err);
        document.getElementById("visitor-count").innerText = "???";
    }
}

window.addEventListener("load", () => {
    adjustMainHeight();
    updateVisitorCount();
    
    const img = document.getElementById("architecture-img");
    const spinner = document.querySelector(".spinner");

    if (img && spinner) {
        if (img.complete) {
            // already cached and loaded
            spinner.style.display = "none";
            img.style.display = "block";
            img.style.opacity = "1";
        } else {
            img.addEventListener("load", () => {
                spinner.style.display = "none";
                img.style.display = "block";
                img.style.opacity = "1";
            });
        }
    }
});
