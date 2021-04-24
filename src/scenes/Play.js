class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/Bullet1.png');
        this.load.image('rocket2', './assets/Bullet2.png');
        this.load.image('spaceship', './assets/Rat.png');
        this.load.image('spaceship2', './assets/RatTwo.png');
        this.load.image('starfield', './assets/Grass.png');

        // load spritesheet
        this.load.spritesheet('explosion', './assets/Blood.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        // play bgm
        this.bgm = this.sound.add('bgm', {volume: 2});
        this.bgm.play();

        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0,0);

        // blue UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x4CCAFF).setOrigin(0, 0);

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, 400, 410, 'rocket').setOrigin(0.5, 0);
        
        // add rocket (p2)
        this.p2Rocket = new RocketTwo(this, 240, 410, 'rocket2').setOrigin(0.5, 0);
        
        // add spaceship (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, 160, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, 210, 'spaceship', 0,
            20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, 260, 'spaceship', 0, 10).setOrigin(0, 0);

        // add special spaceship
        this.ship04 = new SpaceshipTwo(this, game.config.width, 110, 'spaceship2', 0, 50).setOrigin(0, 0);

        // blue borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x4CCAFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x4CCAFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x4CCAFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x4CCAFF).setOrigin(0, 0);

        //define keys
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        // player one
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        // player two
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        // initialize score
        this.p1Score = 0;
        this.p2Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '28px',
            backgroundColor: '#ffe100',
            color: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 100
        }
        this.scoreRight = this.add.text(500, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

        let scoreConfigTwo = {
            fontFamily: 'Comic Sans MS',
            fontSize: '28px',
            backgroundColor: '#d8d8d8',
            color: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(40, borderUISize + borderPadding*2, this.p2Score, scoreConfigTwo);

        // GAME OVER flag
        this.gameOver = false;

        let borderConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '28px',
            backgroundColor: '#4ccaff',
            color: '#000000',
            align: 'middle',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 100
        }

        // 60-second play clock
        borderConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', borderConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu',
                borderConfig).setOrigin(0.5);
            this.bgm.stop();
            this.gameOver = true;
        }, null, this);
    }

    update() {
        // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 4;

        if(!this.gameOver) {
            this.p1Rocket.update();         // update rocket sprite
            this.p2Rocket.update();
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
        } 

        // check collisions for p1
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if(this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
        }

        // check collisions for p2
        if(this.checkCollision(this.p2Rocket, this.ship03)) {
            this.p2Rocket.reset();
            this.shipExplodeTwo(this.ship03);
        }
        if(this.checkCollision(this.p2Rocket, this.ship02)) {
            this.p2Rocket.reset();
            this.shipExplodeTwo(this.ship02);
        }
        if(this.checkCollision(this.p2Rocket, this.ship01)) {
            this.p2Rocket.reset();
            this.shipExplodeTwo(this.ship01);
        }
        if(this.checkCollision(this.p2Rocket, this.ship04)) {
            this.p2Rocket.reset();
            this.shipExplodeTwo(this.ship04);
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if(rocket.x < ship.x + ship.width &&
           rocket.x + rocket.width > ship.x &&
           rocket.y < ship.y + ship.height &&
           rocket.height + rocket.y > ship.y) {
               return true;
            } else {
                return false;
            }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;

        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');               // play explode animation
        boom.on('animationcomplete', () => {      // callback after anim completes
            ship.reset();                         // reset ship position
            ship.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
        });

        // score add and repaint
        this.p1Score += ship.points;
        this.scoreRight.text = this.p1Score;

        this.sound.play('sfx_death');
        this.sound.play('sfx_blood');
      }

      shipExplodeTwo(ship) {
        // temporarily hide ship
        ship.alpha = 0;

        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');               // play explode animation
        boom.on('animationcomplete', () => {      // callback after anim completes
            ship.reset();                         // reset ship position
            ship.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
        });

        // score add and repaint
        this.p2Score += ship.points;
        this.scoreLeft.text = this.p2Score;

        this.sound.play('sfx_death');
        this.sound.play('sfx_blood');
      }
}