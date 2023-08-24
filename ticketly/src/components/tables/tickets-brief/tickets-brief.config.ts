import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { TicketsListTypes } from 'types';
import { appRoutes } from 'urls';
import { convertMinutes } from 'utils';

export const userTicketsColumns: ColumnsType<TicketsListTypes> = [
  {
    title: 'Problem',
    dataIndex: 'title',
    key: 'title',
    render: (text, record) => React.createElement(NavLink, { to: `${appRoutes.app.tickets.index}/${record.id}` }, text),
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
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (text) => {
      return `${String(text)[0].toLocaleUpperCase()}${String(text).slice(1)}`;
    },
  },
];

export const assignedToEngineerColumns: ColumnsType<TicketsListTypes> = [
  {
    title: 'Problem',
    dataIndex: 'title',
    key: 'title',
    render: (text, record) => React.createElement(NavLink, { to: record.id }, text),
  },
  {
    title: 'Reporting user',
    dataIndex: 'ownerName',
    key: 'ownerName',
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
