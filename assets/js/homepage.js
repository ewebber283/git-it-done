const userFormEl = document.querySelector('#user-form');
const nameInputEl = document.querySelector('#username');
const repoContainerEl = document.querySelector('#repos-container');
const repoSearchTerm = document.querySelector('#repo-search-term');

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
        const repoEl = document.createElement('div');
        repoEl.classList = "list-item flex-row justify-space-between align-center";
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

userFormEl.addEventListener('submit', formSubmitHandler);

