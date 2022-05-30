import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { DataGrid } from '@material-ui/data-grid';

import BackupIcon from '@material-ui/icons/Backup';
import HorizontalSplitIcon from '@material-ui/icons/HorizontalSplit';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import {
    fetchMarkedProducts,
    updateIsProductChecked,
} from '../../actions/productAction';
import { restStoreData } from '../../actions/restoreDataAction';

import DisplayAlert from '../../common/DisplayAlert';

const drawerWidth = 240;
const marginTop = 56;

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        marginTop: marginTop,
    },
    drawerPaper: {
        width: drawerWidth,
        marginTop: marginTop,
        zIndex: 0
    },
    drawerContainer: {
        overflow: 'auto',
    },
}));

const mapStateToProps = (state) => {
    return {
        isPending: state.manageProducts.isPending,
        markedProducts: state.manageProducts.markedProducts,
        error: state.manageProducts.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchMarkedProducts: () => dispatch(fetchMarkedProducts()),
        onRestData: () => dispatch(restStoreData()),
        onUpdateIsProductChecked: (listOfIds) => dispatch(updateIsProductChecked(listOfIds)),
    }
}

const MarkedProducts = (props) => {
    const {
        isPending,
        markedProducts,
        error,
        onFetchMarkedProducts,
        onUpdateIsProductChecked,
        onRestData
    } = props;

    const classes = useStyles();
    const history = useHistory();

    const [open, setOpen] = useState(false);

    const [displayInvoiceProducts, setDisplayInvoiceProduct] = useState([]);
    const [selectedInvoiceProducts, setSelectedInvoiceProduct] = useState([]);

    const [qty, setQty] = useState(1);

    const renderBarcodes = (params) => params?.row?.barcodes[0]?.value;

    const renderRetailPrice = (params) => {
        if (params.row.id !== 0) {
            return Number(params?.row?.retailPrice).toFixed(2)
        }
    };

    const renderQuatity = (params) => {
        if (params.row.id !== 0) {
            let elementIndex = displayInvoiceProducts.findIndex(element => element.id === params?.row?.id);
            if (params.value !== displayInvoiceProducts[elementIndex].stock) {
                displayInvoiceProducts[displayInvoiceProducts.length - 1].stock =
                    (displayInvoiceProducts[displayInvoiceProducts.length - 1].stock - displayInvoiceProducts[elementIndex].stock) +
                    Number(params.value);
                displayInvoiceProducts[elementIndex].stock = Number(params.value);
            }
        }
        return Number(params.value).toFixed(0);
    }

    const columns = [
        {
            field: 'barcodes',
            headerName: 'Barcode',
            width: 120,
            renderCell: renderBarcodes,
            sortable: false
        },
        {
            field: 'nameRom',
            headerName: 'Product',
            width: 260,
            sortable: false
        },
        {
            field: 'stock',
            headerName: 'Qty',
            width: 100,
            renderCell: renderQuatity,
            sortable: false,
            editable: true,
        },
        {
            field: 'retailPrice',
            headerName: 'RP',
            width: 100,
            renderCell: renderRetailPrice,
            sortable: false
        }
    ];

    useEffect(() => {
        setSelectedInvoiceProduct(selectedProducts());
        setDisplayInvoiceProduct(addOrderNumberToInvoiceProduct());
        // eslint-disable-next-line
    }, [markedProducts])

    useEffect(() => {
        setOpen(true)
    }, [error])

    useEffect(() => {
        setOpen(false)
        onFetchMarkedProducts();
        // eslint-disable-next-line
    }, [])

    const addOrderNumberToInvoiceProduct = () => {
        if (markedProducts !== null || markedProducts !== undefined) {

            let invoiceProductWithOrder = [...markedProducts];

            let stock = invoiceProductWithOrder.reduce((acc, element) => (
                acc + element.stock
            ), 0)

            invoiceProductWithOrder.push({
                id: 0,
                nameRom: '',
                discountPrice: '',
                retailPrice: '',
                barcodes: [],
                checked: false,
                stock,
                plu: null,
            })
            return invoiceProductWithOrder;
        }
    }

    const onSelectInvoiceProduct = (selectedInvoicesArray) => (setSelectedInvoiceProduct(selectedInvoicesArray.selectionModel));

    const onUpdateCheckedProduct = () => {
        if (selectedInvoiceProducts !== undefined && selectedInvoiceProducts.length > 0) {
            let unchecked = markedProducts.filter(element => !selectedInvoiceProducts.includes(element?.id))
                .map(element => element?.id);

            let checked = markedProducts.filter(element => selectedInvoiceProducts.includes(element?.id))
                .map(element => element?.id);

            onUpdateIsProductChecked({
                true: checked,
                false: unchecked
            });
        }
    }

    const backToInvoices = () => {
        onUpdateCheckedProduct();
        onRestData();
        history.push("/");
    }

    const selectedProducts = () => (markedProducts?.filter(element => (element?.checked === true))
        .map(element => element.id));

    const updateQuantity = () => {
        displayInvoiceProducts.forEach(element => {
            if (element.id > 0)
                element.stock = qty;
        })
        displayInvoiceProducts[displayInvoiceProducts.length - 1].stock = (displayInvoiceProducts.length - 1) * qty;
        setDisplayInvoiceProduct([...displayInvoiceProducts]);
    }

    const printPriceLable = () => {
        if (selectedInvoiceProducts !== undefined && selectedInvoiceProducts.length > 0) {
            let printList = markedProducts.filter(element => selectedInvoiceProducts.includes(element?.id))
                .map(element => ({[element.id]: element.stock}));   
            console.log("printList", printList);
        }
    }

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <div className={classes.root}>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <Toolbar />
                    <Toolbar />
                    <div className={classes.drawerContainer}>
                        <List>
                            <Divider />
                            <ListItem
                                button
                                divider
                                onClick={printPriceLable}
                            >
                                <ListItemIcon>{<LocalAtmIcon />}</ListItemIcon>
                                <ListItemText primary={'Print Price Lable'} />
                            </ListItem>
                            <ListItem
                                button
                                divider
                            >
                                <ListItemIcon>{<FormatListNumberedIcon />}</ListItemIcon>
                                <ListItemText
                                    primary={`Update Qty | ${qty}`}
                                    onClick={updateQuantity}
                                />
                                <div style={{
                                    display: "inline-block",
                                    width: '25px'
                                }}>
                                    <ArrowDropUpIcon onClick={() => setQty(qty + 1)} />
                                    <ArrowDropDownIcon onClick={() => qty >= 1 ? setQty(qty - 1) : null} />
                                </div>

                            </ListItem>
                            <ListItem
                                button
                                divider
                                onClick={() => alert("Print Barcode")}
                            >
                                <ListItemIcon>{<HorizontalSplitIcon />}</ListItemIcon>
                                <ListItemText primary={'Print Barcode'} />
                            </ListItem>
                            <ListItem
                                button
                                divider
                                onClick={() => alert("Send to Scales")}
                            >
                                <ListItemIcon>{<BackupIcon />}</ListItemIcon>
                                <ListItemText primary={'Send to Scales'} />
                            </ListItem>
                            <ListItem
                                button
                                divider
                                onClick={backToInvoices}
                            >
                                <ListItemIcon>{<ArrowBackIcon />}</ListItemIcon>
                                <ListItemText primary={'Back to main menu'} />
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
                <div className="center mt-3" style={{ height: '37em', width: '77rem' }}>
                    <DisplayAlert
                        error={error}
                        open={open}
                        setOpen={setOpen}
                    />
                    <DataGrid
                        rows={displayInvoiceProducts}
                        columns={columns}
                        pageSize={25}
                        checkboxSelection={true}
                        loading={isPending}
                        disableSelectionOnClick={true}
                        rowHeight={30}
                        isRowSelectable={(params) => params?.row?.id !== 0}
                        isCellEditable={(params) => params?.row?.id !== 0}
                        onSelectionModelChange={onSelectInvoiceProduct}
                        disableColumnMenu
                        selectionModel={selectedInvoiceProducts}

                    />
                </div>
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkedProducts);