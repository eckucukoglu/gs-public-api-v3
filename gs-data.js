/**
 * Grooveshark Public API v3
 * @author Emre Can Kucukoglu (eckucukoglu@gmail.com)
 * Released under GNU General Public License v3
 */

/**@type {Object}*/var accessor = {
	consumerKey   : "yourConsumerKey", 
	consumerSecret: "yourConsumerSecret", 
	https: "https://",
	http: "http://",
	apiHost: "api.grooveshark.com",
	apiEndPoint: "/ws3.php",
	apiSigTag: "?sig=",
	coverArtUrl: "http://beta.grooveshark.com/static/amazonart/"	// Concatenate this url with; first, s:small, m:medium, l:large
																	// second, cover art url. 
																	// example: coverArtUrl + s + 841766.jpg
};

/**@define{number}*/var GSMSCount = 43;	// Since Object.keys() does not hold.
/**@type {Object}*/var GSMS = { //GROOVESHARK METHODS
	0 : "startSession",
	1 : "authenticate",
	2 : "getUserPlaylists",
	3 : "getArtistAlbums",
	4 : "getArtistSearchResults",
	5 : "getPlaylist",
	6 : "getPopularSongsToday",
	7 : "getCountry",
	8 : "getStreamKeyStreamServer",
	9 : "getUserInfo",
	10: "registerUser",
	11: "logout",
	12: "getSongsInfo",
	13: "getPlaylistSearchResults",
	14: "getAlbumSearchResults",
	15: "getSongSearchResults",
	16: "getArtistsInfo",
	17: "getArtistPopularSongs",
	18: "getAlbumSongs",
	19: "addUserLibrarySongsEx",
	20: "getUserLibrarySongs",
	21: "removeUserLibrarySongs",
	22: "getUserPlaylistsSubscribed",
	23: "subscribePlaylist",
	24: "unsubscribePlaylist",
	25: "deletePlaylist",
	26: "createPlaylist",
	27: "setPlaylistSongs",
	28: "renamePlaylist",
	29: "getUserFavoriteSongs",
	30: "removeUserFavoriteSongs",
	31: "addUserFavoriteSong",
	32: "getPopularSongsMonth",
	33: "markStreamKeyOver30Secs",
	34: "markSongComplete",
	35: "getAutoplaySong",
	36: "getAutoplayTags",
	37: "startAutoplayTag",
	38: "startAutoplay",
	39: "voteUpAutoplaySong",
	40: "voteDownAutoplaySong",
	41: "getSimilarArtists",
	42: "getSubscriberStreamKey"
};
