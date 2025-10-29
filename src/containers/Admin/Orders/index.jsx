/* import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';

import { api } from '../../../services/api';
import { Row } from './row';

export function Orders() {
    const [orders, setOrders] = useState([]);
    const [rows, setRows] = useState([]); // Inicialize como array vazio

    useEffect(() => {
        async function loadOrders() {
            const { data } = await api.get('orders');
            setOrders(data);
        }

        loadOrders();
    }, []);

    function createData(order) {
        return {
            name: order.user.name,
            orderId: order._id,
            date: order.createdAt,
            status: order.status,
            products: order.products,
        };
    }

    useEffect(() => {
        const newRows = orders.map(order => createData(order));
        setRows(newRows);
    }, [orders]);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Pedido</TableCell>
                        <TableCell>Cliente</TableCell>
                        <TableCell>Data do Pedido</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.orderId} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
} */

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';

import { api } from '../../../services/api';
import { Row } from './row';
import { FilterOption, Filter } from './styles';
import { orderStatusOptions } from './orderStatus';

export function Orders() {
    const [orders, setOrders] = useState([]); //bacjup
    const [filteredOrders, setFilteredOrders] = useState([]); //os valores que estão na tela
    const [activeStatus, setactiveStatus] = useState(0);


    const [rows, setRows] = useState([])

    useEffect(() => {
        async function loadOrders() {
            const { data } = await api.get('orders');

            setOrders(data)
            setFilteredOrders(data)
        }

        loadOrders();
    }, []);

    function createData(order) {
        return {
            name: order.user.name,
            orderId: order._id,
            date: order.createdAt,
            status: order.status,
            products: order.products,
        };
    }

    useEffect(() => {
        const newRows = filteredOrders.map((order) => createData(order))

        setRows(newRows)
    }, [filteredOrders])

    function handleStatus(status) {
        if (status.id === 0) {
            setFilteredOrders(orders);
        } else {
            const newOrders = orders.filter((order) => order.status === status.value);
            setFilteredOrders(newOrders)
        }
        setactiveStatus(status.id);
    }
    useEffect(() => {
        if (activeStatus === 0) {
            setFilteredOrders(orders);
        } else {
            const statusIndex = orderStatusOptions.findIndex(
                (item) => item.id === activeStatus,
            )
            const newFilteredOrders = orders.filter(
                (order) => order.status === orderStatusOptions[statusIndex].value,
            );
            setFilteredOrders(newFilteredOrders)
        }
    }, [orders])

    return (
        <>
            <Filter>
                {orderStatusOptions.map((status) => (
                    <FilterOption
                        key={status.id}
                        onClick={() => handleStatus(status)}
                        $isActiveStatus={activeStatus === status.id}
                    >
                        {status.label}
                    </FilterOption>
                ))}
            </Filter>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Pedido</TableCell>
                            <TableCell>Cliente</TableCell>
                            <TableCell>Data do Pedido</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <Row
                                key={row.orderId}
                                row={row}
                                orders={orders}
                                setOrders={setOrders}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}