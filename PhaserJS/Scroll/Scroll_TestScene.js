import { ScrollContainer } from '../objects/Scroll/ScrollContainer'

export default class Scroll_TestScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TestScene' })
    }

    create() {
        const background = this.add.rectangle(100, 100, 240, 300, 0xffff00, 0.5);
        background.setOrigin(0, 0);

        const scrollContainer = new ScrollContainer(this, {
            x: background.x,
            y: background.y,
            width: background.width,
            height: background.height,
            scrollToward: "vertical",
            minScroll: -background.height * 3,
            maxScroll: 0,
            wheelSensitivity: 0.5,
        });

        const scrollBarBg = this.add.rectangle(0, 0, 15, background.height).setFillStyle(0x0000ff, 0.5);
        const scrollBarButton = this.add.rectangle(0, 0, 15, background.height - 60).setFillStyle(0x0000ff, 1);
        const scrollBarUpButton = this.add.rectangle(0, 0, 15, 15).setFillStyle(0x00ff00, 1);
        const scrollBarDownButton = this.add.rectangle(0, 0, 15, 15).setFillStyle(0xff0000, 1);

        const scrollBar = scrollContainer.createScrollBar({
            x: background.x + background.width + 15,
            y: background.y,
            breadth: scrollBarBg.width,
            length: scrollBarBg.height,
            background: scrollBarBg,
            scrollButton: scrollBarButton,
            upButton: scrollBarUpButton,
            downButton: scrollBarDownButton,
        });

        for (var y = 0; y < 14; y++)
        {
            for (var x = 0; x < 3; x++)
            {
                let item = this.add.rectangle(10 + x * 80, 10 + y * 80, 60, 60);
                item.setOrigin(0, 0);
                item.setFillStyle(0xff00ff, 1);
                scrollContainer.addContent(item);

                let curx = x, cury = y;
                let itemInteract = scrollContainer.addInteract(item.x, item.y, item.width, item.height);
                itemInteract.onclick = () => {
                    console.log(`item(${curx}, ${cury}) clicked.`);
                };
            }
        }

        scrollContainer.updateDisplay();
    }

    update() {
        
    }
}
