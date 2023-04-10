import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default function DiscreteSlider({
  onChange,
}: {
  onChange: (event: Event, value: number) => void;
}) {
  const onChangeHandler = (event: Event, value: number | number[]) => {
    onChange(event, (value as number) * 1000);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        componentsProps={{
          input: {
            'data-testid': 'slider',
          } as React.InputHTMLAttributes<HTMLInputElement>,
        }}
        aria-label='Update time'
        defaultValue={5}
        valueLabelDisplay='auto'
        step={5}
        marks
        min={5}
        max={60}
        onChange={onChangeHandler}
      />
    </Box>
  );
}
