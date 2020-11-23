class Game {
    constructor(canvas) {
        this.step = () => {
            this.player.move();
            if (this.goldTrophy !== null) {
                this.goldTrophy.move();
                if (this.player.collidesWithGoldTrophy(this.goldTrophy)) {
                    this.totalScore += this.goldTrophy.getPoints();
                    this.createRandomScoringObject();
                }
                else if (this.goldTrophy.collidesWithCanvasBottom()) {
                    this.createRandomScoringObject();
                }
            }
            if (this.silverTrophy !== null) {
                this.silverTrophy.move();
                if (this.player.collidesWithSilverTrophy(this.silverTrophy)) {
                    this.totalScore += this.silverTrophy.getPoints();
                    this.createRandomScoringObject();
                }
                else if (this.silverTrophy.collidesWithCanvasBottom()) {
                    this.createRandomScoringObject();
                }
            }
            if (this.redCross !== null) {
                this.redCross.move();
                if (this.player.collidesWithRedCross(this.redCross)) {
                    this.totalScore += this.redCross.getPoints();
                    this.createRandomScoringObject();
                }
                else if (this.redCross.collidesWithCanvasBottom()) {
                    this.createRandomScoringObject();
                }
            }
            if (this.lightningBolt !== null) {
                this.lightningBolt.move();
                if (this.player.collidesWithLightningBolt(this.lightningBolt)) {
                    this.totalScore += this.lightningBolt.getPoints();
                    this.createRandomScoringObject();
                }
                else if (this.lightningBolt.collidesWithCanvasBottom()) {
                    this.createRandomScoringObject();
                }
            }
            this.draw();
            requestAnimationFrame(this.step);
        };
        this.canvas = canvas;
        this.canvas.width = window.innerWidth / 3;
        this.canvas.height = window.innerHeight;
        this.createRandomScoringObject();
        this.player = new Player(this.canvas);
        this.totalScore = 0;
        console.log('start animation');
        requestAnimationFrame(this.step);
    }
    draw() {
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.writeTextToCanvas(ctx, "UP arrow = middle | LEFT arrow = left | RIGHT arrow = right", this.canvas.width / 2, 40, 14);
        this.drawScore(ctx);
        this.player.draw(ctx);
        if (this.goldTrophy !== null) {
            this.goldTrophy.draw(ctx);
        }
        else if (this.silverTrophy !== null) {
            this.silverTrophy.draw(ctx);
        }
        else if (this.redCross !== null) {
            this.redCross.draw(ctx);
        }
        else if (this.lightningBolt !== null) {
            this.lightningBolt.draw(ctx);
        }
    }
    drawScore(ctx) {
        this.writeTextToCanvas(ctx, `Score: ${this.totalScore}`, this.canvas.width / 2, 80, 16);
    }
    createRandomScoringObject() {
        this.goldTrophy = null;
        this.silverTrophy = null;
        this.redCross = null;
        this.lightningBolt = null;
        const random = this.randomInteger(1, 4);
        if (random === 1) {
            this.goldTrophy = new GoldTrophy(this.canvas);
        }
        if (random === 2) {
            this.silverTrophy = new SilverTrophy(this.canvas);
        }
        if (random === 3) {
            this.redCross = new RedCross(this.canvas);
        }
        if (random === 4) {
            this.lightningBolt = new LightningBolt(this.canvas);
        }
    }
    writeTextToCanvas(ctx, text, xCoordinate, yCoordinate, fontSize = 20, color = "red", alignment = "center") {
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
    randomInteger(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
class GoldTrophy {
    constructor(canvas) {
        this.canvas = canvas;
        this.leftLane = this.canvas.width / 4;
        this.middleLane = this.canvas.width / 2;
        this.rightLane = this.canvas.width / 4 * 3;
        const random = this.randomInteger(1, 3);
        if (random === 1) {
            this.positionX = this.leftLane;
        }
        if (random === 2) {
            this.positionX = this.middleLane;
        }
        if (random === 3) {
            this.positionX = this.rightLane;
        }
        this.image = this.loadNewImage("assets/img/objects/gold_trophy.png");
        this.positionY = 60;
        this.speed = 5;
        this.points = 10;
    }
    move() {
        this.positionY += this.speed;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.positionX - this.image.width / 2, this.positionY);
    }
    collidesWithCanvasBottom() {
        if (this.positionY + this.image.height > this.canvas.height) {
            return true;
        }
        return false;
    }
    getPositionX() {
        return this.positionX;
    }
    getPositionY() {
        return this.positionY;
    }
    getImageWidth() {
        return this.image.width;
    }
    getImageHeight() {
        return this.image.height;
    }
    getPoints() {
        return this.points;
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
    randomInteger(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
class KeyListener {
    constructor() {
        this.keyCodeStates = new Array();
        this.keyCodeTyped = new Array();
        this.previousState = new Array();
        window.addEventListener("keydown", (ev) => {
            this.keyCodeStates[ev.keyCode] = true;
        });
        window.addEventListener("keyup", (ev) => {
            this.keyCodeStates[ev.keyCode] = false;
        });
    }
    onFrameStart() {
        this.keyCodeTyped = new Array();
        this.keyCodeStates.forEach((val, key) => {
            if (this.previousState[key] != val && !this.keyCodeStates[key]) {
                this.keyCodeTyped[key] = true;
                this.previousState[key] = val;
            }
        });
    }
    isKeyDown(keyCode) {
        return this.keyCodeStates[keyCode] == true;
    }
    isKeyTyped(keyCode) {
        return this.keyCodeTyped[keyCode] == true;
    }
}
KeyListener.KEY_ENTER = 13;
KeyListener.KEY_SHIFT = 16;
KeyListener.KEY_CTRL = 17;
KeyListener.KEY_ALT = 18;
KeyListener.KEY_ESC = 27;
KeyListener.KEY_SPACE = 32;
KeyListener.KEY_LEFT = 37;
KeyListener.KEY_UP = 38;
KeyListener.KEY_RIGHT = 39;
KeyListener.KEY_DOWN = 40;
KeyListener.KEY_DEL = 46;
KeyListener.KEY_1 = 49;
KeyListener.KEY_2 = 50;
KeyListener.KEY_3 = 51;
KeyListener.KEY_4 = 52;
KeyListener.KEY_5 = 53;
KeyListener.KEY_6 = 54;
KeyListener.KEY_7 = 55;
KeyListener.KEY_8 = 56;
KeyListener.KEY_9 = 57;
KeyListener.KEY_0 = 58;
KeyListener.KEY_A = 65;
KeyListener.KEY_B = 66;
KeyListener.KEY_C = 67;
KeyListener.KEY_D = 68;
KeyListener.KEY_E = 69;
KeyListener.KEY_F = 70;
KeyListener.KEY_G = 71;
KeyListener.KEY_H = 72;
KeyListener.KEY_I = 73;
KeyListener.KEY_J = 74;
KeyListener.KEY_K = 75;
KeyListener.KEY_L = 76;
KeyListener.KEY_M = 77;
KeyListener.KEY_N = 78;
KeyListener.KEY_O = 79;
KeyListener.KEY_P = 80;
KeyListener.KEY_Q = 81;
KeyListener.KEY_R = 82;
KeyListener.KEY_S = 83;
KeyListener.KEY_T = 84;
KeyListener.KEY_U = 85;
KeyListener.KEY_V = 86;
KeyListener.KEY_W = 87;
KeyListener.KEY_X = 88;
KeyListener.KEY_Y = 89;
KeyListener.KEY_Z = 90;
class LightningBolt {
    constructor(canvas) {
        this.canvas = canvas;
        this.leftLane = this.canvas.width / 4;
        this.middleLane = this.canvas.width / 2;
        this.rightLane = this.canvas.width / 4 * 3;
        const random = this.randomInteger(1, 3);
        if (random === 1) {
            this.positionX = this.leftLane;
        }
        if (random === 2) {
            this.positionX = this.middleLane;
        }
        if (random === 3) {
            this.positionX = this.rightLane;
        }
        this.image = this.loadNewImage("assets/img/objects/titled_yellow_power_icon.png");
        this.positionY = 60;
        this.speed = 5;
        this.points = -10;
    }
    move() {
        this.positionY += this.speed;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.positionX - this.image.width / 2, this.positionY);
    }
    collidesWithCanvasBottom() {
        if (this.positionY + this.image.height > this.canvas.height) {
            return true;
        }
        return false;
    }
    getPositionX() {
        return this.positionX;
    }
    getPositionY() {
        return this.positionY;
    }
    getImageWidth() {
        return this.image.width;
    }
    getImageHeight() {
        return this.image.height;
    }
    getPoints() {
        return this.points;
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
    randomInteger(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
class Player {
    constructor(canvas) {
        this.canvas = canvas;
        this.leftLane = this.canvas.width / 4;
        this.middleLane = this.canvas.width / 2;
        this.rightLane = this.canvas.width / 4 * 3;
        this.keyListener = new KeyListener();
        this.image = this.loadNewImage("./assets/img/players/character_robot_walk0.png");
        this.positionX = this.canvas.width / 2;
    }
    move() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT) && this.positionX !== this.leftLane) {
            this.positionX = this.leftLane;
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_UP) && this.positionX !== this.middleLane) {
            this.positionX = this.middleLane;
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT) && this.positionX !== this.rightLane) {
            this.positionX = this.rightLane;
        }
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.positionX - this.image.width / 2, this.canvas.height - 150);
    }
    collidesWithGoldTrophy(goldTrophy) {
        if (this.positionX < goldTrophy.getPositionX() + goldTrophy.getImageWidth()
            && this.positionX + this.image.width > goldTrophy.getPositionX()
            && this.canvas.height - 150 < goldTrophy.getPositionY() + goldTrophy.getImageHeight()
            && this.canvas.height - 150 + this.image.height > goldTrophy.getPositionY()) {
            return true;
        }
        return false;
    }
    collidesWithSilverTrophy(silverTrophy) {
        if (this.positionX < silverTrophy.getPositionX() + silverTrophy.getImageWidth()
            && this.positionX + this.image.width > silverTrophy.getPositionX()
            && this.canvas.height - 150 < silverTrophy.getPositionY() + silverTrophy.getImageHeight()
            && this.canvas.height - 150 + this.image.height > silverTrophy.getPositionY()) {
            return true;
        }
        return false;
    }
    collidesWithRedCross(redCross) {
        if (this.positionX < redCross.getPositionX() + redCross.getImageWidth()
            && this.positionX + this.image.width > redCross.getPositionX()
            && this.canvas.height - 150 < redCross.getPositionY() + redCross.getImageHeight()
            && this.canvas.height - 150 + this.image.height > redCross.getPositionY()) {
            return true;
        }
        return false;
    }
    collidesWithLightningBolt(lightningBolt) {
        if (this.positionX < lightningBolt.getPositionX() + lightningBolt.getImageWidth()
            && this.positionX + this.image.width > lightningBolt.getPositionX()
            && this.canvas.height - 150 < lightningBolt.getPositionY() + lightningBolt.getImageHeight()
            && this.canvas.height - 150 + this.image.height > lightningBolt.getPositionY()) {
            return true;
        }
        return false;
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
class RedCross {
    constructor(canvas) {
        this.canvas = canvas;
        this.leftLane = this.canvas.width / 4;
        this.middleLane = this.canvas.width / 2;
        this.rightLane = this.canvas.width / 4 * 3;
        const random = this.randomInteger(1, 3);
        if (random === 1) {
            this.positionX = this.leftLane;
        }
        if (random === 2) {
            this.positionX = this.middleLane;
        }
        if (random === 3) {
            this.positionX = this.rightLane;
        }
        this.image = this.loadNewImage("assets/img/objects/tilted_cross.png");
        this.positionY = 60;
        this.speed = 5;
        this.points = -5;
    }
    move() {
        this.positionY += this.speed;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.positionX - this.image.width / 2, this.positionY);
    }
    collidesWithCanvasBottom() {
        if (this.positionY + this.image.height > this.canvas.height) {
            return true;
        }
        return false;
    }
    getPositionX() {
        return this.positionX;
    }
    getPositionY() {
        return this.positionY;
    }
    getImageWidth() {
        return this.image.width;
    }
    getImageHeight() {
        return this.image.height;
    }
    getPoints() {
        return this.points;
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
    randomInteger(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
class SilverTrophy {
    constructor(canvas) {
        this.canvas = canvas;
        this.leftLane = this.canvas.width / 4;
        this.middleLane = this.canvas.width / 2;
        this.rightLane = this.canvas.width / 4 * 3;
        const random = this.randomInteger(1, 3);
        if (random === 1) {
            this.positionX = this.leftLane;
        }
        if (random === 2) {
            this.positionX = this.middleLane;
        }
        if (random === 3) {
            this.positionX = this.rightLane;
        }
        this.image = this.loadNewImage("assets/img/objects/silver_trophy.png");
        this.positionY = 60;
        this.speed = 5;
        this.points = 5;
    }
    move() {
        this.positionY += this.speed;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.positionX - this.image.width / 2, this.positionY);
    }
    collidesWithCanvasBottom() {
        if (this.positionY + this.image.height > this.canvas.height) {
            return true;
        }
        return false;
    }
    getPositionX() {
        return this.positionX;
    }
    getPositionY() {
        return this.positionY;
    }
    getImageWidth() {
        return this.image.width;
    }
    getImageHeight() {
        return this.image.height;
    }
    getPoints() {
        return this.points;
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
    randomInteger(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
console.log("Javascript is working!");
window.addEventListener('load', () => {
    console.log("Handling the Load event");
    const game = new Game(document.getElementById('canvas'));
});
//# sourceMappingURL=app.js.map