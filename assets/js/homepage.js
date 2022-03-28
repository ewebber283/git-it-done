const userFormEl = document.querySelector('#user-form');
const nameInputEl = document.querySelector('#username');
const repoContainerEl = document.querySelector('#repos-container');
const repoSearchTerm = document.querySelector('#repo-search-term');
const languageButtonsEl = document.querySelector('#language-buttons')

formSubmitHandler = (event) => {
    event.preventDefault();
    //get value from input element
    const username = nameInputEl.value.trim();

    if(username) {
        getUserRepos(username)
        nameInputEl.value = '';
    } else {
        alert('Please enter a Github username')
    }
}

buttonClickHandler = (event) => {
    event.preventDefault();

    const language = event.target.getAttribute('data-language');
    if (language) {
        getFeaturedRepos(language);

        repoContainerEl.textContent = '';
    }
}

getUserRepos = (user) => {

    const apiUrl = 'https://api.github.com/users/' + user + '/repos';
    //extra then is due to promise being returned
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
          response.json().then(function(data) {
            displayRepos(data, user);
          });
        } else {
          alert("Error: GitHub User Not Found");
        }
      })
      //catch handles network errors
      .catch(function(error) {
          alert('Unable to connect to Github')
      })
};

displayRepos = (repos, searchTerm) => {
    if(repos.length === 0) {
        repoContainerEl.textContent = "No repositories found";
        return;
    }
    console.log(repos);
    console.log(searchTerm);
    // clear old content-important when working with app displaying user input data
    repoContainerEl.textContent = '';
    repoSearchTerm.textContent = searchTerm;

    //loop over repos
    for(let i = 0; i <repos.length; i++) {
        //format repo name
        const repoName = repos[i].owner.login + '/' + repos[i].name;
        //create container for repo
        const repoEl = document.createElement('a');
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute('href', './single-repo.html?repo=' + repoName);
        //create span to hold repo name
        const titleEl = document.createElement('span');
        titleEl.textContent = repoName;
        //append to container
        repoEl.appendChild(titleEl);

        const statusEl = document.createElement('span');
        statusEl.classList = 'flex-row align-center';

        //check if repo has issues or not
        if(repos[i].open_issues_count > 0) {
            statusEl.innerHTML= 
            "<i 'class=fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
        } else {
            statusEl.innerHTML =  statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        repoEl.appendChild(statusEl);
        //append container to dom
        repoContainerEl.appendChild(repoEl);
    }
};

getFeaturedRepos = (language) => {
    const apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
            displayRepos(data.items, language);
          });
        } else {
          alert("Error: GitHub User Not Found");
        }
      })
      .catch(function(error) {
          alert('Unable to connect to Github')
      })
}


userFormEl.addEventListener('submit', formSubmitHandler);
languageButtonsEl.addEventListener('click', buttonClickHandler);
