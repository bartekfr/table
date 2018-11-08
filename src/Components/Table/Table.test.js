import React from 'react';
import { shallow } from 'enzyme';
import Table from './index';

const data = {
  columnNames: ['col1', 'col2', 'col3'],
  cells: [
    ['a1', 'a2', 'a3'],
    ['b1', 'b2', 'b3'],
    ['c1', 'c2', 'c3'],
  ],
};

describe('Table component', () => {
  let wrapper;
  const onChange = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<Table onChange={onChange} />);
  });

  it('changing data props updates state', () => {
    wrapper.setProps({
      data,
    });
    // wrapper.update();
    const state = wrapper.state();
    expect(state.cells).toEqual(data.cells);
    expect(state.columnNames).toEqual(data.columnNames);
    expect(state.prevData).toBe(data);
  });

  it('adds row even if there are no columns', () => {
    const instance = wrapper.instance();
    instance.addRow(0);
    // wrapper.update();
    expect(wrapper.state('cells')).toEqual([
      [],
    ]);
    instance.addRow(0);
    // wrapper.update();
    expect(wrapper.state('cells')).toEqual([
      [],
      [],
    ]);
  });

  it('adds row', () => {
    wrapper.setProps({
      data,
    });
    // wrapper.update();
    const instance = wrapper.instance();
    instance.addRow(1);
    // wrapper.update();
    expect(wrapper.state('cells')).toEqual([
      ['a1', 'a2', 'a3'],
      ['', '', ''],
      ['b1', 'b2', 'b3'],
      ['c1', 'c2', 'c3'],
    ]);

    instance.addRow(3);
    // wrapper.update();
    expect(wrapper.state('cells')).toEqual([
      ['a1', 'a2', 'a3'],
      ['', '', ''],
      ['b1', 'b2', 'b3'],
      ['', '', ''],
      ['c1', 'c2', 'c3'],
    ]);
  });

  it('removes row', () => {
    wrapper.setProps({
      data,
    });
    // wrapper.update();
    const instance = wrapper.instance();
    instance.removeRow(1);
    // wrapper.update();
    expect(wrapper.state('cells')).toEqual([
      ['a1', 'a2', 'a3'],
      ['c1', 'c2', 'c3'],
    ]);

    instance.removeRow(0);
    // wrapper.update();
    expect(wrapper.state('cells')).toEqual([
      ['c1', 'c2', 'c3'],
    ]);
  });

  it('adds columns even if there are no rows', () => {
    const instance = wrapper.instance();
    instance.addCol(0);
    wrapper.update();
    expect(wrapper.state('columnNames')).toEqual(['New column 1']);
    expect(wrapper.state('cells')).toEqual([]);
  });

  it('adds columns', () => {
    wrapper.setProps({
      data,
    });
    // wrapper.update();
    const instance = wrapper.instance();
    instance.addCol(0);
    // wrapper.update();
    expect(wrapper.state('cells')).toEqual([
      ['', 'a1', 'a2', 'a3'],
      ['', 'b1', 'b2', 'b3'],
      ['', 'c1', 'c2', 'c3'],
    ]);
    expect(wrapper.state('columnNames')).toEqual(['New column 1', 'col1', 'col2', 'col3']);

    instance.addCol(2);
    // wrapper.update();
    expect(wrapper.state('cells')).toEqual([
      ['', 'a1', '', 'a2', 'a3'],
      ['', 'b1', '', 'b2', 'b3'],
      ['', 'c1', '', 'c2', 'c3'],
    ]);
    expect(wrapper.state('columnNames')).toEqual(['New column 1', 'col1', 'New column 3', 'col2', 'col3']);
  });

  it('removes col', () => {
    wrapper.setProps({
      data,
    });
    // wrapper.update();
    const instance = wrapper.instance();
    instance.removeCol(1);
    // wrapper.update();
    expect(wrapper.state('cells')).toEqual([
      ['a1', 'a3'],
      ['b1', 'b3'],
      ['c1', 'c3'],
    ]);
    expect(wrapper.state('columnNames')).toEqual(['col1', 'col3']);

    instance.removeCol(0);
    // wrapper.update();
    expect(wrapper.state('cells')).toEqual([
      ['a3'],
      ['b3'],
      ['c3'],
    ]);
    expect(wrapper.state('columnNames')).toEqual(['col3']);
  });

  it('updates data cell', () => {
    wrapper.setProps({
      data,
    });
    // wrapper.update();
    const instance = wrapper.instance();
    instance.updateCell(1, 1, { target: { value: '45' } });
    // wrapper.update();
    expect(wrapper.state('cells')).toEqual([
      ['a1', 'a2', 'a3'],
      ['b1', '45', 'b3'],
      ['c1', 'c2', 'c3'],
    ]);
  });

  it('updates column name', () => {
    wrapper.setProps({
      data,
    });
    // wrapper.update();
    const instance = wrapper.instance();
    instance.updateColName(1, { target: { value: 'New name' } });
    // wrapper.update();
    expect(wrapper.state('columnNames')).toEqual(['col1', 'New name', 'col3']);
  });

  it('calls onChange prop', () => {
    onChange.mockClear();
    const instance = wrapper.instance();
    // adding column
    instance.addCol(0);
    // wrapper.update();
    expect(onChange).toHaveBeenCalledWith({
      columnNames: ['New column 1'],
      cells: [],
    });
    // adding row
    onChange.mockClear();
    instance.addRow(0);
    // wrapper.update();
    expect(onChange).toHaveBeenCalledWith({
      columnNames: ['New column 1'],
      cells: [['']],
    });
    // updating cell
    onChange.mockClear();
    instance.updateCell(0, 0, { target: { value: '22' } });
    // wrapper.update();
    expect(onChange).toHaveBeenCalledWith({
      columnNames: ['New column 1'],
      cells: [['22']],
    });

    // TODO: more onChange tests (remove row, remove col, etc)
  });
});
