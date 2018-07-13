//*******************************
//initialise the wave animation
//*******************************
function initWave() {
	SW = new SiriWave({
		container: document.getElementById('siric'),
		width: waveWidth,
		height: 300,
		speed: 0.06,
		amplitude: 1,
		container: document.getElementById('siric'),
		autostart: true,
	});
}

//*******************************
//randomise the vinyl / cd
//https://stackoverflow.com/questions/19693256/javascript-display-random-images
//*******************************

var imagesArray = ["cd.png", "cd2.png", "cd3.png"];
function displayImage() {
	//the first statement should generate a random number in the range 0 to 2 (the subscript values of the image file names in the imagesArray)
    var num = Math.floor(Math.random() * 3); 
    //the second statement display the random image from the imagesArray array in the canvas image using the random number as the subscript value
    document.getElementById("vinylImage").src = "asset/" + imagesArray[num];

    //console.log(imagesArray[num]);
}

//*******************************
//code for disk rotation
//code sample: https://stackoverflow.com/questions/13617538/jquery-rotate-function-not-working
//*******************************
var timer; 
var degree = 0;
$(function(){
	var cd = $("#cd");
	function rotate() {
		cd.css({ WebkitTransform: 'rotate(' + degree + 'deg)' });
		cd.css({ '-moz-transform': 'rotate(' + degree + 'deg)'}); 
		timer = setTimeout(function() {
			++degree; rotate();
		}, 5);
	}
	//rotate on dekstop
	if( $(window).width() > 600) {
		rotate();
	}	
});


//*******************************
//code for text changes based on time, 
//greetings text is randomised every 15 minutes
//*******************************

//check timing every 15 minutes and randomised the contents/greetings
//unit is milliseconds
setInterval(getCurrentTime, 900000);

//change contents according to time
function getCurrentTime() {
	//https://stackoverflow.com/questions/10599148/how-do-i-get-the-current-time-only-in-javascript
	//http://jsfiddle.net/BwJ7s/
	var currDate = new Date();
	var hours = currDate.getHours();
	//var minutes = currDate.getMinutes();
	//https://stackoverflow.com/questions/8935414/getminutes-0-9-how-to-with-two-numbers
	//if the minutes is less than 10, add zero in front of the val
	var minutes;
	if (currDate.getMinutes() < 10) {
		minutes = '0' + currDate.getMinutes();
	} else {
		minutes = currDate.getMinutes();
	}
	//******** shorthand - below *******
	//var minutes = (currDate.getMinutes()<10?'0':'') + currDate.getMinutes();
	var currTime = hours.toString() + minutes.toString();
	var greetingText = document.getElementById("greet");
	var greetingDesc = document.getElementById("greetingDesc");
	var randomised;
	var greetingTitle;
	var greetingDescription;

	//setting the default text
	//https://stackoverflow.com/questions/15709296/random-slogan-generator-with-using-javascripts-switch
	var defaultGreetingTitle = "Hello there! <br>How is it going?";
	var defaultGreetingDescription = "Relax your mind, listen to some music.";
   
    var random = function(min, max) {
    	return Math.floor(Math.random() * (max - min + 1)) + min;
    };  
    randomised = random(1, 3);

    //list of different greetings title and description
    if ( (currTime >= 800) && (currTime <= 1159) )  {
		switch(randomised) {
	        case 1:
	            greetingTitle = "Good Morning, my friend.";
	            greetingDescription = "Waking up is the best thing that we can be grateful for everyday.";
	            break;
	        case 2:
	            greetingTitle = "It's a brand <br>new day.";
	            greetingDescription = "Wishing you a day of full love and peace.";
	            break;
	        default:
	            greetingTitle = defaultGreetingTitle;
	            greetingDescription = defaultGreetingDescription;
	    }
	} else if ( (currTime >= 1200) && (currTime <= 1459) ) {
		switch(randomised) {
	        case 1:
	            greetingTitle = "Good Afternoon, dear friend.";
	            greetingDescription = "Good news.. Half of your day's work is over!";
	            break;
	        case 2:
	            greetingTitle = "Oh... <Br>It's lunch time!";
	            greetingDescription = "Remember to eat your lunch on time.";
	            break;
	        default:
	            greetingTitle = defaultGreetingTitle;
	            greetingDescription = defaultGreetingDescription;
	    }
	} else if ( (currTime >= 1500) && (currTime <= 1859) ) {
		switch(randomised) {
	        case 1:
	            greetingTitle = "Good Evening, my friend.";
	            greetingDescription = "Evening.. A reason to return home, & spend time with loved ones.";
	            break;
	        case 2:
	            greetingTitle = "Take a deep breath, clear your mind.";
	            greetingDescription = "Good evening. It’s only after twilight, that a new dawn begins.";
	            break;
	        default:
	            greetingTitle = defaultGreetingTitle;
	            greetingDescription = defaultGreetingDescription;
	    }
	} else if ( (currTime >= 1900) && (currTime <= 2359) ) {
		switch(randomised) {
	        case 1:
	            greetingTitle = "Good Night, my friend.";
	            greetingDescription = "Get ready for the sweet dreams of night.";
	            break;
	        case 2:
	            greetingTitle = "Nights are for relaxing.";
	            greetingDescription = "Your calm mind is the ultimate weapon against your challenges.";
	            break;
	        default:
	            greetingTitle = defaultGreetingTitle;
	            greetingDescription = defaultGreetingDescription;
	    }
	} else {
		switch(randomised) {
	        case 1:
	            greetingTitle = "It's late! Why aren't you sleeping?";
	            greetingDescription = "Early to bed early to rise, keeps a man healthy & wise.";
	            break;
	        case 2:
	            greetingTitle = "It's time to turn in for the night.";
	            greetingDescription = "One hour's sleep before midnight is worth 3 after.";
	            break;
	        default:
	            greetingTitle = defaultGreetingTitle;
	            greetingDescription = defaultGreetingDescription;
	    }
	}
    greetingText.innerHTML = greetingTitle;
    greetingDesc.innerHTML  = greetingDescription;
}

//*******************************
//Youtube API js starts here
//*******************************

// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.
//loading Youtube playlist instead of video, links: https://stackoverflow.com/questions/5123143/how-to-play-a-playlist-using-youtube-javascript-api
var player;
function onYouTubePlayerAPIReady(){
    player = new YT.Player('ytplayer', 
    {
      height: '122',
      width: '200',
      // height: '222',
      // width: '400',
      playerVars: {
        listType:'playlist',
        //insert Youtube playlist ID
        list: 'PL-mDeS2doOnkNa-Hh1DECuxyq0uiGr1iN',
        fs: 0,
        autoplay: 1
      },
      events: {
        'onReady': onPlayerReady,
        //solution from - https://stackoverflow.com/questions/13278257/how-can-i-get-the-video-title-when-using-youtube-player-iframe-api/35771072#35771072?newreg=f7f8bdd527834b4dbb0704435319b4bb

		// 'onReady': function onPlayerReady(event) {
		//    alert("The video title is: " +  event.target.getVideoData().title);
		// }
        'onStateChange': onPlayerStateChange
      }
   });
}


var currentSong;
// 4. The API will call this function when the video player is ready.
function onPlayerReady(evt) {
	evt.target.playVideo();
	setTimeout(setShuffleFunction, 1000); 
}

//shuffling the track
//https://stackoverflow.com/questions/15866979/youtube-api-playlist-shuffle-not-working
function setShuffleFunction(){
	player.setShuffle(true);
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
var videoId;

function onPlayerStateChange(evt) {
	if (evt.data == YT.PlayerState.PLAYING) {
	    var url = evt.target.getVideoUrl();
	    // "http://www.youtube.com/watch?v=gzDS-Kfd5XQ&feature=..."
	    var match = url.match(/[?&]v=([^&]+)/);
	    // ["?v=gzDS-Kfd5XQ", "gzDS-Kfd5XQ"]
	    videoId = match[1];
	}

	//alert("The video title is: " +  evt.target.getVideoData().title);
	//when player state changes etc next track, get song title and update name
    currentSong = evt.target.getVideoData().title;
    document.getElementById("currentTrack").innerHTML = currentSong;

    //change vinyl image when changing song
    displayImage();

}

function stopVideo() {
	player.stopVideo();
}

//*******************************
//Randomise lyrics of the day
//*******************************

//generate random interger
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function randomLyrics() {
	$(document).ready(function() {
		var lyricsNum = getRndInteger(0, 8); 
		var lyricsOfTheDay;

		switch(lyricsNum) {
			case 1:
				lyricsOfTheDay = "Imagine there's no heaven. It's easy if you try. No hell below us. Above us only sky. - John Lennon";
			break;
			case 2:
				lyricsOfTheDay = "Are we in love or just friends? Is this my beginning Or is this the end? - The Three Degrees";
			break;
			case 3:
				lyricsOfTheDay = "When I was small, and christmas trees were tall, We used to love while others used to play. - Bee Gees";
			break;
			case 4:
				lyricsOfTheDay = "There are places I'll remember. All my life though some have changed. Some forever not for better. Some have gone and some remain. - The Beatles";
			break;
			case 5:
				lyricsOfTheDay = "When you're down and troubled, And you need some love and care, And nothing, nothing is going right. Close your eyes and think of me. - Carole King";
			break;
			case 6:
				lyricsOfTheDay = "Hello darkness, my old friend. I've come to talk with you again. Because a vision softly creeping Left its seeds while I was sleeping. - Simon & Garfunkel";
			break;
			case 7:
				lyricsOfTheDay = "Slow down, you crazy child You're so ambitious for a juvenile But then if you're so smart, tell me Why are you still so afraid? - Billy Joel";
			break;
			default:
				lyricsOfTheDay = "The world is, a bad place, a bad place, a terrible place to live. But I don't want to die. - Marmalade";
		}
		document.getElementById("lyrics").innerHTML = lyricsOfTheDay;
	});
}

setInterval(randomLyrics, 300000);

//*******************************
//Preloader - remove preloader after 4 seconds
//https://codepen.io/mimoYmima/pen/fisgL
//listen now mobile play button animation
//*******************************
$(document).ready(function($) {  
	// site preloader -- also uncomment the div in the header and the css style for #preloader
	$('#preloader').delay(3500).fadeOut('slow',function(){$(this).remove();});
	$("playBtn").fadeIn(1500);

	$("#playBtn").click(function(){
		$("#playBtn").fadeOut(1000);
		$("#overlay").fadeOut(1000);
	});
});


