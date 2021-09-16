const { Obstacle } = require('./objects.js');
const objects = require('./objects.js');
let Agent = objects.Agent;
let GridObject = objects.GridObject;

class Location {
    constructor(c, r) {
        this.c = c;
        this.r = r;
    }

    distance = function (other) {
        return Math.abs(this.c - other.c) + Math.abs(this.r - other.r);
    }

    next = function (dir) {
        switch (dir) {
            case 0:
                return new Location(this.c, this.r - 1);
            case 1:
                return new Location(this.c, this.r + 1);
            case 2:
                return new Location(this.c - 1, this.r);
            case 3:
                return new Location(this.c + 1, this.r);

            default:
                break;
        }
    }

    equal = function(other) {
        return this.c == other.c && this.r == other.r;
    }
}

Location.prototype.toString = function() {
    return `(${this.c}, ${this.r})`;
}

class Grid {
    constructor(cols, rows) {
        this.COLS = cols;
        this.ROWS = rows;
        const numAgents = 6;
        const numObjects = 20;
        this.agents = [];
        this.tiles = [];
        this.holes = [];
        this.objects = Array.from(Array(COLS), () => new Array(ROWS));
        for (var i = 1; i <= numAgents; i++) {
            let l = this.randomFreeLocation();
            var a = new Agent(i, l);
            this.agents.push(a);
            this.objects[l.c][l.r] = a;
        }
        for (var i = 0; i < numObjects; i++) {
            let l = this.randomFreeLocation();
            let score = this.randomNbr(6) + 1;
            var a = new Tile(i, l, score);
            this.tiles.push(a);
            this.objects[l.c][l.r] = a;
        }
        for (var i = 0; i < numObjects; i++) {
            let l = this.randomFreeLocation();
            var a = new Hole(i, l);
            this.holes.push(a);
            this.objects[l.c][l.r] = a;
        }
        for (var i = 0; i < numObjects; i++) {
            let l = this.randomFreeLocation();
            var a = new Obstacle(i, l);
            this.objects[l.c][l.r] = a;
        }
    }

    object = function (location) {
        return this.objects[location.c][location.r];
    }

    randomFreeLocation = function () {
        var c = this.randomNbr(this.COLS);
        var r = this.randomNbr(this.ROWS);
        var l = new Location(c, r);
        while (!this.isValid(l)) {
            c = this.randomNbr(this.COLS);
            r = this.randomNbr(this.ROWS);
            l = new Location(c, r);
        }
        return l;
    }

    randomNbr = function (max) {
        return Math.floor(Math.random() * max);
    }

    update = function () {
        this.agents.forEach(a => {
            a.update(this);
        });
    }

    isValid = function(location) {
        const c = location.c;
        const r = location.r;
        return c >= 0 && c < this.COLS 
            && r >= 0 && r < this.ROWS 
            && (typeof this.objects[location.c][location.r] === 'undefined' || this.objects[location.c][location.r] === null);
    }

    closestTile = function(loc) {
        var minDist = 10000000;
        var best = null;
        this.tiles.forEach(t => {
            const d = t.location.distance(loc);
            if (d < minDist) {
                minDist = d;
                best = t;
            }
        });
        return best;
    }

    closestHole = function(loc) {
        var minDist = 10000000;
        var best = null;
        this.holes.forEach(t => {
            const d = t.location.distance(loc);
            if (d < minDist) {
                minDist = d;
                best = t;
            }
        });
        return best;
    }

    removeTile = function(agent, tile) {
        this.objects[tile.location.c][tile.location.r] = agent;
        tile.location = this.randomFreeLocation();
        this.objects[tile.location.c][tile.location.r] = tile;
    }

    removeHole = function(agent, hole) {
        this.objects[hole.location.c][hole.location.r] = agent;
        hole.location = this.randomFreeLocation();
        this.objects[hole.location.c][hole.location.r] = hole;
    }

}

module.exports = {
    Grid: Grid,
    Location: Location,
}
