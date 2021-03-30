// Page load functions:
window.addEventListener("load",function(){
    // Make the "New Project" button show the project creation menu when clicked
    let newProjectButton = document.getElementById("new-project");
    newProjectButton.addEventListener("click",showNewProject);

    // Make the "Create Project" button add the project to the table when clicked
    let addProjectButton = document.getElementsByClassName("create");
    addProjectButton[0].addEventListener("click",addNewProject);

    // Make the "Cancel" button hide the project creation menu when clicked
    let cancelProjectButton = document.getElementsByClassName("cancel");
    cancelProjectButton[0].addEventListener("click",hideNewProject);

    // Effectively makes each table row a clickable button that redirects to another page in the site.
    // Right now they all redirect to the same page, but in theory they could be made to redirect 
    // to unique pages. In practice, there would also be a function here to fetch all the
    // user's projects from a database and fill the table with that data. But this is just a 
    // prototype, so that's not my problem right now.
    makeRowsClickable()
    
})

// This function makes the project creation menu visible
function showNewProject(){
    var form = document.getElementById("project-form");
    form.style.display = "block";
}
// This function makes the project creation menu invisible
function hideNewProject(){
    var form = document.getElementById("project-form");
    form.style.display = "none";
}

// This is a function I stole from stackoverflow to generate the current date
// and format it into something nice looking.
function formatDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

/*
    This function adds a new row to the project table.
    The contents of that row are filled with the inputs the user
    gave in the forms of the project creation menu. The date cell
    is filled with the current date using the formatDate() function.

    In practice, this function should really be attached to some kind of
    backend database rather than just adding a new HTML element that goes
    away after a refresh. However, this is just a front-end protoype so we're
    not gonna worry about that.
*/
function addNewProject(){

    var table = document.getElementById("projects");
    // Insert the row and corresponding cells
    var row = table.insertRow();
    var subject = row.insertCell(0);
    var grade = row.insertCell(1);
    var name = row.insertCell(2);
    var date = row.insertCell(3);
    // Fill the cells with form data
    subject.innerHTML = document.forms["project-form"]["Subject"].value;
    grade.innerHTML = document.forms["project-form"]["Grade"].value;
    name.innerHTML = document.forms["project-form"]["Name"].value;
    date.innerHTML = formatDate();
    // Realistically I don't need to make EVERY row clickable again, I could
    // just update the one we just added. But I'm lazy so I'm just gonna
    // call the entire function again.
    makeRowsClickable()
    // Hide the project creation table afterwards. I should probably clear the forms
    // here too, but I'm not gonna waste my time on that right now.
    hideNewProject();
}

// Another function stolen from stackoverflow, although the inner function
// has been replaced by my redirectToProject() function.
function makeRowsClickable(){
    var projectTable = document.getElementById("projects");
    var rows = projectTable.rows;
    for (i = 1; i < rows.length; i++) {
        rows[i].onclick = function(){ return function(){
            redirectToProject()
        };}(rows[i]);
    }
}

/* 
    This just redirects the user to an alternate page using a relative path.
    In practice, this function would take some kind of input so that it can redirect
    to different pages depending on which project the user clicked on. If you've made 
    this far you already know what I'm gonna say next.
*/
function redirectToProject(){
    window.location.href = "teacher-project.html";
}

