import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
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
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import {
  fetchDocumentTypes,
  deleteDocumentType,
  restStoreData,
} from '../actions';
import DocumentType from './DocumentType';

import DisplayAlert from '../../common/DisplayAlert';
import ProgressLoading from '../../common/ProgressLoading';

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

const mapStateToProps = (state) => {
  return {
    isPending: state.manageDocumentTypes.isPending,
    documentTypes: state.manageDocumentTypes.documentTypes,
    error: state.manageDocumentTypes.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchDocumentTypes: () => dispatch(fetchDocumentTypes()),
    onDeleteDocumentType: (id) => dispatch(deleteDocumentType(id)),
    onRestStoreData: () => dispatch(restStoreData()),
  }
}

const DocumentTypes = (props) => {
  const {
    isPending,
    documentTypes,
    error,
    onFetchDocumentTypes,
    onDeleteDocumentType,
    onRestStoreData,
  } = props;

  const classes = useStyles();
  const history = useHistory();

  const [openDialog, setOpenDialog] = useState(false);
  const [id, setId] = useState(0);
  const [documentTypeList, setDocumentTypeList] = useState([]);
  const [open, setOpen] = useState(false);

  const [totalRows, setTotalRows] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpenDialog(false);
      setDocumentTypeList([]);
      onRestStoreData();
    }
  };

  useEffect(() => {
    onFetchDocumentTypes();
    setDocumentTypeList(documentTypes)
    // eslint-disable-next-line
  }, [onFetchDocumentTypes, documentTypeList])

  useEffect(() => {
    setTotalRows(documentTypes.length);
  }, [documentTypes])

  useEffect(() => {
    setOpen(true)
  }, [error])

  useEffect(() => {
    setOpen(false)
  }, [])

  const onAddNewDocumentType = () => {
    setId(0);
    setOpenDialog(true);
  }

  const onUpdateDocumentType = (elementId) => {
    setId(elementId);
    setOpenDialog(true);
  }

  const removeDocumentType = (documentTypeId) => {
    const answer = window.confirm(`Are you sure you want to delete the Document Type with id: ${documentTypeId}?`);
    if (answer === true) {
      onDeleteDocumentType(documentTypeId);
      setDocumentTypeList([]);
      onRestStoreData();
    }
  }

  const changePage = (event, pageNr) => {
    if (pageNr <= totalRows) {
      setPage(pageNr)
    }
  }

  const renderTableContent = () => (
    !isPending ?
        <div>
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="simple table">
              <TableHead style={{ backgroundColor: "#808080ad" }}>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell >Name</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {documentTypes
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((element) => (
                    <TableRow key={element.id}>
                      <TableCell component="th" scope="row">
                        <Link className="no-underline" to="#" onClick={() => onUpdateDocumentType(element.id)} >
                          {element.id}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link className="no-underline" to="#" onClick={() => onUpdateDocumentType(element.id)}>
                          {element.name}
                        </Link>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          startIcon={<DeleteIcon />}
                          onClick={() => removeDocumentType(element.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[10, 20, 50]}
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
          <DocumentType
            open={openDialog}
            handleClose={handleClose}
            id={id}
          />
        </div>
        :
        <ProgressLoading />
  )

  return (
    <div style={{ width: 500, margin: 'auto', marginTop: 30 }}>
      <Button
        variant="contained"
        className="mb-4"
        style={{ backgroundColor: '#2aa839', color: 'white' }}
        startIcon={<AddCircleOutlineIcon />}
        onClick={onAddNewDocumentType}
      >
        Add new Document Type
      </Button>
      {error ?
        <DisplayAlert
          error={error}
          open={open}
          setOpen={setOpen}
        /> : null}
      {documentTypes.status === 403 ? history.push("/forbidden") : renderTableContent()}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentTypes);