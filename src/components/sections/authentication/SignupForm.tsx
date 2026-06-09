import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { useAuth } from 'providers/AuthProvider';
import { useBreakpoints } from 'providers/useBreakpoints';
import { FormEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import paths from 'routes/path';

const interactiveFieldSx = {
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'primary.main',
  },
  '& .MuiOutlinedInput-root': {
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'primary.light',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'primary.main',
      borderWidth: 2,
    },
  },
};

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const { up } = useBreakpoints();
  const upSM = up('sm');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!companyName.trim()) {
      setError('Company name is required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);

    try {
      await register({ name, companyName, email, password });
      navigate(paths.dashboard, { replace: true });
    } catch (signupError) {
      setError(signupError instanceof Error ? signupError.message : 'Unable to create account.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {error && (
        <Alert severity="error" sx={{ mb: 2.5 }}>
          {error}
        </Alert>
      )}
      <Grid container spacing={3} sx={{ mb: 2.5 }}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            size={upSM ? 'medium' : 'small'}
            name="name"
            label="Full name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            sx={interactiveFieldSx}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            size={upSM ? 'medium' : 'small'}
            name="companyName"
            label="Company name"
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
            sx={interactiveFieldSx}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            size={upSM ? 'medium' : 'small'}
            name="email"
            label="Email address"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            sx={interactiveFieldSx}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            size={upSM ? 'medium' : 'small'}
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            inputProps={{ minLength: 8 }}
            sx={interactiveFieldSx}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <IconifyIcon icon={showPassword ? 'majesticons:eye' : 'majesticons:eye-off'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            size={upSM ? 'medium' : 'small'}
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            inputProps={{ minLength: 8 }}
            sx={interactiveFieldSx}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    <IconifyIcon
                      icon={showConfirmPassword ? 'majesticons:eye' : 'majesticons:eye-off'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <Button
        fullWidth
        size={upSM ? 'large' : 'medium'}
        type="submit"
        variant="contained"
        color="primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? <CircularProgress color="inherit" size={24} /> : 'Sign Up'}
      </Button>
    </Box>
  );
};

export default SignupForm;
