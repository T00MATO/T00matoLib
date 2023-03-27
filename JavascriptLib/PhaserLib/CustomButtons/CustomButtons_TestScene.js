import { RectButton, SpriteButton } from '../objects/CustomButtons'

export default class CustomButtons_TestScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TestScene' })
    }

    preload() {
        this.load.image('phaser-logo', 'assets/img/phaser-logo.png');
    }

    create() {
        const button0 = new SpriteButton(this, 200, 200, "phaser-logo", null, {
            pointerdown: () => {
                console.log("pointerdown");
            },
            pointerup: (pointer, localX, localY) => {
                console.log(localX, localY);
            },
        });

        const button1 = new RectButton(this, 400, 200, 80, 80, {
            pointerover: () => {
                button1.setAlpha(0.5);
            },
            pointerout: () => {
                button1.setAlpha(1);
            }
        });
        button1.setFillStyle(0xff0000, 1)
    }

    update() {
        
    }
}
