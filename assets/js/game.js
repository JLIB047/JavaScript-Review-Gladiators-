//function to generate random numeric value 
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
}

var getPlayerName = function() {
    var name = "";
    
    while(name === '' || name === 'null'){
        name = prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name);
    return name;
}
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10, 
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    }, 
    refillHealth: function(){
    if (this.money >= 7){
        window.alert("Refilling player's health bby 20 for 7 dollars.");
        this.health += 20;
        this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!")
        }
    },
    upgradeAttack: function(){
    if (this.money >= 7) {
        window.alert("Upgrading player's attack by 6 for 7 dollars.");
        this.attack += 6;
        this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
};

console.log(playerInfo.name, playerInfo.health, playerInfo.attack, playerInfo.money); 

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Tumble",
        attack: randomNumber(10, 14)
    }
];

var fightOrSkip = function() {
    // being called after every turn, should only be called once at the start of the fight. 
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    if(promptFight === "" || promptFight === null){
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }
     
    promptFight = promptFight.toLowerCase();

    if(promptFight === "skip"){
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        if(confirmSkip){
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            //subtract money from playerMoney for skipping 
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            // return true if the player wants to leave 
            return true;
        }
    }
    return false;
}

var fight = function(enemy) {
    window.alert("The fight has begun!");
    var isPlayerTurn = true;
    if(Math.random() > 0.5){
        isPlayerTurn = false;
    }
// repeat and execute as long as the enemy-robot is alive 
    while(playerInfo.health > 0 && enemy.health > 0 ){
    if (isPlayerTurn) {
        // ask player if they would like to fight or skip using fightOrSkip function
        if (fightOrSkip()) {
            //if true, leave fight by breaking loop
            break;
        }
        //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

        enemy.health = Math.max(0, enemy.health - damage);
        // Log a resulting message to the console so we know that it worked.
        console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.")
        // check enemys health
        if (enemy.health <= 0){
            window.alert(enemy.name + " has died!");
            //award player money for winning 
            playerInfo.money = playerInfo.money + 20;
            //leave while loop since the enemy is dead 
            break;
        } else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }

        // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
        
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        // Log a resulting message to the console so we know that it worked.
        console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");
        //check player health 
        if (playerInfo.health <= 0){ 
            window.alert(playerInfo.name + " has died!");
            break;
        } else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
        }
        isPlayerTurn = !isPlayerTurn;
    }
};
    var startGame = function () {
        playerInfo.reset();

        for(var i = 0; i < enemyInfo.length; i++){
            if (playerInfo.health > 0){
                window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ) );
                //pick new enemy to fight based on the index of the enemyNames array 
                var pickedEnemyObj = enemyInfo[i];

                // reset enemy health before new fight 
                pickedEnemyObj.health = randomNumber(40, 60);

                //call fight function with the enemy-robot
                fight(pickedEnemyObj);

                //if we are not at the last enemy in our array 
                if(playerInfo.health > 0 && i < enemyInfo.length - 1) {
                    var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                    if(storeConfirm) {
                        shop();
                    }
                }
            } else { 
                window.alert("You have lost your robot in battle! Game Over!");
                break;
            }
        }
        endGame();
    };

    var endGame = function() {
        window.alert("The game has now ended. Let's see how you did!");

        //check localstorage for high score, if it's not there, use 0
        var highScore = localStorage.getItem("highscore");
        if(highScore === null){
            highScore = 0;
        }
        //if player has more money than the highscore, player has new highscore.
        if(playerInfo.money > highScore){
            localStorage.setItem("highscore", playerInfo.money);
            localStorage.setItem("name", playerInfo.name);

            alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
        }
        else {
            alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
        }

        var playAgainConfirm = window.confirm("Would you like to play again?")

        if (playAgainConfirm) {
            //restart game 
            startGame();
        } else {
            window.alert("Thank you for playing Robot Gladiators! Come back soon!");
        }
    };

    var shop = function() {
        //ask the player what they would like to do
        var shopOptionPrompt = window.prompt(
            "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE to make a choice."
        );
        
        shopOptionPrompt = parseInt(shopOptionPrompt);

        switch(shopOptionPrompt){
            case 1:
                playerInfo.refillHealth();
                break;

            case 2:
                playerInfo.upgradeAttack();
                break;
            
            case 3:
                window.alert("Leaving the store.");
                //do nothing so the function will end 
                break;
                
            default: 
                window.alert("You did not pick a valid option. Try again.");

                //call shop() again to force the player to pick a valid option 
                shop();
                break;
        }
    };

startGame();