let lineData = []; // Store line data
let numBuses = 0; // Store the number of buses

function showNetwork() {
    const networkHtml = '<img src="3bus.png" alt="Network Diagram">';
    document.getElementById('network').innerHTML = networkHtml;
}

function showNetworkDetails() {
    const numBusesInput = parseInt(prompt('Enter the number of buses:'));
    const numLinesInput = parseInt(prompt('Enter the number of lines:'));

    if (numBusesInput <= 0 || numLinesInput <= 0 || numBusesInput > 24 || numLinesInput > 38) {
        alert('Network size is inappropriate to perform online mode.');
        return;
    }

    numBuses = numBusesInput;
    
    
// Show the table header after fetching data
    document.querySelector('#branchData thead').style.display = 'table-header-group';
    // Show the table
    document.getElementById('branchData').style.display = 'table';

    // Clear existing line data
    lineData = [];

    // Clear existing table
    const tbody = document.querySelector('#branchData tbody');
    tbody.innerHTML = '';

    // Add input fields for each line
    for (let i = 0; i < numLinesInput; i++) {
        addLine();
    }
}

function addLine() {
    const tbody = document.querySelector('#branchData tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="number" id="fromBus"></td>
        <td><input type="number" id="toBus"></td>
        <td><input type="number" id="R"></td>
        <td><input type="number" id="X"></td>
    `;
    tbody.appendChild(row);
}

function deleteLine() {
    const tbody = document.querySelector('#branchData tbody');
    if (tbody.children.length > 0) {
        tbody.removeChild(tbody.lastChild);
    }
}

// Code update for the calculation of diagonal and off-diagonal elements ****
function calculateDiagonal() {
    const tbody = document.querySelector('#branchData tbody');
    lineData = []; // Reset line data
    
    // Extract line data from table
    tbody.querySelectorAll('tr').forEach(row => {
        const from = parseInt(row.querySelector('#fromBus').value);
        const to = parseInt(row.querySelector('#toBus').value);
        const R = parseFloat(row.querySelector('#R').value);
        const X = parseFloat(row.querySelector('#X').value);
        lineData.push({ from, to, R, X });
    });
    
     // Validate the entered line data
    if (!validateLineData(lineData)) {
        alert('Network details are mismatched.');
        return;
    }

    const numBuses = calculateNumBuses(lineData);
    let Ybus = Array.from({ length: numBuses }, () => Array(numBuses).fill({ real: 0, imag: 0 }));

    lineData.forEach(branch => {
        let from = branch.from - 1;
        let to = branch.to - 1;
        let R = branch.R;
        let X = branch.X;
        let Y = { real: R / (R * R + X * X), imag: -X / (R * R + X * X) };
        Ybus[from][from] = complexAdd(Ybus[from][from], Y);
        Ybus[to][to] = complexAdd(Ybus[to][to], Y);
        Ybus[from][to] = complexSubtract(Ybus[from][to], Y);
        Ybus[to][from] = complexSubtract(Ybus[to][from], Y);
    });

    let diagonalElements = [];
    for (let i = 0; i < Ybus.length; i++) {
        diagonalElements.push(Ybus[i][i]);
    }
    displayDiagonal(diagonalElements);
}

function calculatenonDiagonal() {
    const tbody = document.querySelector('#branchData tbody');
    lineData = []; // Reset line data
    
    // Extract line data from table
    tbody.querySelectorAll('tr').forEach(row => {
        const from = parseInt(row.querySelector('#fromBus').value);
        const to = parseInt(row.querySelector('#toBus').value);
        const R = parseFloat(row.querySelector('#R').value);
        const X = parseFloat(row.querySelector('#X').value);
        lineData.push({ from, to, R, X });
    });
     
     // Validate the entered line data
    if (!validateLineData(lineData)) {
        alert('Network details are mismatched.');
        return;
    }

    const numBuses = calculateNumBuses(lineData);
    let Ybus = Array.from({ length: numBuses }, () => Array(numBuses).fill({ real: 0, imag: 0 }));

    lineData.forEach(branch => {
        let from = branch.from - 1 ;
        let to = branch.to - 1 ;
        let R = branch.R;
        let X = branch.X;
        let Y = { real: R / (R * R + X * X), imag: -X / (R * R + X * X) };
        Ybus[from][from] = complexAdd(Ybus[from][from], Y);
        Ybus[to][to] = complexAdd(Ybus[to][to], Y);
        Ybus[from][to] = complexSubtract(Ybus[from][to], Y);
        Ybus[to][from] = complexSubtract(Ybus[to][from], Y);
    });

    let nondiagonalElements = [];
    for (let i = 0; i < numBuses; i++) {
        for (let j = 0; j < numBuses; j++) {
            if (i !== j) {
                nondiagonalElements.push(Ybus[i][j]); // Collect non-diagonal elements
            }
        }
    }

    displaynonDiagonal(nondiagonalElements, numBuses);
}


function calculateYbus() {
    const tbody = document.querySelector('#branchData tbody');
    lineData = []; // Reset line data
    
    // Extract line data from table
    tbody.querySelectorAll('tr').forEach(row => {
        const from = parseInt(row.querySelector('#fromBus').value);
        const to = parseInt(row.querySelector('#toBus').value);
        const R = parseFloat(row.querySelector('#R').value);
        const X = parseFloat(row.querySelector('#X').value);
        lineData.push({ from, to, R, X });
    });

    // Validate the entered line data
    if (!validateLineData(lineData)) {
        alert('Network details are mismatched.');
        return;
    }

    let Ybus = Array.from({ length: numBuses }, () => Array(numBuses).fill({ real: 0, imag: 0 }));

    lineData.forEach(branch => {
        let from = branch.from - 1;
        let to = branch.to - 1;
        let R = branch.R;
        let X = branch.X;
        let Y = { real: R / (R * R + X * X), imag: -X / (R * R + X * X) };
        Ybus[from][from] = complexAdd(Ybus[from][from], Y);
        Ybus[to][to] = complexAdd(Ybus[to][to], Y);
        Ybus[from][to] = complexSubtract(Ybus[from][to], Y);
        Ybus[to][from] = complexSubtract(Ybus[to][from], Y);
    });

    displayYbus(Ybus);
}

function validateLineData(lineData) {
    for (const branch of lineData) {
        if (branch.from < 1 || branch.from > numBuses || branch.to < 1 || branch.to > numBuses) {
            return false;
        }
    }
    return true;
}


  function calculateNumBuses(lineData) {
    let maxBus = 0;
    lineData.forEach(branch => {
        maxBus = Math.max(maxBus, branch.from, branch.to);
    });
    return maxBus;
}


function displayYbus(Ybus) {
    let resultHtml = '<h3>Ybus Matrix</h3><table>';
    Ybus.forEach((row, i) => {
        resultHtml += '<tr>';
        row.forEach((value, j) => {
            const formattedReal = value.real.toFixed(4);
            const formattedImag = value.imag.toFixed(4);
            const formattedValue = `${formattedReal} ${formattedImag < 0 ? '-' : '+'} ${Math.abs(formattedImag)}j`;
            resultHtml += `<td>${formattedValue}</td>`;
        });
        resultHtml += '</tr>';
    });
    resultHtml += '</table>';
    document.getElementById('resultYbus').innerHTML = resultHtml;
}


function displayDiagonal(diagonalElements) {
    let resultHtml = '<h3>Diagonal Elements of Ybus Matrix</h3><table>';
    diagonalElements.forEach((element, i) => {
        let busIndex = i + 1;
        let busLabel = `Y<sub>${busIndex}${busIndex}<sub>`;
        resultHtml += `<tr><td>${busLabel}</td><td>${element.real.toFixed(4)} ${element.imag.toFixed(4) < 0 ? '-' : '+'} ${Math.abs(element.imag.toFixed(4))}j</td></tr>`;
    });
    resultHtml += '</table>';
    document.getElementById('resultdiagonal').innerHTML = resultHtml;
}

function displaynonDiagonal(nondiagonalElements, matrixSize) {
let resultHtml = '<h3>Non-Diagonal Elements of Ybus Matrix</h3>';
resultHtml += '<table>';
for (let i = 0; i < nondiagonalElements.length; i++) {
    let row = Math.floor(i / (matrixSize - 1)) + 1; // Calculate the row index
    let col = (i % (matrixSize - 1)) + 1; // Calculate the column index
    if (col >= row) {
        col++; // Increment column index if it's greater than or equal to the row index
    }
    if (col > matrixSize) {
        col = 1; // Wrap around to the first column if it exceeds the matrix size
    }
    let busLabel = `Y<sub>${row}${col}</sub>`; // Construct the bus label with subscript
    resultHtml += `<tr><td>${busLabel}</td><td>${nondiagonalElements[i].real.toFixed(4)} ${nondiagonalElements[i].imag.toFixed(4) < 0 ? '-' : '+'} ${Math.abs(nondiagonalElements[i].imag.toFixed(4))}j</td></tr>`;
}
resultHtml += '</table>';
document.getElementById('resultnondiagonal').innerHTML = resultHtml;
}

  
function complexAdd(a, b) {
    return { real: a.real + b.real, imag: a.imag + b.imag };
}

function complexSubtract(a, b) {
    return { real: a.real - b.real, imag: a.imag - b.imag };
}