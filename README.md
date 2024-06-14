# SptiHub
### [try it out LIVE](https://links.mayuresh.me/sptihub)

You can just discover the hidden verses in your music and code.

## Project Overview

SptiHub is an innovative web application that transforms your Spotify playlist and GitHub activity into personalized poetry. The app generates unique poems that reflect your creative and technical journey by analysing your musical tastes and coding contributions.

## Features

- **Spotify Playlist Integration:** Input your Spotify playlist URL to fetch your favourite tracks.
- **GitHub Activity Analysis:** Provide your GitHub username to analyze your coding activity.
- **Personalized Poetry Generation:** The app creates a custom poem based on the combined data from Spotify and GitHub.
- **User-Friendly Interface:** Simple and intuitive interface for a seamless experience.

## Screenshot

![SptiHub](https://github.com/Mayuresh-22/SptiHub/assets/111348926/2498c13a-12aa-4096-be96-8780f6152dfb)


## Tech Stack

- **Frontend:** React
- **Backend:** Hono.js
- **APIs:** Spotify API, GitHub API
- **Hosting:** Cloudflare Pages
- **Other:** Cloudflare Workers, Rate Limiting, Llama 3 8b powered by Groq

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine
- A Spotify account
- A GitHub account
- Cloudflare account

### Installation

#### Frontend (sptihub-web)

1. Clone the repository:
    ```bash
    git clone https://github.com/Mayuresh-22/SptiHub.git
    cd SptiHub/sptihub-web
    ```

2. Install dependencies:
    ```bash
    npm install
    ```
    
3. Run the application:
    ```bash
    npm start
    ```

4. Open your browser and navigate to `http://localhost:3000`.

#### Backend (sptihub-backend)

1. Navigate to the backend directory:
    ```bash
    cd ../sptihub-backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up development environment variables:
    - Create a `.dev.vars` file in the root of `sptihub-backend` directory.
    - Add your environment variables:
        ```env
        SPOTIFY_CLIENT_ID=your_spotify_client_id
        SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
        GROQ_API_KEY=your_groq_api_key
        ```

4. Before deploying add secrets to the worker via wrangler:
     - run the following command by replacing `<KEY>` and you will be asked for the value
     - ```bash
       npx wrangler secret put <KEY>
       ```
     - check documentation for more info [here](https://developers.cloudflare.com/workers/configuration/secrets/)

4. Deploy the backend to Cloudflare Workers (make sure your are logged into Cloudflare):
    ```bash
    npm run deploy
    ```

## Usage

1. Enter your Spotify playlist URL in the designated field on the frontend.
2. Provide your GitHub username.
3. Click the "Unleash Your Poetic Muse" button.
4. Enjoy your personalized poem!

## Contribution

We welcome contributions from the community. If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. Make your changes.
4. Commit your changes:
    ```bash
    git commit -m 'Add some feature'
    ```
5. Push to the branch:
    ```bash
    git push origin feature/your-feature-name
    ```
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Acknowledgements

- Inspiration from the intersection of music and code.
- Thanks to Spotify, GitHub, and Cloudflare for their amazing APIs.

## Contact

If you have any questions or feedback, please feel free to reach out:

- GitHub: [Mayuresh-22](https://git.new/Mayuresh-22)

## Follow
- X: [mayuresh_empire](https://links.mayuresh.me/x)
