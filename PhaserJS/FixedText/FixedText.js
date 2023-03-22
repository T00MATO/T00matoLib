export default class FixedText extends Phaser.GameObjects.Text
{
    #config = null;

    constructor(scene, config = { x, y, width, height, text, style })
    {
        super(scene, config.x, config.y, config.text, config.style);
        this.scene.add.existing(this);

        this.#config = config;

        let fontSizeStyle = this.style.fontSize;
        this.currentFontSize = Number(fontSizeStyle.replace("px", ""));
        this.originalFontSize = this.currentFontSize;

        this.setText = this._setText;
        this.#resizeFont();
    }

    _setText(value)
    {
        super.setText(value);
        this.#resizeFont();

        return this;
    }

    setFontSize(size)
    {
        this.originalFontSize = size;
        this.#resizeFont();

        return this;
    }

    #resizeFont()
    {
        this.currentFontSize = this.originalFontSize;
        while (this.displayWidth > this.#config.width || this.displayHeight > this.#config.height)
        {
            this.style.setFontSize(--this.currentFontSize);
        }
    }
}
