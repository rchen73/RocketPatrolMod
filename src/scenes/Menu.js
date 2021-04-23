class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/Select.mp3');
        this.load.audio('bgm', './assets/Field.wav');
        this.load.audio('sfx_gun', './assets/Gun.wav');
        this.load.audio('sfx_death', './assets/Rat.mp3');
        this.load.audio('sfx_blood', './assets/Splatter.wav');
        this.load.image('background', './assets/Background.png');
    }

    create() {
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0,0);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                goldSpeed: 5,
                gameTimer: 5000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');    
        }
        
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                goldSpeed: 6,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}