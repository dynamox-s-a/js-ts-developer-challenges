import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function DeleteModal({
  open,
  handleClose,
  sendConfirmation,
}: {
  open: boolean;
  handleClose: () => void;
  sendConfirmation: () => void;
}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete this machine?
          </Typography>
          <Stack direction="row" padding={2} spacing={2}>
            <Button onClick={() => sendConfirmation()} variant="outlined">
              Yes
            </Button>
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}