new Typed("#typing", {
  strings: ["A linha", "do tempo", "de um casal!", "Bárbara", "Patrick"],

  typeSpeed: 60,
  backSpeed: 40,
  backDelay: 1500,

  loop: true,

  showCursor: false,
});

createTimeline();

AOS.init();

gsap.from(".hero-content", {
  y: 40,

  opacity: 0,

  duration: 1.4,
});

updateRelationshipCounter();

function updateRelationshipCounter() {
  const firstMeeting = new Date("2026-06-17");

  const today = new Date();

  const diff = today - firstMeeting;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  document.querySelector("#days-counter").textContent = `${days} dias`;

  const weeks = Math.floor(days / 7);

  const remainingDays = days % 7;

  document.querySelector("#counter-detail").textContent =
    getTimelineMessage(days);
}

function getTimelineMessage(days) {
  if (days < 30) return "Ainda estamos escrevendo as primeiras páginas.";

  if (days < 90) return "A história está começando a ganhar capítulos.";

  if (days < 180) return "Já temos algumas boas memórias guardadas.";

  return "O arquivo de memórias está crescendo.";
}

document.getElementById("egg-counter").addEventListener("click", () => {
  localStorage.removeItem("found-eggs");

  location.reload();
});

