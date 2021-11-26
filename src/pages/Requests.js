import React, {useState, useEffect} from 'react';
import {
    Box,
    Center,
    Heading,
    Flex,
    IconButton,
    useColorMode,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Spinner,
    HStack,
    useToast
} from '@chakra-ui/react'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { Container } from '../components/Container'
import { Header } from '../components/Header'
import axios from "axios"
import Cookies from "js-cookie";

const RequestsTableItem = (props) => {
    const toast = useToast();
    const [isLoadingAccept, setIsLoadingAccept] = useState(false)
    const [isLoadingDecline, setIsLoadingDecline] = useState(false)
    const [currentID, setCurrentID] = useState('')
    
    function acceptRecipe(){
        setCurrentID(props.request.id)
        setIsLoadingAccept(true)
        axios.request({
            method:'POST',
            url: `${process.env.REACT_APP_API_URL}requests/${props.request.id}/accept`,
            headers:{'auth-token':Cookies.get('user')},
            data:  {}
        }).then(res => {
            console.log(res);
            setCurrentID('')
            setIsLoadingAccept(false)
            props.refresh()
            toast({
                title: "Successfully to Accept Request",
                description: `Factory successfully accept request with ID = ${props.request.id}`,
                status: "success",
                position: "top",
                duration: 9000,
                isClosable: true,
              })
        }).catch((err)=>{
            setCurrentID('')
            setIsLoadingAccept(false)
            toast({
                title: "Failed to Accept Request",
                description: `${err.response.data.error}.`,
                status: "error",
                position: "top",
                duration: 9000,
                isClosable: true,
              })
        })
    }
    function declineRecipe(){
        setCurrentID(props.request.id)
        setIsLoadingDecline(true)
        axios.request({
            method:'POST',
            url: `${process.env.REACT_APP_API_URL}requests/${props.request.id}/decline`,
            headers:{'auth-token':Cookies.get('user')},
            data:  {}
        }).then(res => {
            console.log(res);
            setCurrentID('')
            setIsLoadingDecline(false)
            toast({
                title: "Successfully to Decline Request",
                description: `Factory successfully accept request with ID = ${props.request.id}`,
                status: "success",
                position: "top",
                duration: 9000,
                isClosable: true,
              })
            props.refresh()
        }).catch((err)=>{
            setCurrentID('')
            setIsLoadingDecline(false)
            toast({
                title: "Failed to Accept Request",
                description: `${err.response.data.error}.`,
                status: "error",
                position: "top",
                duration: 9000,
                isClosable: true,
              })
        })
    }

    return (
        <Tr>
        <Td>{props.request.ip}</Td>
        <Td>{props.request.dorayaki}</Td>
        <Td>{props.request.count}</Td>
        <Td>{props.request.status}</Td>
        <Td>
            {props.request.status ==="pending" && 
            <HStack>
                <IconButton
                disabled={(isLoadingAccept || isLoadingDecline) && (currentID===props.request.id)}
                isLoading={isLoadingAccept && (currentID===props.request.id)}
                colorScheme="green"
                aria-label="accept request"
                icon={<CheckIcon />}
                onClick={acceptRecipe}
                />
                <IconButton
                disabled={(isLoadingAccept || isLoadingDecline) && (currentID===props.request.id)}
                isLoading={isLoadingDecline && (currentID===props.request.id)}
                colorScheme="red"
                aria-label="decline request"
                icon={<CloseIcon />}
                onClick={declineRecipe}
                />
            </HStack>}
        </Td>
        </Tr>
    )
}

const Request= () => {
    const [refreshTable, setRefreshTable] = useState(true)
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        axios.request({
            method:'GET',
            url: `${process.env.REACT_APP_API_URL}requests`,
            headers:{'auth-token':Cookies.get('user')},
            data:{}
        }).then(res => {
            const resRequests = res.data;
            setRequests(resRequests);
            setIsLoading(false)
        })
            
    }, [refreshTable]);

    function refresh(){
        setRefreshTable(!refreshTable);
    }

    const { colorMode } = useColorMode()
    const isDark = colorMode === 'dark'
    return(
    <Container>
        <Header />
        {isLoading &&
        <Center width="100vw" height="100vh" bg="transparent">
        <Spinner
            thickness="5px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
        />
        </Center>}
        {!isLoading &&
        <Box mt="50px" minH={"80vh"} maxW={"80vw"}>
            <Flex flexDir={"column"} justifyContent={"center"} alignItems={"center"}>
                <Heading fontSize="48px" textAlign={"center"}  mb="30px">DoraYummy Requests</Heading>
            </Flex>
            <Center>
                <Table size="lg">
                    <Thead bgColor={isDark? "#5C7AEA" : "#14279B"} >
                        <Tr>
                        <Th color="white" textAlign={"center"}>IP</Th>
                        <Th color="white" textAlign={"center"}>Dorayaki</Th>
                        <Th color="white" textAlign={"center"}>Amount</Th>
                        <Th color="white" textAlign={"center"}>Status</Th>
                        <Th color="white" textAlign={"center"}>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {requests.map((request) => <RequestsTableItem key={request.id} request={request} refresh={refresh} />)}
                    </Tbody>
                </Table>
            </Center>
        </Box>}
    </Container>
    )
}
  
  export default Request