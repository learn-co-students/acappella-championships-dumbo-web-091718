const BASE_URL = 'http://localhost:3000/a_cappella_groups'

// let displayWinner = document.querySelector('H2')

let groupCollection = document.querySelector('tbody')
let winnerDisplay = document.querySelector('H2')

let groupTeams = new Array()


function init(){

    document.addEventListener("click", updateGroups)

    fetch(BASE_URL)
    .then(res => res.json())
    .then(json => {
        json.forEach(group => {
            groupTeams.push(group)
            displayGroup(group)
        })
        // debugger
    })
   
    
}

function displayGroup(group){
    // console.log('hi')
    // console.log(group)
    
    let groupInfo = `<tr data-id="${group.id}"><td>${group.college.name}</td> 
    <td data-id="name">${group.name}</td> 
    <td data-id="membership">${group.membership}</td> 
    <td>${group.college.division}</td> 
    <td><img src='./assets/trophy.png' data-id='${group.id}'/></td>
    <td><button class="delete-button">Delete Group</button></td>
    </tr>`
    // debugger
    groupCollection.innerHTML += groupInfo
}

function addWinner(e){
    // console.log('hi')
    e.preventDefault()
    // debugger
    if(winnerDisplay.innerHTML.includes('span')){
        removeWinner(e)
        // groupCollection.appendChild(oldWinner.parentElement)
    } else {
        crownWinner(e)

}
    // console.log(oldWinner)
}   


function crownWinner(e){
    let newWinner = e.target.parentElement.parentElement
    let winnerId = newWinner.dataset.id
    winnerDisplay.innerHTML = `Winner: <span id="${newWinner.dataset.id}"> ${newWinner.children[1].innerHTML} from ${newWinner.children[0].innerHTML}</span>`
    newWinner.remove()
    let foundGroup
    for (let i=0; i < groupTeams.length; i++){
        if(groupTeams[i].id == winnerId){
            foundGroup = groupTeams[i]
        }
    }

    // debugger 
    let index = groupTeams.indexOf(foundGroup)
    groupTeams.splice(index, 1)
}


function removeWinner(e){
    // console.log(e.target.parentElement.parentElement)
    let id = winnerDisplay.children[0].id
    // let id = e.target.parentElement.parentElement.dataset.id
    // console.log(id)
    // let groupCollection = document.querySelector('tbody')
    // debugger
    // // console.log(groupCollection.children)
    if(document.querySelector(`tr[data-id="${id}"]`) === null){
        fetch(`${BASE_URL}/${id}`)
        .then(res => res.json())
        .then(json => {
            groupTeams.push(json)
            displayGroup(json)})
            
        crownWinner(e)
        console.log(groupTeams)
    } 
}

function deleteGroup(e){
    e.preventDefault()
    let groupCard = e.target.parentElement.previousElementSibling
    let id = groupCard.children[0].dataset.id

    groupCard.parentElement.remove()

    fetch(`${BASE_URL}/${id}`, {
        method: "DELETE"
    }).then(res => res.json())
    .then(console.log)
}

function updateGroups(e){
    // debugger
    if(e.target.tagName === 'IMG'){
        addWinner(e)
    } else if (e.target.className === 'delete-button'){
        deleteGroup(e)
    } else if (e.target.tagName === 'TH'){
        // console.log(e.target.id)
        // if(e.target.id !== "crown"){
        sortGroups(e)
        // }
    }
}

function sortGroups(e){

    let teamGroups = document.querySelector('tbody').children
    console.log(teamGroups)
    let sortedTeams;
    let newId
    if (e.target.dataset.id.includes('-')){
        newId = e.target.dataset.id.split('-')[1]
        // debugger
        // newId.replace(/-/g, '.')
        // sort by with college attr
        sortedTeams = groupTeams.sort(function(a, b){
            let aName = a.college[newId].toLowerCase()
            let bName = b.college[newId].toLowerCase()
    
            if(aName < bName){
                return -1
            } else if (aName > bName){
                return 1
            } else if (aName === bName){
                return 0
            }
        })
    } else {
        newId = e.target.dataset.id
        // sort by without college attr
        sortedTeams = groupTeams.sort(function(a, b){
            let aName = a[newId].toLowerCase()
            let bName = b[newId].toLowerCase()
    
            if(aName < bName){
                return -1
            } else if (aName > bName){
                return 1
            } else if (aName === bName){
                return 0
            }
        })
    }
    groupCollection.innerHTML = ''
    sortedTeams.forEach(group => {displayGroup(group)})

}





init()