import { ScrollContainer } from './ScrollContainer';

export class ScrollBar extends Phaser.GameObjects.Container
{
    /** @type {ScrollContainer} */
    #scrollContainer;
    /** @type {Phaser.GameObjects.GameObject} */
    #background;
    /** @type {Phaser.GameObjects.GameObject} */
    #scrollButton;
    /** @type {Phaser.GameObjects.GameObject} */
    #upButton;
    /** @type {Phaser.GameObjects.GameObject} */
    #downButton;

    #scrollStartPoint = 0;
    #scrollEndPoint = 0;
    #isHorizontal = false;
    #isScrolling = false;
    #breadth = 0;

    get #buttonLength()
    {
        return this.#scrollEndPoint - this.#scrollStartPoint;
    }

    get #buttonX()
    {
        return this.#isHorizontal ? this.#scrollStartPoint : 0;
    }

    get #buttonY()
    {
        return !this.#isHorizontal ? this.#scrollStartPoint : 0;
    }

    get #buttonWidth()
    {
        return this.#scrollButton.displayWidth ?? this.#scrollButton.width;
    }

    get #buttonHeight()
    {
        return this.#scrollButton.displayHeight ?? this.#scrollButton.height;
    }

    get #buttonMaxWidth()
    {
        return this.#isHorizontal ? this.#buttonLength : this.#breadth;
    }

    get #buttonMaxHeight()
    {
        return !this.#isHorizontal ? this.#buttonLength : this.#breadth;
    }
    
    get #worldPosition()
    {
        let transform = this.getWorldTransformMatrix();
        let matrix = transform.decomposeMatrix();
        return { x: matrix.translateX, y: matrix.translateY }
    }

    constructor(scene, { scroll, x, y, breadth, length, background, scrollButton, upButton, downButton })
    {
        super(scene, x, y);
        this.scene.add.existing(this);

        this.#isHorizontal = scroll.scrollToward == "horizontal";
        this.#breadth = breadth;

        background.setOrigin(0, 0);
        background.on("pointerdown", (pointer) =>
        {
            this.#scrollStart();
            this.#scrolling(pointer);
        });
        this.scene.input.on("pointermove", this.#scrolling.bind(this));
        this.scene.input.on("gameout", this.#scrollEnd.bind(this));
        document.addEventListener("mouseout", this.#scrollEnd.bind(this));
        background.on("wheel", this.#scrollWheel.bind(this));
        this.scene.input.on("pointerup", this.#scrollEnd.bind(this));
        background.setInteractive();
        this.add(background);

        const size = {
            width: this.#isHorizontal ? length : breadth,
            height: !this.#isHorizontal ? length : breadth,
        }
        if (background.displayWidth != undefined && background.displayHeight != undefined)
        {
            background.displayWidth = size.width;
            background.displayHeight = size.height;
        }
        else
        {
            background.width = size.width;
            background.height = size.height;
        }

        this.#scrollStartPoint = 0;
        this.#scrollEndPoint = length;

        if (upButton != undefined)
        {
            upButton.setPosition(0, 0);
            upButton.setOrigin(0, 0);
            upButton.setInteractive();
            upButton.on("pointerdown", () => this.#addScroll(-300 * scroll.wheelSensitivity))
            this.add(upButton);

            const buttonSize = {
                width: upButton.displayWidth ?? upButton.width,
                height: upButton.displayHeight ?? upButton.height,
            }
            this.#scrollStartPoint += this.#isHorizontal ? buttonSize.width : buttonSize.height;
        }

        if (downButton != undefined)
        {
            const br = background.getBottomRight();
            downButton.setPosition(br.x - downButton.width, br.y - downButton.height);
            downButton.setOrigin(0, 0);
            downButton.setInteractive();
            downButton.on("pointerdown", () => this.#addScroll(300 * scroll.wheelSensitivity))
            this.add(downButton);

            const buttonSize = {
                width: downButton.displayWidth ?? downButton.width,
                height: downButton.displayHeight ?? downButton.height,
            }
            this.#scrollEndPoint -= this.#isHorizontal ? buttonSize.width : buttonSize.height;
        }

        if (scrollButton.top == undefined || scrollButton.middle == undefined || scrollButton.bottom == undefined)
        {
            scrollButton.setOrigin(0, 0);

            scrollButton.setPosition(this.#buttonX, this.#buttonY);

            if (scrollButton.displayWidth != undefined && scrollButton.displayHeight != undefined)
            {
                scrollButton.displayWidth = this.#buttonMaxWidth;
                scrollButton.displayHeight = this.#buttonMaxHeight;
            }
            else
            {
                scrollButton.width = this.#buttonMaxWidth;
                scrollButton.height = this.#buttonMaxHeight;
            }

            this.add(scrollButton);
            this.#scrollButton = scrollButton;
        }

        this.#scrollContainer = scroll;
        this.#background = background;
        this.#upButton = upButton;
        this.#downButton = downButton;
    }

    destroy()
    {
        if (this.scene)
        {
            this.scene.input.off("pointermove", this.#scrolling.bind(this));
            this.scene.input.off("pointerup", this.#scrollEnd.bind(this));
            this.scene.input.off("gameout", this.#scrollEnd.bind(this));
        }

        document.removeEventListener("mouseout", this.#scrollEnd.bind(this));

        super.destroy();
    }

    updateDisplay()
    {
        const scroll = this.#scrollContainer;

        const scrollLength = this.#isHorizontal ? scroll.rendererWidth : scroll.rendererHeight;
        const scrollTowardMaxLength = Math.max(scroll.scrollLength, 0);
        const scrollMaxLength = scrollLength + scrollTowardMaxLength;
        let buttonLengthPercent = scrollLength / scrollMaxLength;
        if (isNaN(buttonLengthPercent))
            buttonLengthPercent = 0;
        let buttonScrollPercent = scroll.scrollPosition / scrollTowardMaxLength;
        if (isNaN(buttonScrollPercent))
            buttonScrollPercent = 0;

        let currentLength = this.#buttonLength * buttonLengthPercent;
        let towardLength = this.#buttonLength - currentLength;
        if (this.#isHorizontal)
        {
            if (this.#scrollButton.displayWidth)
                this.#scrollButton.displayWidth = currentLength;
            else
                this.#scrollButton.width = currentLength;

            this.#scrollButton.x = this.#scrollStartPoint - towardLength * buttonScrollPercent;
        }
        else
        {

            if (this.#scrollButton.displayHeight)
                this.#scrollButton.displayHeight = currentLength;
            else
                this.#scrollButton.height = currentLength;

            this.#scrollButton.y = this.#scrollStartPoint - towardLength * buttonScrollPercent;
        }
    }

    #addScroll(scrolled)
    {
        const scroll = this.#scrollContainer;

        let scrolledPosition = scroll.scrollPosition - scrolled;
        scroll.scrollPosition = Math.max(Math.min(scrolledPosition, scroll.maxScroll), scroll.minScroll);
        scroll.updateDisplay();
    }

    #scrollStart()
    {
        this.#isScrolling = true;
    }

    #scrolling(pointer)
    {
        if (!this.#isScrolling)
            return;

        const scroll = this.#scrollContainer;

        let cursorPosition, cursorLimit;
        switch (scroll.scrollToward)
        {
            case "horizontal":
                cursorPosition = pointer.x - this.#worldPosition.x - this.#scrollStartPoint - this.#buttonWidth * 0.5;
                cursorLimit = this.#buttonLength - this.#buttonWidth;
                break;
            case "vertical":
                cursorPosition = pointer.y - this.#worldPosition.y - this.#scrollStartPoint - this.#buttonHeight * 0.5;
                cursorLimit = this.#buttonLength - this.#buttonHeight;
                break;
        }
        cursorPosition = Math.max(Math.min(-cursorPosition, 0), -cursorLimit);
        let scrolledPosition = (cursorPosition / cursorLimit) * scroll.scrollLength;
        if (isNaN(scrolledPosition))
            scroll.scrollPosition = 0;
        else
            scroll.scrollPosition = Math.max(Math.min(scrolledPosition, scroll.maxScroll), scroll.minScroll);

        scroll.updateDisplay();
    }

    #scrollEnd()
    {
        this.#isScrolling = false;
    }

    #scrollWheel(pointer)
    {
        if (this.#isScrolling)
            return;

        this.#addScroll(pointer.deltaY * this.#scrollContainer.wheelSensitivity);
    }
}