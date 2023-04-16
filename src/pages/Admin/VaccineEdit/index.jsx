import React from 'react'
import { Box, Heading, useToast } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import useSWR from 'swr'
import { fetcher } from '@/services/fetcher'
import { putReq } from '@/services/http-request';
import { MESSAGE } from '@/contants/message'
import Layout from '@/components/Layout'
import { ROUTES } from '@/contants/router'
import VaccineForm from '@/components/VaccineForm'
import { useAuth } from '@/hooks/useAuth'
import PageLoading from '@/components/PageLoading'

function VaccineEdit() {
    const navigate = useNavigate();
    const toast = useToast()
    const { id } = useParams();
    const [session] = useAuth();
    const { data, error, isLoading } = useSWR(`${import.meta.env.VITE_API_SERVER}/vaccines/${id}`, fetcher)

    if (isLoading) {
        return (
            <PageLoading></PageLoading>
        )
    }

    async function doSubmit(values) {
        try {
            await putReq(`vaccines/${id}`, values)

            toast({
                description: MESSAGE.updateVaccineSuccess,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })

            navigate(ROUTES.listVaccines)
        } catch (error) {
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
            <Box p={8}>
                <Heading size='md' className='mb-6'>Chỉnh sửa thông tin vắc xin</Heading>

                <VaccineForm initialValues={data} onSubmit={doSubmit}/>
            </Box>
        </Layout>
    )
}

export default VaccineEdit
