document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calculateButton').addEventListener('click', calculatePallet);
    document.getElementById('resetButton').addEventListener('click', resetForm);
    document.getElementById('numSKUs').addEventListener('input', updateSKUDetails);
});

function updateSKUDetails() {
    const numSKUs = parseInt(document.getElementById('numSKUs').value) || 0;
    const skuDetails = document.getElementById('skuDetails');
    skuDetails.innerHTML = ''; // Clear previous entries
    for (let i = 1; i <= numSKUs; i++) {
        skuDetails.innerHTML += `
            <div class="sku-group">
                <label>SKU ${i} Length (in):</label>
                <input type="number" id="length${i}" placeholder="Length">
                <label>SKU ${i} Width (in):</label>
                <input type="number" id="width${i}" placeholder="Width">
                <label>SKU ${i} Height (in):</label>
                <input type="number" id="height${i}" placeholder="Height">
                <label>SKU ${i} Qty of Cartons:</label>
                <input type="number" id="qty${i}" placeholder="Qty of Cartons">
            </div>
        `;
    }
}

function calculatePallet() {
    const palletConfig = document.getElementById('palletConfig').value;
    const numSKUs = parseInt(document.getElementById('numSKUs').value) || 0;
    let palletsNeeded = 0;

    if (palletConfig === 'singleSKU') {
        palletsNeeded = numSKUs;
    } else {
        let totalVolume = 0;
        const palletVolume = (parseInt(document.getElementById('palletLength').value) || 0) *
                             (parseInt(document.getElementById('palletWidth').value) || 0) *
                             (parseInt(document.getElementById('palletHeight').value) || 0);

        for (let i = 1; i <= numSKUs; i++) {
            const length = parseInt(document.getElementById(`length${i}`).value) || 0;
            const width = parseInt(document.getElementById(`width${i}`).value) || 0;
            const height = parseInt(document.getElementById(`height${i}`).value) || 0;
            const qty = parseInt(document.getElementById(`qty${i}`).value) || 0;
            totalVolume += (length * width * height) * qty;
        }

        palletsNeeded = palletVolume > 0 ? Math.ceil(totalVolume / palletVolume) : 0;
    }

    document.getElementById('results').innerHTML = `Number of Pallets Required: ${palletsNeeded}`;
}

function resetForm() {
    document.getElementById('palletConfig').value = 'singleSKU';
    document.getElementById('weightLimit').value = 'no';
    document.getElementById('numSKUs').value = '';
    document.getElementById('skuDetails').innerHTML = '';
    document.getElementById('palletLength').value = '';
    document.getElementById('palletWidth').value = '';
    document.getElementById('palletHeight').value = '';
    document.getElementById('results').innerHTML = '';
}
