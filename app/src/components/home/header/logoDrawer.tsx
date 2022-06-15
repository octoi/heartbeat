import React from 'react';
import Logo from '../../../logo.svg';
import { Link } from 'react-router-dom';
import { MdOutlineDarkMode } from 'react-icons/md';
import { FiSun } from 'react-icons/fi';
import {
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
      <Link to='/'>
        <img
          src={Logo}
          alt='Heartbeat'
          className='w-12 h-12 hover:opacity-75 transition-all duration-200'
          onClick={onOpen}
        />
      </Link>
      <Drawer isOpen={isOpen} onClose={onClose} placement='left' size='xs'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Settings</DrawerHeader>

          <DrawerBody>
            <Button onClick={toggleColorMode}>
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
