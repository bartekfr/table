import PapaParse from 'papaparse';
import saveAs from 'file-saver';

// Immutable array helpers
// from https://redux.js.org/recipes/structuringreducers/immutableupdatepatterns
export function insertItem(array, index, item) {
  const newArray = array.slice();
  newArray.splice(index, 0, item);
  return newArray;
}

export function removeItem(array, index) {
  const newArray = array.slice();
  newArray.splice(index, 1);
  return newArray;
}

export function updateItem(array, index, newItem) {
  return array.map((item, i) => {
    if (i !== index) {
      return item;
    }
    return newItem;
  });
}

// saves data as CSV file
export function saveAsCSV(data) {
  const csvString = PapaParse.unparse(data);
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, 'tableCSV.csv');
}
