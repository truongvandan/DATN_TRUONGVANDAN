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
    Heading,
    Input,
    FormControl,
} from '@chakra-ui/react'
import { Formik, Form, Field } from 'formik'
import useSWR from 'swr'
import { fetcher } from '../../../services/fetcher'
import Layout from '../../../components/Layout'
import { useAuth } from '../../../hooks/useAuth'
import PageLoading from '../../../components/PageLoading'
import { PAGE_SIZE, NO_DATA_FOUND } from '../../../contants/app-config'
import { format } from 'date-fns'

function InjectionScheduleForAdmin() {
    const [session] = useAuth()
    const isloggedIn = !!session;
    const {profile} = session || {}
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState('')

    const { data, error, isLoading } = useSWR([`${import.meta.env.VITE_API_SERVER}/injections-management?page=${page}&limit=${PAGE_SIZE}&search=${searchText}`, {
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

    const onFilter = (values) => {
        setSearchText(values.search)
    }

    const hasData = Boolean(data?.length)

    return (
        <Layout>   
            <div className='p-8'>
                <Heading size='md' className='mb-6'>Danh sách đăng kí tiêm</Heading>

                {isloggedIn && profile.role === 'admin' && (
                    <>
                        <div className='filter-container py-6'>
                            <Formik
                                initialValues={
                                {search: searchText}
                                }
                                onSubmit={onFilter}
                            >
                            {(props) => (
                                <Form>
                                    <div className='flex gap-4'>
                                    <Field name='search'>
                                        {({ field, form }) => (
                                            <FormControl>
                                                <Input {...field} placeholder='Tìm kiếm theo email, số điện thoại' />
                                            </FormControl>
                                        )}
                                    </Field>
                                    
                                    <Button colorScheme='blue' type='submit' className='self-end'>Tìm kiếm</Button>
                                    </div>
                                </Form>
                                )}
                            </Formik>
                        </div>
                        
                        <TableContainer>
                            <Table variant='striped'>
                                <Thead>
                                    <Tr>
                                        <Th>Tên vắc xin</Th>
                                        <Th>Ngày tiêm</Th>
                                        <Th>Email</Th>
                                        <Th>Số điện thoại</Th>
                                    </Tr>

                                </Thead>
                                <Tbody>
                                    {!hasData && (
                                        <Tr>
                                            <Td colSpan="4">
                                                <div className='text-center'>{NO_DATA_FOUND}</div>
                                            </Td>
                                        </Tr>
                                    )}

                                    {hasData && data.map(data => (
                                        <Tr key={data.id}>
                                            <Td>{data.vaccineName}</Td>
                                            <Td>{format(new Date(data.injectionDay), 'yyyy-MM-dd')}</Td>
                                            <Td>{data.email}</Td>
                                            <Td>{data.phoneNumber}</Td>
                                        </Tr>
                                    ))}
                                </Tbody> 
                                <Tfoot>
                                    {hasData && (
                                        <Tr>
                                            <Td colSpan="4">
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
                    </>
                )}
            </div>
        </Layout>
    )
}

export default InjectionScheduleForAdmin 
