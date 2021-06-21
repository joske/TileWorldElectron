const { Obstacle } = require('./objects.js');
const objects = require('./objects.js');
let Agent = objects.Agent;
let GridObject = objects.GridObject;

class Grid {
    constructor(cols, rows) {
        this.COLS = cols;
        this.ROWS = rows;
        const numAgents = 2;
        this.agents = new Array(numAgents);
        this.tiles = new Array(5);
        this.holes = new Array(5);
        this.objects = Array.from(Array(COLS), () => new Array(ROWS));
        for (var i = 0; i < numAgents; i++) {
            let {c, r} = this.randomFreeLocation();
            var a = new Agent(i, c, r);
            this.agents.push(a);
            this.objects[a.x][a.y] = a;
        }
        for (var i = 0; i < 5; i++) {
            let {c, r} = this.randomFreeLocation();
            var a = new Tile(i, c, r);
            this.tiles.push(a);
            this.objects[a.x][a.y] = a;
        }
        for (var i = 0; i < 5; i++) {
            let {c, r} = this.randomFreeLocation();
            var a = new Hole(i, c, r);
            this.holes.push(a);
            this.objects[a.x][a.y] = a;
        }
        for (var i = 0; i < 5; i++) {
            let {c, r} = this.randomFreeLocation();
            var a = new Obstacle(i, c, r);
            this.objects[a.x][a.y] = a;
        }
    }

    object = function(c, r) {
        return this.objects[c][r];
    }

    randomFreeLocation = function() {
        var c = Math.floor(Math.random() * this.COLS);
        var r = Math.floor(Math.random() * this.ROWS);
        while (typeof this.objects[c][r] !== 'undefined') {
            c = Math.floor(Math.random() * this.COLS);
            r = Math.floor(Math.random() * this.ROWS);
        }
        return {c, r};
    }
}

module.exports = {
    Grid: Grid
}