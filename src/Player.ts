class Player {

    private canvas: HTMLCanvasElement;

    private leftLane: number;
    private middleLane: number;
    private rightLane: number;

    private keyListener: KeyListener;

    private image: HTMLImageElement;
    private positionX: number;

    public constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        this.leftLane = this.canvas.width / 4;
        this.middleLane = this.canvas.width / 2;
        this.rightLane = this.canvas.width / 4 * 3;

        this.keyListener = new KeyListener();

        this.image = this.loadNewImage("./assets/img/players/character_robot_walk0.png");
        this.positionX = this.canvas.width / 2;
    }

    public move() {
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

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(
            this.image,
            // Center the image in the lane with the x coordinates
            this.positionX - this.image.width / 2,
            this.canvas.height - 150
        );
    }

    /**
     * Collision detection of gold trophy and player
     * Use bounding box detection method: https://computersciencewiki.org/index.php/Bounding_boxes
     */
    public collidesWithGoldTrophy(goldTrophy: GoldTrophy): boolean {
        if (this.positionX < goldTrophy.getPositionX() + goldTrophy.getImageWidth()
            && this.positionX + this.image.width > goldTrophy.getPositionX()
            && this.canvas.height - 150 < goldTrophy.getPositionY() + goldTrophy.getImageHeight()
            && this.canvas.height - 150 + this.image.height > goldTrophy.getPositionY()
        ) {
            return true;
        }

        return false;
    }

    /**
     * Collision detection of silver trophy and player
     * Use bounding box detection method: https://computersciencewiki.org/index.php/Bounding_boxes
     */
    public collidesWithSilverTrophy(silverTrophy: SilverTrophy): boolean {
        if (this.positionX < silverTrophy.getPositionX() + silverTrophy.getImageWidth()
            && this.positionX + this.image.width > silverTrophy.getPositionX()
            && this.canvas.height - 150 < silverTrophy.getPositionY() + silverTrophy.getImageHeight()
            && this.canvas.height - 150 + this.image.height > silverTrophy.getPositionY()
        ) {
            return true;
        }

        return false;
    }

    /**
     * Collision detection of red cross and player
     * Use bounding box detection method: https://computersciencewiki.org/index.php/Bounding_boxes
     */
    public collidesWithRedCross(redCross: RedCross): boolean {
        if (this.positionX < redCross.getPositionX() + redCross.getImageWidth()
            && this.positionX + this.image.width > redCross.getPositionX()
            && this.canvas.height - 150 < redCross.getPositionY() + redCross.getImageHeight()
            && this.canvas.height - 150 + this.image.height > redCross.getPositionY()
        ) {
            return true;
        }

        return false;
    }

    /**
     * Collision detection of lightning bolt and player
     * Use bounding box detection method: https://computersciencewiki.org/index.php/Bounding_boxes
     */
    public collidesWithLightningBolt(lightningBolt: LightningBolt): boolean {
        if (this.positionX < lightningBolt.getPositionX() + lightningBolt.getImageWidth()
            && this.positionX + this.image.width > lightningBolt.getPositionX()
            && this.canvas.height - 150 < lightningBolt.getPositionY() + lightningBolt.getImageHeight()
            && this.canvas.height - 150 + this.image.height > lightningBolt.getPositionY()
        ) {
            return true;
        }

        return false;
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
}
