'use strict';

angular
  .module('app')
  /**
   * @ngdoc service
   * @name app.service:Match
   * @kind function
   * @description
   * Provides functions to handle players stats.
   */
  .factory('PlayerStats', [
    'SelectedPlayers',
    'SavedPlayers',
    'PlayersList',
    'Match',
    'Storage',
    function(SelectedPlayers, SavedPlayers, PlayersList, Match, Storage) {

      /**
       * @ngdoc method
       * @name PlayerStats#addShutout
       * @kind function
       * @methodOf app.service:PlayerStats
       * @description
       * Adds a shutout to the shutouts of the player
       */
      function addShutout(player) {
        player.shutouts += 1;
        SelectedPlayers.save(SelectedPlayers.getAll());
      }

      /**
       * @ngdoc method
       * @name PlayerStats#getWinsPercentage
       * @kind function
       * @methodOf app.service:PlayerStats
       * @return {number|undefined}
       * @description
       * Return the ratio between wins and games of a player.
       */
      function getWinsPercentage(player) {
        return player.games ? ((player.wins / player.games) * 100).toFixed(2) : 0;
      }

      /**
       * @ngdoc method
       * @name PlayerStats#getShutoutsIndex
       * @kind function
       * @methodOf app.service:PlayerStats
       * @return {number|undefined}
       * @description
       * Return the ratio between shutouts and games of a player.
       */
      function getShutoutsIndex(player) {
        var shutoutsIndex = (player.shutouts / player.games);
        return shutoutsIndex ? shutoutsIndex.toFixed(2) : 0;
      }

      /**
       * @ngdoc method
       * @name PlayerStats#getFormattedBestRoundDate
       * @kind function
       * @methodOf app.service:PlayerStats
       * @return {string}
       * @description
       * Return the date of the best round score of the player in the format dd/mm/yyyy.
       */
      function getFormattedBestRoundDate(player) {
        var day = new Date(getBestRoundDate(player)).getDate();
        var month = new Date(getBestRoundDate(player)).getMonth() + 1;
        var year = new Date(getBestRoundDate(player)).getFullYear();

        var formattedDate = day + '/' + month + '/' + year;

        return getBestRoundDate(player) ? formattedDate : 'Never played a game';
      }

      /**
       * @ngdoc method
       * @name PlayerStats#getBestRoundScore
       * @kind function
       * @methodOf app.service:PlayerStats
       * @return {number|undefined}
       * @description
       * Returns the highest score made in a round by the player
       */
      function getBestRoundScore(player) {
        return player.bestRoundScore;
      }

      /**
       * @ngdoc method
       * @name PlayerStats#setBestRoundScore
       * @kind function
       * @methodOf app.service:PlayerStats
       * @description
       * Updates the best round score of the player
       */
      function setBestRoundScore(player, score) {
        player.bestRoundScore = score;
      }

      /**
       * @ngdoc method
       * @name PlayerStats#getBestRoundDate
       * @kind function
       * @methodOf app.service:PlayerStats
       * @return {date}
       * @description
       * Returns the date when the player made the best score in a round
       */
      function getBestRoundDate(player) {
        return player.bestRoundDate;
      }

      /**
       * @ngdoc method
       * @name PlayerStats#setBestRoundDate
       * @kind function
       * @methodOf app.service:PlayerStats
       * @description
       * Updates the date when the player made the best score in a round
       */
      function setBestRoundDate(player, date) {
        player.bestRoundDate = date;
      }

      /**
       * @ngdoc method
       * @name PlayerStats#updateBestRound
       * @kind function
       * @methodOf app.service:PlayerStats
       * @description
       * Updates the best round date and score of the player and saves those in the storage
       */
      function updateBestRound(player, playerScore) {
        setBestRoundDate(player, new Date());
        setBestRoundScore(player, playerScore);
        SelectedPlayers.save(SelectedPlayers.getAll());
      }

      /**
       * @ngdoc method
       * @name PlayerStats#updatePlayersGames
       * @kind function
       * @methodOf app.service:PlayerStats
       * @description
       * Updates the games and wins of the players and saves those in the storage
       */
      function updatePlayersGames() {
        angular.forEach(Match.getWinners(), function(player) {
          player.wins += 1;
        });
        angular.forEach(SelectedPlayers.getAll(), function(player) {
          player.games += 1;
        });
        SelectedPlayers.save(SelectedPlayers.getAll());
      }

      // todo: its necessary to update saved players when the browser is closed, the selected players list should be a list of IDs of the players
      // todo: should be created a new service that handles the players in the saved players list referenced by those IDs
      function savePlayers() {
        angular.forEach(SelectedPlayers.getAll(), function(player) {
          SavedPlayers.remove(player);
          SavedPlayers.add(player);
        });
        SavedPlayers.save(SavedPlayers.getAll());
      }

      /**
       * @ngdoc method
       * @name PlayerStats#wereStatsUpdated
       * @kind function
       * @methodOf app.service:PlayerStats
       * @return {boolean} true if the stats were updated
       * @description
       * Check the match list and return if the stats were arleady updated or not
       */
      function wereStatsUpdated() {
        var matchList = Storage.get('matchList');
        return matchList && matchList.indexOf(PlayersList.currentMatchID) >= 0;
      }

      return {
        addShutout: addShutout,
        getWinsPercentage: getWinsPercentage,
        getShutoutsIndex: getShutoutsIndex,
        getFormattedBestRoundDate: getFormattedBestRoundDate,
        getBestRoundScore: getBestRoundScore,
        setBestRoundScore: setBestRoundScore,
        getBestRoundDate: getBestRoundDate,
        setBestRoundDate: setBestRoundDate,
        updateBestRound: updateBestRound,
        updatePlayersGames: updatePlayersGames,
        savePlayers: savePlayers,
        wereStatsUpdated: wereStatsUpdated
      };

    }
  ]);
