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
    chakra,
    Spinner,
    HStack,
    useToast
} from '@chakra-ui/react'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { Container } from '../components/Container'
import { Header } from '../components/Header'
import axios from "axios"
import Cookies from "js-cookie";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"
import { useTable, useSortBy } from "react-table"

const DataTable = (props) => {
    const toast = useToast();
    const [isLoadingAccept, setIsLoadingAccept] = useState(false)
    const [isLoadingDecline, setIsLoadingDecline] = useState(false)
    const [currentID, setCurrentID] = useState('')
    
    function acceptRecipe(id){
        setCurrentID(id)
        setIsLoadingAccept(true)
        axios.request({
            method:'POST',
            url: `${process.env.REACT_APP_API_URL}requests/${id}/accept`,
            headers:{'auth-token':Cookies.get('user')},
            data:  {}
        }).then(res => {
            console.log(res);
            setCurrentID('')
            setIsLoadingAccept(false)
            props.refresh()
            toast({
                title: "Successfully to Accept Request",
                description: `Factory successfully accept request with ID = ${id}`,
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
    function declineRecipe(id){
        setCurrentID(id)
        setIsLoadingDecline(true)
        axios.request({
            method:'POST',
            url: `${process.env.REACT_APP_API_URL}requests/${id}/decline`,
            headers:{'auth-token':Cookies.get('user')},
            data:  {}
        }).then(res => {
            console.log(res);
            setCurrentID('')
            setIsLoadingDecline(false)
            toast({
                title: "Successfully to Decline Request",
                description: `Factory successfully decline request with ID = ${id}`,
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
                title: "Failed to Decline Request",
                description: `${err.response.data.error}.`,
                status: "error",
                position: "top",
                duration: 9000,
                isClosable: true,
              })
        })
    }

    const data = React.useMemo(() => props.request_data, [props.request_data])
  
    const columns = React.useMemo(
      () => [
        {
          Header: "IP",
          accessor: "ip",
        },
        {
          Header: "Dorayaki",
          accessor: "dorayaki",
        },
        {
          Header: "Amount",
          accessor: "count",
          isNumeric: true
        },
        {
            Header: "Status",
            accessor: "status",
        },
        {
            Header: "Created Time",
            accessor: "createdAt",
            isDate : true
        },
      ],
      [],
    )
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({ columns, data }, useSortBy)

    const { colorMode } = useColorMode()
    const isDark = colorMode === 'dark'

    return (
    <Table {...getTableProps()} size="lg">
        <Thead bgColor={isDark? "#5C7AEA" : "#14279B"}>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()} >
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  isNumeric={column.isNumeric}
                  color="white" textAlign={"center"}
                >
                  {column.render("Header")}
                  <chakra.span pl="4">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              ))}
              <Th color="white" textAlign={"center"}>Action</Th>
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <Tr {...row.getRowProps()} >
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                    {cell.render("Cell")}
                  </Td>
                ))}
                <Td>
                    {row.original.status ==="pending" && 
                    <HStack>
                        <IconButton
                        disabled={(isLoadingAccept || isLoadingDecline) && (currentID===row.original.id)}
                        isLoading={isLoadingAccept && (currentID===row.original.id)}
                        colorScheme="green"
                        aria-label="accept request"
                        icon={<CheckIcon />}
                        onClick={()=>acceptRecipe(row.original.id)}
                        />
                        <IconButton
                        disabled={(isLoadingAccept || isLoadingDecline) && (currentID===row.original.id)}
                        isLoading={isLoadingDecline && (currentID===row.original.id)}
                        colorScheme="red"
                        aria-label="decline request"
                        icon={<CloseIcon />}
                        onClick={()=>declineRecipe(row.original.id)}
                        />
                    </HStack>}
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
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
                <DataTable request_data={requests} refresh={refresh}/>
            </Center>
        </Box>}
    </Container>
    )
}
  
  export default Request