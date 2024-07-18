let Name = document.getElementById('nameInput')
let Date = document.getElementById('DateInput')
let Amount = document.getElementById('AmountInput')
let table = document.getElementById('tableBody')
let SearchInput = document.getElementById('searchInput')
let btnAdd = document.getElementById('AddDetails')
let btnEdit = document.getElementById('EditDetails')
let customerDetailsArr = []


if (localStorage.getItem(`DataUser`) == null) {
  customerDetailsArr = []
} else {
  customerDetailsArr = JSON.parse(localStorage.getItem('DataUser'))
  displayData()
  console.log(customerDetailsArr)
}


Name.addEventListener('input', function() {
  this.value = this.value.replace(/[^a-zA-Z]/g, ''); 
});

Amount.addEventListener('input', function() {
  this.value = this.value.replace(/[^0-9]/g, ''); 
});

function allFieldsFilled() {
  return Name.value.trim() !== '' && 
         Date.value.trim() !== '' &&
         Amount.value.trim() !== '';
}

function GetData () {
  let customers = { ID: customerDetailsArr.length + 1, name: Name.value, Date: Date.value, Amount: Amount.value }
    
  customerDetailsArr.push(customers)
  displayData()
  localStorage.setItem(`DataUser`, JSON.stringify(customerDetailsArr))
  ClearForm()
}


function ClearForm () {
  Name.value = ''
  Date.value = ''
  Amount.value = ''
  SearchInput.value=''
}


function displayData () {
  let table = ``
  for (let i = 0; i < customerDetailsArr.length; i++) {
    table += `
              <tr class="text-center " >
                  <th data-id="${customerDetailsArr[i].ID}" scope="row" class="p-2"> ${[i + 1]}</th>
                  <td>${customerDetailsArr[i].name}</td>
                      <td>${customerDetailsArr[i].Date}</td>
                      <td>${customerDetailsArr[i].Amount}$</td>
                      <td><button data-Index-Btn="${[
                        i
                      ]}" type="button" class="btn btn-danger "  >Delete</button></td>
                      <td><button data-Index-Btn="${[
                        i
                      ]}" type="button" class="btn btn-warning" >Edit</button></td>
                  </tr>
          `
  }
  document.getElementById('tableBody').innerHTML = table
  DeleteData()
  setUpForUpdate()
}


function DeleteData () {
  let DeleteBtn = document.querySelectorAll(`.btn-danger`)
  for (let i = 0; i < DeleteBtn.length; i++) {
    DeleteBtn[i].addEventListener('click', function (e) {
      let index = e.target.getAttribute('data-index-btn')
      customerDetailsArr.splice(index, 1)
      localStorage.setItem(`DataUser`, JSON.stringify(customerDetailsArr))
      displayData()
    })
  }
}


function SearchData() {
  let term = SearchInput.value.toLowerCase();
  let rows = table.rows;
  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];
    let name = customerDetailsArr[i].name.toLowerCase();
    let amount = customerDetailsArr[i].Amount.toLowerCase();
    if (name.includes(term) || amount.includes(term)==true) {
      row.style.display = ''; // show the row
    } else {
      row.style.display = 'none'; // hide the row
    }
  }
}


function setUpForUpdate () {
  let EditBtn = document.querySelectorAll(`.btn-warning`)
  for (let i = 0; i < EditBtn.length; i++) {
    EditBtn[i].addEventListener('click', function (e) {
      btnAdd.classList.add('d-none')
      btnEdit.classList.remove('d-none')
      let index = e.target.getAttribute('data-index-btn')
      Name.value = customerDetailsArr[index].name
      Date.value = customerDetailsArr[index].Date
      Amount.value = customerDetailsArr[index].Amount
      btnEdit.setAttribute('data-index-btn', index)
    })
  }
  ClearForm()
}


function GetUpdate () {
  let index = btnEdit.getAttribute('data-index-btn')
  customerDetailsArr[index].name = Name.value
  customerDetailsArr[index].Date = Date.value
  customerDetailsArr[index].Amount = Amount.value
  btnEdit.classList.add('d-none')
  btnAdd.classList.remove('d-none')
  localStorage.setItem(`DataUser`, JSON.stringify(customerDetailsArr))
  displayData()
  ClearForm()
}


SearchInput.addEventListener('input', () => SearchData())
btnAdd.addEventListener('click', function() {
  if (allFieldsFilled()) {
    GetData(); 
    location.reload();
ClearForm()
displayData()
  } else {
    alert('Please fill all the required fields.');
    return;
  }
});
btnEdit.addEventListener('click', function() {
  if (allFieldsFilled()) {
    GetUpdate(); 
    location.reload();
ClearForm()
displayData()
  } else {
    alert('Please fill all the required fields.');
    return;
  }
});