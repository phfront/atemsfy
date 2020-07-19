export const environment = {
  production: true,
  client_id: '9ad7c246e42047f0ba8a78be143c0820',
  client_secret: '7f7890e43ea249a0ab401fdac8ba3b05',
  redirect_uri: 'https://atemsfy.herokuapp.com/redirect',
  response_type: 'token',
  state: 'lorem',
  scope: '\
      playlist-read-private\
      playlist-modify-private\
      playlist-modify-public\
      playlist-read-collaborative\
      user-modify-playback-state\
      user-read-currently-playing\
      user-read-playback-state\
      user-top-read\
      user-read-recently-played\
      app-remote-control\
      streaming\
      user-read-birthdate\
      user-read-email\
      user-read-private\
      user-follow-read\
      user-follow-modify\
      user-library-modify\
      user-library-read\
  ',
  grant_type: 'authorization_code',
  urls: {
    access_token: () => `https://accounts.spotify.com/authorize`,
    current_user: () => `https://api.spotify.com/v1/me`,
    user_playlists: (params) => `https://api.spotify.com/v1/users/${params.user_id}/playlists`,
    playlist: (params) => `https://api.spotify.com/v1/playlists/${params.playlist_id}`,
    search: () => `https://api.spotify.com/v1/search`,
    playlists_tracks: (params) => `https://api.spotify.com/v1/playlists/${params.playlist_id}/tracks`,
    user_top: (params) => `https://api.spotify.com/v1/me/top/${params.type}`,
    user_current_payback: () => `https://api.spotify.com/v1/me/player/currently-playing`,
    available_devices: () => `https://api.spotify.com/v1/me/player/devices`,
    user_playback: () => `https://api.spotify.com/v1/me/player/play`,
    shuffle: () => `https://api.spotify.com/v1/me/player/shuffle`,
  }
};
