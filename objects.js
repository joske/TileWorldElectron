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
    }
}

class Tile extends GridObject {
    constructor(num, x, y) {
        super(num, x, y);
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