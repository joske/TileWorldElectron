const gridModule = require('./grid.js');
const objects = require('./objects.js');
let Agent = objects.Agent;
let GridObject = objects.GridObject;
let Tile = objects.Tile;
let Hole = objects.Hole;

const MAG = 20;
const COLS = 10;
const ROWS = 10;

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
                var o = this.grid.object(c, r);
                const x = c * MAG;
                const y = r * MAG;
                this.ctx.fillStyle = 'rgb(0, 0, 0)';
                this.ctx.fillStyle = 'rgb(0, 0, 0)';
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
                    this.ctx.arc(x + MAG / 2, y + MAG / 2, MAG / 2, 0, 2 * Math.PI, false);
                    this.ctx.stroke();
                    this.ctx.strokeText(o.score, x + MAG / 2, y + MAG / 2);
                } else if (o instanceof Hole) {
                    this.ctx.beginPath();
                    this.ctx.arc(x + MAG / 2, y + MAG / 2, MAG / 2, 0, 2 * Math.PI, false);
                    this.ctx.fill();
                } else if (o instanceof Agent) {
                    this.ctx.beginPath();
                    this.ctx.fillRect(x, y, MAG, MAG);
                    this.ctx.fill();
                }
            }
        }
        let x = COLS * MAG + 50;
        let y = 20;
        this.grid.agents.forEach(a =>  {
            this.ctx.beginPath();
            this.ctx.strokeStyle = this.getRGB(a.num);
            this.ctx.strokeText(`Agent ${a.num}: a.score`, x, y + a.num * MAG);
        });
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'rgb(1, 0, 0)';
        this.ctx.strokeRect(0, 0, COLS * MAG, ROWS * MAG);
        this.ctx.stroke();
    }

    getRGB = function (i) {
        switch (i) {
            case 0:
                return 'rgb(0, 0, 1)'
                break;

            case 1:
                return 'rgb(0, 1, 0)'
                break;

            case 2:
                return 'rgb(1, 0, 0)'
                break;

            case 3:
                return 'rgb(0, 1, 1)'
                break;

            case 4:
                return 'rgb(1, 0, 1)'
                break;

            case 5:
                return 'rgb(1, 1, 0)'
                break;

            default:
                return 'rgb(0.5, 0.5, 0)'
                break;
        }
    }
}

const renderer = new Renderer();
setInterval(renderer.update, 1000);