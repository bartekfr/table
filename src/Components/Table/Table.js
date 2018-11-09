import React from 'react';
import PropTypes from 'prop-types';
import { MenuCol, MenuRow } from './Menu';
import { updateItem, insertItem, removeItem } from '../../Common/Helpers';
import ExportCSVBtn from './ExportCSV';
import './styles.scss';

const CellInput = props => (
  <input className="tbcomp__input" type="text" {...props} />
);

CellInput.propTypes = {
  value: PropTypes.string.isRequired,
};

class Table extends React.Component {
  state = {
    prevData: null,
    cells: [],
    columnNames: [],
  }

  static defaultProps = {
    onChange: () => null,
    data: {
      columnNames: [],
      cells: [],
    },
  }
  // TODO: consider passing columnNames and cells as separate props

  static propTypes = {
    onChange: PropTypes.func,
    data: PropTypes.shape({
      columnNames: PropTypes.array,
      cells: PropTypes.array,
    }),
  }
  /*
   Table reinitializes when data props changes (assuming it's immutable).
   Another approach to reinitializng component could be
   using `key` prop on fully uncontrolled component like described here:
   https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key
   However, in this case getDerivedStateFromProps seems to be justified
  */

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.prevData !== nextProps.data) {
      return {
        prevData: nextProps.data, // heep reference to know when 'initial' data has changes
        columnNames: nextProps.data.columnNames,
        cells: nextProps.data.cells,
      };
    }
    return null;
  }

  constructor() {
    super();
    this.updateCell = this.updateCell.bind(this);
    this.updateColName = this.updateColName.bind(this);
    this.addRow = this.addRow.bind(this);
    this.addCol = this.addCol.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.removeCol = this.removeCol.bind(this);
  }

  componentDidUpdate() {
    this.onChange();
  }

  onChange() {
    const { columnNames, cells } = this.state;
    const { onChange } = this.props;
    onChange({
      columnNames,
      cells,
    });
  }

  updateColName(i, e) {
    const { target: { value } } = e;
    const { columnNames } = this.state;
    const newRow = updateItem(columnNames, i, value);
    this.setState({
      columnNames: newRow,
    });
  }

  updateCell(i, j, e) {
    const { target: { value } } = e;
    const { cells } = this.state;
    const newRow = updateItem(cells[i], j, value);
    const newCells = updateItem(cells, i, newRow);
    this.setState({
      cells: newCells,
    });
  }

  addRow(i) {
    const { cells, columnNames } = this.state;
    const newRow = new Array(columnNames.length).fill('');
    const newCells = insertItem(cells, i, newRow);
    this.setState({
      cells: newCells,
    });
  }

  addCol(j) {
    const { cells, columnNames } = this.state;
    const newCells = cells.map(row => insertItem(row, j, ''));
    this.setState({
      cells: newCells,
      columnNames: insertItem(columnNames, j, `New column ${j + 1}`),
    });
  }

  removeRow(i) {
    const { cells } = this.state;
    const newCells = removeItem(cells, i);
    this.setState({
      cells: newCells,
    });
  }

  removeCol(i) {
    const { cells, columnNames } = this.state;
    const newCells = cells.map(row => removeItem(row, i));
    this.setState({
      cells: newCells,
      columnNames: removeItem(columnNames, i),
    });
  }

  render() {
    const { cells, columnNames } = this.state;
    const papaParseData = {
      fields: columnNames,
      data: cells.length ? cells : null,
    };

    return (
      <div className="tbcomp">
        <table className="tbcomp__table">
          <tbody>
            {/* Column row - START */}
            <tr className="tbcomp__tr">
              <th className="tbcomp__th">
                <MenuCol add={this.addCol} index={-1} />
                <MenuRow index={-1} add={this.addRow} />
                id
              </th>
              {
                columnNames.map((col, i) => (
                  <th className="tbcomp__th" key={i}>
                    <MenuCol add={this.addCol} index={i} remove={this.removeCol} />
                    <CellInput value={col} onChange={e => this.updateColName(i, e)} />
                  </th>
                ))
              }
            </tr>
            {/* Column row - END */}
            {/* Data Row  - START */}
            {
              cells.map((row, i) => (
                <tr className="tbcomp__tr" key={i}>
                  <th className="tbcomp__th">
                    <MenuRow add={this.addRow} index={i} remove={this.removeRow} />
                    {i + 1}
                  </th>
                  {row.map((cell, j) => (
                    <td className="tbcomp__td" key={j}>
                      <CellInput value={cells[i][j]} onChange={e => this.updateCell(i, j, e)} />
                    </td>
                  ))}
                </tr>
              ))
            }
            {/* Data Row  - END */}
          </tbody>
        </table>
        <p className="tbcomp__hint">{!columnNames.length ? 'No columns defined.' : null }</p>
        <p className="tbcomp__hint">{!cells.length ? 'No rows defined.' : null }</p>
        <ExportCSVBtn data={papaParseData} />
      </div>
    );
  }
}

export default Table;
