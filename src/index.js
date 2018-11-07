document.addEventListener('DOMContentLoaded', function(){

  const BASE_URL = 'http://localhost:3000/a_cappella_groups'
  const tableCon = document.querySelector('table')
  const winnerCon = document.getElementById('winner')

  function init() {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(json => json.forEach(group => {
          // debugger
          tableCon.innerHTML += `<tr><td>${group.college.name}</td> <td>${group.name}</td> <td>${group.membership}</td> <td>${group.college.division}</td> <td><img src='./assets/trophy.png' data-id='${group.id}'/></td> </tr>`
        })
      )
  }

  tableCon.addEventListener('click', event => {
    // debugger
    if (event.target.tagName === 'IMG') {
      let groupRow = event.target.parentElement.parentElement
      let groupArr = event.target.parentElement.parentElement.children
      let groupName = groupArr[1].innerText
      let collegeName = groupArr[0].innerText

      winnerCon.innerHTML = `Winner: ${collegeName} ${groupName}`

      groupRow.remove()
    }
  })

  init()
})
