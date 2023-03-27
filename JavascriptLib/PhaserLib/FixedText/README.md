# FixedText

지정한 영역에 맞춰 폰트 크기를 조정해주는 오브젝트입니다.

Phaser 패키지의 오브젝트 중 하나인 [Phaser.GameObjects.Text](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Text.html)를 상속받아 만들었습니다.  

오브젝트의 폰트 크기는 기본 fontSize값대로 적용하되, 지정한 가로, 세로 크기를 초과할 경우 자동으로 폰트 크기가 감소합니다.

```javascript
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
```

![FixedText1](https://user-images.githubusercontent.com/127966719/226830834-7d9ea73d-ec10-46e0-bca3-c20b88ebd70d.png)
