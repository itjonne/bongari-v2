import { Box, Typography, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { useDispatch, useSelector } from 'react-redux';
import { setDirection } from '../reducers/filter/filterSlice';

const ImageGalleryHeader = ({ handleSort, sortBy, search, setSearch }) => {
  const { direction } = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleDirection = (e) => {
    e.preventDefault();
    dispatch(setDirection());
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '54px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: 'center',
        padding: '4px 0 4px 12px',
        backgroundColor: 'darkgrey',
        borderStyle: 'solid',
        borderWidth: 'thin',
      }}>
      <Box onClick={handleSort}>
        <Typography variant="h6">{sortBy.description}</Typography>
      </Box>
      <Box onClick={handleDirection}>
        <Typography variant="h6">{direction === '' ? 'up' : 'down'}</Typography>
      </Box>
      <Box sx={{ padding: '0 8px' }}>
        <TextField
          id="search"
          label="Hae"
          variant="outlined"
          size="small"
          value={search}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'action.active' }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default ImageGalleryHeader;
