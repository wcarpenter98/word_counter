function myFunction() {
  var textAreaText = document.getElementById('textArea').value;
  //replace newlines with spaces when processing
  textAreaText = textAreaText.replace(/\n/g, " ");

  var arrayOfWords = textAreaText.split(" ");

  //remove white spaces from array
  let arrayOfWordsNoSpaces = [];
  for(var i=0; i<arrayOfWords.length; i++){
    if(arrayOfWords[i] != " " && arrayOfWords[i] != ""){
      arrayOfWordsNoSpaces.push(arrayOfWords[i]);
      console.log("hi");
    }
  }

  var wordSet = new Set(arrayOfWordsNoSpaces);
  var arrayOfWordsNoRepeats = Array.from(wordSet);


  getWordCount(arrayOfWordsNoSpaces);
  getCharacterCount(arrayOfWordsNoSpaces);
  getStats(arrayOfWordsNoSpaces, arrayOfWordsNoRepeats);
  return arrayOfWordsNoSpaces;
}

String.prototype.replaceAt = function(index, replacement) {
  return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}


function getWordCount(wordArray){
  //count all of the words except spaces
  var totalWords = 0;
  for(var i = 0; i < wordArray.length; i++){
    if(wordArray[i] != " " && wordArray[i] != ''){
      totalWords += 1;
    }
  }
  document.getElementById("wordCount").innerHTML = String(totalWords);
}

function getCharacterCount(wordArray){
  //count all of the characters that arent empty stings or spaces or periods.
  var totalCharacters = 0;
  for(var i = 0; i < wordArray.length; i++){
    if(wordArray[i] != " " && wordArray[i] != ''){
      //now count all of the characters of the current word
      totalCharacters += wordArray[i].length;
    }
  }
  //TODO: ABOVE COULD BE USED FOR SIGNIFICANT CHARACTERS AKA CHARACTERS WITHOUT SPACES.
  document.getElementById("characterCount").innerHTML = totalCharacters;
}

function getStats(totalWordArray, totalWordArrayNoRepeats){
  //create a hashmap counting all of the words occurrences
  const hashMap = new Map();
  //now go through the list of totalWords with repeats and add to the hashMap totals
  for(var i = 0; i < totalWordArray.length; i++){
    var currentWord = totalWordArray[i];
    //does word end in special character
    if(doesWordEndInSpecialCharacter(currentWord)){
      currentWord = currentWord.substring(0, currentWord.length -1);
    }
    //check if that hashMap has a value
    if(hashMap.get(currentWord)){
      var currentTotal = hashMap.get(currentWord);
      hashMap.set(currentWord, currentTotal+1)
    }
    else{
      hashMap.set(currentWord, 1);
    }
  }
  //now all words are mapped to their frequencies
  // very -> 4 
  // a -> 1
  //now take all of the words and order them from greatest to least based on their frequencies


  //map the frequency -> listOfWords
  var frequencyMap = new Map();

  for (var [key, value] of hashMap.entries()) {
    if(frequencyMap.get(value) && frequencyMap.get(value) != ''){
      var currentWordList = frequencyMap.get(value);
      currentWordList.push(key)
      frequencyMap.set(value, currentWordList);
    }
    else{
      var wordList = [];
      //TODO: CHECK WHERE THESE EMPTY KEYS ARE COMING FROM, THIS IS A PATCHY FIX BELOW WITH THE IF STATEMENT
      if(key != '' && key != " "){
        wordList.push(key);
        frequencyMap.set(value, wordList);
      }
    }
  }

  //find the highest frequency
  var highestFrequency = -1;
  for (var [key, value] of hashMap.entries()) {
    if(value > highestFrequency){
      highestFrequency = value
    }
  }


  //now start from the highest frequency and increment down each time in a loop
  //put the highest frequency words in a list like this 
  //[word] occurence# (#percentage)
  //sky 7 indivdual occurences (10% of total words)
  
  var detailedStatsList = []
  for(var i = highestFrequency; i > 0; i--){
    //if a wordlist exist with that frequency match
    if(frequencyMap.get(i)){
      //loop thru the word list and add the modifed string to the detailedStatsList
      var currentWordList = frequencyMap.get(i);
      for(var j = 0; j < currentWordList.length; j++){
        var currentWord = currentWordList[j];
        //derive stats for the word
        //currentWord (7 occurences) (10 percent of total words)
        var percentage = i/totalWordArray.length * 100
        console.log(totalWordArray.length);
        console.log(totalWordArray);
        currentWord = currentWord + " (" + i + " occurences) (" + percentage.toFixed(3) + "% of total words)";
        detailedStatsList.push(currentWord)
      }
    }
  }


 // var statsTextBox = document.getElementById("statsText");

  //create a string to put inside of the stats text box
  var statsTextString = "";
  for(var i = 0; i < detailedStatsList.length; i++){
    statsTextString += detailedStatsList[i] + "\n" + "\n"
  }


  //TODO: do this with a new element below. 
  document.getElementById("theStats").innerText = statsTextString;
  console.log(frequencyMap)

}

function doesWordEndInSpecialCharacter(word){
  //! . , ? ; : ' " 
  if(word[word.length-1] == '!' || word[word.length-1] == '.' || word[word.length-1] == ',' || word[word.length-1] == '?' || word[word.length-1] == ';' || word[word.length-1] == ':' || word[word.length-1] == '\'' || word[word.length-1] == '\"'){
    return true;
  }
  else{
    return false;
  }
}

