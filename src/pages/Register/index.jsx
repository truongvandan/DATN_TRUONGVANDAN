import React from 'react'
import {FormControl, FormLabel, Input, Button, FormErrorMessage, useToast} from '@chakra-ui/react'
import { Formik, Form, Field,  } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { post } from '../../services/http-request';

import { EMAIL_REGEX } from '../../contants/regex'
import { MESSAGE } from '../../contants/message'

function Register() {
    const navigate = useNavigate();
    const toast = useToast()

    const doSubmit = async (values) => {
        try {
            await post('register', values);
            toast({
                description: MESSAGE.createAccountSuccess,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })      
            navigate('/login')
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

    function validateEmail(value) {
        let error
        if (!value) {
          error = MESSAGE.required
        } else if (!EMAIL_REGEX.test(value)) {
          error = MESSAGE.emailRegexInvalid
        }
        return error
    }

    function validatePassword(value) {
        let error;
        if (!value) {
            error = MESSAGE.required
        }
        return error
    }

    function validateName(value) {
        let error;
        if (!value) {
            error = MESSAGE.required
        }
        return error
    }

    function validatePhoneNumber(value) {
        let error;
        if (!value) {
            error = MESSAGE.required
        }
        return error
    }

    function validateConfirmPassword(value) {
        let error;
        if (!value) {
            error = MESSAGE.required
        }

        return error
    }

    return (
        <div className='register-wrapper flex items-center justify-center h-full'>
            <div className='register-container w-96 p-8 shadow-md'>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        confirmPassword: '',
                        name: '',
                        phoneNumber: '',
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
                                <Field name='name' validate={validateName}>
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
                                <Field name='confirmPassword' validate={validateConfirmPassword}>
                                    {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}>
                                        <FormLabel>Xác nhận mật khẩu</FormLabel>
                                        <Input {...field} type='password' />
                                        <FormErrorMessage>{form.errors.confirmPassword}</FormErrorMessage>
                                    </FormControl>
                                    )}
                                </Field>

                                <Button colorScheme='blue' type='submit'>Tạo tài khoản</Button>
                                <Link to="/login" className='text-center'>
                                    Qua về trang Login
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