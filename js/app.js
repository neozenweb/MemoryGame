/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
  
var firstCard;
var flag = false;
var startTime = new Date();;
var timer1 = window.setInterval(startTimer,1000);
var openCards = document.getElementsByClassName("card open show");
var cardArr;
cardArr = document.getElementsByTagName("li");
for(var ct=0;ct<cardArr.length;ct++)
    {
        cardArr[ct].addEventListener("click",clickCard);
    }
var rep = document.getElementsByClassName("fa fa-repeat");
rep[0].addEventListener("click",newGame);

function newGame()
{
    
    window.location.reload();
}

function clickCard() {
      
    if(!flag)
        {
            
             flag = true;
        }
    
   
    checkMatch(this);
}

function checkMatch(matchCard)
{
    
  
        
    switch(openCards.length % 2)
        {
        
           case 1: 

               if(firstCard.getElementsByTagName('i')[0].className == matchCard.getElementsByTagName('i')[0].className)
                    {
                         firstCard.className = 'card open show';
                       matchCard.className = 'card open show';
                       checkEndGame();

                    }
                else
                    {
                       firstCard.className = 'card';
                       matchCard.className = 'card';
                         incrementMoves();
                    }
                  
                
                 break;
            case 0:
               
                matchCard.className = "card open show";
                firstCard = matchCard;
                break;
        
           
    
        }
    
    
}

function incrementMoves()
{
    
    var movesctr = parseInt(document.getElementsByClassName("moves")[0].innerHTML);
   
   if(movesctr >= 0)
        document.getElementsByClassName("moves")[0].innerHTML = movesctr + 1;
   
   
    if(movesctr > 4)
       document.getElementsByClassName("fa fa-star")[0].style.display='none';
     if(movesctr > 10)
       document.getElementsByClassName("fa fa-star")[1].style.display='none';
     if(movesctr > 20)
       document.getElementsByClassName("fa fa-star")[2].style.display='none';
         
}


function startTimer()
{
     
    var dt = new Date();
    document.getElementById('timer').innerHTML = Math.abs(dt.getMinutes() - startTime.getMinutes()) + ":" + Math.abs(dt.getSeconds() - startTime.getSeconds());
    
    
    
}

function checkEndGame()
{    
  
    if(openCards.length == 16)
        {
            alert("CONGATULATIONS !! You Won!!! "); 
            window.clearInterval(timer1);
            
            
        }
         
    
}

