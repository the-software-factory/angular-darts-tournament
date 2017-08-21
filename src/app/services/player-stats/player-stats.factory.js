'use strict';

angular
  .module('app')
  .factory('PlayerStats', [
    'SelectedPlayers',
    'SavedPlayers',
    'Match',
    function(SelectedPlayers, SavedPlayers, Match) {

      function addShutout(player) {
        player.shutouts += 1;
        SelectedPlayers.save(SelectedPlayers.getAll());
      }

      /**
       * @param player
       * @returns {string}
       */
      function getWinsPercentage(player) {
        return player.playedGames ? ((player.wins / player.playedGames) * 100) + '%' : '0%';
      }

      /**
       * @param player
       * @returns {*}
       */
      function getBestRoundScore(player) {
        return player.bestRoundScore;
      }

      function setBestRoundScore(player, score) {
        player.bestRoundScore = score;
      }

      function getBestRoundDate(player) {
        return player.bestRoundDate;
      }

      function setBestRoundDate(player, date) {
        player.bestRoundDate = date;
      }

      function updateBestRound(player, playerScore) {
        setBestRoundDate(player, new Date());
        setBestRoundScore(player, playerScore);
        SelectedPlayers.save(SelectedPlayers.getAll());
      }

      function updatePlayersGames() {
        Match.getWinner().wins += 1;
        angular.forEach(SelectedPlayers.getAll(), function(player) {
          player.playedGames += 1;
        });
        SelectedPlayers.save(SelectedPlayers.getAll());
      }

      function savePlayers() {
        angular.forEach(SelectedPlayers.getAll(), function(player) {
          SavedPlayers.remove(player);
          SavedPlayers.add(player);
        });
        SavedPlayers.save(SavedPlayers.getAll());
      }

      return {
        addShutout: addShutout,
        getWinsPercentage: getWinsPercentage,
        getBestRoundScore: getBestRoundScore,
        setBestRoundScore: setBestRoundScore,
        getBestRoundDate: getBestRoundDate,
        setBestRoundDate: setBestRoundDate,
        updateBestRound: updateBestRound,
        updatePlayersGames: updatePlayersGames,
        savePlayers: savePlayers
      };

    }
  ]);
