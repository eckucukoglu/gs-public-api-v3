/**
 * Grooveshark Public API v3 Class
 * @author Emre Can Kucukoglu (eckucukoglu@gmail.com)
 * Released under GNU General Public License v3
 */

/* Requires md5 as its hash function */

/**
 * @constructor
 * 
 * @param {Grooveshark} callbackclass
 */
ARapi.grooveshark.request = function(callbackclass) {
	/**@type {Grooveshark}*/this.callback = callbackclass;
	/**@type {tools.hex_md5}*/this.HMAC = new tools.hex_md5();  // HMAC (using MD5 as its hash function)
	/**@type {string}*/this.sessionID = "";						// Session Id should be stored, since it is used
																// most of the methods.
																
};

					/////////////////////////////////////
					//	GROOVESHARK PUBLIC API METHODS //
					/////////////////////////////////////
/**
 * Get stream key, ID, etc. from songID for a subscriber account. 
 * Requires country object obtained from getCountry and 
 * a logged-in sessionID from a Grooveshark Anywhere subscriber.
 * 
 * You must provide a sessionID with this method.
 * 
 * @param {number} songID
 * @param {Object} country
 * @param {boolean} lowBitrate
 */
ARapi.grooveshark.request.prototype.getSubscriberStreamKey = function(songID, country, /*optional*/lowBitrate) {
    /**@type {number}*/var methodID = 42;
    /**@type {boolean}*/var sessionIDRequired = true;
    /**@type {Object}*/ var parameters = new Object;
    /**@type {boolean}*/var isHTTPS = false;
    
    parameters['songID'] = songID;
    parameters['country'] = country;
    if (lowBitrate)
		parameters['lowBitrate'] = 1;
    
    /**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
    this.makeCall(methodID, payload, isHTTPS);
};

/**
 * Get similar artist for a given artistID.
 * 
 * @param {number} artistID
 * @param {number} limit
 */
ARapi.grooveshark.request.prototype.getSimilarArtists = function(artistID, /*optional*/limit) {
    /**@type {number}*/var methodID = 41;
    /**@type {boolean}*/var sessionIDRequired = false;
    /**@type {Object}*/ var parameters = new Object;
    /**@type {boolean}*/var isHTTPS = false;
    
    parameters['artistID'] = artistID;
    if (limit != 0)
        parameters['limit'] = limit;
    
    /**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
    this.makeCall(methodID, payload, isHTTPS);
};					
					
/**
 * Vote down a song
 * Adds song to the frowns list, and returns this autoplayState.
 * 
 * @param {Object} song
 * @param {Object} autoplayState
 */
ARapi.grooveshark.request.prototype.voteDownAutoplaySong = function(song, autoplayState) {
    /**@type {number}*/var methodID = 40;
    /**@type {boolean}*/var sessionIDRequired = false;
    /**@type {Object}*/ var parameters = new Object;
    /**@type {boolean}*/var isHTTPS = false;
    
    parameters['song'] = song;
    parameters['autoplayState'] = autoplayState;
    
    /**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
    this.makeCall(methodID, payload, isHTTPS);
};

/**
 * Vote up a song.
 * Returns same autoplayState.
 * 
 * @param {Object} song
 * @param {Object} autoplayState
 */
ARapi.grooveshark.request.prototype.voteUpAutoplaySong = function(song, autoplayState) {
    /**@type {number}*/var methodID = 39;
    /**@type {boolean}*/var sessionIDRequired = false;
    /**@type {Object}*/ var parameters = new Object;
    /**@type {boolean}*/var isHTTPS = false;
    
    parameters['song'] = song;
    parameters['autoplayState'] = autoplayState;
    
    /**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
    this.makeCall(methodID, payload, isHTTPS);
};

/**
 * Start autoplay and grab a relevant song
 * 
 * @param {Object} artistIDs
 * @param {Object} songIDs
 */
ARapi.grooveshark.request.prototype.startAutoplay = function(artistIDs, /*optional*/songIDs) {
    /**@type {number}*/var methodID = 38;
    /**@type {boolean}*/var sessionIDRequired = false;
    /**@type {Object}*/ var parameters = new Object;
    /**@type {boolean}*/var isHTTPS = false;
    
    parameters['artistIDs'] = artistIDs;
    if (songIDs != null && songIDs != undefined)
        parameters['songIDs'] = songIDs;
    
    /**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
    this.makeCall(methodID, payload, isHTTPS);
};

/**
 * Start autoplay using a tag and grab a relevant song
 * 
 * @param {number} tagID
 */
ARapi.grooveshark.request.prototype.startAutoplayTag = function(tagID) {
    /**@type {number}*/var methodID = 37;
    /**@type {boolean}*/var sessionIDRequired = false;
    /**@type {Object}*/ var parameters = new Object;
    /**@type {boolean}*/var isHTTPS = false;
    
    parameters['tagID'] = tagID;
    
    /**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
    this.makeCall(methodID, payload, isHTTPS);
};

/**
 * Gets a list of tags (stations)
 * 
 */
ARapi.grooveshark.request.prototype.getAutoplayTags = function() {
    /**@type {number}*/var methodID = 36;
    /**@type {boolean}*/var sessionIDRequired = false;
    /**@type {Object}*/ var parameters = new Object;
    /**@type {boolean}*/var isHTTPS = false;
    
    /**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
    this.makeCall(methodID, payload, isHTTPS);
};

/**
 * Grab a relevant song for autoplay
 * 
 * @param {Object} autoplayState
 */
ARapi.grooveshark.request.prototype.getAutoplaySong = function(autoplayState) {
    /**@type {number}*/var methodID = 35;
    /**@type {boolean}*/var sessionIDRequired = false;
    /**@type {Object}*/ var parameters = new Object;
    /**@type {boolean}*/var isHTTPS = false;
    
    parameters['autoplayState'] = autoplayState;
    
    /**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
    this.makeCall(methodID, payload, isHTTPS);
};

/**
 * Mark a song as complete (played for greater than or equal to 30 seconds, 
 * and having reached the last second either through seeking or normal playback).
 * You must provide a sessionID with this method.
 * 
 * @param {number} songID
 * @param {string} streamKey
 * @param {number} streamServerID
 * @param {Object} autoplayState
 */
ARapi.grooveshark.request.prototype.markSongComplete = function(songID, streamKey, streamServerID, /*optional*/autoplayState) {
    /**@type {number}*/var methodID = 34;
    /**@type {boolean}*/var sessionIDRequired = true;
    /**@type {Object}*/ var parameters = new Object;
    /**@type {boolean}*/var isHTTPS = false;
    
    parameters['songID'] = songID;
    parameters['streamKey'] = streamKey;
    parameters['streamServerID'] = streamServerID;
    if (autoplayState != null && autoplayState != undefined)
        parameters['autoplayState'] = autoplayState;
    
    /**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
    this.makeCall(methodID, payload, isHTTPS);
};

/**
 * Mark a song as having been played for greater than or equal to 30 seconds.
 * You must provide a sessionID with this method.
 * 
 * @param {string} streamKey
 * @param {number} streamServerID
 * @param {string} uniqueID
 */
ARapi.grooveshark.request.prototype.markStreamKeyOver30Secs = function(streamKey, streamServerID, /*optional*/uniqueID) {
    /**@type {number}*/var methodID = 33;
    /**@type {boolean}*/var sessionIDRequired = true;
    /**@type {Object}*/ var parameters = new Object;
    /**@type {boolean}*/var isHTTPS = false;
    
    parameters['streamKey'] = streamKey;
    parameters['streamServerID'] = streamServerID;
    if (uniqueID != "")
        parameters['uniqueID'] = uniqueID;
    
    /**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
    this.makeCall(methodID, payload, isHTTPS);
};

/**
 * Get a subset of this month's popular songs, 
 * from the Grooveshark popular billboard.
 * 
 * @param {number} limit
 */
ARapi.grooveshark.request.prototype.getPopularSongsMonth = function(/*optional*/limit) {
    /**@type {number}*/var methodID = 32;
    /**@type {boolean}*/var sessionIDRequired = false;
    /**@type {Object}*/ var parameters = new Object;
    /**@type {boolean}*/var isHTTPS = false;
    
    if (limit != 0)
        parameters['limit'] = limit;
    
    /**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
    this.makeCall(methodID, payload, isHTTPS);
};

/**
 * Add a favorite song for a user. 
 * Must provide a logged-in sessionID.
 * You must provide a sessionID with this method.
 * 
 * @param {number} songID
 */
ARapi.grooveshark.request.prototype.addUserFavoriteSong = function(songID) {
    /**@type {number}*/var methodID = 31;
    /**@type {boolean}*/var sessionIDRequired = true;
    /**@type {Object}*/ var parameters = new Object;
    /**@type {boolean}*/var isHTTPS = false;
    
    parameters['songID'] = songID;
    
    /**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
    this.makeCall(methodID, payload, isHTTPS);
};

/**
 * Remove a set of favorite songs for a user. 
 * Must provide a logged-in sessionID.
 * You must provide a sessionID with this method.
 * 
 * @param {string} songIDs
 */
ARapi.grooveshark.request.prototype.removeUserFavoriteSongs = function(songIDs) {
    /**@type {number}*/var methodID = 30;
    /**@type {boolean}*/var sessionIDRequired = true;
    /**@type {Object}*/ var parameters = new Object;
    /**@type {boolean}*/var isHTTPS = false;
    
    parameters['songIDs'] = songIDs;
    
    /**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
    this.makeCall(methodID, payload, isHTTPS);
};

/**
 * Get user favorite songs. 
 * Requires an authenticated session.
 * You must provide a sessionID with this method.
 * 
 * @param {number} limit
 */
ARapi.grooveshark.request.prototype.getUserFavoriteSongs = function(/*optional*/limit) {
    /**@type {number}*/var methodID = 29;
    /**@type {boolean}*/var sessionIDRequired = true;
    /**@type {Object}*/ var parameters = new Object;
    /**@type {boolean}*/var isHTTPS = false;
    
    if (limit != 0) 
        parameters['limit'] = limit;
    
    /**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
    this.makeCall(methodID, payload, isHTTPS);
};

/**
 * Renames a playlist. 
 * You must provide a sessionID with this method.
 * 
 * @param {number} playlistID
 * @param {string} name
 */
ARapi.grooveshark.request.prototype.renamePlaylist = function(playlistID, name) {
    /**@type {number}*/var methodID = 28;
    /**@type {boolean}*/var sessionIDRequired = true;
    /**@type {Object}*/ var parameters = new Object;
    /**@type {boolean}*/var isHTTPS = false;
    
    parameters['playlistID'] = playlistID;
    parameters['name'] = name;
    
    /**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
    this.makeCall(methodID, payload, isHTTPS);
};

/**
 * Set playlist songs, overwrites any already saved
 * You must provide a sessionID with this method.
 * 
 * @param {number} playlistID
 * @param {Array.<number>} songIDs
 */
ARapi.grooveshark.request.prototype.setPlaylistSongs = function(playlistID, songIDs) {
    /**@type {number}*/var methodID = 27;
    /**@type {boolean}*/var sessionIDRequired = true;
    /**@type {Object}*/ var parameters = new Object;
    /**@type {boolean}*/var isHTTPS = false;
    
    parameters['playlistID'] = playlistID;
    parameters['songIDs'] = songIDs;
    
    /**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
    this.makeCall(methodID, payload, isHTTPS);
};

/**
 * Create a new playlist, optionally adding songs to it.
 * You must provide a sessionID with this method.
 * 
 * @param {string} name
 * @param {Array.<number>} songIDs
 */
ARapi.grooveshark.request.prototype.createPlaylist = function(name, songIDs) {
    /**@type {number}*/var methodID = 26;
    /**@type {boolean}*/var sessionIDRequired = true;
    /**@type {Object}*/ var parameters = new Object;
    /**@type {boolean}*/var isHTTPS = false;
    
    parameters['name'] = name;
    parameters['songIDs'] = songIDs;
    
    /**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
    this.makeCall(methodID, payload, isHTTPS);
};

/**
 * Deletes a playlist.
 * You must provide a sessionID with this method.
 * 
 * @param {number} playlistID
 */
ARapi.grooveshark.request.prototype.deletePlaylist = function(playlistID) {
    /**@type {number}*/var methodID = 25;
    /**@type {boolean}*/var sessionIDRequired = true;
    /**@type {Object}*/ var parameters = new Object;
    /**@type {boolean}*/var isHTTPS = false;
    
    parameters['playlistID'] = playlistID;
    
    /**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
    this.makeCall(methodID, payload, isHTTPS);
};					
					
/**
 * Unsubscribe from a playlist for the logged-in user. 
 * Requires an authenticated session.
 * You must provide a sessionID with this method.
 * 
 * @param {number} playlistID
 */
ARapi.grooveshark.request.prototype.unsubscribePlaylist = function(playlistID) {
    /**@type {number}*/var methodID = 24;
    /**@type {boolean}*/var sessionIDRequired = true;
    /**@type {Object}*/ var parameters = new Object;
    /**@type {boolean}*/var isHTTPS = false;
    
    parameters['playlistID'] = playlistID;
    
    /**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
    this.makeCall(methodID, payload, isHTTPS);
};

/**
 * Subscribe to a playlist for the logged-in user. 
 * Requires an authenticated session.
 * You must provide a sessionID with this method.

 * @param {number} playlistID
 */
ARapi.grooveshark.request.prototype.subscribePlaylist = function(playlistID) {
    /**@type {number}*/var methodID = 23;
    /**@type {boolean}*/var sessionIDRequired = true;
    /**@type {Object}*/ var parameters = new Object;
    /**@type {boolean}*/var isHTTPS = false;
    
    parameters['playlistID'] = playlistID;
    
    /**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
    this.makeCall(methodID, payload, isHTTPS);
};

/**
 * Get subscribed playlists of the logged-in user. 
 * Requires an authenticated session.
 * You must provide a sessionID with this method.
 * 
 */
ARapi.grooveshark.request.prototype.getUserPlaylistsSubscribed = function() {
    /**@type {number}*/var methodID = 22;
    /**@type {boolean}*/var sessionIDRequired = true;
    /**@type {Object}*/var parameters = new Object;
    /**@type {boolean}*/var isHTTPS = false;
    
    /**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
    this.makeCall(methodID, payload, isHTTPS);
};					
					
/**
 * Remove songs from a user's library.
 * You must provide a sessionID with this method.
 * 
 * @param {string} songIDs
 * @param {string} albumIDs
 * @param {string} artistIDs
 */
ARapi.grooveshark.request.prototype.removeUserLibrarySongs = function(songIDs, albumIDs, artistIDs) {
    /**@type {number}*/var methodID = 21;
    /**@type {boolean}*/var sessionIDRequired = true;
    /**@type {Object}*/ var parameters = new Object;
    /**@type {boolean}*/var isHTTPS = false;
    
    parameters['songIDs'] = songIDs;
    parameters['albumIDs'] = albumIDs;
    parameters['artistIDs'] = artistIDs;
    
    /**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
    this.makeCall(methodID, payload, isHTTPS);
};

/**
 * Get user library songs. Requires an authenticated session.
 * You must provide a sessionID with this method.
 * 
 * @param {number} limit
 */
ARapi.grooveshark.request.prototype.getUserLibrarySongs = function(/* optional */limit) {
    /**@type {number}*/var methodID = 20;
    /**@type {boolean}*/var sessionIDRequired = true;
    /**@type {Object}*/ var parameters = new Object;
    /**@type {boolean}*/var isHTTPS = false;
    
    if (limit != 0) 
        parameters['limit'] = limit;
    
    /**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
    this.makeCall(methodID, payload, isHTTPS);
};

/**
 * Add songs to a user's library. 
 * Songs should be an array of objects representing each song with keys: 
 * songID, albumID, artistID, trackNum.
 * 
 * You must provide a sessionID with this method.
 * 
 * @param {Array.<Object>} songs
 */
ARapi.grooveshark.request.prototype.addUserLibrarySongsEx = function(songs) {
    /**@type {number}*/var methodID = 19;
    /**@type {boolean}*/var sessionIDRequired = true;
    /**@type {Object}*/ var parameters = new Object;
    /**@type {boolean}*/var isHTTPS = false;
    
    parameters['songs'] = songs;
    
    /**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
    this.makeCall(methodID, payload, isHTTPS);
};					
					
/**
 * Get songs on an album. Returns all songs, verified and unverified
 * 
 * @param {number} albumID
 * @param {number} limit
 */
ARapi.grooveshark.request.prototype.getAlbumSongs = function(albumID, /* optional */limit) {
    /**@type {number}*/var methodID = 18;
    /**@type {boolean}*/var sessionIDRequired = false;
    /**@type {Object}*/ var parameters = new Object;
    /**@type {boolean}*/var isHTTPS = false;
    
    parameters['albumID'] = albumID;
    if (limit != 0) 
        parameters['limit'] = limit;
    
    /**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
    this.makeCall(methodID, payload, isHTTPS);
};

/**
 * Get 100 popular songs for an artist
 * 
 * @param {number} artistID
 */
ARapi.grooveshark.request.prototype.getArtistPopularSongs = function(artistID) {
    /**@type {number}*/var methodID = 17;
    /**@type {boolean}*/var sessionIDRequired = false;
    /**@type {Object}*/ var parameters = new Object;
    /**@type {boolean}*/var isHTTPS = false;
    
    parameters['artistID'] = artistID;
    
    /**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
    this.makeCall(methodID, payload, isHTTPS);
};					
					
/**
 * Get meta-data information about one or more artists
 * 
 * @param {Array.<string>} artistIDs
 */
ARapi.grooveshark.request.prototype.getArtistsInfo = function(artistIDs) {
    /**@type {number}*/var methodID = 16;
    /**@type {boolean}*/var sessionIDRequired = false;
    /**@type {Object}*/ var parameters = new Object;
    /**@type {boolean}*/var isHTTPS = false;
    
    parameters['artistIDs'] = artistIDs;
    
    /**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
    this.makeCall(methodID, payload, isHTTPS);
};
					
/**
 * Perform a song search.
 * 
 * @param {string} query
 * @param {Object} country
 * @param {number} limit
 */
ARapi.grooveshark.request.prototype.getSongSearchResults = function(query, country, /* optional */limit) {
    /**@type {number}*/var methodID = 15;
    /**@type {boolean}*/var sessionIDRequired = false;
    /**@type {Object}*/ var parameters = new Object;
    /**@type {boolean}*/var isHTTPS = false;
    
    parameters['query'] = query;
    parameters['country'] = country;
    if (limit != 0) 
        parameters['limit'] = limit;
        
    /**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
    this.makeCall(methodID, payload, isHTTPS);
};
					
/**
 * Perform an album search.
 * 
 * @param {string} query
 * @param {number} limit
 */
ARapi.grooveshark.request.prototype.getAlbumSearchResults = function(query, /* optional */limit) {
    /**@type {number}*/var methodID = 14;
    /**@type {boolean}*/var sessionIDRequired = false;
    /**@type {Object}*/ var parameters = new Object;
    /**@type {boolean}*/var isHTTPS = false;
    
    parameters['query'] = query;
    if (limit != 0) 
        parameters['limit'] = limit;
        
    /**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
    this.makeCall(methodID, payload, isHTTPS);
};
					
/**
 * Perform a playlist search.
 * 
 * @param {string} query
 * @param {number} limit
 */
ARapi.grooveshark.request.prototype.getPlaylistSearchResults = function(query, /* optional */limit) {
    /**@type {number}*/var methodID = 13;
    /**@type {boolean}*/var sessionIDRequired = false;
    /**@type {Object}*/ var parameters = new Object;
    /**@type {boolean}*/var isHTTPS = false;
    
    parameters['query'] = query;
    if (limit != 0) 
        parameters['limit'] = limit;
        
    /**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
    this.makeCall(methodID, payload, isHTTPS);
};
					
/**
 * Get information about a song or multiple songs. 
 * The songID(s) should always be passed in as an array.
 * 
 * @param {Array.<string>} songIDs
 */
ARapi.grooveshark.request.prototype.getSongsInfo = function(songIDs) {
    /**@type {number}*/var methodID = 12;
    /**@type {boolean}*/var sessionIDRequired = false;
    /**@type {Object}*/ var parameters = new Object;
    /**@type {boolean}*/var isHTTPS = false;
    
    parameters['songIDs'] = songIDs;
    
    /**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
    this.makeCall(methodID, payload, isHTTPS);
};					
					
/**
 * Logout a user using an established session.
 * You must provide a sessionID with this method.
 * 
 */
ARapi.grooveshark.request.prototype.logout = function() {
    /**@type {number}*/var methodID = 11;
    /**@type {boolean}*/var sessionIDRequired = true;
    /**@type {Object}*/ var parameters = new Object;
    /**@type {boolean}*/var isHTTPS = false;
    
    /**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
    this.makeCall(methodID, payload, isHTTPS);
};

					
/**
 * Register and authenticate a user using an established session. 
 * The username is alpha-numeric with a period, dash or underscore allowed in the middle. 
 * The username can be blank or 5-32 characters. 
 * Passwords must be between 5 and 32 characters.
 * You must provide a sessionID with this method.
 * 
 * @param {string} emailAddress
 * @param {string} password
 * @param {string} fullName
 * @param {string} username
 */
ARapi.grooveshark.request.prototype.registerUser = function(emailAddress, password, fullName, /* optional */username) {
    /**@type {number}*/var methodID = 10;
    /**@type {boolean}*/var sessionIDRequired = true;
    /**@type {Object}*/ var parameters = new Object;
    /**@type {boolean}*/var isHTTPS = true;
    
    parameters['emailAddress'] = emailAddress;
    parameters['password'] = password;
    parameters['fullName'] = fullName;
    if (username != "")
        parameters['username'] = username;
    
    /**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
    this.makeCall(methodID, payload, isHTTPS);
};

/**
 * Get logged-in user info from sessionID
 * You must provide a sessionID with this method.
 * 
 */
ARapi.grooveshark.request.prototype.getUserInfo = function() {
	/**@type {number}*/var methodID = 9;
	/**@type {boolean}*/var sessionIDRequired = true;
	/**@type {Object}*/	var parameters = new Object;
	/**@type {boolean}*/var isHTTPS = false;
	
	/**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
	this.makeCall(methodID, payload, isHTTPS);
};	

/**
 * Get stream key, ID, etc. from songID. Requires country object obtained from getCountry
 * You must provide a sessionID with this method.
 * 
 * @param {number} songID
 * @param {Object} country
 * @param {boolean} lowBitrate
 */
ARapi.grooveshark.request.prototype.getStreamKeyStreamServer = function(songID, country, /* optional */lowBitrate) {
	/**@type {number}*/var methodID = 8;
	/**@type {boolean}*/var sessionIDRequired = true;
	/**@type {Object}*/	var parameters = new Object;
	/**@type {boolean}*/var isHTTPS = false;
	
	parameters['songID'] = songID;
	parameters['country'] = country;
	if (lowBitrate)
		parameters['lowBitrate'] = 1;
	
	/**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
	this.makeCall(methodID, payload, isHTTPS);
};					
					
/**
 * Get country from IP. If an IP is omitted, it will use the request's IP.
 * 
 * @param {string} ip
 */
ARapi.grooveshark.request.prototype.getCountry = function(/* optional */ip) {
	/**@type {number}*/var methodID = 7;
	/**@type {boolean}*/var sessionIDRequired = false;
	/**@type {Object}*/	var parameters = new Object;
	/**@type {boolean}*/var isHTTPS = false;
	
	if (ip != "")
		parameters['ip'] = ip;
	
	/**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
	this.makeCall(methodID, payload, isHTTPS);
};

/**
 * Get a subset of today's popular songs, from the Grooveshark popular billboard.
 * 
 * @param {number} limit
 */
ARapi.grooveshark.request.prototype.getPopularSongsToday = function(limit) {
	/**@type {number}*/var methodID = 6;
	/**@type {boolean}*/var sessionIDRequired = false;
	/**@type {Object}*/	var parameters = new Object;
	/**@type {boolean}*/var isHTTPS = false;
	
	if (limit != 0)
		parameters['limit'] = limit;
	
	/**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
	this.makeCall(methodID, payload, isHTTPS);
};

/**
 * Get playlist info and songs.
 * 
 * @param {number} playlistID
 * @param {number} limit
 */
ARapi.grooveshark.request.prototype.getPlaylist = function(playlistID, limit) {
	/**@type {number}*/var methodID = 5;
	/**@type {boolean}*/var sessionIDRequired = false;
	/**@type {Object}*/	var parameters = new Object;
	/**@type {boolean}*/var isHTTPS = false;
	
	parameters['playlistID'] = playlistID;
	if (limit != 0)
		parameters['limit'] = limit;
	
	/**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
	this.makeCall(methodID, payload, isHTTPS);
};

/**
 * Perform an artist search.
 * 
 * @param {string} query
 * @param {number} limit
 */
ARapi.grooveshark.request.prototype.getArtistSearchResults = function(query, limit) {
	/**@type {number}*/var methodID = 4;
	/**@type {boolean}*/var sessionIDRequired = false;
	/**@type {Object}*/	var parameters = new Object;
	/**@type {boolean}*/var isHTTPS = false;
	
	parameters['query'] = query;
	if (limit != 0)
		parameters['limit'] = limit;
	
	/**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
	this.makeCall(methodID, payload, isHTTPS);
};					

/**
 * Get an artist's albums, verified and unverified
 * 
 * @param {number} artistID
 */
ARapi.grooveshark.request.prototype.getArtistAlbums = function(artistID) {
	/**@type {number}*/var methodID = 3;
	/**@type {boolean}*/var sessionIDRequired = false;
	/**@type {Object}*/	var parameters = new Object;
	/**@type {boolean}*/var isHTTPS = false;
	
	parameters['artistID'] = artistID;
	
	/**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
	this.makeCall(methodID, payload, isHTTPS);
};
					
					
/**
 * Get playlists of the logged-in user. 
 * Requires an authenticated session.
 * You must provide a sessionID with this method.
 * 
 * @param {number} limit
 */
ARapi.grooveshark.request.prototype.getUserPlaylists = function(/* optional */limit) {
	/**@type {number}*/var methodID = 2;
	/**@type {boolean}*/var sessionIDRequired = true;
	/**@type {Object}*/	var parameters = new Object;
	/**@type {boolean}*/var isHTTPS = false;
	
	if (limit != 0)
		parameters['limit'] = limit;
	
	/**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
	this.makeCall(methodID, payload, isHTTPS);
};


/**
 * Authenticate a user using an established session.
 * You must provide a sessionID with this method.
 * Username can be the user's email or username.
 * Password can be sent modified to this method.
 * 
 * @param {string} username
 * @param {string} password
 * @param {boolean} isMD5
 */
ARapi.grooveshark.request.prototype.authenticate = function(username, password, isMD5) {
	/**@type {number}*/var methodID = 1;
	/**@type {boolean}*/var sessionIDRequired = true;
	/**@type {Object}*/	var parameters = new Object;
	/**@type {boolean}*/var isHTTPS = true;
	
	parameters['login'] = username;
	if (isMD5)
		parameters['password'] = password;
	else
		parameters['password'] = this.HMAC.getMD5Sum(password);
	
	/**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
	this.makeCall(methodID, payload, isHTTPS);
};

/**
  * Start a new session
  */
ARapi.grooveshark.request.prototype.startSession = function() {
	/**@type {number}*/var methodID = 0;
	/**@type {boolean}*/var sessionIDRequired = false;
	/**@type {Object}*/	var parameters = null;
	/**@type {boolean}*/var isHTTPS = true;

	/**@type {string}*/var payload = this.generatePayload(methodID, parameters, sessionIDRequired);
	this.makeCall(methodID, payload, isHTTPS);
};

					//////////////////////////////////
					//	REQUEST HELPER FUNCTIONS	//
					//////////////////////////////////
/**
 * @param {number} method
 * @param {Object} parameters
 * @param {boolean} sessionIDRequired
 */
ARapi.grooveshark.request.prototype.generatePayload = function(method, /* optional */parameters, sessionIDRequired) { 
	/**@type {string}*/var resultPayload = "";
	var jsonPayload = new Object;
	
	var headerData = new Object;
	headerData['wsKey'] = accessor.consumerKey;
	
	if (sessionIDRequired)
		headerData['sessionID'] = this.sessionID;
	jsonPayload['header'] = headerData;
	jsonPayload['method'] = GSMS[method];
	
	if (parameters !== null) {
		jsonPayload['parameters'] = parameters;
	}

	resultPayload = JSON.stringify(jsonPayload);
	return resultPayload;
};

/**
  * Make a call to the Grooveshark API
  * @param {number} method
  * @param {string} payload
  * @param {boolean} isHTTPS
  */
ARapi.grooveshark.request.prototype.makeCall = function(method, payload, isHTTPS) {
    /**@type {string}*/var url = this.createPOSTURL(payload, isHTTPS);
    /**@type {Grooveshark}*/var callbackclass = this.callback;
    
	/**@type {XMLHttpRequest}*/var xhr = new XMLHttpRequest();

	xhr.open("POST", url, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			callbackclass.requestHandler(method, xhr.status, xhr.responseText);
		}
	};
	xhr.send(payload);
};

/**
  * @param {string} payload
  * @return {string} url
  */
ARapi.grooveshark.request.prototype.createPOSTURL = function(payload, isHTTPS) {
	/**@type {string}*/var url = "";
	/**@type {string}*/var signature = this.HMAC.hex_hmac_md5(accessor.consumerSecret, payload);
	
	isHTTPS ?  url += accessor.https : url += accessor.http;
	
	url += accessor.apiHost + accessor.apiEndPoint + accessor.apiSigTag + signature;
	return url;
};

					//////////////////////////////////
					//	REQUEST ACCESSORS, SETTERS	//
					//////////////////////////////////
/**
  *	 Sets the session ID.
  *  @param {string} sessionID
  */
ARapi.grooveshark.request.prototype.setSessionID = function(sessionID) {
	this.sessionID = sessionID;
};

/**
  *	 Check for session ID.
  */
ARapi.grooveshark.request.prototype.checkSessionID = function() {
	if (this.sessionID == "" || this.sessionID == null || this.sessionID == undefined)
		return false;
	else
		return true;
};
