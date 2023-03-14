let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

let localStorageLeads = JSON.parse(localStorage.getItem("myLeads"));
console.log(localStorageLeads);

if (localStorageLeads) {
  myLeads = localStorageLeads;
  renderLeads();
}

inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  inputEl.value = "";
  renderLeads();
});

inputEl.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    inputBtn.click();
  }
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  renderLeads();
});

tabBtn.addEventListener("click", function () {
    
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log(tabs)
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads();
  });
});

function renderLeads() {
  let listItems = "";
  for (let i = 0; i < myLeads.length; i++) {
    if (myLeads[i].substring(0, 8) === "https://") {
      listItems += `
        <li>
            <a target='_blank' href='${myLeads[i]}'>
                ${myLeads[i]}
            </a>
        </li>
    `;
    } else {
      listItems += `
            <li>
                <a target='_blank' href='https://${myLeads[i]}'>
                    ${myLeads[i]}
                </a>
            </li>
        `;
    }
  }
  ulEl.innerHTML = listItems;
}
