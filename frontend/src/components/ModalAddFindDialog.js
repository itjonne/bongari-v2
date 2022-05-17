import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import LinearProgress from '@mui/material/LinearProgress';
import Image from './Image';

const ModalAddFindDialog = ({ open, handleClose, object }) => {
  const [progress, setProgress] = useState(0);
  const user = useSelector((state) => state.user);
  const finds = useSelector((state) => state.finds);

  useEffect(() => {
    // Odotetaan 2sek ja sit ammutaan tuo timeri
    setTimeout(() => {
      console.log('waiting');
    }, 500);

    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 5));
    }, 60);

    setProgress(0);
    return () => {
      clearInterval(timer);
    };
  }, [user, object, open]);

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

  const calculateCongratulations = () => {
    // Siellä pitäis aina olla ainakin tää uusin löytö.
    if (finds.filter((find) => find.objectId === object.id).length === 0) {
      return `Onnittelut uudesta bongauksesta! ${object.name} oli täysin uusi havainto!`;
    }
    if (finds.filter((find) => find.objectId === object.id).length === 1) {
      return `Onnittelut uudesta bongauksesta! ${object.name} oli täysin uusi havainto!`;
    } else {
      return `Onnittelut bongauksesta! ${object.name} oli ${
        finds.filter((find) => find.objectId === object.id).length
      }. löytämäsi!`;
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="Uusi Löytö"
      aria-describedby="Uusi Löytö Description"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}>
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Onnittelut bongauksesta!
          </Typography>
          <Box sx={{ display: 'flex', width: '100%' }}>
            <Image type="small" object={object} />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                justifyContent: 'center',
                marginLeft: '12px',
              }}>
              <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                <Typography variant="h6">{user.points}p.</Typography>
                <LinearProgress
                  sx={{ width: '100%', margin: '0 12px' }}
                  variant="determinate"
                  value={progress}
                />
                <Typography variant="h6">
                  {progress < 100 ? user.points : user.points + object.points}p.
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="body1">{calculateCongratulations()}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalAddFindDialog;
