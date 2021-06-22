const gridModule = require('./grid.js');
const { Obstacle } = require('./objects.js');
const objects = require('./objects.js');
let Agent = objects.Agent;
let GridObject = objects.GridObject;
let Tile = objects.Tile;
let Hole = objects.Hole;
let Location = gridModule.Location;

const MAG = 20;
const COLS = 40;
const ROWS = 40;

class Renderer {
    constructor() {
        this.grid = new gridModule.Grid(COLS, ROWS);
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.addBindings();
        this.addListeners();
        this.update();
    }

    addBindings() {
        this.update = this.update.bind(this);
    }

    addListeners() {
        window.addEventListener('resize', this.update);
    }

    update() {
        this.grid.update();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (var r = 0; r < ROWS; r++) {
            for (var c = 0; c < COLS; c++) {
                const l = new Location(c, r);
                var o = this.grid.object(l);
                const x = c * MAG;
                const y = r * MAG;
                if (o instanceof Agent) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = this.getRGB(o.num);
                    this.ctx.strokeRect(x, y, MAG, MAG);
                    if (o.hasTile) {
                        this.ctx.arc(x + MAG / 2, y + MAG / 2, MAG / 2, 0, 2 * Math.PI, false);
                        this.ctx.stroke();
                        this.ctx.strokeText(o.tile.score, x + MAG / 2, y + MAG / 2);
                    }
                } else if (o instanceof Tile) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = 'black';
                    this.ctx.arc(x + MAG / 2, y + MAG / 2, MAG / 2, 0, 2 * Math.PI, false);
                    this.ctx.stroke();
                    this.ctx.strokeText(o.score, x + MAG / 2, y + MAG / 2);
                } else if (o instanceof Hole) {
                    this.ctx.beginPath();
                    this.ctx.fillStyle = 'black';
                    this.ctx.arc(x + MAG / 2, y + MAG / 2, MAG / 2, 0, 2 * Math.PI, false);
                    this.ctx.fill();
                } else if (o instanceof Obstacle) {
                    this.ctx.beginPath();
                    this.ctx.fillStyle = 'black';
                    this.ctx.fillRect(x, y, MAG, MAG);
                    this.ctx.fill();
                }
            }
        }
        let x = COLS * MAG + 50;
        let y = 20;
        this.grid.agents.forEach(a => {
            this.ctx.beginPath();
            this.ctx.strokeStyle = this.getRGB(a.num);
            this.ctx.strokeText(`Agent ${a.num}: ${a.score}`, x, y + a.num * MAG);
        });
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'black';
        this.ctx.strokeRect(0, 0, COLS * MAG, ROWS * MAG);
        this.ctx.stroke();
    }

    getRGB = function (i) {
        switch (i) {
            case 1:
                return 'blue'
                break;

            case 2:
                return 'green'
                break;

            case 3:
                return 'red'
                break;

            case 4:
                return 'yellow'
                break;

            case 5:
                return 'purple'
                break;

            case 6:
                return 'cyan'
                break;

            default:
                return 'black'
                break;
        }
    }
}

const renderer = new Renderer();
setInterval(renderer.update, 1000);