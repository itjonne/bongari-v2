import { Typography, Box } from '@mui/material';
import { PRIMARY } from '../config/theme'; // TODO: Ei ehkä järkevin

const SmallHeader = ({ text }) => {
  return (
    <>
      <Typography variant="h6" sx={{ marginLeft: '24px' }}>
        {text}
      </Typography>
      <div style={{ height: '5px', width: 'min(40%, 200px)', backgroundColor: PRIMARY }} />
    </>
  );
};

// TODO: Toimiiko tietokoneella toi overflow?!
const CategoriesList = ({ names, selected, handleSelected }) => {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        gap: '16px',
        flexDirection: 'row',
        overflowX: 'scroll',
        overflowY: 'hidden',
        marginTop: '8px',
        padding: '0 24px 0 24px',
        width: '100%',
      }}>
      {['Kaikki', ...names].map((name) => (
        <CategoriesListItem
          key={name}
          name={name}
          selected={name === selected}
          handleClick={handleSelected}
        />
      ))}
    </Box>
  );
};

const CategoriesListItem = ({ name, selected, handleClick }) => {
  return (
    <Box sx={{ textAlign: 'center', width: '74px' }} onClick={() => handleClick(name)}>
      <Box
        sx={{
          minWidth: '74px',
          maxWidth: '74px',
          minHeight: '74px',
          maxHeight: '74px',
          borderRadius: '50%',
          borderStyle: 'solid',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '8px',
          borderColor: selected ? 'green' : 'grey',
          backgroundImage: `url("/images/${name}.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Typography variant={selected ? 'h4' : 'h6'}>{name}</Typography>
    </Box>
  );
};

const Categories = ({ objects, selected, handleSelected }) => {
  return (
    <>
      <SmallHeader text="Kategoriat" />
      {objects && (
        <CategoriesList
          names={Object.keys(objects)}
          selected={selected}
          handleSelected={handleSelected}
        />
      )}
    </>
  );
};

export default Categories;
