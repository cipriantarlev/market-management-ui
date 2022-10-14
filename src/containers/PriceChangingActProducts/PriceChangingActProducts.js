import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { DataGrid } from '@material-ui/data-grid';

import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import BackspaceIcon from '@material-ui/icons/Backspace';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { Link, useHistory } from 'react-router-dom';
import { useParams } from 'react-router';

import {
    fetchPriceChangingActProducts,
    deletePriceChangingActProduct,
} from '../../actions/priceChangingActProductAction';
import { updatePriceChangingAct } from '../../actions/priceChangingActAction';
import { restStoreData } from '../../actions/restoreDataAction';
import { hideNavBar, showNavBar } from '../../actions/navBarAction';

import DisplayAlert from '../../common/DisplayAlert';

import { DEFAULT_UUID_ID } from '../../constants'

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
        zIndex: 0
    },
    drawerContainer: {
        overflow: 'auto',
    },
}));

const mapStateToProps = (state) => {
    return {
        isPending: state.managePriceChangingActProducts.isPending,
        priceChangingActProducts: state.managePriceChangingActProducts.priceChangingActProducts,
        error: state.managePriceChangingActProducts.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchPriceChangingActProducts: (priceChangingActId) => dispatch(fetchPriceChangingActProducts(priceChangingActId)),
        onDeletePriceChangingActProduct: (id) => dispatch(deletePriceChangingActProduct(id)),
        onUpdatePriceChangingAct: (priceChangingAct) => dispatch(updatePriceChangingAct(priceChangingAct)),
        onRestData: () => dispatch(restStoreData()),
        hideNavBar: () => dispatch(hideNavBar()),
        showNavBar: () => dispatch(showNavBar()),
    }
}

const PriceChangingActProducts = (props) => {
    const {
        isPending,
        priceChangingActProducts,
        error,
        onFetchPriceChangingActProducts,
        onDeletePriceChangingActProduct,
        onUpdatePriceChangingAct,
        onRestData,
        hideNavBar,
        showNavBar,
    } = props;

    const history = useHistory();
    const { priceChangingActId } = useParams();

    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const [displayPriceChangingActProducts, setDisplayPriceChangingActProducts] = useState([]);
    const [selectedPriceChangingActProducts, setSelectedPriceChangingActProducts] = useState([]);
    const [priceChangingActToUpdate, setPriceChangingActToUpdate] = useState({});
    // eslint-disable-next-line
    const [priceChangingActValues, setriceChangingActValue] = useState({ oldPrices: 0, newPrices: 0, pricesDifference: 0 });

    const renderBarcodes = (params) => {
        if (!priceChangingActProducts[0]?.priceChangingAct?.approved) {
            return <Link className="no-underline" to={`/price-changing-act-products/${priceChangingActId}/product/${params.id}`}>
                {params?.row?.product?.barcodes[0].value}
            </Link>
        } else {
            return params?.row?.product?.barcodes[0].value
        }
    }

    const renderProductName = (params) => {
        if (!priceChangingActProducts[0]?.priceChangingAct?.approved) {
            return <Link className="no-underline" to={`/price-changing-act-products/${priceChangingActId}/product/${params.id}`}>
                {params?.row?.product?.nameRom}
            </Link>
        } else {
            return params?.row?.product?.nameRom
        }
    }

    const renderFormatedPrice = (params) => {
        if (params.row.id !== 0) {
            return Number(params.value).toFixed(2);
        }
    };
    const renderRetailPrice = (params) => {
        if (params.row.id !== 0) {
            return Number(params.row.product.retailPrice).toFixed(2)
        }
    };

    const renderQuatity = (params) => {
        if (params.row.id !== 0) {
            return params.row?.product?.stock
        }
    }

    const columns = [
        {
            field: 'product.barcode',
            headerName: 'Barcode',
            width: 120,
            renderCell: renderBarcodes,
            sortable: false
        },
        {
            field: 'product.nameRom',
            headerName: 'Product',
            width: 260,
            renderCell: renderProductName,
            sortable: false
        },
        {
            field: 'product.stock',
            headerName: 'Qty',
            width: 80,
            renderCell: renderQuatity,
            sortable: false
        },
        {
            field: 'oldPrice',
            headerName: 'OP',
            width: 95,
            renderCell: renderFormatedPrice,
            sortable: false
        },
        {
            field: 'product.retailPrice',
            headerName: 'RP',
            width: 95,
            renderCell: renderRetailPrice,
            sortable: false
        },
        {
            field: 'priceDifference',
            headerName: 'PC',
            width: 90,
            renderCell: renderFormatedPrice,
            sortable: false
        },
    ];

    useEffect(() => {
        onFetchPriceChangingActProducts(priceChangingActId);
    }, [onFetchPriceChangingActProducts, priceChangingActId])

    useEffect(() => {
        // setSelectedPriceChangingActProducts(selectedProducts());
        // eslint-disable-next-line
    }, [priceChangingActProducts])

    useEffect(() => {
        setOpen(true)
    }, [error])

    useEffect(() => {
        setOpen(false);
        hideNavBar();
        return () => {
            showNavBar();
        }
        // eslint-disable-next-line
    }, [])


    useEffect(() => {
        setPriceChangingActToUpdate(priceChangingActProducts[0]?.priceChangingAct);
        setDisplayPriceChangingActProducts(priceChangingActProducts)
        // eslint-disable-next-line 
    }, [priceChangingActProducts])

    const onAddNewPriceChangingActProduct = () => {
        if (priceChangingActProducts[0]?.priceChangingAct?.approved) {
            alert(`Price Changing Act is approved. You're not allowed to add a new product.`)
        } else {
            onRestData();
            history.push(`/price-changing-act-products/${priceChangingActId}/product/${DEFAULT_UUID_ID}`);
        }
    }

    const onSelectPriceChangingActProduct = (selectedPriceChangingActProducts) => (setSelectedPriceChangingActProducts(selectedPriceChangingActProducts.selectionModel));

    const onDeleteSelectedPriceChangingActProduct = () => {
        if (priceChangingActProducts[0]?.priceChangingAct?.approved) {
            alert(`Price Changing Act is approved. You're not allowed to delete any product.`)
        } else {
            if (selectedPriceChangingActProducts !== undefined && selectedPriceChangingActProducts.length > 0) {
                if (window.confirm(`Are you sure you want to delete selected product?`)) {
                    selectedPriceChangingActProducts.forEach(priceChangingActProductId => {
                        onDeletePriceChangingActProduct(priceChangingActProductId);
                    })
                }
                history.go(0);
            } else {
                alert("You didn't select any product(s). Please try again.");
            }
        }
    }

    const onUpdateSelectedPriceChangingActProduct = () => {
        if (priceChangingActProducts[0]?.priceChangingAct?.approved) {
            alert(`Price Changing Act is approved. You're not allowed to update any product.`)
        } else {
            if (selectedPriceChangingActProducts !== undefined && selectedPriceChangingActProducts.length === 1) {
                selectedPriceChangingActProducts.forEach(priceChangingActProductId => {
                    history.push(`/price-changing-act-products/${priceChangingActId}/product/${priceChangingActProductId}`);
                })
            } else {
                alert("You didn't select a product or selected more than one. Please try again.");
            }
        }
    }

    const calculatePriceChangingActTotalValues = () => {
        displayPriceChangingActProducts.forEach(item => {
            Object.assign(
                priceChangingActValues, priceChangingActValues, {
                oldPrices: item.oldPrice + priceChangingActValues.oldPrices,
                newPrices: item.product.retailPrice + priceChangingActValues.newPrices,
                pricesDifference: item.priceDifference + priceChangingActValues.pricesDifference,
            })
        })
    }

    const backToPriceChangingActs = () => {
        calculatePriceChangingActTotalValues();
        if (displayPriceChangingActProducts.length > 0) {
            Object.assign(
                priceChangingActToUpdate, priceChangingActToUpdate, {
                oldPrices: Math.round(priceChangingActValues.oldPrices * 100) / 100,
                newPrices: Math.round(priceChangingActValues.newPrices * 100) / 100,
                pricesDifference: Math.round(priceChangingActValues.pricesDifference * 100) / 100,
            })

            onUpdatePriceChangingAct(priceChangingActToUpdate);
        }
        onRestData();
        history.push(`/price-changing-acts`);
    }

    // const selectedProducts = () => (priceChangingActProducts?.filter(element => (element?.product?.checked === true))
    //     .map(element => element.id))

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
                                onClick={onAddNewPriceChangingActProduct}
                            >
                                <ListItemIcon>{<AddCircleOutlineIcon />}</ListItemIcon>
                                <ListItemText primary={'Add new Product'} />
                            </ListItem>
                            <ListItem
                                button
                                divider
                                onClick={onUpdateSelectedPriceChangingActProduct}
                            >
                                <ListItemIcon>{<UpdateIcon />}</ListItemIcon>
                                <ListItemText primary={'Update Product'} />
                            </ListItem>
                            <ListItem
                                button
                                divider
                                onClick={onDeleteSelectedPriceChangingActProduct}
                            >
                                <ListItemIcon>{<DeleteIcon />}</ListItemIcon>
                                <ListItemText primary={'Delete Selected Product(s)'} />
                            </ListItem>
                            <ListItem
                                button
                                divider
                                onClick={backToPriceChangingActs}
                            >
                                <ListItemIcon>{<BackspaceIcon />}</ListItemIcon>
                                <ListItemText primary={'Back to Price Changing Act'} />
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
                        rows={displayPriceChangingActProducts}
                        columns={columns}
                        pageSize={25}
                        checkboxSelection={true}
                        loading={isPending}
                        // sortingOrder={['asc', 'desc', null]}
                        disableSelectionOnClick={true}
                        rowHeight={30}
                        isRowSelectable={(params) => params?.row?.id !== 0}
                        onSelectionModelChange={onSelectPriceChangingActProduct}
                        disableColumnMenu
                        selectionModel={selectedPriceChangingActProducts}
                    />
                </div>
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceChangingActProducts);