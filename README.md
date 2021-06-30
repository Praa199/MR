## MoonRover

#Description

MoonRover is a fun, single player, browser game. As you rove around the moon in search of resources, the goal is to collect as many as possible using the Up and Down, Left and Right arrow keys from your keyboard. Resources are represented with blue squares. Craters are represented with black rectangles and must be avoided at all times, else the MoonRover will be trashed. However if the MoonRover does drive over 3 craters the the game is over.


#MVP (DOM - CANVAS)
- The rover moves vertically and horizontally.
- Resources and obstacles appear randomly as the rover advances throught the moon.
- The rover can drive over two obstacles and the third one will end the game.


#Backlog
-
-enter name form.
-game over screen with a list of highest scores.
-sounds.
-playback.


#Data structure

Index.js:

variables declared,
startGame()
gameWon()
gameOver()
drawScore()
drawLives()
drawRover()
drawCraters()
addMoreCraters()
craterCollision()
drawIces()
addMoreIce()
iceCollision()
drawGame()

#States y States Transitions

splashScreen to gameScreen
gameScreen to winScreen or gameoverScreen


#Links


Git

Deployment:
https://praa199.github.io/MR/

Repository:
https://github.com/Praa199/MR

Slides:
https://docs.google.com/presentation/d/1CcnGQSREoXso9rVV4CBuymyJgOm8FRBsrvvbX63hdDU/edit#slide=id.p
