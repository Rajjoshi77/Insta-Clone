import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Alert, AlertIcon, AlertTitle, Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React, { useState } from 'react'
import useSignUpWithEmailAndPassword from '../../hooks/useSignUpWithEmailAndPassword';

const Signup = () => {
    const [inputs, setInputs] = useState({
        fullName: '',
        userName: '',
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const { loading, error, signup } = useSignUpWithEmailAndPassword();
    return (
        <>
            <Input
                placeholder='Email'
                fontSize={14}
                type='email'
                size={'sm'}
                value={inputs.email}
                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />

            <Input
                placeholder='Username'
                fontSize={14}
                type='text'
                size={'sm'}
                value={inputs.userName}
                onChange={(e) => setInputs({ ...inputs, userName: e.target.value })}
            />

            <Input
                placeholder='FullName'
                fontSize={14}
                type='text'
                size={'sm'}
                value={inputs.fullName}
                onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
            />

            <InputGroup>
                <Input
                    placeholder='password'
                    fontSize={14}
                    type={showPassword ? "text" : "password"}
                    value={inputs.password}
                    size={'sm'}
                    onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                />

                <InputRightElement h={'full'}>
                    <Button variant={'ghost'} size={'sm'} onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>

                </InputRightElement>
            </InputGroup>

            {
                error && (
                    <Alert status='error' fontSize={13} p={2} borderRadius={4}>
                        <AlertIcon fontSize={12} />
                        {error.message}
                    </Alert>
                )
            }

            <Button w={'full'} colorScheme='blue' size={'sm'} fontSize={14} isLoading={loading} onClick={() => signup(inputs)}>
                Sign up
            </Button>
        </>
    )
}

export default Signup
