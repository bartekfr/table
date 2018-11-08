import PapaParse from 'papaparse';
import saveAs from 'file-saver';
import { saveAsCSV } from './Helpers';

PapaParse.unparse = jest.fn();
jest.mock('file-saver');

describe('Helpers', () => {
  const data = {
    fields: ['a', 'b'],
    data: [
      ['1', '2'],
    ],
  };

  it('saves CSV file', () => {
    saveAsCSV(data);
    expect(PapaParse.unparse).toHaveBeenCalledWith(data);
    expect(saveAs).toHaveBeenCalled();
    expect(saveAs.mock.calls[0][1]).toBe('tableCSV.txt');
  });
});
