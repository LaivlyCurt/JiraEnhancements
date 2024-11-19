//auto-dismiss alerts after at least 5 seconds
let foundAlertDismiss = false;

setInterval(() => {
	let alertDismiss = document.querySelector('[data-testid="platform.ui.flags.common.ui.common-flag-v2-dismiss"]');
	
	if (alertDismiss) {
		if (foundAlertDismiss) {
			alertDismiss.click();
		} else {
			foundAlertDismiss = true;
		}
	} else {
		foundAlertDismiss = false;
	}
}, 5000);


//add filter search
function filterElements(searchString) { 
    // Get all elements with the class .css-1c0ken 
    const elements = document.querySelectorAll('.css-1c0ken'); 
    elements.forEach(element => { 
        // Get the text content of the element 
        const textContent = element.textContent || element.innerText; 
        // Show or hide the element based on whether it contains the search string 
        if (!searchString || textContent.toLowerCase().includes(searchString.toLowerCase())) { 
            element.style.display = ''; 
        } else { 
            element.style.display = 'none'; 
        } 
    }); 
}
const textbox = document.createElement('input');
textbox.type = 'text';
textbox.style.marginTop = '5px';
textbox.placeholder = 'Search for filter...';
const parentNode = document.querySelector('.css-1sausy9');
parentNode.insertBefore(textbox, parentNode.firstChild);
textbox.addEventListener('input', (event) => {
    const searchString = event.target.value;
    filterElements(searchString);
});

//add sort by column on issue filter list
function sortTable(columnIndex) {
    const table = document.querySelector("table");
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.rows); // Select rows only within tbody
    const isNumeric = !isNaN(rows[0].cells[columnIndex].innerText); // Check if the column contains numeric values

    rows.sort((a, b) => {
        const aValue = a.cells[columnIndex].innerText;
        const bValue = b.cells[columnIndex].innerText;

        if (isNumeric) {
            return Number(aValue) - Number(bValue);
        } else {
            return aValue.localeCompare(bValue);
        }
    });

    // Append the sorted rows back to the tbody
    rows.forEach(row => tbody.appendChild(row));
}

document.querySelectorAll('table th').forEach((header, index) => {
    header.ondblclick = () => {
        if (confirm('Do you want to sort by this column? This will only apply to this page of data.')) {
            sortTable(index);
        }
    };
});
