import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';

const DisplayAlert = ({ error, open, setOpen }) => {
  if (Array.isArray(error)) {
    return error.map((element, index) => (
      <Collapse key={`${element.message}_${index}`} in={open}>
        <Alert
          className="mb1"
          variant="filled"
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {`Error: ${element?.message}. Please try again.`}
        </Alert>
      </Collapse>
    ))
  } else {
    return <Collapse in={open}>
      <Alert
        className="mb1"
        variant="filled"
        severity="error"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {`Error: ${error}. Please try again.`}
      </Alert>
    </Collapse>
  }
}

export default DisplayAlert;