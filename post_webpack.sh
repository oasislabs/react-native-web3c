packed=$(cat build/app.bundle.js)
echo "const Web3c = $packed" > index.js
echo "module.exports = Web3c;" >> index.js
