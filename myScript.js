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
	rotate();
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
	            greetingTitle = "Here is the 1";
	            break;
	        case 2:
	            greetingTitle = "Here is the 2";
	            break;
	        default:
	            greetingTitle = defaultGreetingTitle;
	            greetingDescription = defaultGreetingDescription;
	    }
	} else if ( (currTime >= 1200) && (currTime <= 1459) ) {
		switch(randomised) {
	        case 1:
	            greetingTitle = "It's evening! <br> Hang in there.";
	            greetingDescription = "walao";
	            break;
	        case 2:
	            greetingTitle = "Here is the 2";
	            greetingDescription = "hi";
	            break;
	        default:
	            greetingTitle = defaultGreetingTitle;
	            greetingDescription = defaultGreetingDescription;
	    }
	} else if ( (currTime >= 1500) && (currTime <= 1859) ) {
		switch(randomised) {
	        case 1:
	            greetingTitle = "It's evening! <br> Hang in there.";
	            greetingDescription = "walao";
	            break;
	        case 2:
	            greetingTitle = "Here is the 2";
	            greetingDescription = "hi";
	            break;
	        default:
	            greetingTitle = defaultGreetingTitle;
	            greetingDescription = defaultGreetingDescription;
	    }
	} else if ( (currTime >= 1900) && (currTime <= 2359) ) {
		switch(randomised) {
	        case 1:
	            greetingTitle = "Here is the 1";
	            break;
	        case 2:
	            greetingTitle = "Here is the 2";
	            break;
	        default:
	            greetingTitle = defaultGreetingTitle;
	            greetingDescription = defaultGreetingDescription;
	    }
	} else {
		switch(randomised) {
	        case 1:
	            greetingTitle = "It's Midnight, not sleeping yet?";
	            break;
	        case 2:
	            greetingTitle = "Here is the 2";
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




