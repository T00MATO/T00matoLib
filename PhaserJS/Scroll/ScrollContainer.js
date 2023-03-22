import { ScrollBar } from './ScrollBar';
import { ScrollInteract } from './ScrollInteract';

export class ScrollContainer extends Phaser.GameObjects.Container
{
    /** @type {Phaser.GameObjects.RenderTexture} */
    #renderer;
    /** @type {Phaser.GameObjects.Container} */
    #renderContainer;
    /** @type {Phaser.GameObjects.Container} */
    #interactContainer;

    #isScrolling = false;
    #scrollToward = "none";
    #wheelSensitiviy = 0;
    #scrollBar = null;

    minScroll = 0;
    maxScroll = 0;
    scrollPosition = 0;

    get renderer()
    {
        return this.#renderer;
    }

    get isScrolling()
    {
        return this.#isScrolling;
    }

    get scrollToward()
    {
        return this.#scrollToward;
    }

    get wheelSensitivity()
    {
        return this.#wheelSensitiviy;
    }

    get rendererWidth()
    {
        return this.#renderer.width;
    }

    get rendererHeight()
    {
        return this.#renderer.height;
    }

    get scrollLength()
    {
        return this.maxScroll - this.minScroll;
    }

    get worldPosition()
    {
        let transform = this.getWorldTransformMatrix();
        let matrix = transform.decomposeMatrix();
        return { x: matrix.translateX, y: matrix.translateY }
    }

    set rendererWidth(value)
    {
        this.#renderer.width = value;
        this.#renderer.resize(this.#renderer.width, this.#renderer.height);
    }

    set rendererHeight(value)
    {
        this.#renderer.height = value;
        this.#renderer.resize(this.#renderer.width, this.#renderer.height);
    }

    constructor(scene, { x, y, width, height, scrollToward, minScroll, maxScroll, wheelSensitivity })
    {
        super(scene, x, y);
        this.scene.add.existing(this);

        switch (scrollToward)
        {
            case "horizontal":
            case "vertical":
                this.#scrollToward = scrollToward;
                break;
            default:
                throw new Error("ScrollContainer error.");
        }

        this.minScroll = minScroll;
        this.maxScroll = maxScroll;
        this.#wheelSensitiviy = wheelSensitivity;

        const renderer = this.scene.add.renderTexture(0, 0, width, height);
        renderer.setInteractive();
        renderer.on("pointerdown", this.#scrollStart.bind(this));
        this.scene.input.on("pointermove", this.#scrolling.bind(this));
        this.scene.input.on("gameout", this.#scrollEnd.bind(this));
        document.addEventListener("mouseout", this.#scrollEnd.bind(this));
        renderer.on("wheel", this.#scrollWheel.bind(this));
        this.scene.input.on("pointerup", (pointer) =>
        {
            let clickEnable = pointer.getDistance() == 0;
            this.#interacted(pointer, clickEnable);
            this.#scrollEnd();
        });
        this.add(renderer);

        const renderContainer = this.scene.add.container(0, 0);
        renderContainer.setVisible(false);
        this.add(renderContainer);

        const interactContainer = this.scene.add.container(0, 0);
        this.add(interactContainer);

        this.#renderer = renderer;
        this.#renderContainer = renderContainer;
        this.#interactContainer = interactContainer;
    }

    destroy()
    {
        if (this.scene)
        {
            this.scene.input.off("pointermove", this.#scrolling.bind(this));
            this.scene.input.off("pointerup", this.#scrollEnd.bind(this));
            this.scene.input.off("gameout", this.#scrollEnd.bind(this));
        }

        if (this.#scrollBar)
        {
            this.#scrollBar.destroy();
        }

        document.removeEventListener("mouseout", this.#scrollEnd.bind(this));

        super.destroy();
    }

    addContent(object)
    {
        this.#renderContainer.add(object);
    }

    removeContent(object, destroyObject)
    {
        this.#renderContainer.remove(object, destroyObject);
    }

    removeAllContent(destroyObject)
    {
        this.#renderContainer.removeAll(destroyObject);
    }

    addInteract(x, y, width, height)
    {
        const interact = new ScrollInteract(this.scene, this, { x, y, width, height });
        interact.setInteractive();
        interact.on("pointerdown", this.#scrollStart.bind(this));
        interact.on("pointermove", this.#scrolling.bind(this));
        interact.on("wheel", this.#scrollWheel.bind(this));
        this.#interactContainer.add(interact);

        return interact;
    }

    createScrollBar({ x, y, breadth, length, background, scrollButton, upButton, downButton })
    {
        if (this.#scrollBar)
        {
            throw new Error("ScrollContainer error.");
        }

        const scrollBar = new ScrollBar(this.scene, { scroll: this, x, y, breadth, length, background, scrollButton, upButton, downButton })
        this.#scrollBar = scrollBar;

        return scrollBar;
    }

    removeInteract(interact, destroyInteract)
    {
        this.#interactContainer.remove(interact, destroyInteract);
    }

    removeAllInteract(destroyInteract)
    {
        this.#interactContainer.removeAll(destroyInteract);
    }

    setContentVisible(flag)
    {
        this.#renderer.setVisible(flag);
    }

    updateDisplay()
    {
        this.#renderer.clear();
        this.#renderer.drawFrame()
        switch (this.#scrollToward)
        {
            case "horizontal":
                if (this.#renderContainer.list.length > 0)
                    this.#renderer.draw(this.#renderContainer, this.scrollPosition, 0);
                this.#interactContainer.setPosition(this.scrollPosition, 0);
                break;
            case "vertical":
                if (this.#renderContainer.list.length > 0)
                    this.#renderer.draw(this.#renderContainer, 0, this.scrollPosition);
                this.#interactContainer.setPosition(0, this.scrollPosition);
                break;
        }

        this.#scrollBar?.updateDisplay();
    }

    #scrollStart()
    {
        this.#isScrolling = true;
    }

    #scrolling(pointer)
    {
        if (!this.#isScrolling)
            return;

        let scrolledRange;
        switch (this.#scrollToward)
        {
            case "horizontal":
                scrolledRange = pointer.x - pointer.prevPosition.x;
                break;
            case "vertical":
                scrolledRange = pointer.y - pointer.prevPosition.y;
                break;
        }

        let scrolledPosition = this.scrollPosition + scrolledRange;
        this.scrollPosition = Math.max(Math.min(scrolledPosition, this.maxScroll), this.minScroll);

        this.updateDisplay();
    }

    #scrollEnd()
    {
        this.#isScrolling = false;
    }

    #interacted(pointer, clickEnable)
    {
        if (!this.#isScrolling)
            return;

        this.#interactContainer.list.forEach(interact =>
        {
            interact.invokeClickEvent(pointer, clickEnable);
        });
    }

    #scrollWheel(pointer)
    {
        if (this.#isScrolling)
            return;

        let scrolledRange = pointer.deltaY * this.#wheelSensitiviy;
        let scrolledPosition = this.scrollPosition - scrolledRange;
        this.scrollPosition = Math.max(Math.min(scrolledPosition, this.maxScroll), this.minScroll);

        this.updateDisplay();
    }
}