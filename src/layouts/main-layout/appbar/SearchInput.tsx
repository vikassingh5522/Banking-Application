import { IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { useState } from 'react';

interface SearchInputProps {
  fullWidth: boolean;
  size: 'small' | 'medium';
  placeholder?: string;
}

const SearchInput = ({
  fullWidth,
  size,
  placeholder = 'Search for transactions, invoices, vendors...',
}: SearchInputProps) => {
  const [value, setValue] = useState('');

  return (
    <Stack
      direction="row"
      sx={{
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        width: 1,
      }}
    >
      <TextField
        fullWidth={fullWidth}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton type="submit">
                <IconifyIcon icon="mingcute:search-line" color="text.secondary" />
              </IconButton>
            </InputAdornment>
          ),
        }}
        variant="filled"
        size={size}
        sx={{
          '& .MuiFilledInput-root': {
            borderRadius: 40,
          },
          '&::placeholder': {
            color: 'text.secondary',
          },
        }}
      />
    </Stack>
  );
};

export default SearchInput;
