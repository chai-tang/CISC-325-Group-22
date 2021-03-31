// Page load functions:
window.addEventListener("load",function(){
    // Make the "Create Block" buttons show the block creation menu when clicked
    // Applies to both the new input and new operator blocks
    const newInputButton = document.getElementById("show-input-menu");
    newInputButton.addEventListener("click",showInputBlockMenu);
    const newOperatorButton = document.getElementById("show-operator-menu");
    newOperatorButton.addEventListener("click",showOperatorBlockMenu);

    // Make the "Create Rule" button show the rule creation menu when clicked
    const newRuleButton = document.getElementById("show-rule-menu");
    newRuleButton.addEventListener("click",showRuleMenu);

    // Make the "Add Block" buttons add the block to the appropriate div when clicked
    const createButtons = document.getElementsByClassName("create");
    createButtons[0].addEventListener("click",addInputBlock);
    createButtons[1].addEventListener("click",addOperatorBlock);
    // Make the "Add Rule" button add a new rule to the rules div
    createButtons[2].addEventListener("click",addRule);

    // Make the "Cancel" button hide the associated block creation menu when clicked
    const cancelButtons = document.getElementsByClassName("cancel");
    cancelButtons[0].addEventListener("click",hideInputBlockMenu);
    cancelButtons[1].addEventListener("click",hideOperatorBlockMenu);
    cancelButtons[2].addEventListener("click",hideRuleMenu);

    // Make the "Delete" buttons delete their parent element
    makeDeleteButtonsWork();

    // Update the new rule dropdown forms
    updateRuleMenu();
    
})

// This function makes the input block creation menu visible
function showInputBlockMenu(){
    var form = document.getElementById("new-input");
    form.style.display = "block";
}
// This function makes the operator block creation menu visible
function showOperatorBlockMenu(){
    var form = document.getElementById("new-operator");
    form.style.display = "block";
}
// This function makes the rule creation menu visible
function showRuleMenu(){
    var form = document.getElementById("new-rule");
    form.style.display = "block";
}
// This function hides the input block creation menu
function hideInputBlockMenu(){
    var form = document.getElementById("new-input");
    form.style.display = "none";
}
// This function hides the operator block creation menu
function hideOperatorBlockMenu(){
    var form = document.getElementById("new-operator");
    form.style.display = "none";
}
// This function hides the rule creation menu 
function hideRuleMenu(){
    var form = document.getElementById("new-rule");
    form.style.display = "none";
}



// Adds a new block to the target based on the inputs in the target's new block menu
// In theory this would also write a new block to the database with associated name/value/type
// But obviously we aren't doing that in this prototype.

function addInputBlock(){
    // Get the target div
    var target = document.getElementsByClassName("inputs")[0];
    // Create a new block based on the values in the form
    var block = document.createElement("li");
    block.innerHTML = document.forms["new-input"]["Label"].value;
    block.innerHTML += "<button class='delete'>X</button>";
    // Get the desired <ul> and append the block to it
    var blockList = target.children[1];
    blockList.appendChild(block);
    // Hide the block creation menu afterwards
    hideInputBlockMenu();
    // Make the new delete button work
    makeDeleteButtonsWork();
    // Update the rules menu
    updateRuleMenu();
}
function addOperatorBlock(){
    // Get the target div
    var target = document.getElementsByClassName("operators")[0];
    // Create a new block based on the values in the form
    var block = document.createElement("li");
    block.innerHTML = document.forms["new-operator"]["Label"].value;
    block.innerHTML += "<button class='delete'>X</button>";
    // Get the desired <ul> and append the block to it
    var blockList = target.children[1];
    blockList.appendChild(block);
    // Hide the block creation menu afterwards
    hideOperatorBlockMenu();
    // Make the new delete button work
    makeDeleteButtonsWork();
    // Update the rules menu
    updateRuleMenu();
}

// Makes all delete buttons destroy their parent elements
function makeDeleteButtonsWork(){
    const deleteButtons = document.getElementsByClassName("delete");
    for (i=0; i<deleteButtons.length; i++){
        deleteButtons[i].onclick = function(){
            this.parentElement.remove();
            // Update the rules menu
            updateRuleMenu();
        }
    }
}

// Adds a new rules to the output/rules div based on the values in the associated form
function addRule(){
    // Get the target div
    var target = document.getElementsByClassName("outputs")[0];
    // Create a new rule based on the values in the form
    var rule = document.createElement("li");

    var string = "<div class='input-block'>";
    string += document.getElementById("in1").value;
    string += "</div>";

    string += "<div class='operator-block'>";
    string += document.getElementById("op").value;
    string += "</div>";

    string += "<div class='input-block'>";
    string += document.getElementById("in2").value;
    string += "</div>";

    string += "<div>Outputs:</div>";

    string += "<div class='output-block'>";
    string += document.forms["new-rule"]["out"].value;
    string += "</div>";

    string += "<button class='delete'>X</button>";

    rule.innerHTML = string;

    // Get the desired <ul> and append the block to it
    var ruleList = target.children[1];
    ruleList.appendChild(rule);
    // Hide the rule creation menu afterwards
    hideRuleMenu();
    // Make the new delete button work
    makeDeleteButtonsWork();
}


// Updates the values in the new rule form dropdown menus based on the values in the input/operator divs
function updateRuleMenu(){
    // get the list of inputs
    const inputBlocks = document.getElementsByClassName("inputs")[0].children[1];
    // get the list of operators
    const operatorBlocks = document.getElementsByClassName("operators")[0].children[1];

    // update the in1 and in2 forms with all the inputBlocks
    const in1 = document.getElementById("in1");
    const in2 = document.getElementById("in2");
    [in1,in2].forEach((elem) => {
        elem.innerHTML = "<option>ANY</option>";
        let items = inputBlocks.children;
        for (i=0; i<items.length; i++){
            let str = "<option>";
            str += items[i].childNodes[0].textContent;
            str += "</option>";
            elem.innerHTML += str;
        }
    });

    // update the op form with all the operatorBlocks
    const op = document.getElementById("op");
    op.innerHTML = "<option>ANY</option>";
    let items = operatorBlocks.children;
    for (i=0; i<items.length; i++){
        let str = "<option>";
        str += items[i].childNodes[0].textContent;
        str += "</option>";
        op.innerHTML += str;
    }

}