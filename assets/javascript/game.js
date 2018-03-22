$(document).ready(function() {

  // global variables 
  var gameOver = false; 
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
    lando: {pow: {healthNum: 115, attackNum: 22, counterAttackNum: 38}},
    hutt: {pow: {healthNum: 140, attackNum: 20, counterAttackNum: 15}},
    rey: {pow: {healthNum: 130, attackNum: 25, counterAttackNum: 20}},
    vader: {pow: {healthNum: 142, attackNum: 18, counterAttackNum: 15}}
  }

  //reset game stats without reload; unused
  $("#reload").on("click", function reloadPage(event) {
    location.reload();
  });

  //reset enemy stats after loss
  function resetChallengerStats() {
    secondUserChoice = 0;
    playersInRing = 1;
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
      $("#howto").text("Choose your challenger")
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
  
      // console.log("killBtn inc:" + numIncrement);
      // console.log("killBtn at: " + attackPowerHero);
    }
    var scoreBoard1 = "#health_" + firstUserChoice;
    var scoreBoard2 = "#health_" + secondUserChoice;
    $(scoreBoard1).text(scorePlayer1);
    $(scoreBoard2).text(scorePlayer2);

    gameScore();

    function gameScore(){
      if (enemyHealth <= 0 && enemyHealth < heroHealthPower) {
        graveDigger(secondUserChoice);
        $(".kill").prop("disabled", true);
      }
      if (heroHealthPower <= 0 && heroHealthPower < enemyHealth) {
        killHero();
        displayFinal();
      }
      if (heroHealthPower <= 0) {
        killHero(); 
        displayFinal();
      }
      displayFinal();
      function displayFinal (){
        if (heroHealthPower < 0 || enemyHealth < 0){
            $("#playoneresult").text("Your final health is " + heroHealthPower);
            $("#playtworesult").text("The challenger's final health is " + enemyHealth);
        }
      }
    }
  })

  function killHero (){
    $(".kill").prop("disabled", true);
    $("#howto").text("Play again?");
    gameOver = true;
    $("#reload").show("slow");
  }

  function graveDigger(loser){
    var removeLoserTxt = "#" + loser;
    $( ".coffin" ).append($(removeLoserTxt));
    $(removeLoserTxt).prop("disabled", true);
    $("#howto").text("Choose your challenger");
    resetChallengerStats();
    heroWins++;
  }
  function movePlayers (playerToMove) {
    if (playersInRing < 1) {
      var movePlayerTxt = "#" + playerToMove;
      $( ".heroring" ).append($(movePlayerTxt));
      playersInRing++
    }
    else if (playersInRing >= 1 && gameOver === false) {
      console.log("mv: " + gameOver)
      var movePlayerTxt = "#" + playerToMove;
      $( ".enemyring" ).append($(movePlayerTxt));
      $( "#playoneresult, #playtworesult" ).empty();
      playersInRing++
    }
  }
});