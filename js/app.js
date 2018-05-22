/*
 * Create a list that holds all of your cards
 */
var cardList = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-bicycle', 'fa fa-leaf', 'fa fa-bomb'];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
window.addEventListener("load", setupCards());

function setupCards() {
	var cList;
	var lList = document.getElementsByClassName('card');
	for (var mct = 0; mct < 2; mct++) {
		cList = shuffle(cardList);
		for (var cct = 0; cct < 8; cct++) {
			lList[cct + mct * 8].innerHTML = "<i class='" + cList[cct] + "'></i>";
		}
	}
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex;
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
var startTime = new Date();
var timer1 = window.setInterval(startTimer, 1000);
var openCards = document.getElementsByClassName("card open show");
var cardArr;
cardArr = document.getElementsByTagName("li");
for (var ct = 0; ct < cardArr.length; ct++) {
	cardArr[ct].addEventListener("click", clickCard);
}
var rep = document.getElementsByClassName("fa fa-repeat");
rep[0].addEventListener("click", newGame);
var clbtn = document.getElementById("closebtn");
clbtn.addEventListener("click", closePopup)
window.addEventListener("click", focusPopup);

function focusPopup() {
	if (event.target == document.getElementById("popup")) document.getElementById("popup").style.display = "none";
}

function closePopup() {
	document.getElementById("popup").style.display = "none";
}

function newGame() {
	window.location.reload();
}

function clickCard() {
	if (!flag) {
		flag = true;
	}
	checkMatch(this);
}

function checkMatch(matchCard) {
	switch (openCards.length % 2) {
		case 1:
			if (firstCard.getElementsByTagName('i')[0].className == matchCard.getElementsByTagName('i')[0].className) {
				firstCard.className = 'card open show';
				matchCard.className = 'card open show';
				checkEndGame();
			} else {
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

function incrementMoves() {
	var movesctr = parseInt(document.getElementsByClassName("moves")[0].innerHTML);
	if (movesctr >= 0) document.getElementsByClassName("moves")[0].innerHTML = movesctr + 1;
	if (movesctr > 10) document.getElementsByClassName("fa fa-star")[0].style.display = 'none';
	if (movesctr > 20) document.getElementsByClassName("fa fa-star")[1].style.display = 'none';
	if (movesctr > 30) document.getElementsByClassName("fa fa-star")[2].style.display = 'none';
}

function startTimer() {
	var dt = new Date();
	document.getElementById('timer').innerHTML = Math.abs(dt.getMinutes() - startTime.getMinutes()) + ":" + Math.abs(dt.getSeconds() - startTime.getSeconds());
}

function checkEndGame() {
	var popText;
	if (openCards.length == 16) {
		popText = "Congratulations!! You Won the Memory Game in " + document.getElementById("timer").innerHTML + ", in " + document.getElementsByClassName("moves")[0].innerHTML + " moves. Your rating is "
		for (var st = 0; st < 3; st++) {
			if (document.getElementsByClassName('fa-star')[st].style.display != "none") popText += "<i class='fa fa-star'></i>"
		}
		popText += "<p> Another Game? " + "<button id='yesbtn' onClick='javascript:newGame();'>Yes</button><button id='nobtn' onClick='javascript:closePopup();'>No</button>";
		document.getElementById("popupmsg").innerHTML = popText;
		document.getElementById("popup").style.display = "block";
		document.getElementById("modcont").style.display = "block";
		window.clearInterval(timer1);
	}
}