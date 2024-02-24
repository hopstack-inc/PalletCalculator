document.getElementById('calculate').addEventListener('click', function() {
    const palletLength = parseFloat(document.getElementById('palletLength').value);
    const palletWidth = parseFloat(document.getElementById('palletWidth').value);
    const palletHeight = parseFloat(document.getElementById('palletHeight').value);
    const cartonLength = parseFloat(document.getElementById('cartonLength').value);
    const cartonWidth = parseFloat(document.getElementById('cartonWidth').value);
    const cartonHeight = parseFloat(document.getElementById('cartonHeight').value);

    const palletArea = palletLength * palletWidth;
    const cartonArea = cartonLength * cartonWidth;
    const cartonsPerLayer = Math.floor(palletArea / cartonArea);
    const layers = Math.floor(palletHeight / cartonHeight);
    const totalCartons = cartonsPerLayer * layers;

    document.getElementById('result').innerText = `Total cartons per pallet: ${totalCartons}`;
});

document.getElementById('refresh').addEventListener('click', function() {
    document.getElementById('palletLength').value = '';
    document.getElementById('palletWidth').value = '';
    document.getElementById('palletHeight').value = '';
    document.getElementById('cartonLength').value = '';
    document.getElementById('cartonWidth').value = '';
    document.getElementById('cartonHeight').value = '';
    document.getElementById('result').innerText = '';
});
