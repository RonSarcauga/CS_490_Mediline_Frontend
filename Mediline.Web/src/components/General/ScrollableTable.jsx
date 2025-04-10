import React from 'react';
import '../../assets/scss/components/_scrollable-table.scss';

const ScrollableTable = ({ columns = [], columnKeys = [], data = [], renderActions }) => {
  return (
    <div className="scrollable-table">
      <table>
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx}>{col}</th>
            ))}
            {renderActions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {columnKeys.map((key, colIdx) => (
                <td key={colIdx}>{row[key]}</td>
              ))}
              {renderActions && <td>{renderActions(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScrollableTable;
