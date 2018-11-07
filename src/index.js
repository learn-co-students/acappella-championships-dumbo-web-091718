document.addEventListener("DOMContentLoaded", function(){

const tableBody = document.querySelector('#table-body');
const winnerCont = document.querySelector("#winner")
fetch('http://localhost:3000/a_cappella_groups')
  .then(res => res.json())
  .then(json => createGroupCollection(json))

  function deleteElement(groupId){
    let groupItem = document.querySelector(`[data-id="${groupId}"]`)
    groupItem.parentElement.parentElement.remove()
    fetch(`http://localhost:3000/a_cappella_groups/${groupId}`,{
      method: "delete"
    })
  }

function renderGroup(group){
  let groupCont = document.createElement('tr')
  groupCont.innerHTML =   `<td>${group.college.name}
  <button type="button" data-id="${group.id}">Delete</button></td>
    <td>${group.name}</td>
    <td>${group.membership}</td>
    <td>${group.college.division}</td>
    <td><img src='./assets/trophy.png' data-id='${group.id}'/>
    </td>`
  tableBody.appendChild(groupCont);
}

function createGroupCollection(groups){
  for (group of groups){
    renderGroup(group);
  }
}

document.addEventListener("click", (event)=>{
  if(event.target.dataset.id && event.target.tagName != 'button'){
    let groupRow = event.target.parentElement.parentElement;
    groupRow.remove();
    if(winnerCont.childNodes.length > 1){
      let tempCont = winnerCont.childNodes[1]
      winnerCont.removeChild(winnerCont.childNodes[1])
      tableBody.appendChild(tempCont);
    }
    winnerCont.appendChild(groupRow);
  }
})

document.addEventListener("click", (event)=>{
  // debugger;
  if(event.target.tagName == "BUTTON"){
    event.preventDefault();
    let groupId = event.target.dataset.id;
    deleteFromDB(groupId);
    event.target.parentElement.parentElement.remove();
  }
})




})
