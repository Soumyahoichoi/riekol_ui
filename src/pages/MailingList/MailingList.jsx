import React, { useEffect, useRef, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from '@nextui-org/react';
import { getMailingList } from '../../api/checkout';
import { getResultFromData } from '../../helper';

const columns = [
    {
        key: 'name',
        label: 'NAME'
    },
    {
        key: 'id',
        label: 'ID'
    },
    {
        key: 'chapter',
        label: 'CHAPTER'
    },
    {
        key: 'email',
        label: 'EMAIL'
    },
    {
        key: 'contact',
        label: 'CONTACT'
    },
    {
        key: 'amount',
        label: 'AMOUNT'
    },
    {
        key: 'currency',
        label: 'CURRENCY'
    }
];

export default function MailingList() {
    const [rows, setRows] = useState([]);
    const [mailinglist, setMailingList] = useState([]);
    const apiCallRef = useRef(null);
    useEffect(() => {
        if (!apiCallRef.current) {
            getMailingList().then((item) => {
                setMailingList(getResultFromData(item)?.data);
            });
            apiCallRef.current = true;
        }
    }, []);
    useEffect(() => {
        if (mailinglist?.length > 0) {
            setRows((rows) => [
                ...rows,
                ...mailinglist.map((item) => ({
                    name: item.name,
                    id: item.id,
                    chapter: item.chapter,
                    email: item.email,
                    contact: item.contact,
                    amount: item.amount,
                    currency: item.currency,
                    key: item.id
                }))
            ]);
        }
    }, [mailinglist]);

    return (
        <Table aria-label="Example table with dynamic content">
            <TableHeader columns={columns}>{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}</TableHeader>
            <TableBody items={rows} emptyContent={'No rows to display.'}>
                {(item) => <TableRow key={item.key}>{(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}</TableRow>}
            </TableBody>
        </Table>
    );
}
