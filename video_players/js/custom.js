const video = document.querySelector('#video');
const durationSllider = document.querySelector('#durationSllider');
const volumeSlider = document.querySelector('#volumeSlider');
const playBtn = document.querySelector('#play');
const speedSelect = document.querySelector('#speedSelect');

const currentTimeText = document.querySelector('.currentTime');



function playPause(){
    if(video.paused){
        video.play();
        playBtn.innerText = 'pause';
    }else{
        video.pause();
        playBtn.innerText = 'play';
    }
}

video.addEventListener('timeupdate', ()=>{
    const percent = (video.currentTime / video.duration) * 100;
    durationSllider.value = percent;

    let currentMin = Math.floor(video.currentTime / 60);
    let currentSec = Math.floor(video.currentTime % 60);

    if(currentSec < 10) currentSec = '0' + currentSec;
    if(currentMin < 10) currentMin = '0' + currentMin;

    currentTimeText.innerText = `${currentMin}:${currentSec}`;
});

durationSllider.addEventListener('input', ()=>{
    const seekTime = (durationSllider.value / 100) * video.duration;
    video.currentTime = seekTime;
})

video.addEventListener('loadmetadata', ()=>{
    let currentMin = Math.floor(video.currentTime / 60);
    let currentSec = Math.floor(video.currentTime % 60);

    if(currentSec < 10) currentSec = '0' + currentSec;
    if(currentMin < 10) currentMin = '0' + currentMin;

    currentTimeText.innerText = `${currentMin}:${currentSec}`;
})

function restart(){
    video.currentTime = 0;
    playPause();
    playBtn.innerText = 'play';
}

volumeSlider.addEventListener('input', (e)=>{
    video.volume = e.target.value;
})

function changeSpeed(){
    video.playbackRate = speedSelect.value;
}

function toggleFullScreen(){
    if(video.requestFullscreen){
        video.requestFullscreen();
    } else if(video.webkitrequestFullScreen){
        video.webkitrequestFullScreen();
    }
}