import React, { useRef, useState } from 'react'
import {FormControl, FormLabel, Input, Button, FormErrorMessage, useToast} from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'

import { post } from '../../services/http-request';
import { EMAIL_REGEX } from '../../contants/regex'
import { MESSAGE } from '../../contants/message'
import { useAuth } from '../../hooks/useAuth';

function Login() {
    const navigate = useNavigate();
    const toast = useToast()
    const [session, setSession] = useAuth();

    async function doSubmit(values) {
        try {
            const response = await post('login', values);
            setSession(response);
            navigate('/')
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
    
    return (
        <div className='login-wrapper flex items-center justify-center h-full'>
            <div className='login-container w-96 p-8 shadow-md'>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
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
                            <Field name='password' validate={validatePassword}>
                                {({ field, form }) => (
                                <FormControl isInvalid={form.errors.password && form.touched.password}>
                                    <FormLabel>Mật khẩu</FormLabel>
                                    <Input {...field} type='password' />
                                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                </FormControl>
                                )}
                            </Field>

                            <Button colorScheme='blue' type='submit'>Đăng nhập</Button>
                            <Link to="/register">
                                <Button colorScheme='blue' variant='outline' className="w-full">Tạo tài khoản</Button>
                            </Link>
                            </div>
                    </Form>
                )}
                </Formik>
            </div>
        </div>
    )
}

export default Login
