
class User {

    constructor(name, email, age, picture, location, isPresent) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.picture = picture;
        this.location = location;
        this.isPresent = isPresent;
    }

    getName() {
        return this.name;
    }

    getEmail() {
        return this.email;
    }

    getAge() {
        return this.age;
    }

    getPicture() {
        return this.picture;
    }

    getLocation() {
        return this.location;
    }

    getIsPresent() {
        return this.isPresent;
    }

}

var allUsers = [];

async function fetchApi() {
    const res = await fetch('https://randomuser.me/api/?results=20', {
        headers: { Accept: 'application/json' },
    });
    const json = await res.json();
    const persons = json['results'];

    var counter = 0;
    Object.entries(persons).forEach(([key, value]) => {
        const firsntame = persons[key]['name']['first'] + ' ' + persons[key]['name']['last'];
        const email = persons[key]['email'];
        const age = persons[key]['dob']['age'];
        const pic = persons[key]['picture']['large'];
        const loc = persons[key]['location'];
        const userLoc = `${loc['city']}, ${loc['state']}, ${loc['country']}`


        const u = new User(firsntame, email, age, pic, userLoc, Math.random() < 0.5) // est présent est aléatoire 50/50
        //console.log(firsntame, email, age, pic,);

        ++counter;
        document.getElementsByClassName("counter")[0].innerHTML = `${counter}/${persons.length} people are here`;
        allUsers.push(u);
        insertHtml(u);



    });
    const usr = document.body.getElementsByClassName('user');
    console.log(usr);
    for (var i = 0; i < usr.length; ++i) {
        usr[i].addEventListener('click', function () {
            usr[i].setAttribute('data-present', usr[i].getAttribute('data-present') ? false : true);
        });

    }
}

function insertHtml(user) {
    document.body.getElementsByTagName('main')[0].innerHTML +=
        `<div class="user" data-present="${user.getIsPresent()}">
            <img src="${user.getPicture()}">
                <div class="user--info">
                    <h1>${user.getName()}</h1>
                    <p>${user.getAge()} years old</p>
                    <p>${user.getLocation()}</p>
                </div>
                <a href="mailto:${user.getEmail()}">
                    <span class="mail">✉️</span>
                </a>
        </div>`;
}

function sortByName() {
    allUsers.sort(compare);
}

function sortByAge() {

}

function showUser() {

    console.log(allUsers.length);
    for (u in allUsers) {
        insertHtml(u);
    }
}

function addClickEventToUser() {
    const usr = document.body.getElementsByClassName('user');

    console.log(usr.length);
    for (var i = 0; i < usr.length; ++i) {
        usr[i].addEventListener('click', function () {
            usr[i].setAttribute('data-present', usr[i].getAttribute('data-present') ? false : true);
        });

    }
}


// permet de comparer nom et prénom pour ensuite trier avec l array de users
function compareName(a, b) {
    if (a.last < b.last) return -1;

    if (a.last > b.last) return 1;
    return 0;
}

fetchApi();
showUser();

addClickEventToUser();