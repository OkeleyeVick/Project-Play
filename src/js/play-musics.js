window.addEventListener("DOMContentLoaded", function () {
	// control doms
	const playPause_button = document.getElementById("play-pause");
	const next_button = document.getElementById("next");
	const prev_button = document.getElementById("prev");
	const stop_button = document.getElementById("stop");
	const audio_element = document.getElementById("audio");

	// song doms
	const artists = document.querySelector(".song-artist h5");
	const song_title = document.querySelector(".song-title h3");
	const cover_photo = document.querySelector(".song-cover-photo img");

	let current_song_index;

	const songs = [
		{
			song_path: "/src/folder/Peace Be Unto You (PBUY).mp3",
			artist: "Asake",
			title: "PBUY",
			coverPhoto: "https://trendybeatz.com/images/Asake-Peace-Be-Unto-You-PBUY-Artwork.jpeg",
		},
		{
			song_path: "/src/folder/Passenger Coins In A Fountain (Official Album Audio).mp3",
			artist: "Passenger",
			title: "Coins In A Fountain",
			coverPhoto: "https://i.ytimg.com/vi/-yDWjtrgkb0/maxresdefault.jpg",
		},
		{
			song_path: "/src/folder/Rag n Bone Man - Human (Official Video).mp3",
			artist: "Rag n Bone Man",
			title: "Human",
			coverPhoto: "https://static.billboard.com/files/media/Rag-n-Bone-Man-Human-vid-still-2017-billboard-1548-compressed.jpg",
		},
		{
			song_path: "/src/folder/Shakira - Hips Don t Lie (Official 4K Video) ft. Wyclef Jean.mp3",
			artist: "Shakira Ft Wyclef Jean",
			title: "Hips Don't Lie",
			coverPhoto: "https://4.bp.blogspot.com/-QbxSRkaaYhc/UVcHk_uaeEI/AAAAAAAALw8/081rF0_Q9P4/s1600/ShakiraHipsDontLie.jpg",
		},
		{
			song_path: "/src/folder/MichaelJackson-BillieJean.mp3",
			artist: "Michael Jackson",
			title: "Billie Jean",
			coverPhoto: "https://i.ytimg.com/vi/OuGUJrfdpdM/maxresdefault.jpg",
		},
	];

	const playIcon = `<svg class="text-[#23263D]" xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"> <path 	fill="currentColor" d="M5 5.274c0-1.707 1.826-2.792 3.325-1.977l12.362 6.726c1.566.853 1.566 3.101 0 3.953L8.325 20.702C6.826 21.518 5 20.432 5 18.726V5.274Z" /></svg>`;

	const pauseIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="text-[#23263D]" width="1.5rem" height="1.5rem" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2zm6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2z"/></svg>`;

	playPause_button.addEventListener("click", playPause);
	stop_button.addEventListener("click", stopPlayer);
	next_button.addEventListener("click", playNextSong);
	prev_button.addEventListener("click", playPreviousSong);
	initializePlayer(); //default when the page loads

	function initializePlayer() {
		current_song_index = 0;
		updatePlayer();
	}

	function updatePlayer() {
		const song = songs[current_song_index];

		artists.innerHTML = song.artist;
		song_title.innerHTML = song.title;
		cover_photo.src = song.coverPhoto;
		audio_element.src = song.song_path;
	}

	function playPause() {
		if (audio_element.paused) {
			audio_element.play();
			playPause_button.innerHTML = pauseIcon;
		} else {
			audio_element.pause();
			playPause_button.innerHTML = playIcon;
		}
		audio_element.addEventListener("ended", playNextSong);
	}

	function stopPlayer() {
		if (audio_element.pause || audio_element.play) {
			audio_element.pause();
			audio_element.currentTime = 0;
			playPause_button.innerHTML = playIcon;
		}
	}

	function playNextSong() {
		current_song_index++;
		if (current_song_index > songs.length - 1) {
			current_song_index = 0;
		}
		updatePlayer();
		playPause();
	}

	function playPreviousSong() {
		--current_song_index;
		updatePlayer();
		playPause();
	}

	function repeatSong() {}
});
