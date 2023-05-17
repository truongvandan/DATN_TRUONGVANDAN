import React, {Fragment, useState} from 'react'
import {    
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
    useToast,
    Heading,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
} from '@chakra-ui/react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useSWR from 'swr'
import { fetcher } from '@/services/fetcher'
import Layout from '@/components/Layout'
import { useAuth } from '@/hooks/useAuth'
import { deleteReq } from '@/services/http-request'
import { MESSAGE } from '@/contants/message'
import { format } from 'date-fns'
import { ROUTES } from '@/contants/router'
import PageLoading from '@/components/PageLoading'
import { PAGE_SIZE, NO_DATA_FOUND } from '@/contants/app-config'

function InjectionSchedule() {
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const [session] = useAuth()
    const [page, setPage] = useState(1);

    const [selectedId, setSelectedId] = useState(null)

    const { data, mutate, error, isLoading } = useSWR([`${import.meta.env.VITE_API_SERVER}/injections-register?page=${page}&limit=${PAGE_SIZE}`, {
        headers: {
            Authorization: session.token
        }
    }], fetcher)

    if (isLoading) {
        return (
            <PageLoading></PageLoading>
        )
    }

    const handlePreviousPage = () => {
        let newPage = page - 1
    
        if (newPage < 1) {
          newPage = 1
        }
    
        setPage(newPage)
    }

    const handleNextPage = () => {
        const newPage = page + 1

        setPage(newPage)
    }

    const cancel = async () => {
        try {
            await deleteReq(`injections-register/${selectedId}`);
            mutate(
                data.filter(i => i.id !== selectedId),
                { revalidate: false }
            )

            toast({
                description: MESSAGE.removeInjectionRegisterSuccess,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })
        } catch (error) {
            toast({
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })      
        }
        onClose() 
    }

    const cancelSchedule = (id) => {
        setSelectedId(id)
        onOpen()
    }

    const hasData = Boolean(data?.length)

    return (
        <Layout>   
            <div className='p-8'>
                <Heading size='md' className='mb-6'>Lịch sử đăng kí tiêm</Heading>
                <TableContainer>
                    <Table variant='striped'>
                        <Thead>
                            <Tr>
                                <Th>Tên vắc xin</Th>
                                <Th>Ngày tiêm</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {!hasData && (
                                <Tr>
                                    <Td colSpan="3">
                                        <div className='text-center'>{NO_DATA_FOUND}</div>
                                    </Td>
                                </Tr>
                            )}

                            {hasData && data.map(data => (
                                <Tr key={data.id}>
                                    <Td>{data.vaccineName}</Td>
                                    <Td>{format(new Date(data.injectionDay), 'yyyy-MM-dd')}</Td>
                                    <Td className='text-right'>
                                        <Link to={`${ROUTES.injectionScheduleEdit}/${data.id}`}><Button colorScheme='blue' variant='outline'>Chỉnh sửa</Button></Link>
                                        <Button colorScheme='red' onClick={() => cancelSchedule(data.id)} className='ml-4'>Hủy</Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody> 
                        <Tfoot>
                            {hasData && (
                                <Tr>
                                    <Td colSpan="3">
                                        <div className='pagination mt-5 text-end'>
                                            <Button
                                                onClick={handlePreviousPage}
                                                colorScheme='blue'
                                                variant='link'
                                                verticalAlign="bottom"
                                                isLoading={page === 1}
                                                loadingText="Trang trước"
                                                spinner={<Fragment />}
                                            >Trang trước</Button>
                                            
                                            <Button
                                                onClick={handleNextPage}
                                                colorScheme='blue'
                                                variant='link'
                                                verticalAlign="bottom"
                                                isLoading={(data || []).length < PAGE_SIZE}
                                                className='ml-4'
                                                loadingText="Trang sau"
                                                spinner={<Fragment />}
                                            >Trang sau</Button>
                                        </div>
                                    </Td>
                                </Tr>
                            )}
                        </Tfoot>
                    </Table>
                </TableContainer>

                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                >
                    <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>Hủy lịch sử tiêm</AlertDialogHeader>
                        <AlertDialogBody>
                            Thông tin không thể khôi phục sau khi bạn xóa, bạn chắc chắn muốn xóa?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Bỏ qua
                            </Button>
                            <Button colorScheme='red' onClick={cancel} ml={3}>
                                Xóa
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </div>
        </Layout>
    )
}

export default InjectionSchedule 
