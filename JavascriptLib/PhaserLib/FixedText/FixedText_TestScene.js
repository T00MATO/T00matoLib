import FixedText from 'FixedText'

export default class FixedText_TestScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TestScene' })
    }

    create() {
        const rect0 = this.add.rectangle(200, 100, 100, 80);
        rect0.setOrigin(0.5, 0.5);
        rect0.setStrokeStyle(2, 0xff0000, 1);

        const text0 = new FixedText(this, {
            x: rect0.x,
            y: rect0.y,
            width: rect0.width,
            height: rect0.height,
            text: "This is test comment",
            style: {
                color: "#000000",
                fontSize: '24px',
            }
        });
        text0.setOrigin(0.5, 0.5);

        const rect1 = this.add.rectangle(200, 200, 200, 80);
        rect1.setOrigin(0.5, 0.5);
        rect1.setStrokeStyle(2, 0xff0000, 1);

        const text1 = new FixedText(this, {
            x: rect1.x,
            y: rect1.y,
            width: rect1.width,
            height: rect1.height,
            text: "This is test comment",
            style: {
                color: "#000000",
                fontSize: '24px',
            }
        });
        text1.setOrigin(0.5, 0.5);

        const rect2 = this.add.rectangle(200, 300, 300, 80);
        rect2.setOrigin(0.5, 0.5);
        rect2.setStrokeStyle(2, 0xff0000, 1);

        const text2 = new FixedText(this, {
            x: rect2.x,
            y: rect2.y,
            width: rect2.width,
            height: rect2.height,
            text: "This is test comment",
            style: {
                color: "#000000",
                fontSize: '24px',
            }
        });
        text2.setOrigin(0.5, 0.5);
    }

    update() {
        
    }
}
