document.getElementById('search').addEventListener('click', function(){
    const songName = document.getElementById('songName').value;
    fetch(`https://api.lyrics.ovh/suggest/${songName}`)
    .then(res => res.json())
    .then(data => displaySongs(data.data))
    .catch(err => displayError('Something went wrong!! Please try again later!'))
})

const displaySongs = songs => {
    songs = songs.slice(0, 10);
    const songContainer = document.getElementById('songContainer');
    songContainer.innerHTML = '';
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `;
        songDiv.style.backgroundImage = `url('${song.album.cover_big}')`
        songContainer.appendChild(songDiv) ;      
    });
}

const getLyric = (artist, title) => {
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(res => res.json())
    .then(data => displayLyrics(data.lyrics))
    .catch(err => displayError('Sorry! I failed to load lyrics, Please try again later!!!'))
}

const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('songLyrics');
    lyricsDiv.innerText = lyrics;
}

const displayError = error => {
    const errorTag = document.getElementById('errorMsg');
    errorTag.innerText = error;
}