const { Obstacle } = require('./objects.js');
const objects = require('./objects.js');
let Agent = objects.Agent;
let GridObject = objects.GridObject;

class Grid {
    constructor(cols, rows) {
        this.COLS = cols;
        this.ROWS = rows;
        const numAgents = 2;
        const numObjects = 5;
        this.agents = [];
        this.tiles = [];
        this.holes = [];
        this.objects = Array.from(Array(COLS), () => new Array(ROWS));
        for (var i = 0; i < numAgents; i++) {
            let { c, r } = this.randomFreeLocation();
            var a = new Agent(i, c, r);
            this.agents.push(a);
            this.objects[a.x][a.y] = a;
        }
        for (var i = 0; i < numObjects; i++) {
            let { c, r } = this.randomFreeLocation();
            let score = this.randomNbr(6) + 1;
            var a = new Tile(i, c, r, score);
            this.tiles.push(a);
            this.objects[a.x][a.y] = a;
        }
        for (var i = 0; i < numObjects; i++) {
            let { c, r } = this.randomFreeLocation();
            var a = new Hole(i, c, r);
            this.holes.push(a);
            this.objects[a.x][a.y] = a;
        }
        for (var i = 0; i < numObjects; i++) {
            let { c, r } = this.randomFreeLocation();
            var a = new Obstacle(i, c, r);
            this.objects[a.x][a.y] = a;
        }
    }

    object = function (c, r) {
        return this.objects[c][r];
    }

    randomFreeLocation = function () {
        var c = this.randomNbr(this.COLS);
        var r = this.randomNbr(this.ROWS);
        while (typeof this.objects[c][r] !== 'undefined') {
            c = this.randomNbr(this.COLS);
            r = this.randomNbr(this.ROWS);
        }
        return { c, r };
    }

    randomNbr = function (max) {
        return Math.floor(Math.random() * max);
    }

    update = function() {
        this.agents.forEach(a => {
            a.update(this);
        });
    }

}

module.exports = {
    Grid: Grid
}