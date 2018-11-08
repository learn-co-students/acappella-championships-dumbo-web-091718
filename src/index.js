document.addEventListener('DOMContentLoaded', () => {
    let url =  "http://localhost:3000/a_cappella_groups/"
    let tableBody = document.getElementById("table-body")

    // console.log(tableBody)
    // now go fetch, boy

    fetch(url).then(function(response){
        return response.json()
    }).then(function(json){
        console.log(json)

        json.forEach(renderGroup)

    
    function renderGroup(group){
        tableBody.innerHTML += `<tr>
        <td>${group.college.name}</td> 
        <td>${group.name}</td> 
        <td>${group.membership}</td> 
        <td>${group.college.division}</td> 
        <td><img src='./assets/trophy.png' data-id='${group.id}'</td> 
        </tr>`
    }
    
    // let container = document.getElementsByTagName("table")
    // console.log(container)
    
    tableBody.addEventListener("click", function(){
            event.preventDefault()
            
            console.log(event)
            winnerButton = document.getElementById("winner")
            winner = event.target.parentElement.parentElement.children[1]
            winnerButton.innerText = winner.innerText
            // console.log(winner)
            // console.log("ahh")
            
        })
    })
})

