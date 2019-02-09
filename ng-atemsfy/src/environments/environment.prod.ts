export const environment = {
	production: true,
	client_id: '9ad7c246e42047f0ba8a78be143c0820',
	client_secret: '7f7890e43ea249a0ab401fdac8ba3b05',
	redirect_uri: 'https://atemsfy.herokuapp.com/redirect',
	response_type: 'token',
	state: 'lorem',
	scope: 'playlist-read-private playlist-modify-private playlist-modify-public playlist-read-collaborative user-modify-playback-state user-read-currently-playing user-read-playback-state user-top-read user-read-recently-played app-remote-control streaming user-read-birthdate user-read-email user-read-private user-follow-read user-follow-modify user-library-modify user-library-read',
	grant_type: 'authorization_code',
	urls: {
		access_token: () => { return `https://accounts.spotify.com/authorize?client_id=${environment.client_id}&response_type=${environment.response_type}&redirect_uri=${environment.redirect_uri}&state=${environment.state}&scope=${environment.scope}` },
		me: () => { return `https://api.spotify.com/v1/me` },
		user_playlists: (user_id, params) => { return `https://api.spotify.com/v1/users/${user_id}/playlists?${params}` },
		search_all: (q) => { return `https://api.spotify.com/v1/search?type=album,artist,playlist,track&market=PL&q=${q}` }
	}
};
