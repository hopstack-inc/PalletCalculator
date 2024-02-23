document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calculateButton').addEventListener('click', calculatePallet);
    document.getElementById('resetButton').addEventListener('click', resetForm);
    document.getElementById('weightLimit').addEventListener('change', toggleWeightLimitDetails);
    document.getElementById('numSKUs').addEventListener('input', updateSKUDetails);
});

function toggleWeightLimitDetails() {
    const weightLimit = document.getElementById('weightLimit').value;
    document.getElementById('weightLimitDetails').style.display = weightLimit === 'yes' ? 'block' : 'none';
}

function updateSKUDetails() {
    const numSKUs = document.getElementById('numSKUs').value;
    const skuDetails = document.getElementById('skuDetails');
    skuDetails.innerHTML = ''; // Clear previous entries
    for (let i = 1; i <= numSKUs; i++) {
        skuDetails.innerHTML += `
            <div class="sku-group">
                <h4>SKU ${i} Carton Size</h4>
                <label>Length (in):</label>
                <input type="number" placeholder="Length" id="length${i}">
                <label>Width (in):</label>
                <input type="number" placeholder="Width" id="width${i}">
                <label>Height (in):</label>
                <input type="number" placeholder="Height" id="height${i}">
                <label>Qty of Cartons:</label>
                <input type="number" placeholder="Qty of Cartons" id="qty${i}">
                <label>Carton Weight:</label>
                <input type="number" placeholder="Carton Weight" id="weight${i}">
            </div>
        `;
    }
}

function calculatePallet() {
    const palletConfig = document.getElementById('palletConfig').value;
    let palletsNeeded = 0;
    const numSKUs = parseInt(document.getElementById('numSKUs').value || 0);
    const palletVolume = parseInt(document.getElementById('palletLength').value || 0) *
                          parseInt(document.getElementById('palletWidth').value || 0) *
                          parseInt(document.getElementById('palletHeight').value || 0);

    if (palletConfig === 'singleSKU') {
        for (let i = 1; i <= numSKUs; i++) {
            const qty = parseInt(document.getElementById(`qty${i}`).value || 0);
            palletsNeeded += qty; // Assuming each SKU, regardless of quantity, requires separate pallets.
        }
    } else {
        let totalVolume = 0;
        for (let i = 1; i <= numSKUs; i++) {
            const length = parseInt(document.getElementById(`length${i}`).value || 0);
            const width = parseInt(document.getElementById(`width${i}`).value || 0);
            const height = parseInt(document.getElementById(`height${i}`).value || 0);
            const qty = parseInt(document.getElementById(`qty${i}`).value || 0);
            totalVolume += length * width * height * qty;
        }
        palletsNeeded = Math.ceil(totalVolume / palletVolume);
    }

    document.getElementById('results').innerHTML = `
        <h3>Results</h3>
        Number of Pallets Required: ${palletsNeeded}
    `;
}

function resetForm() {
    document.getElementById('palletConfig').value = 'singleSKU';
    document.getElementById('weightLimit').value = 'no';
    toggleWeightLimitDetails();
    document.getElementById('numSKUs').value = '';
    document.getElementById('skuDetails').innerHTML = '';
    document.getElementById('palletLength').value = '';
    document.getElementById('palletWidth').value = '';
    document.getElementById('palletHeight').value = '';
    document.getElementById('results').innerHTML = '';
}
