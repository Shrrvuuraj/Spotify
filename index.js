let myProgressbar = document.querySelector("#myprogressbar");
let masterPlay = document.querySelector("#play");
let masterPause = document.querySelector("#pause");
let playGif = document.querySelector("#playgif");
let songList = document.querySelector(".songitem-container");
let audioElement = new Audio("");
audioElement.src=""
let currentSongIndex = null;
let timming = document.querySelector("#timming");
let learning =document.querySelector(".learning");
learning.style.display="none"
let playSong =document.querySelector("#playsong")
console.log(playSong);

masterPause.style.display = "none";

let songs = [
  { songName: "Track 1", filepath: "songs/1.mp3", coverpath: "covers/1.jpg" },
  { songName: "Track 2", filepath: "songs/2.mp3", coverpath: "covers/2.jpg" },
  { songName: "Track 3", filepath: "songs/3.mp3", coverpath: "covers/3.jpg" },
  { songName: "Track 4", filepath: "songs/4.mp3", coverpath: "covers/4.jpg" },
  { songName: "Track 1", filepath: "songs/5.mp3", coverpath: "covers/5.jpg" },
  { songName: "Track 1", filepath: "songs/6.mp3", coverpath: "covers/6.jpg" },
  { songName: "Track 1", filepath: "songs/7.mp3", coverpath: "covers/7.jpg" },
  { songName: "Track 1", filepath: "songs/8.mp3", coverpath: "covers/8.jpg" },
  { songName: "Track 1", filepath: "songs/9.mp3", coverpath: "covers/9.jpg" },
  { songName: "Time ni hai ganne search krne ka 😅", filepath: "songs/10.mp3", coverpath: "covers/10.jpg" },
];
//renders the song dynamically
songs.forEach((song, index) => {
  if (songList) {
    let divSongItem = document.createElement("div");
    divSongItem.className = "songitem";
    divSongItem.dataset.index = index;
    divSongItem.innerHTML = `
      <img src="${song.coverpath}" alt="Cover Image" />
      <span>${song.songName}</span>
      <span class="songlistplay">
        <span id="duration-${index}" class="duration">Loading...</span>
      </span>
    `;
    songList.appendChild(divSongItem);
    let tempAudio = new Audio(song.filepath);
    tempAudio.addEventListener("loadedmetadata", () => {
      let durationElem = document.getElementById(`duration-${index}`);
      if (durationElem) {
        durationElem.textContent = formatTime(tempAudio.duration);
        
      }
    });
  }
});

//formats duhhhh
function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

masterPause.addEventListener("click", playPause);
masterPlay.addEventListener("click", playPause);

function playPause() {
  if (audioElement.paused || audioElement.ended) {
    // Audio is paused or ended, play it
    audioElement.play()
      .then(() => {
        playGif.style.opacity = "1";
        masterPause.style.display = "block";
        masterPlay.style.display = "none";
      })
      .catch((error) => {
        console.log("Error playing audio:", error);
        playSong.classList.add("play-song-grow-jiggle");
        setTimeout(() => {
          playSong.classList.remove("play-song-grow-jiggle");
        }, 250);
      });
  } else {
    // Audio is currently playing, pause it
    audioElement.pause();
    playGif.style.opacity = "0";
    masterPause.style.display = "none";
    masterPlay.style.display = "block";
  }
}


songList.addEventListener("click", (event) => {
  let songItem = event.target.closest(".songitem");
  let index = songItem.dataset.index;
  
  if (index != null) {
    index = parseInt(index);
    if (index !== currentSongIndex) {
      currentSongIndex = index;
      audioElement.src = songs[index].filepath;
      audioElement.play();
      playGif.style.opacity = "1";
      masterPause.style.display = "block";
      masterPlay.style.display = "none";
    } else {
      if (!audioElement.paused) {
        audioElement.pause();
        playGif.style.opacity = "0";
        masterPlay.style.display = "block";
        masterPause.style.display = "none";
      } else {
        audioElement.play();
        playGif.style.opacity = "1";
        masterPlay.style.display = "none";
        masterPause.style.display = "block";
      }
    }
  }
});

audioElement.addEventListener("timeupdate", () => {
  if (audioElement.duration) {
    myProgressbar.value = (audioElement.currentTime / audioElement.duration) * 100;
  }
});

myProgressbar.addEventListener("input", () => {
  audioElement.currentTime = (myProgressbar.value / 100) * audioElement.duration;
});
