class GridObject {
    constructor(num, x, y) {
        this.num = num;
        this.x = x;
        this.y = y;
    }
}

class Agent extends GridObject {
    constructor(num, x, y) {
        super(num, x, y);
        this.score = 0;
        this.tile = null;
        this.hole = null;
        this.hasTile = false;
    }

    update = function(grid) {
        let { c, r } = grid.randomFreeLocation();
        grid.objects[this.x][this.y] = undefined;
        grid.objects[c][r] = this;
        this.x = c;
        this.y = r;
    }

}
Agent.prototype.toString = function() {
    return `Agent ${this.num}@(${this.x}, ${this.y}) tile=${this.tile}, hole=${this.hole}`;
}

class Tile extends GridObject {
    constructor(num, x, y, score) {
        super(num, x, y);
        this.score = score;
    }
}

class Hole extends GridObject {
    constructor(num, x, y) {
        super(num, x, y);
    }
}

class Obstacle extends GridObject {
    constructor(num, x, y) {
        super(num, x, y);
    }
}

module.exports = {
    Agent: Agent,
    GridObject: GridObject,
    Tile: Tile,
    Hole: Hole,
    Obstacle: Obstacle,
}