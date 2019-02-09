// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	client_id: '9ad7c246e42047f0ba8a78be143c0820',
	client_secret: '7f7890e43ea249a0ab401fdac8ba3b05',
    redirect_uri: 'http://localhost:4200/redirect',
    response_type: 'token',
    state: 'lorem',
    scope: 'playlist-read-private playlist-modify-private playlist-modify-public playlist-read-collaborative user-modify-playback-state user-read-currently-playing user-read-playback-state user-top-read user-read-recently-played app-remote-control streaming user-read-birthdate user-read-email user-read-private user-follow-read user-follow-modify user-library-modify user-library-read',
    grant_type: 'authorization_code',
    urls: {
        access_token: () => { return `https://accounts.spotify.com/authorize?client_id=${environment.client_id}&response_type=${environment.response_type}&redirect_uri=${environment.redirect_uri}&state=${environment.state}&scope=${environment.scope}` },
        me: () => { return `https://api.spotify.com/v1/me` },

        // playslist
        user_playlists: (user_id, params) => { return `https://api.spotify.com/v1/users/${user_id}/playlists?${params}` },
        playlist_details: (playlist_id) => { return `https://api.spotify.com/v1/playlists/${playlist_id}` },

    	search_all: (q) => { return `https://api.spotify.com/v1/search?type=album,artist,playlist,track&market=PL&q=${q}` }
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.