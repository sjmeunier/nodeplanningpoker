'use strict';

module.exports = Room;

function Room(name) {
    var self = this;

    self.name = name;
    self.cardsOpened = false;
    self.players = {};
    self.history = {};
    self.currentStory = '';
}

Room.prototype.addPlayer = function(player) {
    var self = this;
    self.players[player.name] = player;
};

Room.prototype.resetHistory = function() {
    var self = this;
    self.history = {};
}

Room.prototype.addStoryToHistory = function() {
    var self = this;

    if (self.currentStory == null || self.currentStory == '')
        return;

    var estimates = {};

    for (var key in self.players) {
        if (self.players.hasOwnProperty(key) && self.players[key].isObserver === false) {
            estimates[key] = {};
            estimates[key].name = self.players[key].name;
            estimates[key].estimate = self.players[key].currentEstimate;
        }
    }
    self.history[self.currentStory] = estimates;
}

Room.prototype.resetPlayerEstimates = function(player) {
    var self = this;
    for (var key in self.players) {
        if (self.players.hasOwnProperty(key) && self.players[key].isObserver === false) {
            self.players[key].currentEstimate = '';
        }
    }
};

Room.prototype.removePlayerByName = function(playerName) {
    var self = this;
    delete self.players[playerName];
};

Room.prototype.hideCards = function() {
    var self = this;
    self.cardsOpened = false;
};

Room.prototype.toggleCards = function() {
    var self = this;
    self.cardsOpened = !self.cardsOpened;
    if (self.cardsOpened)
        self.addStoryToHistory();
};

Room.prototype.getPlayers = function() {
    var self = this
    return self.players;
}