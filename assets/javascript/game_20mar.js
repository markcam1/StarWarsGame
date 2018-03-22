$(document).ready(function() {

    // Make our variables global to the runtime of our application

    var newGame = true; 
    var firstUserChoice = 0;
    var secondUserChoice = 0;
    var result = 0;
    var result_2 = 0;
    var attackPower = 0;
    var isHeroChosen = false;
    var heroHealthPower = 0;
    var enemyHealth = 0;
    var attackPowerHero = 0;
    var counterAttackPower = 0;
    var heroWins = 0;
    var playersInRing = 0;
    var killPress = 0;

    var playerStatsObject = {
      lando: {pow: {healthNum: 103, attackNum: 07, counterAttackNum: 15}},
      hutt: {pow: {healthNum: 115, attackNum: 05, counterAttackNum: 10}},
      rey: {pow: {healthNum: 102, attackNum: 04, counterAttackNum: 23}},
      vader: {pow: {healthNum: 100, attackNum: 05, counterAttackNum: 20}}
      }

    // Use a function to initialize our calculator.
    // This way when the user hits clear, we can guarantee a reset of the app.
    function resetAllGameStats() {
        newGame = true;
        firstUserChoice = 0;
        secondUserChoice = "";
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
      secondUserChoice = 0;
      heroWins++;
      playersInRing--;
      $( "#wincount" ).text(heroWins);
    //   $("#first-number").empty();
    }
    $(".bench").on("click", ".player", function() {
    if (isHeroChosen === true) {
      secondUserChoice = $(this).val();
      setHeroStats(playerStatsObject, secondUserChoice);
      $("#howto").text("Fight!");
    }
    else {
      firstUserChoice = $(this).val();
      setHeroStats(playerStatsObject, firstUserChoice);
      $("#howto").text("Choose your challenger");
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
          }
        }
      }
    }

    function setHero(startHealth, startAttack){
      heroHealthPower = startHealth;
      attackPowerHero = startAttack;
      isHeroChosen = true;
      movePlayers(firstUserChoice);
    }
    
    function setEnemy(startHealth, startCounterAttack){
      enemyHealth = startHealth;
      counterAttackPower =startCounterAttack;
      movePlayers(secondUserChoice);
    }

    })
    $(".ringarea").on("click", ".kill", function() {
      console.log("killBtn: " + firstUserChoice);
      console.log("killBtn: " + secondUserChoice);
    if (heroHealthPower <= 0) {
      gameScore();
    }
    else if (enemyHealth < 0 && heroWins <= 3) {   
      gameScore();
    }

    if (enemyHealth > 0 && heroHealthPower > 0){
      
        heroHealthPower -= counterAttackPower;
        enemyHealth -= attackPowerHero;
    
        result = heroHealthPower;
        result_2 = enemyHealth;
        
        var numIncrement = 0;

        killPress++
        numIncrement = attackPowerHero/killPress;
        attackPowerHero += numIncrement;
    
        console.log("killBtn inc:" + numIncrement);
        console.log("killBtn at: " + attackPowerHero);
        
    }
      var scoreBoard1 = "#health_" + firstUserChoice;
      var scoreBoard2 = "#health_" + secondUserChoice;
      $(scoreBoard1).text(result);
      $(scoreBoard2).text(result_2);
      setTimeout(gameScore, 3000);
    })

    function gameScore(){
      if (enemyHealth < 0 && heroWins <= 3) {   
        gameMaster(secondUserChoice);
        resetChallengerStats();
      }
      if (heroHealthPower <= 0) {
        var playAgain = confirm("GAME OVER!\n PLAY AGAIN?");
        if (playAgain === true){
          location.reload();
        }
      }
    }

    function gameMaster(loser){
      console.log(loser);
      var removeLoserTxt = "#" + loser;
      $( ".coffin" ).append($(removeLoserTxt)); 
    }
    function movePlayers (playerToMove) {
      if (playersInRing < 1) {
        var movePlayerTxt = "#" + playerToMove;
        $( ".heroring" ).append($(movePlayerTxt));
        console.log(playersInRing)
        playersInRing++
      }
      else if (playersInRing >= 1 && playersInRing < 2) {
        var movePlayerTxt = "#" + playerToMove;
        $( ".enemyring" ).append($(movePlayerTxt));
        playersInRing++
      }
    }
  });