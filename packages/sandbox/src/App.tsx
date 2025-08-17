import { Box, Stack } from 'reactjs-shared-ui';
import { Select, TextField } from 'reactjs-shared-ui/forms';
import { Code } from 'reactjs-shared-ui/syntax-highlighter';

function App() {
  return (
    <Box p={2}>
      <Stack spacing={1}>
        <TextField label="Name" />
        <Select options={[{ value: 1, label: 'Pizza' }]} />
        <Code type="content" code="Hello World" lang="bash" />
      </Stack>
    </Box>
  );
}

export default App;
