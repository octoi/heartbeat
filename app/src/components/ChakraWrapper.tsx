import React from 'react';
import { ReactComponent } from '../utils/types';
import {
  ChakraProvider,
  ColorModeScript,
  extendTheme,
  ThemeConfig,
} from '@chakra-ui/react';

const config: ThemeConfig = {
  useSystemColorMode: true,
};

const theme = extendTheme({ config });

export const ChakraWrapper: ReactComponent = ({ children }) => {
  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      {children}
    </ChakraProvider>
  );
};
