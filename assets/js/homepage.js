getUserRepos = (user) => {

    const apiUrl = 'https://api.github.com/users/' + user + '/repos';
    //extra then is due to promise being returned
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        })
    });  
};

getUserRepos();

