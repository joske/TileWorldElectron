const PriorityQueue = require("priority-q");

class Node {
    constructor(location, fscore) {
        this.location = location;
        this.fscore = fscore;
        this.path = [];
    }
}

nodeCompare = function (a, b) { return a.fscore - b.fscore };

astar = function (grid, from, to) {
    var openList = new PriorityQueue([], nodeCompare);
    var closedList = new Set();
    var fromNode = new Node(from, 0);
    openList.enqueue(fromNode);
    while (openList.length > 0) {
        var current = openList.dequeue();
        if (current.location.equal(to)) {
            return current.path;
        }
        closedList.add(current);
        checkNeighbor(grid, openList, closedList, current, 0, from, to);
        checkNeighbor(grid, openList, closedList, current, 1, from, to);
        checkNeighbor(grid, openList, closedList, current, 2, from, to);
        checkNeighbor(grid, openList, closedList, current, 3, from, to);
    }
    return [];
}

checkNeighbor = function (grid, openList, closedList, current, dir, from, to) {
    var nextLoc = current.location.next(dir);
    if (nextLoc.equal(to) || grid.isValid(nextLoc)) {
        var h = nextLoc.distance(to);
        var g = current.path.length + 1;
        var child = new Node(nextLoc, g + h);
        if (current.path.length > 0) {
            child.path.push(...current.path);
        }
        child.path.push(nextLoc);
        if (!closedList.has(child)) {
            var smaller = openList.filter(e => {
                e.location.c == child.location.c && e.location.r == child.location.r && e.fscore < child.fscore;
            });
            if (smaller.length == 0) {
                openList.enqueue(child);
            }
        }
    }
}

module.exports = astar;