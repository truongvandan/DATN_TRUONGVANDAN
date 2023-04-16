import React from 'react'
import { 
    useToast, 
    Image, 
    Heading, 
    Stack, 
    StackDivider, 
    Box, 
    Text, 
    HStack, 
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure 
} from '@chakra-ui/react'
import {
    Link, 
    useNavigate, 
    useParams
} from 'react-router-dom'
import useSWR from 'swr'
import { MESSAGE } from '../../../contants/message'
import Layout from '../../../components/Layout'
import { fetcher } from '../../../services/fetcher'
import { useAuth } from '../../../hooks/useAuth';
import { ROUTES } from '../../../contants/router'
import { deleteReq } from '../../../services/http-request'
import PageLoading from '../../../components/PageLoading'

function VaccineDetail() {
    const navigate = useNavigate();
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    const [session] = useAuth()
    const isloggedIn = !!session;
    const {profile} = session || {};

    // Get the userId param from the URL.
    let { id } = useParams();
    const { data, error, isLoading } = useSWR(`${import.meta.env.VITE_API_SERVER}/vaccines/${id}`, fetcher)

    if (isLoading) {
        return (
            <PageLoading></PageLoading>
        )
    }

    async function doDelete() {
        try {
            await deleteReq(`vaccines/${id}`)
            toast({
                description: MESSAGE.deleteVaccineSuccess,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })      
            navigate(ROUTES.listVaccines)
        } catch(err) {
            toast({
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })
        }
    }

    return (
        <Layout>   
            <div className='p-8'>
                {isloggedIn && profile.role === 'admin' && (
                    <HStack spacing='24px' className='mb-6 justify-end'>
                        <Link to={`${ROUTES.updateVaccine}/${data?.id}`}>
                            <Button colorScheme='blue' variant='outline' className="w-full">Cập nhật thông tin</Button>
                        </Link>
                        <Button colorScheme='red' onClick={onOpen}>Xóa</Button>

                        <AlertDialog
                            isOpen={isOpen}
                            leastDestructiveRef={cancelRef}
                            onClose={onClose}
                        >
                            <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader fontSize='lg' fontWeight='bold'>Xóa thông tin Vắc xin</AlertDialogHeader>
                                <AlertDialogBody>
                                    Thông tin không thể khôi phục sau khi bạn xóa, bạn chắc chắn muốn xóa?
                                </AlertDialogBody>
                                <AlertDialogFooter>
                                    <Button ref={cancelRef} onClick={onClose}>
                                        Bỏ qua
                                    </Button>
                                    <Button colorScheme='red' onClick={doDelete} ml={3}>
                                        Xóa
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                            </AlertDialogOverlay>
                        </AlertDialog>
                    </HStack>
                )}

                <Heading size='md'>{data?.name}</Heading>
                    
                <HStack spacing='24px' className='mb-8'>
                    <Box w='300px' h='auto' className='flex'>
                        <Image
                            // src={item.image}
                            src='/images/vx_1.jpg'
                            alt='vaccine'
                            borderRadius='lg'
                        />
                    </Box>
                </HStack>

                <Stack divider={<StackDivider />} spacing='4'>
                    <Box>
                        <Heading size='md'>1. Thông tin vắc xin</Heading>
                        <Text pt='2' fontSize='sm'>{data?.description}</Text>
                    </Box>
                    <Box>
                        <Heading size='md'>2. Đối tượng</Heading>
                        <Text pt='2' fontSize='sm'>{data?.object}</Text>
                    </Box>
                    <Box>
                        <Heading size='md'>3. Phác đồ, lịch tiêm</Heading>
                        <Text pt='2' fontSize='sm'>{data?.regimen}</Text>
                    </Box>
                    <Box>
                        <Heading size='md'>4. Bảng giá</Heading>
                        <Text pt='2' fontSize='sm'>Giá tham khảo {data?.price} VND</Text>
                    </Box>
                </Stack>
            </div>
        </Layout>
    )
}

export default VaccineDetail
