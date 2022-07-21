import React from 'react';
import { LogoDrawer } from '../logoDrawer';
import { CgClose } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  Heading,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';

interface Props {
  title: string;
}

export const Header: React.FC<Props> = ({ title }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef() as React.MutableRefObject<any>;

  const redirect = () => navigate('/', { replace: true });

  return (
    <Flex alignItems='center' justifyContent='space-between'>
      <Flex alignItems='center'>
        <LogoDrawer />
        <Heading className='text-2xl font-semibold' ml={3}>
          {title}
        </Heading>
      </Flex>
      <IconButton
        aria-label='close'
        icon={<CgClose />}
        colorScheme='red'
        size='md'
        onClick={onOpen}
      />
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Are you sure ?
            </AlertDialogHeader>

            <AlertDialogBody>Do you want to close this page.</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={redirect} ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
};
