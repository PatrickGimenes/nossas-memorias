const EasterEggs = {
  total: 5,

  unlock(id) {
    const found = JSON.parse(localStorage.getItem("found-eggs") || "[]");

    if (!found.includes(id)) {
      found.push(id);

      localStorage.setItem("found-eggs", JSON.stringify(found));

      updateCounter();
      showAchievement(id);

      if (found.length === this.total) {
        setTimeout(() => {
          openSecretModal(
            "🏆 Conquista Especial",
            `
              <p>
                Todos os segredos foram encontrados.
              </p>
              <br>
              <strong>
                Parece que alguém está prestando atenção!
              </strong>
            `,
          );
        }, 5000);
      }
    }
  },

  count() {
    return JSON.parse(localStorage.getItem("found-eggs") || "[]").length;
  },
};

function updateCounter() {
  const counter = document.querySelector("#egg-counter");

  if (!counter) return;

  counter.textContent = `Segredos encontrados: ${EasterEggs.count()}/${EasterEggs.total}`;
}

function showAchievement(name) {
  const toast = document.createElement("div");

  toast.className = "achievement";

  toast.innerHTML = `
    <strong>✨ Segredo encontrado!</strong>
    <span>${name}</span>
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.remove();
  }, 5000);
}

function openSecretModal(title, content) {
  document.querySelector(".secret-modal")?.remove();

  const modal = document.createElement("div");

  modal.className = "secret-modal";

  modal.innerHTML = `
    <div class="secret-content">

      <button class="close-secret">
        ✕
      </button>

      <h2>${title}</h2>

      ${content}

    </div>
  `;

  document.body.appendChild(modal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.classList.contains("close-secret")) {
      modal.remove();
    }
  });
}

function registerSecret({ selector, achievement, title, content, clicks = 1 }) {
  const element = document.querySelector(selector);

  if (!element) return;

  let counter = 0;

  element.addEventListener("click", () => {
    counter++;

    if (counter < clicks) {
      return;
    }

    counter = 0;

    EasterEggs.unlock(achievement);

    const html = typeof content === "function" ? content() : content;

    openSecretModal(title, html);
  });
}

function applyTheme(theme) {
  document.body.classList.remove("pink", "neon");

  if (theme !== "default") {
    document.body.classList.add(theme);
  }

  document.querySelector(".secret-modal")?.remove();
}

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("theme-btn")) {
    return;
  }

  applyTheme(e.target.dataset.theme);
});

document.addEventListener("DOMContentLoaded", () => {
  updateCounter();

  registerSecret({
    selector: "#ambrosio-secret",

    achievement: "Ambrosio",

    title: "Relatório Oficial",

    clicks: 5,

    content: `
        <h3>Ambrosio 🐱</h3>

        <p>Peso estimado: Indeterminado</p>

        <div class="bar">
          <div class="fill"></div>
        </div>

        <br>

        <p>
          Status:
          <strong>Gordo</strong>
        </p>
      `,
  });

  registerSecret({
    selector: "#chair-secret",

    achievement: "Cadeira",

    title: "Quanto pesa essa cadeira?",

    content: `
        <p>❌ 2kg</p>
        <p>❌ 4kg</p>
        <p>❌ 10kg</p>

        <br>

        <strong>
          Ainda estamos tentando descobrir.
        </strong>
      `,
  });

  const themeSecret = document.querySelector("#theme-secret");

  if (themeSecret) {
    themeSecret.addEventListener("click", () => {
      EasterEggs.unlock("Banheiro Rosa ou Verde");

      openSecretModal(
        "Qual a cor do teto do banheiro?",
        `
              <button
                class="theme-btn"
                data-theme="pink">

                🌸 Rosa
              </button>

              <button
                class="theme-btn"
                data-theme="neon">

                🟢 Verde Neon
              </button>

              <button
                class="theme-btn"
                data-theme="default">

                ⚫ Normal
              </button>
            `,
      );
    });
  }

  const allergies = ["Linguiça", "Caldo de Cana", "Kibe sem recheio"];

  registerSecret({
    selector: "#allergy-secret",

    achievement: "Alergia",

    title: "Prontuário Médico",

    content: () => {
      const allergy = allergies[Math.floor(Math.random() * allergies.length)];

      return `
          <p>
            ⚠️ Atenção
          </p>

          <br>

          <p>
            Detectada alergia grave a:
          </p>

          <br>

          <strong>
            ${allergy}
          </strong>
        `;
    },
  });

  registerSecret({
    selector: ".casa-geraldo-secret",

    achievement: "Casa Geraldo",

    title: "Arquivo Confidencial",

    content: `
        <p>
          Evidências indicam que
          alguém afirmou que eramos um casal.
        </p>
      `,
  });
});
