// Function to toggle weight limit details based on user selection
function toggleWeightLimitDetails() {
  const weightLimit = document.getElementById('weightLimit').value;
  const weightLimitDetails = document.getElementById('weightLimitDetails');
  weightLimitDetails.style.display = weightLimit === 'yes' ? 'block' : 'none';
}

// Function to dynamically add SKU details input fields based on the number of SKUs entered
function updateSKUDetails() {
  const numSKUs = document.getElementById('numSKUs').value;
  const skuDetails = document.getElementById('skuDetails');
  skuDetails.innerHTML = ''; // Clear existing SKU details

  for (let i = 1; i <= numSKUs; i++) {
    const html = `
      <div class="skuDetail" id="skuDetail${i}">
        <h4>SKU ${i} Details:</h4>
        <label for="sku${i}Quantity">Quantity:</label>
        <input type="number" id="sku${i}Quantity" placeholder="Quantity">
        <label for="sku${i}Length">Length (inches):</label>
        <input type="number" id="sku${i}Length" placeholder="Length">
        <label for="sku${i}Width">Width (inches):</label>
        <input type="number" id="sku${i}Width" placeholder="Width">
        <label for="sku${i}Height">Height (inches):</label>
        <input type="number" id="sku${i}Height" placeholder="Height">
        <label for="sku${i}Weight">Weight:</label>
        <input type="number" id="sku${i}Weight" placeholder="Weight">
      </div>
    `;
    skuDetails.innerHTML += html;
  }
}

// Function to calculate the number of pallets required
function calculatePallet() {
  const numSKUs = parseInt(document.getElementById('numSKUs').value, 10);
  const palletConfig = document.getElementById('palletConfig').value;
  const palletLength = parseFloat(document.getElementById('palletLength').value);
  const palletWidth = parseFloat(document.getElementById('palletWidth').value);
  const palletHeight = parseFloat(document.getElementById('palletHeight').value);
  const weightLimit = document.getElementById('weightLimit').value === 'yes';
  const maxWeight = weightLimit ? parseFloat(document.getElementById('maxWeight').value) : Infinity;
  const weightUnit = document.getElementById('weightUnit').value;

  let totalPallets = 0;
  let totalWeight = 0;

  // Loop through each SKU to calculate pallet requirements
  for (let i = 1; i <= numSKUs; i++) {
    const quantity = parseInt(document.getElementById(`sku${i}Quantity`).value, 10);
    const length = parseFloat(document.getElementById(`sku${i}Length`).value);
    const width = parseFloat(document.getElementById(`sku${i}Width`).value);
    const height = parseFloat(document.getElementById(`sku${i}Height`).value);
    const weight = parseFloat(document.getElementById(`sku${i}Weight`).value);

    // Calculate how many cartons fit in a single layer on the pallet
    const perLayer = Math.floor(palletLength / length) * Math.floor(palletWidth / width);
    // Calculate the number of layers needed
    const layers = Math.ceil(quantity / perLayer);
    // Calculate the total height of the cartons
    const totalHeight = layers * height;
    // Calculate how many pallets are needed based on height
    const palletsNeeded = Math.ceil(totalHeight / palletHeight);
    // Calculate weight requirement
    const totalSKUWeight = quantity * weight;
    const weightPalletsNeeded = Math.ceil(totalSKUWeight / maxWeight);

    totalPallets += Math.max(palletsNeeded, weightPalletsNeeded);
    totalWeight += totalSKUWeight;
  }

  // Display the results
  const results = document.getElementById('results');
  results.innerHTML = `<p>Total Pallets Required: ${totalPallets}</p>`;
  results.innerHTML += `<p>Total Weight: ${totalWeight} ${weightUnit}</p>`;
  if (weightLimit) {
    results.innerHTML += `<p>Weight Limit per Pallet: ${maxWeight} ${weightUnit}</p>`;
  }
}

// Function to reset the form, clearing all inputs and results
function resetForm() {
  document.getElementById('weightLimit').value = 'no';
  toggleWeightLimitDetails();
  document.getElementById('numSKUs').value = '';
  document.getElementById('skuDetails').innerHTML = '';
  document.getElementById('results').innerHTML = '';
}

// Initially setup or reset form details
resetForm();
