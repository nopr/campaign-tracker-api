module.exports = function (player) {
  player.games.won = 0
  player.games.lost = 0
  player.games.drawn = 0
  player.score.cumulative = 0
  for (var m = 0; m < player.matches.length; m++) {
    var match = player.matches[m]
    if (match.home.player.toString() === player._id.toString()) {
      player.score.cumulative += match.home.score
      if (match.home.result === 'win') { player.games.won++ }
      if (match.home.result === 'lose') { player.games.lost++ }
      if (match.home.result === 'draw') { player.games.drawn++ }
    } else {
      player.score.cumulative += match.away.score
      if (match.away.result === 'win') { player.games.won++ }
      if (match.away.result === 'lose') { player.games.lost++ }
      if (match.away.result === 'draw') { player.games.drawn++ }
    }
  }
  player.score.average = Math.round(player.score.cumulative / (player.games.won + player.games.lost + player.games.drawn) * 10) / 10;
  return player
}
