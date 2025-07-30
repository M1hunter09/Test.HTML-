const urlParams = new URLSearchParams(window.location.search);
const leagueId = urlParams.get("id") || "league-1";

fetch(`/league/${leagueId}.json`)
  .then(res => {
    if (!res.ok) throw new Error("Not found");
    return res.json();
  })
  .then(data => {
    document.getElementById("league-name").textContent = data.name;

    // Display teams
    const teamsHTML = data.teams.map(t => `<li>${t}</li>`).join("");
    document.getElementById("teams").innerHTML = `<h2>Teams</h2><ul>${teamsHTML}</ul>`;

    // Display standings
    const standingsHTML = data.standings.map(s =>
      `<li>${s.team}: ${s.points} pts</li>`
    ).join("");
    document.getElementById("standings").innerHTML = `<h2>Standings</h2><ul>${standingsHTML}</ul>`;
  })
  .catch(err => {
    document.body.innerHTML = "<h2>League not found</h2>";
  });
