function searchSongs() {
    let artist = document.getElementById("artistInput").value.trim();
    if (!artist) {
        alert("Please enter an artist name.");
        return;
    }

    fetch(`/itunes?artist=${encodeURIComponent(artist)}`)
        .then(response => response.json())
        .then(data => {
            let songList = document.getElementById("songList");
            songList.innerHTML = "";

            if (data.error) {
                songList.innerHTML = `<li style="color: red;">${data.error}</li>`;
                return;
            }

            data.songs.forEach(song => {
                let li = document.createElement("li");
                li.textContent = song;
                songList.appendChild(li);
            });
        })
        .catch(error => console.error("Error fetching songs:", error));
}
