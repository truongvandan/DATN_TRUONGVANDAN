import React from 'react'
import {FormControl, FormLabel, Button, FormErrorMessage, useToast, Select, FormHelperText} from '@chakra-ui/react'
import { Formik, Form, Field,  } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { postReq } from '../../services/http-request';
import useSWR from 'swr'
import { fetcher } from '../../services/fetcher'
import { MESSAGE } from '../../contants/message'
import { ROUTES } from '../../contants/router';
import DatePickerField from '../../components/DatepickerField'
import Layout from '../../components/Layout'
import { format, addDays } from 'date-fns'
import { validateRequired } from '../../helpers/validation'
import PageLoading from '../../components/PageLoading'

function injectioRegister() {
    const navigate = useNavigate()
    const toast = useToast()

    const { data, error, isLoading } = useSWR(`${import.meta.env.VITE_API_SERVER}/vaccines`, fetcher)

    if (isLoading) {
        return (
            <PageLoading></PageLoading>
        )
    }

    const doSubmit = async (values) => {
        const submitValue = {
            ...values,
            injectionDay: format(values.injectionDay, 'yyyy-MM-dd')
        } 
        try {
            await postReq('injections-register', submitValue);
            toast({
                description: MESSAGE.injectionRegisterSuccess,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })
            navigate(ROUTES.injectionSchedule)      
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

    // Enable set date from today to next 10 days
    const minDate = new Date()
    const maxDate = addDays(minDate, 10)

    return (
        <Layout>   
            <div className='p-8'>
            <Formik
                initialValues={{
                    vaccineId: '',
                    injectionDay: new Date(),
                }}
                onSubmit={doSubmit}
                >
                {(props) => (
                    <Form>
                        <div className='flex flex-col gap-4'>
                            <Field name='vaccineId' validate={validateRequired}>
                                {({ field, form }) => (
                                <FormControl isInvalid={form.errors.vaccineId && form.touched.vaccineId}>
                                    <FormLabel>Chọn vắc xin</FormLabel>
                                    <Select {...field} placeholder='-- Chọn vắc xin --'>
                                        {data?.map(item => (
                                            <option value={item.id} key={item.id}>{item.name}</option>
                                        ))}
                                    </Select>
                                    <FormErrorMessage>{form.errors.vaccineId}</FormErrorMessage>
                                </FormControl>
                                )}
                            </Field>
                            <Field name='injectionDay' validate={validateRequired}>
                                {({ field, form }) => (
                                <FormControl isInvalid={form.errors.injectionDay && form.touched.injectionDay}>
                                    <FormLabel>Thời gian</FormLabel>
                                    <DatePickerField {...field} minDate={minDate} maxDate={maxDate} />
                                    <FormErrorMessage>{form.errors.injectionDay}</FormErrorMessage>
                                    <FormHelperText>Chỉ đăng kí trong vòng 10 ngày</FormHelperText>
                                </FormControl>
                                )}
                            </Field>

                            <Button colorScheme='blue' type='submit' className='self-end'>Đăng ký tiêm</Button>
                        </div>
                    </Form>
                )}
                </Formik>
            </div>
        </Layout>
    )
}

export default injectioRegister