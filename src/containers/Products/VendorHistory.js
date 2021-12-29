import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import ProgressLoading from '../../common/ProgressLoading';
import { Checkbox } from '@material-ui/core';

const useStyles = makeStyles({
    table: {
        minWidth: 500,
    },
});

const VendorHistory = (props) => {
    const {
        isPending,
        productVendors,
        defaultVendorId
    } = props;

    console.log("props", props)

    const classes = useStyles();

    return (
        !isPending ?
            <div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead style={{ backgroundColor: "#808080ad" }}>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Vendor Name</TableCell>
                                <TableCell>Default</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {productVendors?.map((element) => (
                                <TableRow key={element.id}>
                                    <TableCell component="th" scope="row">
                                        {element.id}
                                    </TableCell>
                                    <TableCell>
                                        {element.name}
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox 
                                            checked={element.id === defaultVendorId}
                                            disabled='true'
                                        />
                                        {/* {defaultVendorId} */}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            :
            <ProgressLoading />
    )
}

export default VendorHistory;