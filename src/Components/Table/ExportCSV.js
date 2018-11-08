import React from 'react';
import PropTypes from 'prop-types';
import { saveAsCSV } from '../../Common/Helpers';

const ExportCSV = ({ data }) => (
  <button className="csv-btn" type="button" onClick={() => saveAsCSV(data)}>Save as CSV</button>
);

ExportCSV.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ExportCSV;
