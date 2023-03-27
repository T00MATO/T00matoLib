import { State } from '@/common/state';

export class SoundManager
{
    /** @type {SoundManager} */
    static #instance = null;
    static get instance()
    {
        if (!this.#instance)
            this.#instance = new SoundManager();
        return this.#instance;
    }

    #volumes = {
        master: 0.5,
        studio: 0.5,
        effect: 0.5,
    }

    volumes = {
        setMaster: (value) =>
        {
            this.#volumes.master = value;
            this.updateMusicVolume();
            this.updateEffectVolume();
        },
        setMusic: (value) =>
        {
            this.#volumes.studio = value;
            this.updateMusicVolume();
        },
        setEffect: (value) =>
        {
            this.#volumes.effect = value;
            this.updateEffectVolume();
        },
        getMaster: () =>
        {
            return this.#volumes.master;
        },
        getStudio: () =>
        {
            return this.#volumes.studio;
        },
        getEffect: () =>
        {
            return this.#volumes.effect;
        },
        getTotalStudio: () =>
        {
            return (!this.#muteStates.master && !this.#muteStates.studio) ? this.#volumes.master * this.#volumes.studio : 0;
        },
        getTotalEffect: () =>
        {
            return (!this.#muteStates.master && !this.#muteStates.effect) ? this.#volumes.master * this.#volumes.effect : 0;
        },
    };

    #muteStates = {
        master: false,
        studio: false,
        effect: false,
    }

    muteStates = {
        setMaster: (value) =>
        {
            this.#muteStates.master = value;
            this.updateMusicVolume();
            this.updateEffectVolume();
        },
        setMusic: (value) =>
        {
            this.#muteStates.studio = value;
            this.updateMusicVolume();
        },
        setEffect: (value) =>
        {
            this.#muteStates.effect = value;
            this.updateEffectVolume();
        },
        getMaster: () =>
        {
            return this.#muteStates.master;
        },
        getStudio: () =>
        {
            return this.#muteStates.studio;
        },
        getEffect: () =>
        {
            return this.#muteStates.effect;
        },
    }

    get scene()
    {
        return State.currentScene;
    }

    /** @type {Phaser.Sound.BaseSound[]} */
    musicSounds = [];

    /** @type {Phaser.Sound.BaseSound[]} */
    effectSounds = [];

    playMusic(soundKey)
    {
        if (!this.musicSounds[soundKey])
        {
            this.musicSounds[soundKey] = this.scene.sound.add(soundKey, { loop: true, volume: this.volumes.getTotalStudio() });
        }
        this.musicSounds[soundKey].play();
    }

    stopMusic(soundKey)
    {
        if (this.musicSounds[soundKey])
        {
            this.musicSounds[soundKey].stop();
        }
    }

    stopAllMusic()
    {
        for (let soundKey in this.musicSounds)
        {
            this.musicSounds[soundKey].stop();
        }
    }

    playEffect(soundKey)
    {
        let sound = this.scene.sound.add(soundKey, { loop: false, volume: this.volumes.getTotalEffect() });
        let index = (this.effectSounds?.at(-1) ?? 0) + 1;
        this.effectSounds[index] = sound;
        sound.play();
        sound.on("complete", () =>
        {
            sound.stop();
            this.effectSounds[index] = null;
            this.effectSounds.splice(index, 1);
        })
    }

    updateMusicVolume()
    {
        for (let soundKey in this.musicSounds)
        {
            this.musicSounds[soundKey]?.setVolume(this.volumes.getTotalStudio());
        }
    }

    updateEffectVolume()
    {
        for (let soundKey in this.effectSounds)
        {
            this.effectSounds[soundKey]?.setVolume(this.volumes.getTotalEffect());
        }
    }
}