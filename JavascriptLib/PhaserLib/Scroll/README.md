# Scroll

코드 재사용성을 높이기 위해 제작된 스크롤 오브젝트입니다.

Phaser 오브젝트들을 [Phaser.GameObjects.Container](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Container.html) 오브젝트에 담은 후,

[RenderTexture](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.RenderTexture.html) 오브젝트의 Render 대상을 Container로 지정합니다.

Render 대상이 된 Container 내에 있는 오브젝트들은 RenderTexture에서 지정한 범위 내에 오브젝트들만 보여지게끔 하는 원리입니다.

__ScrollContainer__ 오브젝트를 생성할 때, 스크롤의 가로, 세로, 스크롤 방향, 최소 스크롤 위치, 최대 스크롤 위치, 휠 민감도를 설정할 수 있습니다.

ScrollContainer 오브젝트에서 __createScrollBar__ 메서드를 통해 스크롤 바를 생성할 수 있습니다.

__addContent__ 메서드를 통해 오브젝트 추가를, __addInteract__ 메서드를 통해 상호작용 영역 추가를 할 수 있습니다.

```javascript
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
```

![Scroll](https://user-images.githubusercontent.com/127966719/226853879-3807ec89-f1a6-4c62-b858-478018e8807a.gif)
