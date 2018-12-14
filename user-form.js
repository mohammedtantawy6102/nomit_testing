// JSON within the file
// Use async function to fill form later?
// Still working on date-picker


"use strict"

let schemeJson = [
    {name: "full_name", type: "text", required: true, label: "Full name" },
    {name: "dob", type: "text", required: true, label: "Date of Birth" },
    {name: "arrivedAt", type: "text", required: true, label: "Arrived in Australia" },
    {name: "visa", type: "dropdown", required: true, label: "Visa Type", dropdown: [ "417 Working Holiday 1st yr", "417 Working Holiday 2nd yr", "417 Working Holiday 3rd yr", "462 Work and Holiday", "600 Student"], },
    {name: "skills", type: "tags", required: true, label: "Skills" },
];
let formHtml = '';
for (let key in schemeJson) {
    let field = schemeJson[key];
    let visas = field.dropdown;
    if(field.type =="dropdown"){
      formHtml += `
        <div class="form-group">
          <label for="${field.name}">${field.label}</label>
          <select id="${field.name}" class="form-control">
            <option selected>Choose...</option>
            ${visas.map(visa => `
              <option>${visa}</option>
            `)}
          </select>
        </div>
      `;
    } else {
      formHtml += `
        <div class="form-group">
          <label for="${field.name}" class="bmd-label-floating">${field.label}</label>
          <input type="${field.type}" class="form-control" name="${field.name}">
        </div>
      `;
    }
}
formHtml += `<button type="submit" class="btn btn-primary">Submit</button>`;
document.getElementById('hello').innerHTML = formHtml;
