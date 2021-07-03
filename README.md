## MoonRover

#Description

MoonRover is a fun, single player, browser game. As you rove around the moon in search of resources, the goal is to collect as many as possible using the Up, Down, Left and Right arrow keys from your keyboard. Resources are represented with ice cubes. Craters are represented with black circles and must be avoided at all times, else the MoonRover will be trashed. However if the MoonRover does drive over 5 craters the the game is over.
As the player collects resources, the ammount of crater increases. The scores are kept on the top right corner of the screen.

![screenshot](/images/asdfghjklöl.jpg)

![screenshot](/images/Screenshot_2021-07-03_15-10-07.png)

#MVP (DOM - CANVAS)

- The rover moves vertically and horizontally.
- Resources and obstacles appear randomly as the rover advances throught the moon.
- The rover can drive over two obstacles and the third one will end the game.

#Backlog

-[X] add ice cubes -[x]splash screen -[x]game over screen -[x]game won screen
-[]pause screen
-[]sounds.
-[]playback.
-[]enter name form.
-[]game over screen with a list of highest scores.

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

#States & States Transitions

splashScreen to gameScreen
gameScreen to winScreen or gameoverScreen

#Links

Git

Demo Here:
https://praa199.github.io/MR/

Repo:
https://github.com/Praa199/MR

Slides:
https://docs.google.com/presentation/d/1CcnGQSREoXso9rVV4CBuymyJgOm8FRBsrvvbX63hdDU/edit#slide=id.p
