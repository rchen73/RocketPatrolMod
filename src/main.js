let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyR, keyDOWN, keyLEFT, keyRIGHT, keyA, keyS, keyD;

/*
Name: Ryan Chen
Project Title: Rocket Patrol Mod: Rat Terminator
Date: 4/23/2021
Hours to Complete: 13

Point Breakdown:
60 Points - Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi)
            I changed the theme to have more of an earthly nature aesthetic with the intent to hunt rats.

30 Points - Implement a simultaneous two-player mode
            I added a second player with their corresponding score to the left.

30 Points - Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points
            I added a smaller golden rat that moves faster despite the mode and is worth more points.

Credits:
Select.mp3: https://freesound.org/people/pumodi/sounds/150222/
Field.wav: https://freesound.org/people/kvgarlic/sounds/135472/
Gun.wav: https://freesound.org/people/Erokia/sounds/410399/
Rat.mp3: https://freesound.org/people/psychentist/sounds/168567/
Splatter.wav: https://freesound.org/people/dersuperanton/sounds/434479/
*/