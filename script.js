let songIndex = 0;
let audioElement = new Audio('Songs/Piya-aaye-na.mp3');
let masterPlay = document.getElementById('masterPlay');
let masterPause = document.getElementById('masterPause');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = document.querySelectorAll('.songItem');
let songItemPause = document.querySelectorAll('.songItemPause');
let songItemPlay = document.querySelectorAll('.songItemPlay');
let next = document.getElementById('next');
let previous = document.getElementById('previous');
let masterSongName = document.getElementById('masterSongName');

let songs = [
    {songName: "Pehle bhi", filePath: "Songs/Pehle-bhi.mp3", coverPath: "Images/1.jpg"},
    {songName: "Piya aaye na", filePath: "Songs/Piya-aaye-na.mp3", coverPath: "Images/2.jpg"},
    {songName: "Tu jaane na", filePath: "Songs/Tu-jaane-na.mp3", coverPath: "Images/3.jpg"},
]
// audioElement.play();

masterPlay.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.style.display = 'none';
        masterPause.style.display = 'inline';
        gif.style.opacity = 1;
        songIndex = parseInt(songIndex);
        songItemPlay[songIndex].style.display = 'none';
        songItemPause[songIndex].style.display = 'inline';
    }
});
masterPause.addEventListener('click', () => {
    if(!audioElement.paused){
        audioElement.pause();
        masterPlay.style.display = 'inline';
        masterPause.style.display = 'none';
        gif.style.opacity = 0;
        songIndex = parseInt(songIndex);
        songItemPlay[songIndex].style.display = 'inline';
        songItemPause[songIndex].style.display = 'none';
    }
});

audioElement.addEventListener('timeupdate', () =>{
    // update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
});

songItems.forEach((element,i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
})

const makeAllPlays = () =>{
    songItemPlay.forEach((element)=>{
        element.style.display = 'inline';
    });
    songItemPause.forEach((element)=>{
        element.style.display = 'none';
    });
}

songItemPlay.forEach((element, i)=>{
    element.addEventListener('click',()=>{
        makeAllPlays();
        songIndex = parseInt(element.id);
        element.style.display = 'none';
        songItemPause[i].style.display = 'inline';
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.style.display = 'none';
        masterPause.style.display = 'inline';
        gif.style.opacity = 1;
    })
});

songItemPause.forEach((element, i)=>{
    element.addEventListener('click',()=>{
        songIndex = parseInt(element.id);
        element.style.display = 'none';
        songItemPlay[i].style.display = 'inline';
        audioElement.currentTime = 0;
        audioElement.pause();
        masterPlay.style.display = 'inline';
        masterPause.style.display = 'none';
        gif.style.opacity = 0;
    })
});

next.addEventListener('click', () =>{
    if(songIndex>=2){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.style.display = 'none';
    masterPause.style.display = 'inline';
    gif.style.opacity = 1;
})

previous.addEventListener('click', () =>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.style.display = 'none';
    masterPause.style.display = 'inline';
    gif.style.opacity = 1;
})


