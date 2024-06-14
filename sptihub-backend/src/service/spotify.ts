// this will contain a code to get the playlist items

class SpotifyService {
    SPOTIFY_CLIENT_ID: string;
    SPOTIFY_CLIENT_SECRET: string;
    SPOTIFY_ACCESS_TOKEN: string | undefined;

    constructor(SPOTIFY_CLIENT_ID: string, SPOTIFY_CLIENT_SECRET: string) {
        this.SPOTIFY_CLIENT_ID = SPOTIFY_CLIENT_ID;
        this.SPOTIFY_CLIENT_SECRET = SPOTIFY_CLIENT_SECRET;
    }

    async getAccessToken() {
        try {
            // this.SPOTIFY_ACCESS_TOKEN = "BQBz8LDiEA_D9ahCOdFOBPSI8wRzFQKupgtqvGRSm0TToN3HowUN0E2kTc8CB2s1Ms_cHntBYaRgJF7gHYtEuk_D7yJxoqJ0zc7gL_1rzBiNkzUxL0c"
            await fetch('https://accounts.spotify.com/api/token',
                {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `grant_type=client_credentials&client_id=${this.SPOTIFY_CLIENT_ID}&client_secret=${this.SPOTIFY_CLIENT_SECRET}`
            })
                .then(response => response.json())
                .then((data: any) => {
                    console.log(`RESPONSE: by getAccessToken: ${JSON.stringify(data)}`);
                    this.SPOTIFY_ACCESS_TOKEN = data.access_token;
                })
                .catch((error) => {
                    console.log(`ERROR: in getAccessToken: ${error}`);
                });
        } catch (error) {
            console.log(`ERROR: in getAccessToken: ${error}`);
        }
    }

    async getPlaylistDetails(playlistId: string) {
        try {
            let response = await fetch('https://api.spotify.com/v1/playlists/' + playlistId, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.SPOTIFY_ACCESS_TOKEN
                }
            })
                .then(response => response.json())
                .then((data: any) => {
                    return data;
                })
            
            return {
                name: response.name,
                owner: response.owner.display_name,
                description: response.description,
                image: response.images && response.images[0].url || 'https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84c611c8bd109daa055fd83663',
            }

        } catch (error) {
            console.log(`ERROR: in getPlaylistDetails: ${error}`);
            return {};
        }
    }

    async getPlaylistItems(playlistId: string) {
        try {           
            let response = await fetch('https://api.spotify.com/v1/playlists/' + playlistId + '/tracks?limit=10', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.SPOTIFY_ACCESS_TOKEN
                }
            })
                .then(response => response.json())
                .then((data: any) => {
                    return data;
                })

            const itemsList = response.items.map((item: any) => {
                return {
                    track_name: item?.track.album.name || '',
                    track_artist: item?.track.album.artists[0].name || ''
                }
            });

            const playlistDetails = await this.getPlaylistDetails(playlistId);

            response = {
                spotify_playlist_name: playlistDetails.name,
                spotify_playlist_description: playlistDetails.description,
                spotify_playlist_image: playlistDetails.image,
                spotify_playlist_owner: playlistDetails.owner,
                spotify_playlist_items: itemsList
            }
            
            return response;
        } catch (error) {
            console.error(`ERROR: in getPlaylistItems: ${error}`);
        }
    }
}

export default SpotifyService;