import { ScrollContainer } from './ScrollContainer';

export class ScrollInteract extends Phaser.GameObjects.Rectangle
{
    /** @type {ScrollContainer} */
    #scroll;

    #clicked = false;

    onclick = function(pointer) {};

    constructor(scene, scroll, { x, y, width, height })
    {
        super(scene, x, y, width, height);
        this.#scroll = scroll;
        this.scene.add.existing(this);
        this.setOrigin(0, 0);

        this.on("pointerdown", () => {
            this.#clicked = true;
        });
    }

    on(event, func)
    {
        super.on(event, (pointer) => {
            let localX = pointer.x - this.#scroll.worldPosition.x;
            if (localX < 0 || localX > this.#scroll.renderer.width)
                return;
            
            let localY = pointer.y - this.#scroll.worldPosition.y;
            if (localY < 0 || localY > this.#scroll.renderer.height)
                return;

            func(pointer);
        });

        return this;
    }

    invokeClickEvent(pointer, clickEnable)
    {
        if (this.#clicked)
        {
            this.#clicked = false;
            if (clickEnable)
            {
                this.onclick(pointer);
            }
        }
    }
}