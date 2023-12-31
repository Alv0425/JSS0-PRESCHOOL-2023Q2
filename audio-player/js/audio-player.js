"use strict";
let currentMusuic = 0;
let currentDuration = 0;
let isPlayingNow = false;
let currTime = 0;
let isSorted = true;
let currentVolume = 0.7;

//Add playlist
const trackItems = [];
tracks.forEach((track, index) => {
  const playlistItem = document.createElement("li");
  const playlistItemButton = document.createElement("button");
  playlistItemButton.className = "track__button";
  playlistItem.append(playlistItemButton);
  const playlistTrackName = document.createElement("span");
  playlistTrackName.className = "track-name";
  const playlistTrackTitle = document.createElement("span");
  playlistTrackTitle.className = "track__title";
  const playlistTrackAuthor = document.createElement("span");
  playlistTrackAuthor.className = "track__author";
  const playlistTrackTime = document.createElement("span");
  playlistTrackTime.className = "track__time";
  playlistItemButton.append(playlistTrackName, playlistTrackTime);
  playlistTrackName.append(playlistTrackTitle, playlistTrackAuthor);
  playlistTrackTitle.textContent = track.title;
  playlistTrackAuthor.textContent = track.author;
  playlistList.append(playlistItem);
  trackItems.push(playlistItem);
  playlistItemButton.addEventListener("click", () => {
    currentMusuic = index;
    openTrack(currentMusuic);
    currTime = 0;
    isPlayingNow = false;
    playMusic();
  });
});

//Open first track
openTrack(0);

//Load audio durations for all tracks in the playlist
srcs.forEach((src, index) => {
  const audio = new Audio();
  audio.preload = "auto";
  audio.src = src;
  audio.onloadedmetadata = () => {
    trackItems[index].childNodes[0].childNodes[1].textContent = getCurrentTime(audio.duration);
  };
});

//Preload cover image for animated change
function setCoverImage(src) {
  const image = new Image();
  image.src = src;
  image.onload = () => {
    cover.style.backgroundImage = `url(${src})`;
  };
}

//Load all data and media required for track
function openTrack(index) {
  if (isPlayingNow) {
    music.pause();
  }
  music.src = tracks[index].src;
  currTime = 0;
  timeCurrent.textContent = currTime;
  body.style.backgroundColor = tracks[index].color;
  setCoverImage(tracks[index].cover);
  trackTitle.textContent = tracks[index].title;
  trackAuthor.textContent = tracks[index].author;
  trackItems.forEach((item) => {
    item.className = "track";
  });
  trackItems[index].classList.add("track-active");
  music.addEventListener("loadedmetadata",
    function metadataLoad(event) {
      timeFull.textContent = getCurrentTime(music.duration);
      currentDuration = music.duration;
      event.target.removeEventListener("loadedmetadata", metadataLoad);
    },false);
}

function openTrackPromise(index) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (isPlayingNow) {
        music.pause();
      }
      music.src = tracks[index].src;
      currTime = 0;
      timeCurrent.textContent = currTime;
      body.style.backgroundColor = tracks[index].color;
      setCoverImage(tracks[index].cover);
      trackTitle.textContent = tracks[index].title;
      trackAuthor.textContent = tracks[index].author;
      trackItems.forEach((item) => {
        item.className = "track";
      });
      trackItems[index].classList.add("track-active");
      music.addEventListener("loadedmetadata",
        function metadataLoad(event) {
          timeFull.textContent = getCurrentTime(music.duration);
          currentDuration = music.duration;
          event.target.removeEventListener("loadedmetadata", metadataLoad);
          resolve('track loaded');
        },false);
    }, 100);
  });
}

//Function playing audio
function playMusic() {
  if (!isPlayingNow) {
    music.currentTime = currTime;
    music.play();
    isPlayingNow = true;
    controlPlayPause.classList.remove("control-play");
    controlPlayPause.classList.add("control-pause");
    backgroundBulb.classList.add("blub-rotate");
    backgroundBulb2.classList.add("blub-rotate");
    backgroundBulb3.classList.add("blub-rotate");
  }
}

//Function pausing audio
function pauseMusic() {
  if (isPlayingNow) {
    music.pause();
    isPlayingNow = false;
    controlPlayPause.classList.add("control-play");
    controlPlayPause.classList.remove("control-pause");
    backgroundBulb.classList.remove("blub-rotate");
    backgroundBulb2.classList.remove("blub-rotate");
    backgroundBulb3.classList.remove("blub-rotate");
  }
}

//Onclick events handler for play/pause button
controlPlayPause.addEventListener("click", () => {
  if (isPlayingNow) {
    pauseMusic();
  } else {
    playMusic();
  }
});

//Progress handler
setInterval(() => {
  progressRange.value = (music.currentTime / music.duration) * 100;
  progressCurrent.style.width = progressRange.value + "%";
  timeCurrent.textContent = getCurrentTime(music.currentTime);
  currTime = music.currentTime;
  if (currTime == music.duration) {
    if (isSorted) {
      playNext();
    } else {
      let randomIndex = Math.floor(Math.random() * tracks.length);
      currentMusuic =
        randomIndex !== currentMusuic
          ? randomIndex
          : Math.floor(Math.random() * 4);
      setTimeout(() => {
        openTrack(currentMusuic);
        isPlayingNow = false;
        playMusic();
      }, 100);
    }
  }
}, 500);

//Play next handler
function playNext() {
  if (currentMusuic < tracks.length - 1) {
    currentMusuic += 1;
    openTrackPromise(currentMusuic).then(() => {
      setTimeout(() => {
        isPlayingNow = false;
        playMusic();
      }, 100);
    });
  } else {
    currentMusuic = 0;
    openTrackPromise(currentMusuic).then(() => {
      setTimeout(() => {
        isPlayingNow = false;
        playMusic();
      }, 100);
    });
  }
}

//Play prev handler
function playPrev() {
  if (currentMusuic > 0) {
    currentMusuic -= 1;
    openTrack(currentMusuic);
    setTimeout(() => {
      isPlayingNow = false;
      playMusic();
    }, 100);
  } else {
    currentMusuic = tracks.length - 1;
    openTrack(currentMusuic);
    setTimeout(() => {
      isPlayingNow = false;
      playMusic();
    }, 100);
  }
}

//Event listeners for click on play next and prev
controlNext.addEventListener("click", () => {
  playNext();
});
controlPrev.addEventListener("click", () => {
  playPrev();
});

//Event listener for interactions with progress bar
progressRange.addEventListener("input", () => {
  currTime = (progressRange.value * music.duration) / 100;
  music.currentTime = currTime;
});

//Repeat-shuffle modes
controlRepeatShuffle.addEventListener("click", () => {
  if (isSorted) {
    isSorted = false;
    controlRepeatShuffle.classList.remove("control-repeat");
    controlRepeatShuffle.classList.add("control-shuffle");
  } else {
    isSorted = true;
    controlRepeatShuffle.classList.add("control-repeat");
    controlRepeatShuffle.classList.remove("control-shuffle");
  }
});

//keyboard events
document.addEventListener("keyup", (event) => {
  if (event.code == "Space") {
    if (isPlayingNow) {
      setTimeout(() => {
        pauseMusic();
      }, 10);
    } else {
      setTimeout(() => {
        playMusic();
      }, 10);
    }
  }
  if (event.key == "ArrowUp") {
    setTimeout(() => {
      playPrev();
    }, 500);
  }
  if (event.key == "ArrowDown") {
    setTimeout(() => {
      playNext();
    }, 500);
  }
});

//Volume controls
volumeBar.addEventListener("input", () => {
  currentVolume = volumeBar.value / 100;
  music.volume = currentVolume;
});

controlVolume.addEventListener("click", () => {
  if (!music.muted) {
    music.muted = true;
    controlVolume.classList.add("control-volume-muted");
  } else {
    music.muted = false;
    controlVolume.classList.remove("control-volume-muted");
  }
});