// Page load functions:
window.addEventListener("load", function () {
	makeBlocksDragable();
	makeAreasDropable();
});

// Adds block dragging functionality to all block elements
function makeBlocksDragable() {
	// Get all the block objects
	const blocks = document.getElementsByClassName("block");

	// When a block is picked up, set global data variables to its values.
	for (i = 0; i < blocks.length; i++) {
		blocks[i].addEventListener("dragstart", function (event) {
			//event.preventDefault();
			event.dataTransfer.setData("value", event.target.getAttribute("value"));
			event.dataTransfer.setData("type", event.target.getAttribute("type"));
			// set this block as the last selected, so that it gets removed when dropped
			// make sure not to remove the output block though or else it's gone forever lmao
			if (this.getAttribute("type") !== "output") {
				this.setAttribute("id", "last-selected");
			}
		});
	}
}

// Makes the input/operation/bank areas valid locations to drop blocks into
function makeAreasDropable() {
	// When a block is dropped, check the value and type global data variables
	// and append the appropriate block to that container.

	const blockBank = document.getElementById("block-bank");
	const inBlock1 = document.getElementById("input-block-1");
	const opBlock = document.getElementById("operator-block");
	const inBlock2 = document.getElementById("input-block-2");

	[inBlock1, inBlock2, blockBank, opBlock].forEach((item) => {
		item.addEventListener("dragover", function (event) {
			event.preventDefault();
		});
		item.addEventListener("drop", function (event) {
			event.preventDefault();
			dropBlock(event, item);
		});
	});
}

function calculateResult(in1, in2, op) {
	switch (op) {
		case "+":
			return in1 + in2;
		case "-":
			return in1 - in2;
		default:
			return null;
	}
}

// Updates the value in the output block based on the values in the inputs/operator
// Right now it's hard coded to only to basic math because this turned out to be a lot more work than expected
function updateOutputBlock() {
	// get blocks
	const outBlock = document.getElementById("output-block").children[1];
	const input1 = document.getElementById("input-block-1").children[1];
	const input2 = document.getElementById("input-block-2").children[1];
	const opBlock = document.getElementById("operator-block").children[1];

	let result = "";

	// if all blocks are present
	if (input1 && input2 && opBlock && outBlock) {
		// get values
		const in1 = input1.getAttribute("value");
		const in2 = input2.getAttribute("value");
		const op = opBlock.getAttribute("value");

		result = calculateResult(parseInt(in1), parseInt(in2), op);
	}

	outBlock.innerHTML = result;
	outBlock.setAttribute("value", result);
}

// adds a block to the given event target
function dropBlock(event) {
	console.log(event.dataTransfer);
	const block = document.getElementById("last-selected");
	if (!block) {
		event.preventDefault();
		return;
	}

	// Remove last-selected id
	block.setAttribute("id", null);

	// check if the block can be dropped into the container
	const target = event.target;

	// check if the container already has a block
	if (target.id !== "block-bank" && target.children.length !== 1) {
		event.preventDefault();
		return;
	}

	// get the data variables
	const value = event.dataTransfer.getData("value");
	let type = event.dataTransfer.getData("type");

	// check if dropping into the correct container
	if (target.id !== "block-bank" && target.id.indexOf(type) === -1) {
		event.preventDefault();
		return;
	}

	// if the type is output, change it to input
	if (type === "output") {
		type = "input";
	}

	// attempt to destroy the old block
	// sometimes the block is simply too powerful to be destroyed though
	try {
		block.remove();
	} catch (err) {
		console.log(err);
	}

	// create a block object based on said values
	const newBlock = document.createElement("div");
	newBlock.innerHTML = value;
	newBlock.setAttribute("class", "block");
	newBlock.setAttribute("value", value);
	newBlock.setAttribute("type", type);
	newBlock.setAttribute("draggable", true);
	// append it to the target
	target.appendChild(newBlock);
	// make it dragable
	makeBlocksDragable();
	// update the output block
	updateOutputBlock();
}
