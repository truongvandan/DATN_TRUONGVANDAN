import React, { useRef, useState } from 'react'
import { FormControl, FormLabel, Input, Button, FormErrorMessage, useToast, Heading } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'

import { postReq } from '@/services/http-request';
import { useAuth } from '@/hooks/useAuth'
import { ROUTES } from '@/contants/router'
import { validateEmail, validateRequired } from '@/helpers/validation'

function Login() {
    const navigate = useNavigate();
    const toast = useToast()
    const [session, setSession] = useAuth();

    async function doSubmit(values) {
        try {
            const response = await postReq('login', values);
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
    
    return (
        <div className='login-wrapper flex items-center justify-center h-full'>
            <div className='login-container w-96 p-8 shadow-md'>
                <div className='top-bar'></div>
                <Heading size='lg' className='text-center mb-6'>Đăng nhập</Heading>
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
                                <Field name='password' validate={validateRequired}>
                                    {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.password && form.touched.password}>
                                        <FormLabel>Mật khẩu</FormLabel>
                                        <Input {...field} type='password' />
                                        <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                    </FormControl>
                                    )}
                                </Field>

                                <Button colorScheme='blue' type='submit'>Đăng nhập</Button>
                                <Link to={ROUTES.register}>
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
