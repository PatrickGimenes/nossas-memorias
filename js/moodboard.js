const board = {
  updated: "13 de Julho",

  cards: [
    {
      type: "message",
      icon: "☀️",
      title: "Bom dia",
      content:
        "Espero que hoje seja um daqueles dias em que você perceba o quanto é importante na vida das pessoas.",
    },

    {
      type: "quote",
      icon: "🌻",
      title: "Lembrete",
      content: "Você não precisa resolver tudo hoje. Um passo de cada vez.",
    },

    {
      type: "likes",
      icon: "❤️",
      title: "Coisas que você gosta",
      items: [
        "Banho com vela aromática",
        "Vinho",
        "Pôr do sol",
        "Viajar",
        "Flores",
        "Lugares tranquilos",
        "Tons escuros",
      ],
    },

    {
      type: "playlist",
      icon: "🎵",
      title: "Música da semana",
      song: "Alento",
      artist: "Supercombo",
      url: "https://youtu.be/4xw6HvgkS94?si=eB16je8Rc_Y1wXQt",
    },

    {
      type: "photo",
      icon: "📷",
      title: "Memória",
      image: "assets/photos/we.jpeg",
      caption: "Nossa primeira foto juntos.",
    },
  ],
};

//Moodboard

const container = document.getElementById("daily-board-content");

container.innerHTML = board.cards
  .map((card) => {
    if (card.type === "likes") {
      return `
        <div class="board-card ${card.type}">
            <h3>${card.icon} ${card.title}</h3>

            <ul>
                ${card.items.map((i) => `<li>${i}</li>`).join("")}
            </ul>
        </div>
        `;
    }

    if (card.type === "photo") {
      return `
        <div class="board-card photo">

            <img src="${card.image}">

            <h3>${card.icon} ${card.title}</h3>

            <p>${card.caption}</p>

        </div>
        `;
    }

    if (card.type === "playlist") {
      return `
        <div class="board-card playlist">

            <h3>${card.icon} ${card.title}</h3>

            <p>
                <strong>${card.song}</strong><br>
                ${card.artist}
            </p>

            <a
                href="${card.url}"
                target="_blank"
                rel="noopener noreferrer"
                class="music-link"
            >
                Ouvir
            </a>

        </div>
    `;
    }

    return `
        <div class="board-card">

            <h3>${card.icon} ${card.title}</h3>

            <p>${card.content}</p>

        </div>
    `;
  })
  .join("");
