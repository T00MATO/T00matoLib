export class SpriteButton extends Phaser.GameObjects.Sprite
{
    onPointerdown = function () { }
    onPointerup = function () { }
    onPointerover = function () { }
    onPointerout = function () { }
    onPointermove = function () { }
    onWheel = function () { }

    constructor(scene, x, y, texture, frame, events = { pointerdown, pointerup, pointerover, pointerout, pointermove, wheel })
    {
        super(scene, x, y, texture, frame)
        this.scene.add.existing(this)
        this.onPointerdown = events.pointerdown || function () { }
        this.onPointerup = events.pointerup || function () { }
        this.onPointerover = events.pointerover || function () { }
        this.onPointerout = events.pointerout || function () { }
        this.onPointermove = events.pointermove || function () { }
        this.onWheel = events.wheel || function () { }

        this.setInteractive()
        this.on("pointerdown", (pointer, localX, localY) => this.#onPointerEvent(this.onPointerdown, { pointer, localX, localY, }))
        this.on("pointerup", (pointer, localX, localY) => this.#onPointerEvent(this.onPointerup, { pointer, localX, localY, }))
        this.on("pointerover", (pointer, localX, localY) => this.#onPointerEvent(this.onPointerover, { pointer, localX, localY, }))
        this.on("pointerout", (pointer, localX, localY) => this.#onPointerEvent(this.onPointerout, { pointer, localX, localY, }))
        this.on("pointermove", (pointer, localX, localY) => this.#onPointerEvent(this.onPointermove, { pointer, localX, localY, }))
        this.on("wheel", (pointer, dx, dy, dz) => this.#onWheelEvent(this.onWheel, { pointer, dx, dy, dz, }))
    }

    #onPointerEvent(event, param = { pointer, localX, localY })
    {
        event(param.pointer, param.localX, param.localY);
    }

    #onWheelEvent(event, param = { pointer, dx, dy, dz, })
    {
        event(param.pointer, param.dx, param.dy, param.dz);
    }
}

export class RectButton extends Phaser.GameObjects.Rectangle
{
    onPointerdown = function () { }
    onPointerup = function () { }
    onPointerover = function () { }
    onPointerout = function () { }
    onPointermove = function () { }
    onWheel = function () { }

    constructor(scene, x, y, width, height, events = { pointerdown, pointerup, pointerover, pointerout, pointermove, wheel })
    {
        super(scene, x, y, width, height)
        this.scene.add.existing(this)
        this.onPointerdown = events.pointerdown || function () { }
        this.onPointerup = events.pointerup || function () { }
        this.onPointerover = events.pointerover || function () { }
        this.onPointerout = events.pointerout || function () { }
        this.onPointermove = events.pointermove || function () { }
        this.onWheel = events.wheel || function () { }

        this.setInteractive()
        this.on("pointerdown", (pointer, localX, localY) => this.#onPointerEvent(this.onPointerdown, { pointer, localX, localY, }))
        this.on("pointerup", (pointer, localX, localY) => this.#onPointerEvent(this.onPointerup, { pointer, localX, localY, }))
        this.on("pointerover", (pointer, localX, localY) => this.#onPointerEvent(this.onPointerover, { pointer, localX, localY, }))
        this.on("pointerout", (pointer, localX, localY) => this.#onPointerEvent(this.onPointerout, { pointer, localX, localY, }))
        this.on("pointermove", (pointer, localX, localY) => this.#onPointerEvent(this.onPointermove, { pointer, localX, localY, }))
        this.on("wheel", (pointer, dx, dy, dz) => this.#onWheelEvent(this.onWheel, { pointer, dx, dy, dz, }))
    }

    #onPointerEvent(event, param = { pointer, localX, localY })
    {
        event(param.pointer, param.localX, param.localY);
    }

    #onWheelEvent(event, param = { pointer, dx, dy, dz, })
    {
        event(param.pointer, param.dx, param.dy, param.dz);
    }
}
