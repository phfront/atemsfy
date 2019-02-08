// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	client_id: '9ad7c246e42047f0ba8a78be143c0820',
	client_secret: '7f7890e43ea249a0ab401fdac8ba3b05',
    redirect_uri: 'http://localhost:4200/redirect',
    response_type: 'code',
    scope: 'playlist-read-private',
    grant_type: 'authorization_code',
    urls: {
    	get_code: () => { return `https://accounts.spotify.com/authorize?response_type=${environment.response_type}&client_id=${environment.client_id}&scope=${environment.scope}&redirect_uri=${environment.redirect_uri}` },
    	get_token: () => { return `https://accounts.spotify.com/api/token` },
    	search: (type, query) => { return `https://api.spotify.com/v1/search?type=${type}&market=PL&query=${query}` }
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
