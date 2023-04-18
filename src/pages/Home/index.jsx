import React, {Fragment, useState} from 'react'
import { FormControl, Input, Box, Text, Card, CardBody, Stack, Image, Heading, useToast, Button } from '@chakra-ui/react'
import { Formik, Form, Field } from 'formik'
import useSWR from 'swr'
import { Link } from 'react-router-dom'
import Layout from '@/components/Layout'
import { fetcher } from '@/services/fetcher'
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/contants/router'
import PageLoading from '@/components/PageLoading'
import { PAGE_SIZE, NO_DATA_FOUND } from '@/contants/app-config'

function Home() {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('')

  const { data, error, isLoading } = useSWR(`${import.meta.env.VITE_API_SERVER}/vaccines?page=${page}&limit=${PAGE_SIZE}&search=${searchText}`, fetcher)

  const [session] = useAuth()
  const isloggedIn = !!session;
  const {profile} = session || {};

  
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
      <section className='container mx-auto py-8'>
        <div className='flex justify-between'>
          <Heading size='md'>DANH MỤC VẮC XIN</Heading>

          {isloggedIn && profile.role === 'admin' && (
            <Link to={ROUTES.addVaccine}>
                <Button variant='outline' colorScheme='blue'>Thêm vắc xin</Button>
            </Link>
          )}
        </div>

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
                            <Input {...field} placeholder='Tìm kiếm theo tên bệnh, tên vắc xin' />
                          </FormControl>
                      )}
                    </Field>
                    
                    <Button colorScheme='blue' type='submit' className='self-end'>Tìm kiếm</Button>
                  </div>
                </Form>
              )}
          </Formik>
        </div>

        {!hasData && (
          <Text className='text-center'>{NO_DATA_FOUND}</Text>
        )}

        {
          hasData && (
            <>
              <Box className='flex gap-4 flex-wrap'>
                {data.map(item => (
                  <Card key={item.id} className='w-[32%]'>
                    <CardBody>
                      <Link to={`${ROUTES.detailVaccine}/${item.id}`}>
                        <Image
                          src={item.image}
                          alt='vaccine'
                          borderRadius='lg'
                        />
                        <Stack mt='6' spacing='3'>
                          <Text>
                            {item.name}
                          </Text>
                        </Stack>
                      </Link>
                    </CardBody>
                  </Card>
                ))}
              </Box>
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
            </>
          )
        }
      </section>
    </Layout>
  )
}

export default Home
