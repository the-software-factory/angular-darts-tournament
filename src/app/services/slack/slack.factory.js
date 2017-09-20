'use strict';

angular
  .module('app')
  /**
   * @ngdoc service
   * @name app.service:Slack
   * @kind function
   * @description
   * Provides functions to handle the slack integration
   */
  .factory('Slack', [
    '$http',
    'Storage',
    '$translate',
    function($http, Storage, $translate) {

      /**
       * @ngdoc property
       * @name Slack#url
       * @type {String}
       * @propertyOf app.service:Slack
       */
      var url = Storage.get('slackUrl');

      /**
       * @ngdoc method
       * @name Slack#postShouout
       * @kind function
       * @methodOf app.service:Slack
       * @param {Object} player the shoutouted player
       * @description
       * Posts a message with the shoutouted player
       */
      function postShoutout(player) {
        $http({
          url: url,
          method: "POST",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: 'payload= ' + JSON.stringify({
            "username" : "Darts Tournament",
            "icon_emoji": ":dart:",
            "attachments": [
              {
                "mrkdwn_in": ["text"],
                "color": "FF3515",
                "pretext": "Cappotto!",
                "text": "*" + player.name + "* è stato cappottato!"
              }
            ]
          })
        });
      }

      /**
       * @ngdoc method
       * @name Slack#postWinners
       * @kind function
       * @methodOf app.service:Slack
       * @description
       * Posts a message with the winner(s) of the match
       */
      function postWinners(winners) {
        var winnersList = winners.map(function(player) {
          return player.name;
        }).join(", ");

        $http({
          url: url,
          method: "POST",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: 'payload=' + JSON.stringify({
            "username" : "Darts Tournament",
            "icon_emoji": ":dart:",
            "attachments": [
              {
                "mrkdwn_in": ["text"],
                "color": "0AEB12",
                "pretext": "Congratulazioni!",
                "text": "*" + winnersList + $translate.instant('WINNERS_TEXT', {WINNERS: winners.length})
              }
            ]
          })
        });
      }

      return {
        postWinners: postWinners,
        postShoutout: postShoutout
      };
    }
  ]);
