# Custom Buttons

코드 재사용성을 높이기 위해 제작된 버튼 오브젝트들 입니다.

__SpriteButton__ 은 [Phaser.GameObjects.Sprite](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Sprite.html)를 상속받는 버튼 오브젝트이고,

__RectButton__ 은 [Phaser.GameObjects.Rectangle](https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Rectangle.html)를 상속받는 버튼 오브젝트입니다.

두 오브젝트 모두 [Notes of Phaser 3](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/)의
[Touch events](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/touchevents/) 문서를 참조하여 상호작용 기능을 개발하였습니다.

클릭 시작할 때, 클릭 종료할 때, 오브젝트 위로 포인터가 올라가거나 내려갈 때 등등 이벤트를 걸 수 있는 기능이 있습니다.

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

![CustomButtons0](https://user-images.githubusercontent.com/127966719/226838421-a7f2174a-8ada-4c1b-ab43-0ba6c019fa29.gif)
