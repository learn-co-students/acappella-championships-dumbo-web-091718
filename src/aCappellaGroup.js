document.addEventListener("DOMContentLoaded", init)
let BASE_URL = 'http://localhost:3000/a_cappella_groups'
let teamStore = []
let revCollege = false;
let revGroup = false;
let revDivision = false;
let revMembership = false;

///memebership sorter
function membershipSort(a, b) {
  // let x = "teamMembership"
  // if (a[x] === "soprano/alto") {
  //   a[x] = 1
  // } else if (a[x] === "mixed") {
  //   a[x] = 2
  // } else if (a[x] === "	tenor/bass") {
  //   a[x] = 3
  // }
  // if (b[x] === "soprano/alto") {
  //   b[x] = 1
  // } else if (a[x] === "mixed") {
  //   b[x] = 2
  // } else if (a[x] === "	tenor/bass") {
  //   b[x] = 3
  // }
  // return a, b
}

/// sort by function
function sortTableByValue(sortKey, reverseArr) {
  let sortedArr
  // if (sortKey === "teamMembership") {
  //   sortedArr = teamStore.sort(function(a, b) {
  //     return membershipSort(a, b)
  //   })
  //  } else {
  //    sortedArr = teamStore.sort((a, b) => a[sortKey].localeCompare(b[sortKey]))
  //  }
  sortedArr = teamStore.sort((a, b) => a[sortKey].localeCompare(b[sortKey]))
  if (!reverseArr) {
    Team.addTeamsToPage(sortedArr)
  } else {
    Team.addTeamsToPage(sortedArr.reverse())
  }
}

///set winning or remove team
function changeStatus(teamId, doThing) {
  for (team of teamStore) {
    if (doThing === "winner")
      if (team.id === teamId) {
        team[doThing] = true
      } else {
        team[doThing] = false
      } else {
        if (team.id === teamId) {
          team[doThing] = true
        }
      }
  }
  Team.addTeamsToPage(teamStore)
}

/// class creation
class Team {
  constructor(collegeName, teamName, teamMembership, teamDivision, teamId) {
    this.collegeName = collegeName
    this.teamName = teamName
    this.teamMembership = teamMembership
    this.teamDivision = teamDivision
    this.id = teamId
    this.winner = false
    this.softDelete = false
    teamStore.push(this)
  }

static
///class method to load page with teams
  addTeamsToPage(arr) {
    let teamTable = document.getElementById('table-body')
    teamTable.innerHTML = ""
    for (team of arr) {
      if (team.winner === false && team.softDelete === false){
        let rowHtml = `<tr><td>${team.collegeName}  <p class="remove" data-id='${team.id}' style="color:red;font-size:.75em;cursor:default">Remove From Competition</p></td> <td>${team.teamName}</td> <td>${team.teamMembership}</td> <td>${team.teamDivision}</td> <td><img class="trophy" src='./assets/trophy.png' data-id='${team.id}'/></td> </tr>`
        teamTable.innerHTML += rowHtml
      } else if (team.winner === true) {
        let winHead = document.getElementById('winner')
        let winField = document.createElement('div')
        winField.className = "winning-team"
        winHead.innerHTML = ""
        winHead.innerHTML += `<h2>${team.teamName} From ${team.collegeName} Are This Years Winners`
      }
    }
  }

}

/// create team objects
function createTeamClassObjects(teamArr) {
  for (team of teamArr) {
    let collegeName = team.college.name
    let teamName = team.name
    let teamMembership = team.membership
    let teamDivision = team.college.division
    let teamId = team.id
    let newTeam = new Team(collegeName, teamName, teamMembership, teamDivision, teamId)
  }
  Team.addTeamsToPage(teamStore)
}

///sort by, delete and winner "buttons"
window.addEventListener("click", (event)=> {
  if (event.target.className === "trophy") {
    let doThing = "winner"
    let teamId = parseInt(event.target.dataset.id)
    changeStatus(teamId, doThing)
  }
  if (event.target.className === "remove") {
    let doThing = "softDelete"
    let teamId = parseInt(event.target.dataset.id)
    changeStatus(teamId, doThing)
  }
  if (event.target.id === "sort-college") {
    let sortKey = "collegeName"
    sortTableByValue(sortKey, revCollege)
    if (revCollege) {
      revCollege = false
    } else {
      revCollege = true
    }
  }
  if (event.target.id === "sort-group") {
    let sortKey = "teamName"
    sortTableByValue(sortKey, revGroup)
    if (revGroup) {
      revGroup = false
    } else {
      revGroup = true
    }
  }
  if (event.target.id === "sort-membership") {
    let sortKey = "teamMembership"
    sortTableByValue(sortKey, revMembership)
    if (revMembership) {
      revMembership = false
    } else {
      revMembership = true
    }
  }
  if (event.target.id === "sort-division") {
    let sortKey = "teamDivision"
    sortTableByValue(sortKey, revDivision)
    if (revDivision) {
      revDivision = false
    } else {
      revDivision = true
    }
  }
})

///api fetch
function init() {
  fetch(BASE_URL)
  .then(function(response) {
    return response.json()
  })
  .then(function(responseJson){
    createTeamClassObjects(responseJson)
  })
}
