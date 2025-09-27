import { Box, Button } from '@mui/material';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';

interface PriceDisplayProps {
  price: number;
}

export const PriceDisplay = ({ price }: PriceDisplayProps) => {
  if (price === 0) {
    return (
      <Button
        variant="contained"
        color="error"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 2,
          py: 1,
          borderRadius: '50px',
          boxShadow: 2,
          '&:hover': { transform: 'scale(1.05)' },
          transition: 'transform 0.3s',
        }}
      >
        <Box component="span" sx={{ animation: 'pulse 1.5s infinite' }}>Free</Box>
        <Box sx={{ position: 'relative', height: 16, width: 16 }}>
          <Box
            sx={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              borderRadius: '50%',
              bgcolor: 'error.main',
              opacity: 0.5,
              animation: 'ping 1.5s linear infinite',
            }}
          />
          <Box
            sx={{
              position: 'relative',
              height: '100%',
              width: '100%',
              borderRadius: '50%',
              bgcolor: 'error.main',
              boxShadow: 1,
            }}
          />
        </Box>
      </Button>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        bgcolor: 'grey.100',
        px: 2,
        py: 1,
        borderRadius: '50px',
        boxShadow: 1,
        color: 'grey.900',
      }}
    >
      <CurrencyRupeeRoundedIcon sx={{ color: 'grey.700' }} />
      {price.toLocaleString()}
    </Box>
  );
};
