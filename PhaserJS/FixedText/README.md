# FixedText

지정한 영역에 맞춰 폰트 크기를 조정해주는 오브젝트입니다.

Phaser 패키지의 오브젝트 중 하나인 [Phaser.GameObjects.Text](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Text.html)를 상속받아 만들었습니다.  

오브젝트의 폰트 크기는 기본 fontSize값대로 적용하되, 지정한 가로, 세로 크기를 초과할 경우 자동으로 폰트 크기가 감소합니다.

```javascript
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
```

![FixedText1](https://user-images.githubusercontent.com/127966719/226830834-7d9ea73d-ec10-46e0-bca3-c20b88ebd70d.png)
