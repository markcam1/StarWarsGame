$(document).ready(function() {

    // Make our variables global to the runtime of our application

    var newGame = true; 
    var firstNumber = 0;
    var secondNumber = 0;
    var operator = "minus";
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
    $(".bench").on("click", ".lando", function() {

      if (isHeroChosen === true) {
          secondNumber = $(this).val();
          $("#second-number").text(secondNumber);
          challengerPower1()
      }
      else {
        firstNumber = $(this).val();
        isHeroChosen = true;
        $("#first-number").text(firstNumber);
        hero1()
        moveHero(firstNumber);
      }
      function hero1(){
        heroHealthPower = 111;
        attackPowerHero = 5;
      }
      function challengerPower1(){
        enemyHealth = 111;
        counterAttackPower = 9;
      }
    })
    $(".card").on("click", ".sky", function() {
      if (isHeroChosen === true) {
          secondNumber = $(this).val();
          $("#second-number").text(secondNumber);
          challengerPower3()
      }
      else {
        firstNumber = $(this).val();
        isHeroChosen = true;
        $("#first-number").text(firstNumber);
        hero3()
      }
      function hero3(){
        heroHealthPower = 222;
        attackPowerHero = 5;
      }
      function challengerPower3(){
        enemyHealth = 111;
        counterAttackPower = 9;
      }
    })
    $(".card").on("click", ".rebel", function() {

      if (isHeroChosen === true) {
          secondNumber = $(this).val();
          $("#second-number").text(secondNumber);
          challengerPower2();

      }
      else {
        firstNumber = $(this).val();
        isHeroChosen = true;
        $("#first-number").text(firstNumber);
        hero2()
      }
      function hero2(){
        heroHealthPower = 333;
        attackPowerHero = 9;
      }
      function challengerPower2(){
        enemyHealth = 333;
        counterAttackPower = 2;
      }
    }).on("click", ".kill", function() {
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
      $("#rebheal").text(result);
      $("#empheal").text(result_2);
      $("#hwins").text(heroWins);

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
        var movePlayerTxt = "." + playerToMove;
        $( ".heroring" ).append($(movePlayerTxt));
        console.log(playersInRing)
        
      }
      else if (playersInRing >= 1 && playersInRing < 2) {
        var movePlayerTxt = "." + playerToMove;
        $( ".enemyring" ).append($(movePlayerTxt));
        console.log(movePlayerTxt)
        playersInRing++
      }


    }
 





    // Call initializeCalculater so we can set the state of our app
    // resetAllGameStats();
  });