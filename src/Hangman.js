function contains(arr,obj) {
  return (arr.indexOf(obj) != -1);
}

function HangmanCtrl($scope) {
  $scope.lives = 0;
  $scope.inputText = "";
  $scope.placeholderText = "";
  $scope.isReady = false;
  
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
    return words[Math.floor((Math.random()*words.length))].toLowerCase();
  }
  
  $scope.newGame = function(word) {
    $scope.lives = 5;
    $scope.correctCharacters = [];
    $scope.usedCharacters = [];
    $scope.targetWord = word;
    $scope.placeholderText = $scope.displayPlaceholderText();
    $scope.isReady = true;
  }
  
  $scope.displayPlaceholderText = function() {
    if (!$scope.targetWord) {
      return '';
    }
    
    //Result is the new word placeholder
    var result = '';
    for(var index=0; index < $scope.targetWord.length; ++index) {
      if (contains($scope.correctCharacters, $scope.targetWord[index])) {
        result += $scope.targetWord[index];
      } else {
        result += '_';
      }
    }
    return result.split('');
  }
  
  $scope.enterCharacter = function(c) {
    var index, found = false;
    for (index=0; index < $scope.targetWord.length; ++index) {
      if ($scope.targetWord[index] == c.toLowerCase()) {
        $scope.correctCharacters.push(c.toLowerCase());
        found = true
        break;
      }
    }
    if (!found) {
      $scope.lives -= 1;
      if (!contains($scope.usedCharacters,c)){
        $scope.usedCharacters.push(c);
      }
    }
    $scope.placeholderText = $scope.displayPlaceholderText();
    console.log($scope.displayPlaceholderText());
    $scope.inputText = "";
  }

  $scope.displayHearts = function(){
    var hearts = [];
    for (var i=0;i<$scope.lives;i++){
      hearts.push("<3");
    }
    return hearts;
  }
  
  $scope.isWin = function() {
    if ($scope.lives > 0 && $scope.displayPlaceholderText() == $scope.targetWord) {
      return true;
    }
    return false;
  }
  
  $scope.isLose = function() {
    if ($scope.lives < 1 && $scope.isReady) {
      return true;
    }
    return false;
  }
}
