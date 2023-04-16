import React from 'react'
import { Spinner, Flex, Center } from '@chakra-ui/react'
import Layout from '@/components/Layout'

const PageLoading = () => {
    return (
        <Layout> 
            <Flex className='h-full'>
                <Center className='flex-1'>
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'/>
                </Center>
            </Flex>
        </Layout>
    )
}

export default PageLoading


