Congrats! You are a building a website for the the Collegiate A Cappella Network. Below are the app deliverables.

### Getting Started

You will be using the [json-server](https://github.com/typicode/json-server) package to mock an external API. You can make the same RESTful requests to this server that you would to any API. If you haven't yet, install json-server.
```bash
npm install -g json-server
```

Then run the server with:
```bash
json-server db.json
```

This will serve your code on http://localhost:3000.

### Deliverables

~~- Your list of a cappella groups must be fetched from `http://localhost:3000/a_cappella_groups`~~
~~- Get the list of groups to display on the page and fill the table with relevant information.~~
~~- Your table HTML might look something like this: `<tr><td>*Insert College*</td> <td>*Insert Group Name*</td> <td>*Insert Membership*</td> <td>*Insert Division*</td> <td><img src='./assets/trophy.png' data-id='*put an id here*'/></td> </tr>`~~
~~- On click of a button, remove the associated group from the table and add it to the Winner h2.~~
~~- If you are struggling with identifying which group has been clicked, [try reading this](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes).~~
- BONUS: If a new group is selected as winner, the new group should be removed from the table and replace the old group in the Winner h2. The old group should also return to the table. At any given time, all groups should be visible on the app, but each should appear only once.
- DOUBLE BONUS: Can you add a delete button which removes a group from the competition table?
- TRIPLE BONUS: Can you make clicking on a table headers sort by that column attribute?

![demo](assets/app.gif)
