import { Octokit } from '@octokit/rest'


const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN2 })

const git_rest_api = {
    current_user: '/user',
    current_user_authorizations_html: '/connections/applications{/client_id}',
    authorizations: '/authorizations',
    code_search: '/search/code?q={query}{&page,per_page,sort,order}',
    commit_search: '/search/commits?q={query}{&page,per_page,sort,order}',
    emails: '/user/emails',
    emojis: '/emojis',
    events: '/events',
    feeds: '/feeds',
    followers: '/user/followers',
    following: '/user/following{/target}',
    gists: '/gists{/gist_id}',
    hub: '/hub',
    issue_search: '/search/issues?q={query}{&page,per_page,sort,order}',
    issues: '/issues',
    keys: '/user/keys',
    label_search: '/search/labels?q={query}&repository_id={repository_id}{&page,per_page}',
    notifications: '/notifications',
    organization: '/orgs/{org}',
    organization_repositories: '/orgs/{org}/repos{?type,page,per_page,sort}',
    organization_teams: '/orgs/{org}/teams',
    public_gists: '/gists/public',
    rate_limit: '/rate_limit',
    repository: '/repos/{owner}/{repo}',
    repository_search: '/search/repositories?q={query}{&page,per_page,sort,order}',
    current_user_repositories: '/user/repos{?type,page,per_page,sort}',
    starred: '/user/starred{/owner}{/repo}',
    starred_gists: '/gists/starred',
    topic_search: '/search/topics?q={query}{&page,per_page}',
    user: '/users/{user}',
    user_organizations: '/user/orgs',
    user_repositories: '/users/{user}/repos{?type,page,per_page,sort}',
    user_search: '/search/users?q={query}{&page,per_page,sort,order}'
}
// await octokit.request("/user").then(({ data }) => { console.log(data) })
// const { data: root } = await octokit.request("GET " + git_rest_api.rate_limit);

const { data: pullRequest } = await octokit.rest.pulls.get({
    owner: "robertaandersen",
    repo: "ActionsTest",
    pull_number: 1,
});

var tag = await octokit.rest.git.getTag({ owner: "robertaandersen", repo: "ActionsTest", tag_sha: pullRequest.head.sha });
console.log(tag)

const { data: tag } = octokit.rest.git.createTag({
    owner: 'robertaandersen',
    repo: 'ActionsTest',
    tag: "TESTTEST",
    message: "Testing test",
    object: pullRequest.head.sha,
    type: "commit",
    tagger: {
        name: pullRequest.user.login
    }
}).then(({ tag }) => {
    console.log(tag)
}).catch((error) => {
    console.error(error)
})


// console.log(pullRequest.merge_commit_sha)
// const { data: tag } = octokit.rest.git.createTag({
//     owner: "robertaandersen",
//     repo: "ActionsTest",
//     tag: "v1.0.0",
//     message: "Testing test",
//     object: pullRequest.merge_commit_sha,
//     type: "commit",
//     tagger: {
//         name: "Roberta Andersen",
//         email: "robertaandersen1978@gmail.com"
//     }
// }).then(({ data }) => {
//     console.log(data)
// }).catch((error) => {
//     console.error(error)
// })

// https://github.com/octokit/core.js#readme


// await octokit.git.createRef({
//     owner: 'robertaandersen',
//     repo: 'ActionsTest',
//     ref: 'refs/tags/test',
//     sha: tag.data.sha,
//     headers: {
//         'X-GitHub-Api-Version': '2022-11-28'
//     }
// })


octokit.rest.repos.createRelease({
    owner: "robertaandersen",
    repo: "ActionsTest",
    tag_name: tag.data.tag,
    name: "Test 123",
}).then(({ data }) => {
    console.log(data)
}).catch((error) => {
    console.log(error)
});

// Octokit.js
// https://github.com/octokit/core.js#readme

//   await octokit.request('POST /repos/{owner}/{repo}/releases', {
//     owner: 'OWNER',
//     repo: 'REPO',
//     tag_name: 'v1.0.0',
//     target_commitish: 'master',
//     name: 'v1.0.0',
//     body: 'Description of the release',
//     draft: false,
//     prerelease: false,
//     generate_release_notes: false,
//     headers: {
//       'X-GitHub-Api-Version': '2022-11-28'
//     }
//   })

// const { data: pullRequest } = await octokit.pulls.get({
//     owner: "robertaandersen",
//     repo: "ActionsTest",
//     pull_number: 1,
// });



// var resp = await octokit.request('GET /repos/robertaandersen/ActionsTest/releases', {
//     owner: 'robertaandersen',
//     repo: 'ActionsTest',
//     headers: {
//         'X-GitHub-Api-Version': '2022-11-28'
//     }
// })

// console.log(resp.data)