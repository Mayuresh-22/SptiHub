// this file contains code for fetching users' github details

class GithubService {
    apiHost: string;

    constructor() {
        this.apiHost = 'https://api.github.com';
    }

    async getUserRepos(username: string, user_agent: string) {
        try {

            let response: any = await fetch(`${this.apiHost}/users/${username}/repos?page=1&per_page=10`, {
                    headers: {
                        'User-Agent': 'mayuresh-22',
                    }
                }
            )
                .then((res) => res.json())
                .then((data) => {
                    return data;
                })

            console.log(`RESPONSE: by getUserRepos: ${JSON.stringify(response)}`);

            const reposList = response.map((repo: any) => {
                return {
                    repo_name: repo.name,
                    repo_description: repo?.description?.slice(0, 100) || 'No description provided',
                    repo_lang: repo.language
                }
            });

            response = {
                github_username: username,
                github_repos: reposList
            }

            return response;
        } catch (error) {
            return null;
        }
    }
}

export default new GithubService;