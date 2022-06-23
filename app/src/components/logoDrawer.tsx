import React, { useEffect, useState } from 'react';
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
  Textarea,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';

export const LogoDrawer: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const [doctorDetails, setDoctorDetails] = useState(
    localStorage.getItem('doctorDetails') || ''
  );

  useEffect(() => {
    localStorage.setItem('doctorDetails', doctorDetails);
  }, [doctorDetails]);

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
            <div className='mt-3'>
              <h2 className='mb-2 text-md font-medium'>Doctor Details</h2>
              <Textarea
                variant='filled'
                placeholder='Doctor details'
                value={doctorDetails}
                onChange={(e) => setDoctorDetails(e.target.value)}
              />
            </div>
          </DrawerBody>

          <DrawerFooter>
            <p>HeartBeat 0.1.0 beta</p>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
