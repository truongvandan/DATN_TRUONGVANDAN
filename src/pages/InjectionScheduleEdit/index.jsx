import React from 'react'
import { FormControl, FormLabel, Button, Input, FormErrorMessage, useToast } from '@chakra-ui/react'
import { Formik, Form, Field } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { MESSAGE } from '../../contants/message'
import useSWR from 'swr'
import { fetcher } from './../../services/fetcher'
import { useParams } from 'react-router-dom'
import DatePickerField from '../../components/DatepickerField'
import { ROUTES } from '../../contants/router'
import Layout from '../../components/Layout'
import { useAuth } from '../../hooks/useAuth'
import PageLoading from '../../components/PageLoading'
import { validateRequired } from '../../helpers/validation'
import { putReq } from './../../services/http-request'
import { format, addDays } from 'date-fns'

function InjectionScheduleEdit() {
    const { id } = useParams();
    const [session] = useAuth()
    const toast = useToast()
    const navigate = useNavigate()

    const { data, error, isLoading } = useSWR([`${import.meta.env.VITE_API_SERVER}/injections-register/${id}`, {
        headers: {
            Authorization: session.token
        }
    }], fetcher)

    if (isLoading) {
        return (
            <PageLoading></PageLoading>
        )
    }

    async function doSubmit(values) {
        try {
            const submitValue = {
                ...values,
                injectionDay: format(values.injectionDay, 'yyyy-MM-dd')
            } 

            await putReq(`injections-register/${id}`, submitValue)

            toast({
                description: MESSAGE.updateInjectionRegisterSuccess,
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
                        vaccineName: data.vaccineName,
                        injectionDay: new Date(data.injectionDay)
                    }}
                    onSubmit={doSubmit}
                >
                    {(props) => (
                        <Form>
                            <div className='flex flex-col gap-4'>
                                <Field name='vaccineName'>
                                    {({ field, form }) => (
                                    <FormControl>
                                        <FormLabel>Tên vắc xin</FormLabel>
                                        <Input {...field} disabled />
                                    </FormControl>
                                    )}
                                </Field>

                                <Field name='injectionDay' validate={validateRequired}>
                                    {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.injectionDay && form.touched.injectionDay}>
                                        <FormLabel>Thời gian</FormLabel>
                                        <DatePickerField {...field} minDate={minDate} maxDate={maxDate} />
                                        <FormErrorMessage>{form.errors.injectionDay}</FormErrorMessage>
                                    </FormControl>
                                    )}
                                </Field>

                                <Button colorScheme='blue' type='submit' className='self-end'>Lưu</Button>
                                
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </Layout>
    )
}

export default InjectionScheduleEdit
