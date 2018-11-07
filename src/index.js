document.addEventListener("DOMContentLoaded", function(event){
  let url = "http://localhost:3000/a_cappella_groups"
  let table = document.querySelector('table')
  let winner = document.getElementById("winner")
  let currentWinner;

  fetch(url).then(function(response){
    return response.json()
  }).then(function(json){
    json.forEach(function(group){
      table.innerHTML +=
      `<tr id="${group.id}"><td>${group.college.name}</td>
            <td>${group.name}</td>
            <td>${group.membership}</td>
            <td>${group.college.division}</td>
            <td><img src='./assets/trophy.png' data-id='${group.id}'/></td> </tr>`
    })
  })

  table.addEventListener("click", function(e){
    id = e.target.dataset.id
    if (currentWinner !== undefined){
      table.innerHTML +=
      `<tr id="${Number(currentWinner.id)}"><td>${currentWinner.children[0].innerText}</td>
            <td>${currentWinner.children[1].innerText}</td>
            <td>${currentWinner.children[2].innerText}</td>
            <td>${currentWinner.children[3].innerText}</td>
            <td><img src='./assets/trophy.png' data-id='${Number(currentWinner.id)}'/></td> </tr>`
    }
    currentWinner = document.getElementById(id)
    if (e.target.tagName === "IMG"){
      // winningTeam = document.getElementById(id)
      winningTeamArray = Array.from(currentWinner.children)
      winningTeamSchool = winningTeamArray[0].innerText
      winningTeamName = winningTeamArray[1].innerText
      winner.innerHTML = `Winner: <span>${winningTeamSchool}</span><span> ${winningTeamName}</span>`
      currentWinner.remove()
    }
  })
})
