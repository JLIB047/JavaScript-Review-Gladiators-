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



var fight = function(enemy) {
    window.alert("The fight has begun!");
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
// repeat and execute as long as the enemy-robot is alive 
    while(playerInfo.health > 0 && enemy.health > 0 ){
        if (promptFight === "skip" || promptFight === "SKIP"){
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            //if yes (true), leave fight
            if(confirmSkip) {
                window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
                //subtract player money 
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log("playerMoney", playerInfo.money);
                break;
            } 
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
        //if player is still alive, player wins! 
        if (playerInfo.health > 0) {
            window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
        } else { 
            window.alert("You've lost your robot in battle.");
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
            "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
        );

        switch(shopOptionPrompt){
            case "REFILL":
            case "refill":
                playerInfo.refillHealth();
                break;

            case "UPGRADE":
            case "upgrade":
                playerInfo.upgradeAttack();
                break;
            
            case "LEAVE":
            case "leave":
                window.alert("Leaving the store.");
                //do nothing so the function will end 
                break;
                
            default: 
                window.alert("You did not pikc a valid option. Try again.");

                //call shop() again to force the player to pick a valid option 
                shop();
                break;
        }
    };

startGame();