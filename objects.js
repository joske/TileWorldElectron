const astar = require('./astar.js');
class GridObject {
    constructor(num, location) {
        this.num = num;
        this.location = location;
    }
}

const State = {
    Idle: 0,
    MoveToTile: 1,
    MoveToHole: 2,
}

class Agent extends GridObject {
    constructor(num, location) {
        super(num, location);
        this.score = 0;
        this.tile = null;
        this.hole = null;
        this.hasTile = false;
        this.state = State.Idle;
    }

    update = function(grid) {
        if (this.state === State.Idle) {
            this.idle(grid);
        } else if (this.state === State.MoveToTile) {
            this.moveToTile(grid);            
        } else if (this.state === State.MoveToHole) {
            this.moveToHole(grid);
        }

    }
    
    move = function(grid, nextLoc) {
        delete grid.objects[this.location.c][this.location.r];
        grid.objects[nextLoc.c][nextLoc.r] = this;
        this.location = nextLoc;
    }

    idle = function(grid) {
        this.tile = null;
        this.hole = null;
        this.hasTile = false;
        this.tile = grid.closestTile(this.location);
        this.state = State.MoveToTile;
    }
    
    moveToTile = function(grid) {
        console.log(`${this} moveToTile`);
        if (this.tile.location.equal(this.location)) {
            //arrived
            this.pickTile(grid);
            return;
        }
        if (this.tile !== grid.objects[this.tile.location.c][this.tile.location.r]) {
            // tile is gone
            this.tile = grid.closestTile(this.location);
            return;
        }
        var path = astar(grid, this.location, this.tile.location);
        console.log(`got path: ${path}`);
        if (path && path.length > 0) {
            const nextLoc = path.shift();
            this.move(grid, nextLoc);
        }
    }

    moveToHole = function(grid) {
        console.log(`${this} moveToTile`);
        if (this.hole.location.equal(this.location)) {
            //arrived
            this.dumpTile(grid);
            return;
        }
        if (this.hole !== grid.objects[this.hole.location.c][this.hole.location.r]) {
            // tile is gone
            this.hole = grid.closestHole(this.location);
            return;
        }
        var path = astar(grid, this.location, this.hole.location);
        if (path && path.length > 0) {
            const nextLoc = path.shift();
            this.move(grid, nextLoc);
        }
    }

    pickTile = function(grid) {
        this.hasTile = true;
        this.hole = grid.closestHole(this.location);
        this.state = State.MoveToHole;
        grid.removeTile(this, this.tile);
    }

    dumpTile = function(grid) {
        grid.removeHole(this, this.hole);
        this.score += this.tile.score;
        this.hasTile = false;
        this.tile = grid.closestTile(this.location);
        this.hole = null;
        this.state = State.MoveToTile;
    }

}
Agent.prototype.toString = function() {
    return `Agent ${this.num}@${this.location}) tile=${this.tile}, hole=${this.hole}`;
}

class Tile extends GridObject {
    constructor(num, location, score) {
        super(num, location);
        this.score = score;
    }
}

Tile.prototype.toString = function() {
    return `Tile ${this.num}@${this.location}) score=${this.score}`;
}
class Hole extends GridObject {
    constructor(num, location) {
        super(num, location);
    }
}

Hole.prototype.toString = function() {
    return `Hole ${this.num}@${this.location})`;
}
class Obstacle extends GridObject {
    constructor(num, location) {
        super(num, location);
    }
}

module.exports = {
    Agent: Agent,
    GridObject: GridObject,
    Tile: Tile,
    Hole: Hole,
    Obstacle: Obstacle,
}