let orderItem = document.querySelectorAll(".order-item");
let orderBox = document.querySelector(".order-box")

for (const items of orderItem) {
    items.addEventListener("click", ()=>{
        console.log("hey")
    })
    console.log(items.textContent)
}

var priceCalculator = document.getElementById('quote-calc');
priceCalculator.onchange = calculatesubtotal;
priceCalculator.onchange();



function calculatesubtotal() {
	let beds = Number(document.getElementById('beds').value) || 0;
	var extras = 0;
    var stain = 0;
    var fold = 0;
    var stash = 0;
    var iron = 0;
	let optionsPriceList = [150, 50, 150, 29]

    var removeStain = document.querySelectorAll('.extra-container');

    removeStain.forEach((opt, index)=>{
        opt.addEventListener("click", ()=>{
            if(opt.className == 'extra-container'){
                opt.className = 'on';
                extras += optionsPriceList[index];
                var subtotal = beds + Number(extras);
                document.getElementById("total").innerHTML = "₦" + subtotal.toFixed(2);

                document.getElementById("estimate").innerHTML = "₦" + subtotal.toFixed(2);
            } else {
                //retain styling
                opt.className = 'extra-container';
                /*stain -= 150;
				stain + fold + stash + iron*/
                extras -= optionsPriceList[index];
                var subtotal = beds + Number(extras);
                document.getElementById("total").innerHTML = "₦" + subtotal.toFixed(2);

                document.getElementById("estimate").innerHTML = "₦" + subtotal.toFixed(2);
            }
        })
    })
    

	extras = stain + fold + stash + iron;
	var subtotal = beds + extras;
	document.getElementById("total").innerHTML = "₦" + subtotal.toFixed(2);

    document.getElementById("estimate").innerHTML = "₦" + subtotal.toFixed(2);
}
//For appending 
function addItem(){

    var ul = document.getElementById("dynamic-list");
    var wear = document.getElementById("candidate");
    var li = document.createElement("li");

    li.setAttribute("id", wear.options[wear.selectedIndex].text);
    li.appendChild(document.createTextNode(wear.text));
    ul.appendChild(li);
}
function removeItem(){

    var ul = document.getElementById("dynamic-list");
    var wear = document.getElementById("candidate");
    var item = document.getElementById(wear.value);
    ul.removeChild(item);
}

// function selectOnChange(){
//     var selectedValue = document.getElementById('candidate').name;
//     // var displayText = selectedValue.options[selectedValue.selectedIndex].text;
//     console.log(selectedValue);
// }