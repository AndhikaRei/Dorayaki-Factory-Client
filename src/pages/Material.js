import React from 'react';
import {
    Text,
    Box,
    Center,
    Heading,
    Flex,
    Icon,
    Button,
    useColorMode
} from '@chakra-ui/react'
import { Container } from '../components/Container'
import { Header } from '../components/Header'
import { CgNotes } from "react-icons/cg";
import { FaShoppingBasket } from "react-icons/fa";
import { BsCardChecklist } from "react-icons/bs";
import { Link } from "react-router-dom"

const Material = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const isDark = colorMode === 'dark'
    return(
    <Container>
        <Header />
        <Box mt="50px" minH={"80vh"}>
            <Center mb="30px">
                <Heading fontSize="48px" textAlign={"center"}>Material Page</Heading>
            </Center>
        </Box>
    </Container>
    )
}
  
  export default Material