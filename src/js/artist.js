const API_KEY = "6473c3ce7dmsh28c8afd0l93343dep1d0f1fjsn02e8bc02b53a";

const currentURL = window.location.search;
const getParams = new URLSearchParams(currentURL);
const artist_id = getParams.get("artist_id");

const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": `${API_KEY}`,
		"X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
	},
};

// fetch about artist details himself
async function fetchArtistDetails() {
	const response = await fetch(`https://genius-song-lyrics1.p.rapidapi.com/artist/details/?id=${artist_id}`, options);
	if (!response.ok) throw "Cannot fetch details";
	const data = await response.json();
	const {
		description_preview,
		facebook_name,
		image_url,
		instagram_name,
		header_image_url,
		name,
		twitter_name,
		user = { header_image_url, about_me_summary, name },
	} = await data.response.artist;
}

// fetch about artist albums
async function fetchArtistAlbums() {
	const response = await fetch(`https://genius-song-lyrics1.p.rapidapi.com/artist/albums/?id=${artist_id}`, options);
	const data = await response.json();
	let albums = await data?.response?.albums;

	albums.slice(0, 10).forEach((album) => {
		const { cover_art_thumbnail_url, name, url, cover_art_url } = album;
		const $albumItemsWrapper = document.querySelector(".recent-albums .albums-wrapper");
		const $albumItem = document.getElementById("album-item"); //get cloneable item
		let $cloneAlbumItem = $albumItem.content.cloneNode(true);

		$cloneAlbumItem.querySelector("li > a").href = url;
		$cloneAlbumItem.querySelector(".image-wrap img").src = cover_art_thumbnail_url ?? cover_art_url;
		$cloneAlbumItem.querySelector(".album-title small").innerHTML = name;

		$albumItemsWrapper.appendChild($cloneAlbumItem); //paste the details
	});
}

// fetch about artist songs
async function fetchArtistSongs() {
	const response = await fetch(`https://genius-song-lyrics1.p.rapidapi.com/artists/songs/?id=${artist_id}`, options);
	const results = await response.json();
	const songs = await results?.response?.songs;

	songs.slice(0, 15).forEach((song) => {
		const { title, artist_names } = song;

		const $trackTemplate = document.getElementById("track-item-template");
		const $trackTemplatesWrapper = document.querySelector(".tracks-items-wrapper");

		const $clonedTrackTemplate = $trackTemplate.content.cloneNode(true);
		$clonedTrackTemplate.querySelector("span.track-title").innerHTML = title;
		$clonedTrackTemplate.querySelector("small.track-artistes").innerHTML = artist_names;

		$trackTemplatesWrapper.appendChild($clonedTrackTemplate); //paste to screen
	});
}

fetchArtistAlbums();
fetchArtistDetails();
fetchArtistSongs();
// spotify api 2 for search of artiste
