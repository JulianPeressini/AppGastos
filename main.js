const entries = [];
const printButton = document.getElementById("print-btn");
const nameInput = document.getElementById("add-name-input");
const moneyInput = document.getElementById("add-amount-input");
const list = document.getElementById("element-list");

nameInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    add();
  }
});

moneyInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    add();
  }
});

function add() {
  if (nameInput.value != "" && moneyInput != "") {
    let newEntry = { name: nameInput.value, amount: +moneyInput.value };
    entries.push(newEntry);
    console.log(entries);
    nameInput.value = "";
    moneyInput.value = "";
    nameInput.focus();

    const li = document.createElement("li");
    const text = document.createTextNode(
      `${newEntry.name}: $${newEntry.amount}`
    );
    const button = document.createElement("button");
    button.innerHTML = "X";
    button.classList.add("delete-element-btn");
    button.setAttribute("onclick", "removeEntry(this)");

    li.classList.add("element-list-item");
    li.appendChild(text);
    li.appendChild(button);
    li.dataset.name = newEntry.name;
    list.appendChild(li);

    calculateTotal();
  }
}

function calculateTotal() {
  let total = 0;

  for (let entry of entries) {
    total += entry.amount;
  }

  if (entries.length > 1) {
    document.getElementById("total-price").innerHTML =
      "Total = $" +
      total +
      " ($" +
      (total / entries.length).toFixed(2) +
      " Por persona)";
  } else {
    document.getElementById("total-price").innerHTML = "Total = $" + total;
  }
}

function removeEntry(entry) {
  for (let i = 0; i < entries.length; i++) {
    console.log(entry.parentElement.dataset.name);
    if (entry.parentElement.dataset.name === entries[i].name) {
      entries.splice(i, 1);
      entry.parentElement.remove();
    }
  }

  calculateTotal();
}

function reset() {
  entries.splice(0, entries.length);

  for (let entry of document.querySelectorAll(".element-list-item")) {
    entry.remove();
  }

  calculateTotal();
}
