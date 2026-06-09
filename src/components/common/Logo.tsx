import { Stack, Typography } from '@mui/material';
import Image from 'components/base/Image';
import { publicAssetPath } from 'helpers/utils';
import { Fragment } from 'react/jsx-runtime';

interface LogoProps {
  color?: string;
  subtitle?: string;
}

const Logo = ({ color = 'primary.darker', subtitle }: LogoProps) => {
  return (
    <Fragment>
      <Image src={publicAssetPath('bankdash.svg')} alt="Logo" sx={{ width: 36 }} />
      <Stack gap={0}>
        <Typography variant="h2" color={color} lineHeight={1}>
          ConnectBank
        </Typography>
        {subtitle ? (
          <Typography fontSize={11} color={color} sx={{ opacity: 0.78 }}>
            {subtitle}
          </Typography>
        ) : null}
      </Stack>
    </Fragment>
  );
};

export default Logo;
