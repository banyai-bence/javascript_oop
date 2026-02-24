/**
 * @typedef {{label: string,name: string, id: string, type: string,required: boolean }} FormFieldType
 * @typedef {{name: string, colspan?: number}[]} HeaderArrayType 
 * @typedef {{neve: string, kor: string, szerelme1: string, szerelme2: string}} ColspanType
 * @typedef {{nemzet: string, szerzo: string, mu: string, szerzo2: string, mu2: string}} RowspanType
 * 
 * @callback HeaderCallback
 * @param {HTMLTableRowElement} row a header sor elementje
 * @returns {void}
 */

/**
 * 
 * @param {"th" | "td"} type 
 * @param {string} content 
 * @param {HTMLElement} parent 
 * 
 * @return {HTMLTableCellElement}
 */
const createTableCell = (type, content, parent) => {
    const cell = document.createElement(type);
    cell.innerText = content;
    parent.appendChild(cell);
    return cell;
}

/**
 * 
 * @param {HTMLTableSectionElement} tbody 
 * @param {ColspanType} element 
 */
const tbodyRenderColspan = (tbody, element) => {
    const tr = document.createElement('tr');
    tbody.appendChild(tr);
    createTableCell('td', element.neve, tr)
    createTableCell('td', element.kor, tr)
    const td3 = createTableCell('td', element.szerelme1, tr)
    if(element.szerelme2) {
        createTableCell('td', element.szerelme2, tr)
    }else{
        td3.colSpan = 2;
    }
}

/**
 * 
 * @param {HTMLTableSectionElement} tbody 
 * @param {RowspanType} element 
 */
const tbodyRenderRowspan = (tbody, element) => {
    const tr = document.createElement('tr');
    tbody.appendChild(tr);
    const td1 = createTableCell('td', element.nemzet, tr)
    createTableCell('td', element.szerzo, tr)
    createTableCell('td', element.mu, tr)
    if(element.szerzo2 && element.mu2) {
        td1.rowSpan = 2;
        const tr2 = document.createElement('tr'); 
        tbody.appendChild(tr2);
        createTableCell('td', element.szerzo2, tr2)
        createTableCell('td', element.mu2, tr2)
    }
}

/**
 * 
 * @param {HTMLElement} parent ehhez csatoljuk hozza a table-t
 * @param {HeaderCallback} headerCallback ez fut le miutan hozzafuzzuk a tablazat fejlecehez a tablazatsort
 * @returns {HTMLTableSectionElement} a tablazat torzse
 */
const createTable = (parent, headerCallback) => {
    const table = document.createElement('table')
    parent.appendChild(table);
    const header = document.createElement('thead');
    table.appendChild(header);
    const tr = document.createElement('tr');
    header.appendChild(tr);
    headerCallback(tr);
    const tbody = document.createElement('tbody');
    table.appendChild(tbody)
    return tbody
}

/**
 * 
 * @param {{id: string, name: string, labelContent: string, parent: HTMLElement}} param A parameterobjektum ami alapjan osszeallitja az inputot tartalmazo divet az errorral
 * @returns {{errorElement: HTMLElement, input: HTMLInputElement}} Az error html elem, es az input html elem
 */
const createInputField = ({id, name, labelContent, parent}) =>{
    const div = document.createElement('div');
    parent.appendChild(div);
    
    const label = document.createElement('label');
    label.innerText = labelContent;
    div.appendChild(label);
    const input = document.createElement('input')
    div.appendChild(input);
    input.type = 'text';
    input.id = id;
    input.name = name;
    const errorElement = document.createElement('div');
    errorElement.classList.add('error');
    div.appendChild(errorElement);
    return {errorElement, input};
}

/**
 * @callback CreateFieldsCallback
 * @param {HTMLFormElement} form a form amihez hozzafuzzuk
 * @returns {void}
 * 
 * @callback SubmitEventListener
 * @param {Event} event submitesemeny
 * @returns {void}
 * 
 * @param {CreateFieldsCallback} createFieldsCallback 
 * @param {SubmitEventListener} submitEventListener 
 * @returns {HTMLFormElement}
 */
const createForm = (createFieldsCallback, submitEventListener) => {
        const form = document.createElement('form')
        createFieldsCallback(form);
        const button = document.createElement('button');
        button.innerText = 'Küldés';
        form.appendChild(button)
        form.addEventListener('submit', submitEventListener);
        return form;
}

export {createTableCell, tbodyRenderColspan, createTable, createInputField, createForm, tbodyRenderRowspan}