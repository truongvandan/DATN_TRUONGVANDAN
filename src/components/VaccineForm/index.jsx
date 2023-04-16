import React from 'react'
import { FormControl, FormLabel, Input, Button, FormErrorMessage, Textarea, Select } from '@chakra-ui/react'
import { Formik, Form, Field } from 'formik'
import useSWR from 'swr'
import { fetcher } from './../../services/fetcher'
import PageLoading from '../PageLoading'
import { validateRequired, validatePrice } from '../../helpers/validation'
import { useAuth } from '../../hooks/useAuth';

import {
    NumberInput,
    NumberInputField,
  } from '@chakra-ui/react'

function VaccineForm({initialValues, onSubmit}) {
    const [session] = useAuth()

    const { data } = useSWR([`${import.meta.env.VITE_API_SERVER}/disease-types`, {
        headers: {
            Authorization: session.token
        }
    }], fetcher)


    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            {(props) => (
                <Form>
                    <div className='flex flex-col gap-4'>
                        <Field name='diseaseTypeId' validate={validateRequired}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.diseaseTypeId && form.touched.diseaseTypeId}>
                                    <FormLabel>Loại bệnh</FormLabel>
                                    <Select {...field} placeholder='--- Chọn loại bệnh ---'>
                                        {data?.map(item => (
                                            <option value={item.id} key={item.id}>{item.name}</option>
                                        ))}
                                    </Select>
                                    <FormErrorMessage>{form.errors.diseaseTypeId}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>

                        <Field name='name' validate={validateRequired}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.name && form.touched.name}>
                                    <FormLabel>Tên vắc xin</FormLabel>
                                    <Input {...field} />
                                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name='description' validate={validateRequired}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.description && form.touched.description}>
                                    <FormLabel>Mô tả</FormLabel>
                                    <Textarea {...field} />
                                    <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name='object' validate={validateRequired}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.object && form.touched.object}>
                                    <FormLabel>Đối tượng</FormLabel>
                                    <Textarea {...field} />
                                    <FormErrorMessage>{form.errors.object}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name='regimen' validate={validateRequired}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.regimen && form.touched.regimen}>
                                    <FormLabel>Phác đồ tiêm</FormLabel>
                                    <Textarea {...field} />
                                    <FormErrorMessage>{form.errors.regimen}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name='price' validate={validatePrice}>
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.price && form.touched.price}>
                                    <FormLabel>Gía tiền (VNĐ)</FormLabel>
                                    <NumberInput {...field}>
                                        <NumberInputField {...field} />
                                    </NumberInput>
                                    <FormErrorMessage>{form.errors.price}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>

                        <Button colorScheme='blue' type='submit' className='self-end'>Lưu</Button>
                        
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default VaccineForm
