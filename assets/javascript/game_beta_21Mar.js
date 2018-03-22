$(document).ready(function() {

  // global variables 
  var newGame = true; 
  var firstUserChoice = 0;
  var secondUserChoice = 0;
  var scorePlayer1 = 0;
  var scorePlayer2 = 0;
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
    lando: {pow: {healthNum: 1003, attackNum: 07, counterAttackNum: 15}},
    hutt: {pow: {healthNum: 115, attackNum: 05, counterAttackNum: 10}},
    rey: {pow: {healthNum: 102, attackNum: 04, counterAttackNum: 23}},
    vader: {pow: {healthNum: 100, attackNum: 05, counterAttackNum: 20}}
  }

  //reset game stats without reload; unused
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

    $("#first-number, #second-number, #operator, #scorePlayer1, #scorePlayer2").empty();
  }

  //reset enemy stats after loss
  function resetChallengerStats() {
    newGame = false;
    secondUserChoice = 0;
    playersInRing = 1;
    console.log("reset: " + playersInRing);
    $( "#wincount" ).text(heroWins);

  //   $("#first-number").empty();
  }

  // button function for chararcter play
  $(".bench").on("click", ".player", function() {
    if (isHeroChosen === true) {
      secondUserChoice = $(this).val();
      setHeroStats(playerStatsObject, secondUserChoice);
      $(".kill").prop("disabled", false);
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
      counterAttackPower = startCounterAttack;
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
      scorePlayer1 = heroHealthPower;
      scorePlayer2 = enemyHealth;
    
      var numIncrement = 0;
      killPress++
      numIncrement = attackPowerHero/killPress;
      attackPowerHero += numIncrement;
  
      console.log("killBtn inc:" + numIncrement);
      console.log("killBtn at: " + attackPowerHero);
      
  }
    var scoreBoard1 = "#health_" + firstUserChoice;
    var scoreBoard2 = "#health_" + secondUserChoice;
    $(scoreBoard1).text(scorePlayer1);
    $(scoreBoard2).text(scorePlayer2);
    setTimeout(gameScore, 2000);
  })

    function gameScore(){
      if (enemyHealth <= 0 && heroWins <= 3 && enemyHealth < heroHealthPower) {   
        playerKiller(secondUserChoice);
        $(".kill").prop("disabled", true);
      }
      if (heroHealthPower <= 0 && heroHealthPower < enemyHealth) {
        $(".kill").prop("disabled", true);
        var playAgain = confirm("Of course you lost.\n Play again?");
        if (playAgain === true){
          location.reload();
        }
      }
    }


  function playerKiller(loser){
    var removeLoserTxt = "#" + loser;
    $( ".coffin" ).append($(removeLoserTxt));
    $(removeLoserTxt).prop("disabled", true);
    heroWins++;
    resetChallengerStats();
  }
  function movePlayers (playerToMove) {
    if (playersInRing < 1) {
      var movePlayerTxt = "#" + playerToMove;
      $( ".heroring" ).append($(movePlayerTxt));
      playersInRing++
      console.log("mv ls1: " + playersInRing);
    }
    else if (playersInRing >= 1) {
      var movePlayerTxt = "#" + playerToMove;
      $( ".enemyring" ).append($(movePlayerTxt));
      playersInRing++
      console.log("mv gt1: " + playersInRing);
    }
  }
});