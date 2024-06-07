const csvData = `MERLOT BOX,5,litri,"15,90","3,18"
CHARDONNAY BOX,5,litri,"16,90","3,38"
MERLOT VISTALAGO,"0,75",litri,"11,90","15,87"
SCHIAVA VISTALAGO,"0,75",litri,"11,90","15,87"
TEROLDEGO VISTALAGO,"0,75",kg,"11,90","15,87"
CHARDONNAY APPONALE,"0,75",litri,"8,90","11,87"
MARZEMINO APPONALE,"0,75",litri,"8,90","11,87"
NOSIOLA APPONALE,"0,75",litri,"8,90","11,87"
MOSCATO GIALLO APPONALE,"0,75",litri,"8,90","11,87"
PINOT GRIGIO APPONALE,"0,75",litri,"8,90","11,87"
SCHIAVA APPONALE,"0,75",kg,"8,90","11,87"
CABERNET MASO LIZZONE,"0,75",litri,"18,90","25,20"
PINOT NERO ELESI,"0,75",litri,"21,90","29,20"
VINO SANTO PEDROTTI,"0,375",litri,"33,00","88,00"
CHARDONNAY VISTALAGO,"0,75",litri,"12,90","17,20"
PINOT GRIGIO VISTALAGO,"0,75",litri,"12,90","17,20"
GRAPPA TRENTINA,"0,7",litri,"21,00","30,00"
"GRAPPA MOSCATO BARRICATA ""ORO""","0,7",litri,"27,00","38,57"
GRAPPA MOSCATO,"0,7",kg,"23,00","32,86"
LIQUORE LIMONE,"0,5",litri,"15,00","30,00"
LIQUORE MIRTILLO,"0,5",litri,"15,00","30,00"
LIQUORE PESCA,"0,5",litri,"15,00","30,00"
GRAPPA AMARA,"0,7",litri,"23,00","32,86"
"GRAPPA TRENTINA BARRICATA ""ORO""","0,7",litri,"24,00","34,29"
GRAPPA TRENTINA ASPERULA,"0,7",litri,"22,00","31,43"
OLIO BRIGHENTI,"0,5",litri,"18,00","36,00"
ITALICO LATTINA,3,litri,"45,00","15,00"
OLIO 46 PARALLELO CASALIVA BLU,"0,5",litri,"25,00","50,00"
OLIO 46 PARALLELO BIO BIANCO,"0,5",litri,"25,00","50,00"`;

const products = [];

const rows = csvData.split("\n");
rows.forEach((row) => {
  const columns = [];
  let inQuotes = false;
  let currentColumn = '';
  for (let i = 0; i < row.length; i++) {
    if (row[i] === '"') {
      inQuotes =!inQuotes;
    } else if (row[i] === ',' &&!inQuotes) {
      columns.push(currentColumn);
      currentColumn = '';
    } else {
      currentColumn += row[i];
    }
  }
  columns.push(currentColumn);

  let quantity = parseFloat(columns[1].replace(',', '.'));
  let unit = columns[2];
  let unitsm;

  if (unit === "litri") {
    unitsm = "l";
  } else if (unit === "kg") {
    unitsm = "kg";
  } else {
    unitsm = unit; // default to the original unit if it's not "litri" or "kg"
  }

  if (unit === "litri") {
    if (quantity === 1) {
      unit = "litro";
    } else if (quantity < 1) {
      unit = "ml";
      quantity *= 1000;
    }
  } else if (unit === "kg") {
    if (quantity < 1) {
      unit = "g";
      quantity *= 1000;
    }
  }

  const product = {
    name: columns[0],
    quantity: quantity,
    unit: unit,
    unitsm: unitsm,
    price: parseFloat(columns[3].replace(',', '.')),
    pricePerUnit: parseFloat(columns[4].replace(',', '.'))
  };

  products.push(product);
});
const tableBody = document.querySelector('tbody');

let row = document.createElement('tr');

products.forEach((product, index) => {
  const cell = document.createElement('td');
  
  const nameH3 = document.createElement('h3');
  nameH3.className = 'product-name';
  nameH3.innerHTML = product.name;
  
  const quantityH3 = document.createElement('h3');
  quantityH3.className = 'product-quantity';
  quantityH3.innerHTML = `${product.quantity} ${product.unit}`;
  
  const priceH3 = document.createElement('h3');
  priceH3.className = 'product-price';
  priceH3.innerHTML = `€ ${product.price.toFixed(2)}`;
  
  const pricePerUnitH3 = document.createElement('h3');
  pricePerUnitH3.className = 'product-price-per-unit';
  pricePerUnitH3.innerHTML = `${product.pricePerUnit.toFixed(2)} €/${product.unitsm}`;
  
  cell.appendChild(nameH3);
  cell.appendChild(quantityH3);
  cell.appendChild(priceH3);
  cell.appendChild(pricePerUnitH3);
  
  row.appendChild(cell);
  
  if ((index + 1) % 3 === 0) {
    tableBody.appendChild(row);
    row = document.createElement('tr');
  }
});

if (row.childElementCount > 0) {
  tableBody.appendChild(row);
}