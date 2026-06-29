function createTimeline() {

    const container =
        document.querySelector("#timeline");

    memories.forEach(memory => {

        const card =
            document.createElement("article");

        card.className = "polaroid";
        card.dataset.aos = "fade-up";

        card.innerHTML = `
            <img
                src="${memory.image}"
                alt="${memory.title}"
                class="timeline-image"
            >

            <h3>${memory.title}</h3>

            <small>
                ${dayjs(memory.date)
                    .format("DD/MM/YYYY")}
            </small>

            <p>${memory.description}</p>
        `;

        container.appendChild(card);

    });

    registerGallery();
}