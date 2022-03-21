var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

console.log(playerName, playerHealth, playerAttack); 

var enemyNames = ["Roborto", "Amy Android", "Robo Tumble"];
var enemyHealth = 50;
var enemyAttack = 12;

//console.log(enemyName, enemyHealth, enemyAttack);

var fight = function(enemyName) {
    window.alert("The fight has begun!");
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
// repeat and execute as long as the enemy-robot is alive 
    while(playerHealth > 0 && enemyHealth > 0 ){
        if (promptFight === "skip" || promptFight === "SKIP"){
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            //if yes (true), leave fight
            if(confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                //subtract player money 
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
            }
        }

        //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
        enemyHealth = enemyHealth - playerAttack;
        // Log a resulting message to the console so we know that it worked.
        console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.")
        // check enemys health
        if (enemyHealth <= 0){
            window.alert(enemyName + " has died!");
            //award player money for winning 
            playerMoney = playerMoney + 20;
            //leave while loop since the enemy is dead 
            break;
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
        playerHealth = playerHealth - enemyAttack;
        // Log a resulting message to the console so we know that it worked.
        console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");
        //check player health 
        if (playerHealth <= 0){ 
            window.alert(playerName + " has died!");
            break;
        } else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
        }
    }
};

for(var i = 0; i < enemyNames.length; i++){
    if (playerHealth > 0){
        window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ) );
        
        //pick new enemy to fight based on the index of the enemyNames array 
        var pickedEnemyNames = enemyNames[i];

        // reset enemy health before new fight 
        enemyHealth = 50;

        //call fight function with the enemy-robot
        fight(pickedEnemyNames);
    } else { 
        window.alert("You have loast your robot in battle! Game Over!");
        break;
    }
    
}
//fight();