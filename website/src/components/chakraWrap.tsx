import React from "react";
import { PropsWithChildren } from "react";
import {
  ChakraProvider,
  ColorModeScript,
  extendTheme,
  ThemeConfig,
} from "@chakra-ui/react";

type ReactComponent<Props = {}> = React.FC<PropsWithChildren<Props>>;

const config: ThemeConfig = {
  useSystemColorMode: true,
};

const theme = extendTheme({ config });

export const ChakraWrap: ReactComponent = ({ children }) => {
  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      {children}
    </ChakraProvider>
  );
};
