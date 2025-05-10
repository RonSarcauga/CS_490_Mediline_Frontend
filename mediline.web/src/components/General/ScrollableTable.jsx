import React from 'react';
import '../../assets/scss/components/_scrollable-table.scss';
import CommonIcon from './CommonIcon';
import StatusLabel from './StatusLabel';

const ScrollableTable = ({ columns = [], columnKeys = [], data = [], renderActions, columnTypes = {} }) => {
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
              {columnKeys.map((key, colIdx) => {
                const columnType = columnTypes[key]?.type;
                const iconName = columnTypes[key]?.iconName;
                const cellData = row[key];

                return (
                  <td key={colIdx}>
                    {columnType === 'icon' && cellData && (
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <CommonIcon name={iconName} />
                        <span style={{ marginLeft: '8px' }}>{cellData}</span>
                      </div>
                    )}
                    {columnType === 'status' && cellData && (
                      <StatusLabel status={cellData} />
                    )}
                    {columnType !== 'icon' && columnType !== 'status' && cellData}
                  </td>
                );
              })}
              {renderActions && <td>{renderActions(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScrollableTable;
