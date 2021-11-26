import React, {useState} from 'react';
import {
    Text,
    Box,
    Center,
    Heading,
    Flex,
    Icon,
    Stack,
    InputGroup,
    InputLeftAddon,
    Input,
    Switch,
    useColorMode,
    Spinner,
    useToast,
    Button,
    Link as LinkCh
} from '@chakra-ui/react'
import { Container } from '../components/Container'
import { BsPersonFill } from "react-icons/bs";
import axios from "axios"
import { Link } from "react-router-dom"

const Register= () => {
    const toast = useToast();
    const { colorMode, toggleColorMode } = useColorMode()
    const isDark = colorMode === 'dark'
    const [ email, setEmail ] = useState('')
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)

    function register(){
        setIsLoading(false)
        axios.request({
            method:'POST',
            url: `${process.env.REACT_APP_API_URL}auth/register`,
            headers:{},
            data:  {
                email : email,
                username : username,
                password : password
            }
        }).then(res => {
            setIsLoading(false)
            toast({
                title: "Successfully Register Account",
                status: "success",
                position: "top",
                duration: 9000,
                isClosable: true,
            })
        }).catch((err)=>{
            setIsLoading(false)
            toast({
                title: "Failed to Register Account",
                description: `${err.response.data.error}.`,
                status: "error",
                position: "top",
                duration: 9000,
                isClosable: true,
            })
        })
    }

    return(
    <Container>
        <Box minH={"100vh"}>
            <Flex justifyContent="center" alignItems="center" w="100vw" h="100vh" flexDir={"column"}>
                {isLoading && 
                <Center w="100vw" h="100vh" bg="black" zIndex={3} position={"absolute"} opacity={0.8}>
                    <Spinner
                        thickness="5px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                    />
                </Center>}
                <Center mb="20px">
                    <Switch
                    colorScheme="blue"
                    isChecked={isDark}
                    onChange={toggleColorMode}
                    />
                </Center>
                <Box borderRadius="20px" boxShadow="md" h="480px" w="500px">
                    <Center borderTopRightRadius="20px" borderTopLeftRadius="20px" h="100px" bgColor={"#14279B"} color="white">
                        <Icon as={BsPersonFill} w={12} h={12} color="white" mr="10px"/>
                        <Heading>Register</Heading>
                    </Center>
                    <Flex mt="50px" flexDir={"column"} alignItems="center" justifyContent="center">
                        <Stack spacing={4} width="450px">
                            <InputGroup >
                                <InputLeftAddon children="Email" w="120px" bgColor={"#5C7AEA"} height="50px" color="white"/>
                                <Input value={email} onChange={(val)=>setEmail(val.target.value)} type="email" placeholder="Enter email here" height="50px" />
                            </InputGroup>
                            <InputGroup >
                                <InputLeftAddon children="Username" w="120px" bgColor={"#5C7AEA"} height="50px" color="white"/>
                                <Input value={username} onChange={(val)=>setUsername(val.target.value)} type="text" placeholder="Enter username here" height="50px" />
                            </InputGroup>
                            <InputGroup >
                                <InputLeftAddon children="Password" w="120px" bgColor={"#5C7AEA"} height="50px" color="white"/>
                                <Input value={password} onChange={(val)=>setPassword(val.target.value)}  type="password" placeholder="Enter password here" height="50px"/>
                            </InputGroup>
                        </Stack>
                        <Button backgroundColor="#3D56B2" color="white" border="1px solid #888888" width="100px" mt="20px" onClick={register}>
                            Register
                        </Button>
                        <Center mt="20px">
                            <Text >Sudah punya akun? <Link to="/login"><LinkCh color={isDark?"#5C7AEA":"#14279B"}>Login</LinkCh></Link></Text>
                        </Center>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    </Container>
    )
}
  
  export default Register