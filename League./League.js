const params = new URLSearchParams(window.location.search);
const leagueId = params.get("id") || "league-1";
const dataURL = `League./${leagueId}.json`;

fetch(dataURL)
  .then(res => res.json())
  .then(data => {
    document.getElementById("league-name").textContent = data.name || "Unnamed League";
    document.getElementById("league-description").textContent = data.description || "";
    document.getElementById("league-meta").textContent = `Created by ${data.createdBy || "Unknown"} on ${formatDate(data.createdAt)}`;

    // Teams
    document.getElementById("teams-list").innerHTML =
      (data.teams || []).map(t => `<li>${t}</li>`).join("");

    // Standings
    document.getElementById("standings-list").innerHTML =
      (data.standings || []).map(s => `<li><strong>${s.team}</strong>: ${s.points} pts</li>`).join("");

    // Matches
    document.getElementById("matches-list").innerHTML =
      (data.matches || []).map(m =>
        `<li>${m.teamA} ${m.scoreA} - ${m.scoreB} ${m.teamB}</li>`
      ).join("");
  })
  .catch(() => {
    document.body.innerHTML = "<h2 style='text-align:center;'>League Not Found</h2>";
  });

function formatDate(dateStr) {
  if (!dateStr) return "Unknown";
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, {
    year: "numeric", month: "short", day: "numeric"
  });
}

