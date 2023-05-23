import React from 'react'
import {FormControl, FormLabel, Input, Button, FormErrorMessage, useToast} from '@chakra-ui/react'
import { Formik, Form, Field,  } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { postReq } from '@/services/http-request';
import DatePickerField from '@/components/DatePickerField'
import { MESSAGE } from '@/contants/message'
import { ROUTES } from '@/contants/router';
import { validateEmail, validatePassword, validatePhoneNumber, validateRequired } from '@/helpers/validation'

function Register() {
    const navigate = useNavigate();
    const toast = useToast()

    const doSubmit = async (values) => {
        try {
            await postReq('register', values);
            toast({
                description: MESSAGE.createAccountSuccess,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })      
            navigate(ROUTES.login)
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
        <div className='register-wrapper flex items-center justify-center h-full'>
            <div className='register-container w-96 p-8 shadow-md'>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        name: '',
                        phoneNumber: '',
                        birthday: '',
                        address: '',
                    }}
                    onSubmit={doSubmit}
                    >
                    {(props) => (
                        <Form>
                            <div className='flex flex-col gap-4'>
                                <Field name='email' validate={validateEmail}>
                                    {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.email && form.touched.email}>
                                        <FormLabel>Email</FormLabel>
                                        <Input {...field} />
                                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                    </FormControl>
                                    )}
                                </Field>
                                <Field name='name' validate={validateRequired}>
                                    {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                                        <FormLabel>Tên</FormLabel>
                                        <Input {...field} />
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                    </FormControl>
                                    )}
                                </Field>
                                <Field name='phoneNumber' validate={validatePhoneNumber}>
                                    {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.phoneNumber && form.touched.phoneNumber}>
                                        <FormLabel>Số điện thoại</FormLabel>
                                        <Input {...field}/>
                                        <FormErrorMessage>{form.errors.phoneNumber}</FormErrorMessage>
                                    </FormControl>
                                    )}
                                </Field>
                                <Field name='password' validate={validatePassword}>
                                    {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.password && form.touched.password}>
                                        <FormLabel>Mật khẩu</FormLabel>
                                        <Input {...field} type='password' />
                                        <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                    </FormControl>
                                    )}
                                </Field> 
                                <Field name='address'>
                                    {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.address && form.touched.address}>
                                        <FormLabel>Địa Chỉ</FormLabel>
                                        <Input {...field} type='address' />
                                        <FormErrorMessage>{form.errors.address}</FormErrorMessage>
                                    </FormControl>
                                    )}
                                </Field> 
                                <Field name='date'>
                                {({ field, form }) => (
                                <FormControl isInvalid={form.errors.date && form.touched.date}>
                                    <FormLabel>Ngày sinh</FormLabel>
                                    <DatePickerField {...field} type='date' />
                                    <FormErrorMessage>{form.errors.date}</FormErrorMessage>
                                </FormControl>
                                )}
                                </Field> 

                                <Button colorScheme='blue' type='submit'>Tạo tài khoản</Button>
                                <Link to={ROUTES.login} className='text-center'>
                                    Quay về trang Login
                                </Link>
            
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
      )
    }

export default Register