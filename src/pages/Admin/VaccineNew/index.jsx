import React from 'react'
import { Box, useToast, Heading } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { MESSAGE } from '@/contants/message'
import Layout from '@/components/Layout'
import { ROUTES } from '@/contants/router'
import VaccineForm from '@/components/VaccineForm'
import { postReq } from '@/services/http-request'

function VaccineEdit() {
    const navigate = useNavigate();
    const toast = useToast()

    const data = {
        name: '',
        description: '',
        image: '',
        object: '',
        price: 0,
        regimen: '',
        diseaseTypeId: '',
    }

    async function doSubmit(values) {
        try {
            await postReq('vaccines', values)

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
                <Heading size='md' className='mb-6'>Thêm mới vắc xin</Heading>
                <VaccineForm initialValues={data} onSubmit={doSubmit}/>
            </Box>
        </Layout>
    )
}

export default VaccineEdit
