$(document).ready(function() {

    // Make our variables global to the runtime of our application

    var newGame = true; 
    var firstNumber = 0;
    var secondNumber = 0;
    var result = 0;
    var result_2 = 0;
    var attackPower = 0;
    var isHeroChosen = false;
    
    var heroHealthPower = 0;
    var enemyHealth = 0;
    var attackPowerHero = 0;
    var counterAttackPower = 0;
    var heroWins = 0;
    readyFight = false;
    playersInRing = 0;

    var playerStatsObject = {
      lando: {pow: {healthNum: 1000, attackNum: 2000, counterAttackNum: 3000}},
      scout: {pow: {healthNum: 1111, attackNum: 2222, counterAttackNum: 3333}}

      }

    // Use a function to initialize our calculator.
    // This way when the user hits clear, we can guarantee a reset of the app.
    function resetAllGameStats() {
        newGame = true;
        firstNumber = 0;
        secondNumber = 0;
        isHeroChosen = false;

        heroHealthPower = 0;
        enemyHealth = 0;
        attackPowerHero = 0;
        counterAttackPower = 0;
        playersInRing = 0;

      $("#first-number, #second-number, #operator, #result, #result_2").empty();
    }
    function resetChallengerStats() {
      newGame = false;
      isHeroChosen = false;
      heroWins++;
      playersInRing--;
    //   $("#first-number, #second-number, #operator, #result, #result_2").empty();
    }
    $(".bench").on("click", ".player", function() {

    if (isHeroChosen === true) {
      secondNumber = $(this).val();
      $("#second-number").text(secondNumber);
      setHeroStats(playerStatsObject, secondNumber);
    }
    else {
      firstNumber = $(this).val();
      $("#first-number").text(firstNumber);
      setHeroStats(playerStatsObject, firstNumber);
    }

    function setHeroStats(obj, item){
      for (key in obj){
        if (key == item){
          startHealth = obj[key].pow.healthNum;
          startAttack = obj[key].pow.attackNum;
          startCounterAttack = obj[key].pow.counterAttackNum;
          if (isHeroChosen !== true){
            setHero(startHealth, startAttack);
          }
          else if (isHeroChosen === true){
            setEnemy(startHealth, startCounterAttack);
            console.log("set en")
          }
        }
      }
    }

    function setHero(startHealth, startAttack){
      heroHealthPower = startHealth;
      attackPowerHero = startAttack;
      isHeroChosen = true;
      moveHero(firstNumber);
    }
    
    function setEnemy(startHealth, startCounterAttack){
      enemyHealth = startHealth;
      counterAttackPower =startCounterAttack;
      moveHero(secondNumber);
      enemyHealth = startHealth;
  
    }

    })
    $(".ringarea").on("click", ".kill", function() {
      console.log("kill btn pressed");
    //   isCalculated = true;
    if (heroHealthPower <= 0) {
        
        resetAllGameStats();
        console.log("GAME OVER!\n PLAY AGAIN?");

        //NEED TRIGGER EXIT
    }
    else if (enemyHealth < 0 && heroWins <= 3) {   
        alert("YOU WIN!");
        resetChallengerStats();
        gameMaster(secondNumber);

        //NEED NEXT BUTTON FUNCTION
    }

    if (enemyHealth > 0 && heroHealthPower > 0){
      
        heroHealthPower -= counterAttackPower;
        enemyHealth -= attackPowerHero;
    
        result = heroHealthPower;
        result_2 = enemyHealth;
    
        attackPowerHero += 3;
    }

      $("#result").text(result);
      $("#result_2").text(result_2);
      $("#landohealth").text(result);
      $("#scouthealth").text(result_2);

    }).on("click", ".clear", function() {

      // Call initializeCalculater so we can reset the state of our app
      resetAllGameStats();
      console.log('test');

    });

    function gameMaster(loser){
      console.log(loser); 
    }
    
    function moveHero (playerToMove) {

      if (playersInRing < 1) {
        var movePlayerTxt = "#" + playerToMove;
        $( ".heroring" ).append($(movePlayerTxt));
        console.log(playersInRing)
        playersInRing++
        
      }
      else if (playersInRing >= 1 && playersInRing < 2) {
        var movePlayerTxt = "#" + playerToMove;
        $( ".enemyring" ).append($(movePlayerTxt));
        console.log(movePlayerTxt)
        playersInRing++
      }


    }
 





    // Call initializeCalculater so we can set the state of our app
    // resetAllGameStats();
  });