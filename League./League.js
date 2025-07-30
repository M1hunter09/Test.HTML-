const params = new URLSearchParams(window.location.search);
const leagueId = params.get("id") || "league-1";
const dataURL = `/League./${leagueId}.json`;

fetch(dataURL)
  .then(res => res.json())
  .then(data => {
    document.getElementById("league-name").textContent = data.name || "Unnamed League";
    document.getElementById("league-meta").textContent = `Created by ${data.createdBy || "Unknown"} on ${data.createdAt || "Unknown Date"}`;

    // Teams
    const teams = data.teams || [];
    const teamsList = teams.map(t => `<li>${t}</li>`).join("");
    document.getElementById("teams-list").innerHTML = teamsList;

    // Standings
    const standings = data.standings || [];
    const standingsList = standings.map(s => `<li>${s.team}: ${s.points} pts</li>`).join("");
    document.getElementById("standings-list").innerHTML = standingsList;

    // Matches
    const matches = data.matches || [];
    const matchList = matches.map(m => `<li>${m.teamA} ${m.scoreA} - ${m.scoreB} ${m.teamB}</li>`).join("");
    document.getElementById("matches-list").innerHTML = matchList;

  })
  .catch(err => {
    document.body.innerHTML = "<h2 style='text-align:center;'>League Not Found</h2>";
  });
