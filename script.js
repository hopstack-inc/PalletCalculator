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
  // Calculation logic remains the same
}

function resetForm() {
  document.getElementById('palletConfig').value = 'singleSKU';
  document.getElementById('weightLimit').value = 'no';
  document.getElementById('weightLimitDetails').style.display = 'none';
  document.getElementById('numSKUs').value = '';
  document.getElementById('skuDetails').innerHTML = '';
  document.getElementById('palletLength').value = '';
  document.getElementById('palletWidth').value = '';
  document.getElementById('palletHeight').value = '';
  document.getElementById('results').innerHTML = '';
}

// Ensure the calculatePallet function is updated to handle the logic as previously described.