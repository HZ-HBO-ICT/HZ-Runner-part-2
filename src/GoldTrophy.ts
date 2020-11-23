class GoldTrophy {

    private canvas: HTMLCanvasElement;

    private leftLane: number;
    private middleLane: number;
    private rightLane: number;

    private image: HTMLImageElement;
    private positionX: number;
    private positionY: number;
    private speed: number;

    private points: number;

    public constructor(canvas: HTMLCanvasElement) {
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

    public move() {
        this.positionY += this.speed;
    }

    /**
     * Render the objects
     * @param ctx The CanvasRenderingContext2D of the canvas to draw on
     */
    public draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(
            this.image,
            // Center the image in the lane with the x coordinates
            this.positionX - this.image.width / 2,
            this.positionY
        );
    }

    public collidesWithCanvasBottom(): boolean {
        if (this.positionY + this.image.height > this.canvas.height) {
            return true;
        }

        return false;
    }

    public getPositionX(): number {
        return this.positionX;
    }

    public getPositionY(): number {
        return this.positionY;
    }

    public getImageWidth(): number {
        return this.image.width;
    }

    public getImageHeight(): number {
        return this.image.height;
    }

    public getPoints(): number {
        return this.points;
    }

    /**
    * Loads an image in such a way that the screen doesn't constantly flicker
    * @param {HTMLImageElement} source
    * @return HTMLImageElement - returns an image
    */
    private loadNewImage(source: string): HTMLImageElement {
        const img = new Image();
        img.src = source;
        return img;
    }

    /**
    * Generates a random integer number between min and max
    *
    * @param {number} min - minimal time
    * @param {number} max - maximal time
    */
    private randomInteger(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }
}
