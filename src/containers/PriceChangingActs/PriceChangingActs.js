import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { DataGrid } from '@material-ui/data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DescriptionIcon from '@material-ui/icons/Description';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link, useHistory } from 'react-router-dom';

import {
    fetchPriceChangingActs,
    deletePriceChangingAct,
    updateIsPriceChangingActApproved,
} from '../../actions/priceChangingActAction';

import DisplayAlert from '../../common/DisplayAlert';

import './style.css';
import { grey } from '@material-ui/core/colors';

const drawerWidth = 210;
const marginTop = 56;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& .super-app-theme--false': {
            backgroundColor: grey['400'],
            '&:hover': {
                backgroundColor: grey['600']
            },

        },
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
        isPending: state.managePriceChangingActs.isPending,
        priceChangingActs: state.managePriceChangingActs.priceChangingActs,
        error: state.managePriceChangingActs.error,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchPriceChangingActs: () => dispatch(fetchPriceChangingActs()),
        onDeletePriceChangingAct: (id) => dispatch(deletePriceChangingAct(id)),
        onUpdateIsPriceChangingActApproved: (priceChangingActId, isApproved) =>
            dispatch(updateIsPriceChangingActApproved(priceChangingActId, isApproved)),
    }
}

const PriceChangingActs = (props) => {
    const {
        isPending,
        priceChangingActs,
        error,
        onFetchPriceChangingActs,
        onDeletePriceChangingAct,
        onUpdateIsPriceChangingActApproved,
    } = props;

    const history = useHistory();
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const [displayPriceChangingActs, setDisplayPriceChangingActs] = useState([]);
    const [selectedPriceChangingActs, setSelectedPriceChangingActs] = useState([]);

    const addLinkToCell = (params) => (
        <Link className="no-underline" to={`/price-changing-acts/${params.id}`}>
            {params.value.name}
        </Link>
    );

    const addLinkToIdCell = (params) => (
        <Link className="no-underline" to={`/price-changing-acts/${params.id}`}>
            {params.value}
        </Link>
    );

    const formateSumCell = (params) => (
        Number(params.value).toFixed(2)
    )

    const formateDateCell = (params) => (
        new Date(params.value).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replaceAll('/', '.')
    )

    const renderIsApproved = (params) => {
        return params.value === true ? "Yes" : "No"
    }

    const columns = [
        {
            field: 'approved',
            headerName: 'Apv',
            width: 60,
            disableColumnMenu: 'true',
            sortable: 'false',
            disableReorder: 'true',
            hideSortIcons: 'true',
            renderCell: renderIsApproved,
        },
        {
            field: 'id',
            headerName: 'ID',
            width: 75,
            renderCell: addLinkToIdCell,
            disableColumnMenu: 'true',
        },
        {
            field: 'dateCreated',
            headerName: 'Date',
            width: 110,
            renderCell: formateDateCell,
        },
        {
            field: 'myOrganization',
            headerName: 'Organization',
            width: 180,
            renderCell: addLinkToCell,
        },
        {
            field: 'oldPrices',
            headerName: 'Old Prices',
            width: 130,
            renderCell: formateSumCell,
            disableColumnMenu: 'true',
        },
        {
            field: 'newPrices',
            headerName: 'New Prices',
            width: 130,
            renderCell: formateSumCell,
            disableColumnMenu: 'true',
        },
        {
            field: 'pricesDifference',
            headerName: 'Price Diff.',
            width: 130,
            renderCell: formateSumCell,
            disableColumnMenu: 'true',
        },
        {
            field: 'note',
            headerName: 'Note',
            width: 280,
        },
    ];

    useEffect(() => {
        onFetchPriceChangingActs();
    }, [onFetchPriceChangingActs])

    useEffect(() => {
        setDisplayPriceChangingActs(priceChangingActs);
    }, [priceChangingActs])

    useEffect(() => {
        setOpen(true)
    }, [error])

    useEffect(() => {
        setOpen(false)
    }, [])

    const onAddPriceChangingActInvoice = () => {
        history.push("price-changing-acts/00000000-0000-0000-0000-000000000000");
    }

    const onSelectPriceChangingActs = (selectedPriceChangingActsArray) => (setSelectedPriceChangingActs(selectedPriceChangingActsArray.selectionModel));

    const onDeleteSelectedPriceChangingActs = () => {
        if (selectedPriceChangingActs !== undefined && selectedPriceChangingActs.length > 0) {
            if (window.confirm(`Are you sure you want to delete selected price changing acts?`)) {
                selectedPriceChangingActs.forEach(invoiceId => {
                    onDeletePriceChangingAct(invoiceId);
                })
            }
            history.go(0);
        } else {
            alert("You didn't select any price changing act(s). Please try again.");
        }
    }

    const onUpdateSelectedPriceChangingAct = () => {
        if (selectedPriceChangingActs !== undefined && selectedPriceChangingActs.length === 1) {
            selectedPriceChangingActs.forEach(priceChangingActId => {
                history.push(`/price-changing-acts/${priceChangingActId}`);
            })
        } else {
            alert("You didn't select a price changing act or selected more than one. Please try again.");
        }
    }

    // const onUpdateSelectedInvoiceProducts = () => {
    //     if (selectedPriceChangingActs !== undefined && selectedPriceChangingActs.length === 1) {
    //         selectedPriceChangingActs.forEach(invoiceId => {
    //             pushHistory(`/income-invoice-products/${invoiceId}`, `/outcome-invoice-products/${invoiceId}`);
    //         })
    //     } else {
    //         alert("You didn't select an invoice or selected more than one. Please try again.");
    //     }
    // }

    const onApproveSelectedPriceChangingAct = () => {
        if (selectedPriceChangingActs !== undefined && selectedPriceChangingActs.length > 0) {
            onUpdateIsPriceChangingActApproved({ "true": selectedPriceChangingActs });
            history.go(0);
        } else {
            alert("You didn't select a price changing act or selected more than one. Please try again.");
        }
    }

    const onDisapproveSelectedPriceChangingAct = () => {
        if (selectedPriceChangingActs !== undefined && selectedPriceChangingActs.length > 0) {
            onUpdateIsPriceChangingActApproved({ "false": selectedPriceChangingActs });
            history.go(0);
        } else {
            alert("You didn't select a price changing act or selected more than one. Please try again.");
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
                                onClick={onAddPriceChangingActInvoice}
                            >
                                <ListItemIcon>{<AddCircleOutlineIcon />}</ListItemIcon>
                                <ListItemText primary={'Add new'} />
                            </ListItem>
                            <ListItem
                                button
                                divider
                            // onClick={onUpdateSelectedPriceChangingActs}
                            >
                                <ListItemIcon>{<UpdateIcon />}</ListItemIcon>
                                <ListItemText primary={'Update'} />
                            </ListItem>
                            <ListItem
                                button
                                divider
                                onClick={onUpdateSelectedPriceChangingAct}
                            >
                                <ListItemIcon>{<DescriptionIcon />}</ListItemIcon>
                                <ListItemText primary={'Update Header'} />
                            </ListItem>
                            <ListItem
                                button
                                divider
                                onClick={onApproveSelectedPriceChangingAct}
                            >
                                <ListItemIcon>{<DoneIcon />}</ListItemIcon>
                                <ListItemText primary={'Approve'} />
                            </ListItem>
                            <ListItem
                                button
                                divider
                                onClick={onDisapproveSelectedPriceChangingAct}
                            >
                                <ListItemIcon>{<CloseIcon />}</ListItemIcon>
                                <ListItemText primary={'Disapprove'} />
                            </ListItem>
                            <ListItem
                                button
                                divider
                                onClick={onDeleteSelectedPriceChangingActs}
                            >
                                <ListItemIcon>{<DeleteIcon />}</ListItemIcon>
                                <ListItemText primary={'Delete Selected'} />
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
                        rows={displayPriceChangingActs}
                        columns={columns}
                        pageSize={25}
                        checkboxSelection={true}
                        loading={isPending}
                        sortingOrder={['asc', 'desc', null]}
                        disableSelectionOnClick={true}
                        rowHeight={30}
                        onSelectionModelChange={onSelectPriceChangingActs}
                        getRowClassName={(params) =>
                            `super-app-theme--${params.getValue(params.id, 'approved')}`}
                    />
                </div>
            </div>
        </div>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(PriceChangingActs);