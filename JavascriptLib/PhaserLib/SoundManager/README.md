# SoundManager

사운드 관련 기능이 집합되어 있는 [싱글톤](https://ko.wikipedia.org/wiki/%EC%8B%B1%EA%B8%80%ED%84%B4_%ED%8C%A8%ED%84%B4) 오브젝트입니다.

기본적으로 계속 반복되서 재생되는 배경음악 재생과 순간적인 효과음 재생 기능이 있습니다.

각각 배경음악과 효과음 볼륨을 조절할 수 있으며, 뮤트 역시 가능합니다.

```javascript
preload() {
    this.load.audio('test1', 'assets/sounds/test1.ogg');
    this.load.audio('test2', 'assets/sounds/test2.ogg');
    this.load.audio('test3', 'assets/sounds/test3.ogg');
}

create() {
    //  전체 볼륨 조정
    SoundManager.instance.volumes.setMaster(0.5);

    //  배경음악 재생
    SoundManager.instance.playMusic('test1');

    //  배경음악 볼륨 조정
    SoundManager.instance.volumes.setMusic(0.5);

    //  모든 배경음악 정지
    SoundManager.instance.stopAllMusic();

    //  효과음 재생
    SoundManager.instance.playEffect('test2');
    SoundManager.instance.playEffect('test3');

    //  효과음 볼륨 조정
    SoundManager.instance.volumes.setEffect(0.5);

    //  뮤트 설정
    SoundManager.instance.muteStates.setMaster(false);
    SoundManager.instance.muteStates.setMusic(true);
    SoundManager.instance.muteStates.setEffect(false);
}
```
