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
    lando: {pow: {healthNum: 113, attackNum: 15, counterAttackNum: 16}},
    hutt: {pow: {healthNum: 130, attackNum: 07, counterAttackNum: 17}},
    rey: {pow: {healthNum: 143, attackNum: 10, counterAttackNum: 15}},
    vader: {pow: {healthNum: 160, attackNum: 08, counterAttackNum: 19}}
  }

  //reset game stats without reload; unused
  $("#reload").on("click", function reloadPage(event) {
    location.reload();
  });

  //reset enemy stats after loss
  function resetChallengerStats() {
    secondUserChoice = 0;
    playersInRing = 1;
    
  //   $("#first-number").empty();
  }

  // button function for chararcter play
  $(".bench").on("click", ".player", function() {
    if (isHeroChosen === true) {
      secondUserChoice = $(this).val();
      setPlayerStats(playerStatsObject, secondUserChoice);
      $(".kill").prop("disabled", false);
      $("#howto").text("Fight!").css("color", "red");
    }
    else {
      firstUserChoice = $(this).val();
      setPlayerStats(playerStatsObject, firstUserChoice);
      $("#howto").text("Choose your challenger").css("color", "green");
    }

    //get object and unpack data 
    function setPlayerStats(obj, item){
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

    //set health and attack numbers
    function setHero(startHealth, startAttack){
      heroHealthPower = startHealth;
      attackPowerHero = startAttack;
      isHeroChosen = true;
      movePlayers(firstUserChoice);
    }
    
    //set health and attack numbers
    function setEnemy(startHealth, startCounterAttack){
      enemyHealth = startHealth;
      counterAttackPower = startCounterAttack;
      movePlayers(secondUserChoice);
    }
  })

  // button function for attack and main play
  $(".ringarea").on("click", ".kill", function() {
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
      $("#playoneresult").text("You attacked " + secondUserChoice + " for " + attackPowerHero + " damage.");
      $("#playtworesult").text(secondUserChoice +  "attacked you back for " + counterAttackPower + " damage.");
    
      var numIncrement = 0;
      killPress++
      numIncrement = attackPowerHero/killPress;
      attackPowerHero += numIncrement;
    }
    var scoreBoard1 = "#health_" + firstUserChoice;
    var scoreBoard2 = "#health_" + secondUserChoice;
    $(scoreBoard1).text(scorePlayer1);
    $(scoreBoard2).text(scorePlayer2);

    gameScore();

    //check if game has ended
    function gameScore(){
      if (heroHealthPower <= 0) {
        killHero(); 
        displayFinal();
      }
      if (enemyHealth <= 0 && heroHealthPower > 0) {
        graveDigger(secondUserChoice);
        $(".kill").prop("disabled", true);
      }
      if (heroHealthPower <= 0 && heroHealthPower < enemyHealth) {
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

  //stop game for user
  function killHero (){
    $(".kill").prop("disabled", true);
    $("#howto").text("Play again?");
    gameOver = true;
    $("#reload").show("slow");
  }

  //send the losing character away and update stats
  function graveDigger(loser){
    var removeLoserTxt = "#" + loser;
    $( ".coffin" ).append($(removeLoserTxt));
    $(removeLoserTxt).prop("disabled", true);
    $("#howto").text("Choose your challenger").css("color", "blue");
    resetChallengerStats();
    if (!gameOver){
      heroWins++;
      $( "#wincount" ).text(heroWins);
    }
  }


  //move characters around the DOM
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