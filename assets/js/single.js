const issueContainerEl = document.querySelector('#issues-container');
const limitWarningEl = document.querySelector('#limit-warning');

const getRepoIssues = (repo) => {
    const apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                displayIssues(data);
                displayWarning(repo);
            });
        }
        else {
            alert('There was a problem with your request');
        }
    });
};

const displayIssues = (issues) => {
    if(issues.length === 0) {
        issueContainerEl.textContent = "No open issues!";
        return;
    }
    for(let i=0;i<issues.length;i++) {
        //link element to take users to github issue
        const issueEl = document.createElement('a');
        issueEl.classList="list-item flex-row justify-space-between align-center";
        //html_url from issue object
        issueEl.setAttribute('href', issues[i].html_url);
        issueEl.setAttribute('target', '_blank');
        //create span
        const typeEl = document.createElement('span');
        //check if issue actual issue or pull request
        if(issues[i].pull_request) {
            typeEl.textContent="(Pull request)";
        } else {
            typeEl.textContent="(Issue)";
        }
        issueEl.appendChild(typeEl);
        issueContainerEl.appendChild(issueEl);
        
    }
}

const displayWarning = (repo) => {
    limitWarningEl.textContent="To see more than 30 issues visit ";

    const linkEl = document.createElement('a');
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");
    
    limitWarningEl.appendChild(linkEl);
};

getRepoIssues('ewebber283/b-safe')