import React from 'react'
import { Box, Text, Card, CardBody, Stack, Image, Heading, useToast } from '@chakra-ui/react'
import useSWR from 'swr'
import Layout from '../../components/Layout'
import { fetcher } from '../../services/fetcher'
import { MESSAGE } from '../../contants/message'

function Home() {
  const toast = useToast()
  const { data, error, isLoading } = useSWR('http://localhost:3000/vacxins', fetcher)

  return (
    <Layout>
      <section className='container mx-auto'>
        <Heading size='md' className='my-4'>DANH MỤC VACCINES</Heading>
        <Box className='flex gap-4 flex-wrap'>
          {data?.map(item => (
            <Card key={item.id} className='w-[32%]'>
              <CardBody>
                <Image
                  // src={item.image}
                  src='/images/vx_1.jpg'
                  alt='vaccine'
                  borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                  <Heading size='md'>{item.name}</Heading>
                  <Text>
                    {item.description}
                  </Text>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </Box>
      </section>
    </Layout>
  )
}

export default Home
