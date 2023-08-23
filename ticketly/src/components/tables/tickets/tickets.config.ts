import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { TicketsListTypes } from 'types';
import { convertMinutes } from 'utils';

export const columns: ColumnsType<TicketsListTypes> = [
  {
    title: 'Reporting user',
    dataIndex: 'ownerName',
    key: 'ownerName',
  },
  {
    title: 'Problem',
    dataIndex: 'title',
    key: 'title',
    render: (text, record) => React.createElement(NavLink, { to: record.id }, text),
  },
  {
    title: 'Assigned To',
    dataIndex: 'engineer',
    key: 'engineer',
    render: (text) => {
      if (text) return text;

      return 'Not assigned';
    },
  },
  {
    title: 'Time spent',
    dataIndex: 'timeSpent',
    key: 'timeSpent',
    render: (text) => convertMinutes(text),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (text) => {
      return `${String(text)[0].toLocaleUpperCase()}${String(text).slice(1)}`;
    },
  },
];
