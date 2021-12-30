import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

import ProgressLoading from '../../common/ProgressLoading';
import DisplayAlert from '../../common/DisplayAlert';

import {
    fetchProductHistory
} from '../actions';

const mapStateToProps = (state) => {
    return {
        isPending: state.manageProducts.isPendingProductHistory,
        productHistory: state.manageProducts.productHistory,
        error: state.manageProducts.errorProductHistory,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchProductHistory: (id) => dispatch(fetchProductHistory(id)),
    }
}

const useStyles = makeStyles({
    table: {
        minWidth: 500,
    },
});

const ProductHistory = (props) => {

    const {
        isPending,
        productId,
        productHistory,
        error,
        onFetchProductHistory,
    } = props;

    const classes = useStyles();

    const [totalRows, setTotalRows] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [page, setPage] = useState(0);

    const [openAlert, setOpenAlert] = useState(false);

    useEffect(() => {
        setTotalRows(productHistory.length);
    }, [productHistory])

    useEffect(() => {
        onFetchProductHistory(productId);
    }, [productId, onFetchProductHistory])

    useEffect(() => {
        setOpenAlert(true)
    }, [error])

    useEffect(() => {
        setOpenAlert(false)
    }, [])

    const changePage = (event, pageNr) => {
        if (pageNr <= totalRows) {
            setPage(pageNr)
        }
    }

    return (
        <div>
            <DisplayAlert
                error={error}
                open={openAlert}
                setOpen={setOpenAlert}
            />
            {!isPending ?
                <div>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} size="small" aria-label="simple table">
                            <TableHead style={{ backgroundColor: "#808080ad" }}>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Username</TableCell>
                                    <TableCell>Discount Price</TableCell>
                                    <TableCell>Retail Price</TableCell>
                                    <TableCell>Modified</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {productHistory
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((element, index) => (
                                        <TableRow key={element.id}>
                                            <TableCell component="th" scope="row">
                                                {++index}
                                            </TableCell>
                                            <TableCell>
                                                {element.username}
                                            </TableCell>
                                            <TableCell>
                                                {Number(element.discountPrice).toFixed(2)}
                                            </TableCell>
                                            <TableCell>
                                                {Number(element.retailPrice).toFixed(2)}
                                            </TableCell>
                                            <TableCell>
                                                {new Date(element.created).toLocaleString('de-CH')}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[15, 30, 60]}
                                        rowsPerPage={rowsPerPage}
                                        count={totalRows}
                                        page={page}
                                        onChangePage={changePage}
                                        onChangeRowsPerPage={(event) => setRowsPerPage(event.target.value)}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </div>
                :
                <ProgressLoading />}
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductHistory);