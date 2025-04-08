import { Box, Typography } from '@mui/material';

const Header = ({ title, logoUrl }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        padding: 2,
        backgroundColor: 'background.paper',
        '& > *': {
          flex: '1 1 auto',
          minWidth: 'fit-content',
          textAlign: 'center'
        }
      }}
    >
      <Box
        component="img"
        src={logoUrl}
        alt="Logo"
        sx={{
          height: 50,
          width: 'auto',
          maxWidth: '100%'
        }}
      />
      
      <Typography
        variant="h4"
        component="h1"
        sx={{
          whiteSpace: 'nowrap'
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default Header;