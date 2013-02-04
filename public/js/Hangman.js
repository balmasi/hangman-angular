function contains(arr,obj) {
  return (arr.indexOf(obj) != -1);
}

String.prototype.replaceAt = function(index,c){
  var a = this.split("");
  a[index] = c;
  return a.join("");
}

function HangmanCtrl($scope) {
  $scope.lives = 0;
  $scope.inputText = "";
  $scope.gameStarted = false;
  
  $scope.chooseWordRandomly = function() {
    var words = [
    "RETROSPECTIVE",
    "AGILE",
    "SCRUM",
    "ITERATION",
    "PRODUCT", 
    "OWNER",
    "MASTER",
    "SCRUM", 
    "TEAM",
    "USER", 
    "STORY",
    "SPRINT",
    "PRODUCT", 
    "BACKLOG",
    "RELEASE",
    "SPRINT",
    "TIMEBOXING",
    "BURN", 
    "DOWN", 
    "CHART",
    "TEST",
    "PAIR",
    "STANDUP", 
    "MEETING",
    "ALLIANCE"];
    return words[Math.floor((Math.random()*words.length))];
  }
  
  $scope.newGame = function(word) {
    $scope.lives = 5;
    $scope.usedCharacters = [];
    $scope.targetWord = word;
    $scope.targetLeft = word;
    $scope.placeholderText = word.replace(/./ig,"_").split('');
    $scope.gameStarted = true;
  }
  
  $scope.enterCharacter = function(c) {
    if (!c.length) { return;}
    var c = c.toUpperCase(), charRegex = new RegExp(c,"ig"), index;
    if ($scope.targetWord.match(charRegex)){
      index = $scope.targetLeft.indexOf(c);
      while (index >= 0){
        $scope.targetLeft= $scope.targetLeft.replace(c,'_');
        $scope.placeholderText[index] = c;
        index = $scope.targetLeft.indexOf(c)
      }
    }
    else if (!contains($scope.usedCharacters,c)){
      $scope.lives -= 1;
      $scope.usedCharacters.push(c);
    }
    $scope.inputText = "";
    $scope.hasWon = $scope.isWin();
  }

  $scope.displayHearts = function(){
    return new Array($scope.lives);
  }

  $scope.isWin = function() {
    return ($scope.lives > 0 && $scope.placeholderText.join('') == $scope.targetWord);
  }

  $scope.isLose = function() {
    return ($scope.lives < 1 && $scope.gameStarted);
  }
}
