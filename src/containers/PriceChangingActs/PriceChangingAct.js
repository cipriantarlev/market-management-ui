import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';

import {
    fetchPriceChangingAct,
    createPriceChangingAct,
    updatePriceChangingAct,
} from '../../actions/priceChangingActAction';
import { fetchInvoiceOrganizations } from '../../actions/invoiceAction';
import { restStoreData } from '../../actions/restoreDataAction';
import { hideNavBar, showNavBar } from '../../actions/navBarAction';

import DisplayAlert from '../../common/DisplayAlert';
import InvalidFieldText from '../../common/InvalidFieldText';
import ProgressLoading from '../../common/ProgressLoading';
import {
    validateInputValue,
    preventSubmitIfInvalidInput
} from '../../common/utils';

const mapStateToProps = (state) => {
    return {
        isPending: state.managePriceChangingActs.isPending,
        initialpriceChangingAct: state.managePriceChangingActs.priceChangingAct,
        error: state.managePriceChangingActs.error,
        organizations: state.manageInvoices.invoiceOrganizations,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchPriceChangingAct: (id) => dispatch(fetchPriceChangingAct(id)),
        onCreatePriceChangingAct: (priceChangingAct) => dispatch(createPriceChangingAct(priceChangingAct)),
        onUpdatePriceChangingAct: (priceChangingAct) => dispatch(updatePriceChangingAct(priceChangingAct)),
        onFetchOrganizations: () => dispatch(fetchInvoiceOrganizations()),
        onRestData: () => dispatch(restStoreData()),
        hideNavBar: () => dispatch(hideNavBar()),
        showNavBar: () => dispatch(showNavBar()),
    }
}

const PriceChangingAct = (props) => {
    const {
        isPending,
        initialpriceChangingAct,
        error,
        organizations,
        onFetchPriceChangingAct,
        onCreatePriceChangingAct,
        onUpdatePriceChangingAct,
        onFetchOrganizations,
        onRestData,
        hideNavBar,
        showNavBar,
    } = props;

    const NOTE_HELP_BLOCK = "noteHelpBlock";

    const [invalidOrganization, setInvalidOrganization] = useState(false);
    const [invalidNote, setInvalidNote] = useState(false);

    const [openAlert, setOpenAlert] = useState(false);

    const history = useHistory();
    const { id } = useParams();

    const [priceChangingAct, setPriceChangingAct] = useState({});
    const [selectedOrganization, setSelectedOrganization] = useState(0);

    const onClickCancel = () => {
        const answer = window.confirm('Are you sure you want to cancel?');
        if (answer === true) {
            resetAllAndSubmit();
        }
    }

    useEffect(() => {
        onFetchOrganizations();
    }, [onFetchOrganizations])

    useEffect(() => {
        if (id !== "00000000-0000-0000-0000-000000000000") {
            onFetchPriceChangingAct(id);
        }
    }, [id, onFetchPriceChangingAct])

    useEffect(() => {
        setOpenAlert(true)
    }, [error])

    useEffect(() => {
        setOpenAlert(false);
        hideNavBar();
        return () => {
            showNavBar();
        }
        // eslint-disable-next-line
    }, [])

    const intializeOrganizationValue = () => {
        if (initialpriceChangingAct.myOrganization !== undefined) {
            setSelectedOrganization(initialpriceChangingAct.myOrganization.id)
        }
    }

    useEffect(() => {
        if (id !== "00000000-0000-0000-0000-000000000000") {
            setPriceChangingAct(initialpriceChangingAct)
            intializeOrganizationValue();
        } // eslint-disable-next-line
    }, [initialpriceChangingAct, id])

    const onChangePriceChangingActValues = (event) => {
        switch (event.target.id) {
            case "formGridOrganization":
                let organizationObj = getDropDownValue(Number(event.target.value), organizations, setSelectedOrganization);
                setPriceChangingAct({ ...priceChangingAct, myOrganization: organizationObj });
                setInvalidOrganization(false);
                break;
            case "formGridDateCreated":
                setPriceChangingAct({ ...priceChangingAct, dateCreated: event.target.value });
                break;
            case "formGridNote":
                validateInputValue(setInvalidNote, "^[a-zA-Zа-яА-Я0-9\\s.,:;-№]+$", event);
                setPriceChangingAct({ ...priceChangingAct, note: event.target.value });
                break;
            default:
                setPriceChangingAct(priceChangingAct);
                break;
        }
    }

    const getDropDownValue = (itemId, itemList, setItem) => {
        setItem(itemId);
        return itemList.find(item => item.id === itemId);
    }

    const resetAllAndSubmit = () => {
        history.push("/price-changing-acts");
        onRestData();
        setPriceChangingAct({});
        setSelectedOrganization(0);
    }

    const getTodayDate = () => (new Date().toJSON().slice(0, 10))

    const isPriceChangingActReadyToBeSubmitted = () => (
        !invalidOrganization && !invalidNote &&
        selectedOrganization !== 0
    )

    const markIvalidFields = () => {
        setInvalidOrganization(selectedOrganization === 0);
    }

    const onSubmitPriceChangingAct = (event) => {
        if (isPriceChangingActReadyToBeSubmitted()) {
            if (id !== "00000000-0000-0000-0000-000000000000") {
                onUpdatePriceChangingAct(priceChangingAct);
            } else {
                setPriceChangingAct(Object.assign(priceChangingAct, priceChangingAct,
                    {
                        dateCreated: getTodayDate()
                    }));
                onCreatePriceChangingAct(priceChangingAct);
            }
            resetAllAndSubmit();
        } else {
            preventSubmitIfInvalidInput(event);
            markIvalidFields();
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
                <div className="container w-50 center mt4">
                    <h3 className="mb5">Add New Price Changing Act</h3>
                    <Form onSubmit={onSubmitPriceChangingAct}>
                        <Form.Group as={Row} controlId="formGridDateCreated">
                            <Form.Label
                                column
                                sm="3"
                                style={{
                                    paddingTop: 0,
                                    paddingBottom: 0
                                }}
                            >Creation Date</Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    type="date"
                                    size="sm"
                                    defaultValue={getTodayDate()}
                                    value={priceChangingAct.dateCreated}
                                    onChange={onChangePriceChangingActValues}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formGridOrganization">
                            <Form.Label
                                column
                                sm="3"
                                style={{
                                    paddingTop: 0,
                                    paddingBottom: 0
                                }}
                            >Organization</Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    as="select"
                                    size="sm"
                                    value={selectedOrganization}
                                    isInvalid={invalidOrganization}
                                    onChange={onChangePriceChangingActValues}
                                >
                                    <option>{'--Select Organization--'}</option>
                                    {organizations.map(item => (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formGridNote">
                            <Form.Label
                                column
                                sm="3"
                                style={{
                                    paddingTop: 0,
                                    paddingBottom: 0
                                }}
                            >Note</Form.Label>
                            <Col sm="9">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Note"
                                    size="sm"
                                    value={priceChangingAct.note}
                                    onChange={onChangePriceChangingActValues}
                                    isInvalid={invalidNote}
                                    aria-describedby={NOTE_HELP_BLOCK}
                                />
                                <InvalidFieldText
                                    isInvalid={invalidNote}
                                    message={"Note should contain alphanumeric character, space, dot, comma, colons, semicolons and dash."}
                                    ariaDescribedbyId={NOTE_HELP_BLOCK}
                                />
                            </Col>
                        </Form.Group>
                        <div>
                            <Button
                                className="mr5 w4 mt4"
                                variant="primary"
                                type="submit"
                            >
                                Submit
                            </Button>
                            <Button
                                className="btn btn-warning ml5 w4 mt4"
                                onClick={onClickCancel}
                            >
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </div>
                : <ProgressLoading />
            }
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceChangingAct);