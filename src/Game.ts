class Game {

    // The canvas
    private canvas: HTMLCanvasElement;

    // The player on the canvas
    private player: Player;

    // The objects on the canvas
    private goldTrophy: GoldTrophy;
    private silverTrophy: SilverTrophy;
    private redCross: RedCross;
    private lightningBolt: LightningBolt;

    // Score
    private totalScore: number;

    public constructor(canvas: HTMLElement) {
        this.canvas = <HTMLCanvasElement>canvas;

        // Resize the canvas so it looks more like a Runner game
        this.canvas.width = window.innerWidth / 3;
        this.canvas.height = window.innerHeight;

        // TODO create multiple objects over time
        this.createRandomScoringObject();

        // Set the player at the center
        this.player = new Player(this.canvas);

        // Score is zero at start
        this.totalScore = 0;

        // Start the animation
        console.log('start animation');
        requestAnimationFrame(this.step);
    }

    /**
     * This MUST be an arrow method in order to keep the `this` variable
     * working correctly. It will be overwritten by another object otherwise
     * caused by javascript scoping behaviour.
     */
    step = () => {
        this.player.move();

        // TODO this is ... sooo much code for so little
        if (this.goldTrophy !== null) {
            this.goldTrophy.move();

            if (this.player.collidesWithGoldTrophy(this.goldTrophy)) {
                this.totalScore += this.goldTrophy.getPoints();
                this.createRandomScoringObject();
            } else if (this.goldTrophy.collidesWithCanvasBottom()) {
                this.createRandomScoringObject();
            }
        }

        // Same but for silver trophies
        if (this.silverTrophy !== null) {
            this.silverTrophy.move();

            if (this.player.collidesWithSilverTrophy(this.silverTrophy)) {
                this.totalScore += this.silverTrophy.getPoints();
                this.createRandomScoringObject();
            } else if (this.silverTrophy.collidesWithCanvasBottom()) {
                this.createRandomScoringObject();
            }
        }

        // And red crosses
        if (this.redCross !== null) {
            this.redCross.move();

            if (this.player.collidesWithRedCross(this.redCross)) {
                this.totalScore += this.redCross.getPoints();
                this.createRandomScoringObject();
            } else if (this.redCross.collidesWithCanvasBottom()) {
                this.createRandomScoringObject();
            }
        }

        // There should be some way to solve this mess right
        if (this.lightningBolt !== null) {
            this.lightningBolt.move();

            if (this.player.collidesWithLightningBolt(this.lightningBolt)) {
                this.totalScore += this.lightningBolt.getPoints();
                this.createRandomScoringObject();
            } else if (this.lightningBolt.collidesWithCanvasBottom()) {
                this.createRandomScoringObject();
            }
        }

        this.draw();

        // Call this method again on the next animation frame
        // The user must hit F5 to reload the game
        requestAnimationFrame(this.step);
    }

    /**
     * Render the items on the canvas
     */
    private draw() {
        // Get the canvas rendering context
        const ctx = this.canvas.getContext('2d');
        // Clear the entire canvas
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.writeTextToCanvas(ctx, "UP arrow = middle | LEFT arrow = left | RIGHT arrow = right", this.canvas.width / 2, 40, 14);

        this.drawScore(ctx);

        this.player.draw(ctx);

        if (this.goldTrophy !== null) {
            this.goldTrophy.draw(ctx);
        } else if (this.silverTrophy !== null) {
            this.silverTrophy.draw(ctx);
        } else if (this.redCross !== null) {
            this.redCross.draw(ctx);
        } else if (this.lightningBolt !== null) {
            this.lightningBolt.draw(ctx);
        }
    }

    /**
     * Draw the score on a canvas
     * @param ctx
     */
    private drawScore(ctx: CanvasRenderingContext2D): void {
        this.writeTextToCanvas(ctx, `Score: ${this.totalScore}`, this.canvas.width / 2, 80, 16);
    }

    /**
     * Create a random scoring object and clear the other scoring objects by setting them to `null`.
     */
    private createRandomScoringObject(): void {
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

    /**
   * Writes text to the canvas
   * @param {string} text - Text to write
   * @param {number} fontSize - Font size in pixels
   * @param {number} xCoordinate - Horizontal coordinate in pixels
   * @param {number} yCoordinate - Vertical coordinate in pixels
   * @param {string} alignment - Where to align the text
   * @param {string} color - The color of the text
   */
    public writeTextToCanvas(
        ctx: CanvasRenderingContext2D,
        text: string,
        xCoordinate: number,
        yCoordinate: number,
        fontSize: number = 20,
        color: string = "red",
        alignment: CanvasTextAlign = "center"
    ) {
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
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
