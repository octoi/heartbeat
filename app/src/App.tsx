import { Button, useColorMode } from '@chakra-ui/react';

export default function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div className='App'>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
    </div>
  );
}
