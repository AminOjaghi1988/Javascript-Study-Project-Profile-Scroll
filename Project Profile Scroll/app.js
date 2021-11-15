
getUsers()
.then(data => {

    // console.log(data);

    let userProfile = userIterator(data.results);

    let user =  userProfile.next().value;

    showProfile(user);

    document.querySelector('#next').addEventListener('click', (e) => {

        user =  userProfile.next().value;

        if(user != undefined) {

            showProfile(user);

        } else {

            userProfile = userIterator(data.results);

            user =  userProfile.next().value;

            showProfile(user);

        }


    })

})
.catch(err => {

    console.log(err);

});


function showProfile(user) {

    let imageDisplay = document.querySelector('#imageDisplay');

    let profileDisplay = document.querySelector('#profileDisplay');

    imageDisplay.innerHTML = `<img src="${user.picture.large}" alt="" class="rounded-circle"/>`

    profileDisplay.innerHTML = `<ul class="list-group">

        <li class="list-group-item text-center fw-bold">${user.name.title} ${user.name.first} ${user.name.last}</li>

        <li class="list-group-item text-center fw-bold">${user.email}</li>

        <li class="list-group-item text-center fw-bold">${user.location.city} ${user.location.state}</li> 

        <li class="list-group-item text-center fw-bold">${user.phone}</li>

    </ul>`

}


function* userIterator(data) {

    for(let user of data) {

        yield user;

    }

}

async function getUsers() {

    return await fetch('https://randomuser.me/api/?results=5')
    .then(res => res.json())
    .then(data => data)
    .catch(err => err);

}