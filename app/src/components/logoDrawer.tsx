import React from 'react';
import Logo from '../logo.svg';
import { MdOutlineDarkMode } from 'react-icons/md';
import { FiSun } from 'react-icons/fi';
import {
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';

export const LogoDrawer: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Avatar
        src={Logo}
        width='40px'
        height='40px'
        name='Heartbeat'
        className='hover:opacity-75 transition-all duration-200 border-none cursor-pointer'
        onClick={onOpen}
      />
      <Drawer isOpen={isOpen} onClose={onClose} placement='left' size='xs'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Settings</DrawerHeader>

          <DrawerBody>
            <Button onClick={toggleColorMode} width='full'>
              Toggle{' '}
              {colorMode === 'light' ? (
                <>
                  Dark <MdOutlineDarkMode className='ml-2' />
                </>
              ) : (
                <>
                  Light <FiSun className='ml-2' />
                </>
              )}
            </Button>
          </DrawerBody>

          <DrawerFooter>
            <p>HeartBeat 0.1.0 beta</p>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
