import React, { useState } from "react"
import Label from "../components/ui/Label"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"

export default function Component() {
	const [spotifyPlaylist, setSpotifyPlaylist] = useState("")
	const [githubUsername, setGithubUsername] = useState("")
	const [poem, setPoem] = useState("")
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")

	const formHandler = async () => {
		try {
			// Validate Spotify playlist URL
			if (!spotifyPlaylist || !spotifyPlaylist.startsWith("https://open.spotify.com/playlist/")) {
				throw new Error("Please enter a valid Spotify playlist URL.")
			}

			// Extract Spotify playlist ID
			const spotifyPlaylistId = spotifyPlaylist.split("/").pop().split("?").shift()

			// Fetch Spotify playlist data
			await fetch(`https://sptihub-backend.mayureshchoudhary22.workers.dev/poem/spotify/${spotifyPlaylistId}/github/${githubUsername}`)
				.then((response) => response.json())
				.then((data) => {
					setPoem(data?.response)

					if (data?.error) {
						throw new Error("uhh you broke it. " + data.error);
					}
				})
				.catch((error) => {
					throw new Error("uhh you broke it. make sure your spotify playlist is public and your github username is correct")
				})
		} catch (error) {
			setError(error.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="flex flex-col min-h-screen bg-[#1DB954] text-white ibm-plex-sans-regular ">
			<main className="flex-1 px-4 md:px-6 py-8">
				<div className="max-w-xl w-full mx-auto space-y-8">
					<div className="text-center space-y-2">
						<h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Unlock the Poetry Within</h1>
						<p className="text-lg text-gray-200">Discover the hidden verses in your music and code.</p>
					</div>
					<div className="flex justify-center space-x-4">
						<a href="https://git.new/Mayuresh-22" target="_blank" className="text-gray-200 hover:text-white" prefetch={false}>
							<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
								<path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
							</svg>
						</a>
						<a href="https://links.mayuresh.me/x" target="_blank" className="text-gray-200 hover:text-white" prefetch={false}>
							<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
								<path fill="currentColor" d="M13.8 10.5L20.7 2h-3l-5.3 6.5L7.7 2H1l7.8 11l-7.3 9h3l5.7-7l5.1 7H22zm-2.4 3l-1.4-2l-5.6-7.9h2.3l4.5 6.3l1.4 2l6 8.5h-2.3l-4.9-7Z" />
							</svg>
						</a>
					</div>
					<form onSubmit={(e) => {
						e.preventDefault()
						setLoading(true)
						setError("")
						formHandler()
					}} className="bg-[#191414] rounded-lg shadow-md p-6 space-y-4">
						<div>
							<Label htmlFor="spotify-playlist" className="block font-medium text-gray-300">
								Spotify Playlist URL
							</Label>
							<Input
								id="spotify-playlist"
								type="text"
								placeholder="https://open.spotify.com/playlist/..."
								className="block w-full border-gray-600 rounded-md shadow-sm focus:ring-[#1DB954] focus:border-[#1DB954] text-green-800 font-semibold sm:text-sm"
								value={spotifyPlaylist}
								onChange={(event) => setSpotifyPlaylist(event.target.value)}
							/>
						</div>
						<div>
							<Label htmlFor="github-username" className="block font-medium text-gray-300">
								GitHub Username
							</Label>
							<Input
								id="github-username"
								type="text"
								placeholder="username"
								className="block w-full border-gray-600 rounded-md shadow-sm focus:ring-[#1DB954] focus:border-[#1DB954] text-green-800 font-semibold sm:text-sm"
								value={githubUsername}
								onChange={(event) => setGithubUsername(event.target.value)}
							/>
						</div>
						<div class="font-normal mb-3">
							<div class="cf-turnstile" data-sitekey="0x4AAAAAAAca8bqSDLn-p7k5"></div>
						</div>
						<Button
							type="submit"
							className="w-full bg-[#1DB954] hover:bg-[#1ED760] text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1DB954]"
						>
							Unleash Your Poetic Muse
						</Button>
					</form>
					{error && <div className="bg-red-500 rounded-lg shadow-md p-4 text-white">{error}</div>}
					{loading || poem ? (
						<div className="bg-[#191414] rounded-lg shadow-md p-6 space-y-4">
							<div className="text-center space-y-2">
								<h2 className="text-2xl font-bold tracking-tight">Your Personalized Poem</h2>
								<p className="text-lg text-gray-300">
									Based on your Spotify playlist and GitHub activity
								</p>
							</div>
							{loading ? (
								<div class="text-slate-600 prose prose-lg dark:prose-invert mx-auto animate-pulse">
									<div class="h-5 bg-gray-700 rounded-full w-2/3 mb-1"></div>
									<div class="h-5 bg-gray-700 rounded-full w-3/4 mb-1"></div>
									<div class="h-5 bg-gray-700 rounded-full w-1/2 mb-1"></div>
									<div class="h-5 bg-gray-700 rounded-full w-full mb-1"></div>
									<div class="h-5 bg-gray-700 rounded-full w-1/2 mb-4"></div>

									<div class="h-5 bg-gray-700 rounded-full w-2/3 mb-1"></div>
									<div class="h-5 bg-gray-700 rounded-full w-4/5 mb-1"></div>
									<div class="h-5 bg-gray-700 rounded-full w-1/2 mb-1"></div>
									<div class="h-5 bg-gray-700 rounded-full w-3/4 mb-1"></div>
									<div class="h-5 bg-gray-700 rounded-full w-1/2 mb-4"></div>

									<div class="h-5 bg-gray-700 rounded-full w-full mb-1"></div>
									<div class="h-5 bg-gray-700 rounded-full w-2/3 mb-1"></div>
									<div class="h-5 bg-gray-700 rounded-full w-1/2 mb-1"></div>
									<div class="h-5 bg-gray-700 rounded-full w-3/4 mb-1"></div>
									<div class="h-5 bg-gray-700 rounded-full w-1/2 mb-4"></div>
								</div>
							) : (
								<div className="text-slate-600 prose prose-lg dark:prose-invert mx-auto">
									{
										poem && poem
											.replace(/\n/g, "<br/>")
											.split("<br/><br/>")
											.map((para, index) => (
												<p key={index}>
													{para.split("<br/>").map((line, index) => (
														<span key={index}>
															{line}
															{index === para.split("<br/>").length - 1 ? "" : <br />}
														</span>
													))}
													<br /><br />
												</p>
											))
									}
								</div>
							)}
						</div>
					) : null}
					<div>
						<p className="text-center text-sm text-gray-300">
							sptihub might generate a poem that dosen't make sense, after all its ai
						</p>
					</div>
				</div>
			</main>
		</div>
	)
}