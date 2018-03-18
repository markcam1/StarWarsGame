$(document).ready(function() {

    // Make our variables global to the runtime of our application

    var newGame = true; 
    var firstNumber = 0;
    var secondNumber = 0;
    var operator = "minus";
    var result = 0;
    var result_2 = 0;
    var isOperatorChosen = false;
    // var isCalculated = false;
    var attackPower = 0;
    var isHeroChosen = false;
    
    var healthPowerHero = 0;
    var enemyHealth = 0;
    var attackPowerHero = 0;
    var counterAttackPower = 0;
    var heroWins = 0;
    readyFight = false;

    
    // Use a function to initialize our calculator.
    // This way when the user hits clear, we can guarantee a reset of the app.
    function resetAllGameStats() {
        newGame = true;
        firstNumber = 0;
        secondNumber = 0;
        isOperatorChosen = false;
        isHeroChosen = false;
        // isCalculated = false;

        healthPowerHero = 0;
        enemyHealth = 0;
        attackPowerHero = 0;
        counterAttackPower = 0;

      $("#first-number, #second-number, #operator, #result, #result_2").empty();
    }
    function resetChallengerStats() {
        newGame = false;
        isHeroChosen = false;
        // isCalculated = false;

        enemyHealth = 200;
        counterAttackPower = 5;
        heroWins++;

    //   $("#first-number, #second-number, #operator, #result, #result_2").empty();
    }

    $(".card").on("click", ".empire", function() {

      // Check if we've already run a calculation, if so... we'll just.
      // if (isCalculated) {
      //   return false;
      // }

      // If operator is chosen, we should be writing the secondNumber, otherwise, the firstNumb

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
      }
      function hero1(){
        healthPowerHero = 111;
        attackPowerHero = 5;
      }
      function challengerPower1(){
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
        healthPowerHero = 333;
        attackPowerHero = 9;
      }
      function challengerPower2(){
        enemyHealth = 333;
        counterAttackPower = 2;
      }
  

      
      
      
     
    }).on("click", ".kill", function() {
    //   isCalculated = true;
    if (healthPowerHero <= 0) {
        
        resetAllGameStats();
        console.log("GAME OVER!\n PLAY AGAIN?");

        //NEED TRIGGER EXIT
    }
    else if (enemyHealth < 0 && heroWins <= 3) {   
        alert("YOU WIN!");
        resetChallengerStats();

        //NEED NEXT BUTTON FUNCTION
    }

    if (enemyHealth > 0 && healthPowerHero > 0){
        healthPowerHero -= counterAttackPower;
        enemyHealth -= attackPowerHero;
    
        result = healthPowerHero;
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

    // Call initializeCalculater so we can set the state of our app
    // resetAllGameStats();
  });