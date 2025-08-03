const input = document.querySelector('.search')

input.addEventListener('keypress', function(e) { 
    if(e.key === 'Enter') {
        const username = this.value.trim()
        if(username) {
            useGetFunction(username)
        }
    }
})

function useGetFunction(username) {
    const apiUrl = `https://api.github.com/users/${username}`

    fetch(apiUrl)
        .then(res => {
            return res.json()
        })
        .then(data => {
            displayUserProfile(data)
            repoGetFunction(username)
        })
        .catch(error => {
            console.log(error);
        })
}

function displayUserProfile(user) {
    const profileCard = document.querySelector('.profile-card')
    const template = `
        <img src="${user.avatar_url}" alt="Avatar" class="avatar">
        <div class="profile">
            <h3 class="username">${user.login}</h3>
            <P class="follow">${user.followers} Followers • ${user.following} Following • ${user.public_repos} Repos</P>
        </div>
    `
    profileCard.innerHTML = template
    profileCard.style.display = 'flex'
}

function repoGetFunction(username) {
    const apiUrl = `https://api.github.com/users/${username}/repos`
    fetch(apiUrl)
        .then(res => {
            return res.json()
        })   
        .then(data => {
            displayRepos(data.slice(0, 5))
        })
        .catch(error => {
            console.log(error);
        })
}

function displayRepos(repos) {
    const repoProfile = document.querySelector('.repo-list')
    repoProfile.innerHTML = ''
    let repoList = ''
    
    repos.forEach(repo => {
        repoList += `<p><a href="${repo.html_url}" target="_blank">${repo.name}</a></p>`
    })

    repoProfile.innerHTML += repoList
    repoProfile.style.display = 'block'
}