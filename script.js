console.log("Welcome to Beats Music");
//Initialize the Variables
let songindex = 0;
let audioElement = new Audio('songs/0.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let MasterSongName = document.getElementById('MasterSongName');
let songItem = Array.from(document.getElementsByClassName("songItem"));

let songs = [
    { songName: "Suna Hai", filePath: "songs/Suna Hai.mp3", coverPath: "cover/cover.jpg" },
    { songName: "Shiddat", filePath: "songs/shiddat.mp3", coverPath: "cover/shiddat.jpg" },
    { songName: "Tera Zikr", filePath: "songs/tera zikr.mp3", coverPath: "cover/tera zikr.jpg" },
    { songName: "Yeh Ishq Haaye", filePath: "songs/yeh ishq haaye.mp3", coverPath: "cover/yeh ishq haaye.jpg" },
    { songName: "Laute Nahi", filePath: "songs/laute nahi.mp3", coverPath: "cover/laute nahi.jpg" },
    { songName: "Tum Se Hi", filePath: "songs/tum se hi.mp3", coverPath: "cover/tum se hi.jpg" },
]

songItem.forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// audioElement.play();

//Handle Play/Pause Button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle'); 
        gif.style.opacity = 0;
    }
})

//Listen to Events
audioElement.addEventListener('timeupdate', () => {
    //Updating seek bar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songindex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songindex}.mp3`;
        MasterSongName.innerText = songs[songindex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songindex>=5){
        songindex = 0;
    }
    else{
        songindex += 1;
    }
    audioElement.src = `songs/${songindex}.mp3`;
    MasterSongName.innerText = songs[songindex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
})
document.getElementById('previous').addEventListener('click', ()=>{
    if(songindex<=0){
        songindex = 0;
    }
    else{
        songindex += 1;
    }
    audioElement.src = `songs/${songindex}.mp3`;
    MasterSongName.innerText = songs[songindex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
})