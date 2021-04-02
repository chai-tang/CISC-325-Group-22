// Page load functions:
window.addEventListener("load",function(){

    // Effectively makes each table row a clickable button that redirects to another page in the site.
    // Right now they all redirect to the same page, but in theory they could be made to redirect 
    // to unique pages. In practice, there would also be a function here to fetch all the
    // user's projects from a database and fill the table with that data. But this is just a 
    // prototype, so that's not my problem right now.
    makeRowsClickable();

    makeFilterButtonsWork();
    
})

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
    window.location.href = "student-project.html";
}

// Makes the filter buttons work, ie they filter out the non matching project rows
function makeFilterButtonsWork(){

    // apply to the all-button
    const allbutton = document.getElementById("all-button");
    allbutton.addEventListener("click",function(){
        showRows("all")
    });

    // apply to the math-button
    const mathbutton = document.getElementById("math-button");
    mathbutton.addEventListener("click",function(){
        showRows("math")
    });

    // apply to the art-button
    const artbutton = document.getElementById("art-button");
    artbutton.addEventListener("click",function(){
        showRows("art")
    });

    // apply to the science-button
    const sciencebutton = document.getElementById("science-button");
    sciencebutton.addEventListener("click",function(){
        showRows("science")
    });

}


// Makes all project rows with classname visible, and hides the others
function showRows(classname){

    const tbody = document.getElementsByTagName("tbody")[0];

    // if classname is "all" then make everything visible
    let isAll = classname == "all";

    for (i=0; i<tbody.children.length; i++){
        if (tbody.children[i].getAttribute("class") == classname || isAll){
            tbody.children[i].style.display = "table-row";
        }
        else {
            tbody.children[i].style.display = "none";
        }
    }

}