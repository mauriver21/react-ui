import { Radio as MuiRadio, RadioProps as MuiRadioProps } from '@mui/material';

export type RadioProps = MuiRadioProps & {};

export const Radio: React.FC<RadioProps> = (props) => <MuiRadio {...props} />;
