import { SoundManager } from '../objects/SoundManager';

export default class CustomButtons_TestScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TestScene' })
    }

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

    update() {
        
    }
}
