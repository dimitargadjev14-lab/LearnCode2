(() => {
  const TRACK_KEY = "codelearn_selected_track";
  const cards = Array.from(document.querySelectorAll(".track-card[data-track]"));
  const startLink = document.getElementById("start-learning-link");

  if (!(startLink instanceof HTMLAnchorElement) || cards.length === 0) {
    return;
  }

  const isValidTrack = (track) => ["html", "css", "js"].includes(track);
  let selectedTrack = localStorage.getItem(TRACK_KEY);
  if (!isValidTrack(selectedTrack)) {
    selectedTrack = "html";
  }

  const applySelectedTrack = (track) => {
    selectedTrack = track;
    cards.forEach((card) => {
      card.classList.toggle("active", card.dataset.track === selectedTrack);
    });
    startLink.href = `learning.html?track=${selectedTrack}`;
    localStorage.setItem(TRACK_KEY, selectedTrack);
  };

  cards.forEach((card) => {
    card.addEventListener("click", (event) => {
      event.preventDefault();
      const track = card.dataset.track;
      if (!track || !isValidTrack(track)) {
        return;
      }
      applySelectedTrack(track);
    });
  });

  applySelectedTrack(selectedTrack);
})();
