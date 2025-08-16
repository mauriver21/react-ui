import { Box, Stack } from 'reactjs-shared-ui';
import { Select, TextField } from 'reactjs-shared-ui/forms';

function App() {
  return (
    <Box p={2}>
      <Stack spacing={1}>
        <TextField label="Name" />
        <Select options={[{ value: 1, label: 'Pizza' }]} />
      </Stack>
    </Box>
  );
}

export default App;
