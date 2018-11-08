const BASE_URL = 'http://localhost:3000/a_cappella_groups'

let tableBody
let winnerLabel
let winnerLabelText

const fetchAcappellaGroups = () => {
  return fetch(BASE_URL).then(resp => resp.json()) 
}

const displayGroups = (group) => {
  tableBody.innerHTML += `<tr>
    <td>${group.college.name}</td>
    <td>${group.name}</td>
    <td>${group.membership}</td>
    <td>*${group.college.division}</td>
    <td><img src='./assets/trophy.png' data-id='${group.id}'/></td>
  </tr>
  `
}

const deleteGroup = (groupId) => {
  return fetch(`${BASE_URL}/${groupId}`, {
    method:  'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
}

const init = () => {
  tableBody = document.querySelector('#table-body')
  winnerLabel = document.querySelector('#winner')
  winnerLabelText = document.createElement('span')

  fetchAcappellaGroups()
    .then(resp => resp.forEach(displayGroups))
}


const removeGroup = (id) => {
  let target = document.querySelector(`[data-id='${id}']`).parentElement.parentElement
  target.remove()
}

document.addEventListener('DOMContentLoaded', () => {
  init()

  tableBody.addEventListener('click', (e) => {
    const delBtn = e.target.tagName
    const groupId = e.target.dataset.id
    let groupName = e.target.parentElement.parentElement.firstElementChild
    
    if (delBtn === 'IMG') {
      deleteGroup(groupId)
      winnerLabelText.innerText = groupName.textContent
      winnerLabel.appendChild(winnerLabelText)
      removeGroup(groupId)
    }
  })
})


