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

const Index = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const isDark = colorMode === 'dark'
    return(
    <Container>
        <Header />
        <Box mt="50px" minH={"80vh"}>
            <Center mb="30px">
                <Heading fontSize="48px" textAlign={"center"}>Welcome to DoraYummy Factory</Heading>
            </Center>
            <Flex flexDir={["column","column","row","row"]} justify={"space-around"} align={"center"}>
                <Box w={300} h={450} bgColor={isDark?"#5C7AEA":"#14279B"} p={10} borderRadius={"20px"} mr={["0px","0px","30px","30px"]} mb="30px">
                    <Flex flexDir={"column"} justifyContent={"space-between"} alignItems={"center"} h="100%">
                        <Flex flexDir={"column"} justifyContent={"center"} alignItems={"center"}>
                            <Icon as={CgNotes} w={24} h={24} mb="10px" color="white"/>
                            <Heading fontSize="28px" mb="10px" color="white">Recipe</Heading>
                            <Text mb="10px" color="white" textAlign={"center"} >Bagian ini digunakan untuk menampilkan daftar resep, membuat resep baru, dan menampilkan detail resep</Text>
                        </Flex>
                        
                        <Link to="/recipe">
                            <Button backgroundColor="#FFFFFF" color="#888888" border="1px solid #888888" _hover={{backgroundColor:"#3D56B2", color:"#FFFFFF", border:"1px solid #FFFFFF"}} _active={{backgroundColor:"#3D56B2", color:"#FFFFFF", border:"1px solid #FFFFFF"}}>
                                Kunjungi Sekarang
                            </Button>
                        </Link>
                    </Flex>
                </Box>
                <Box w={300} h={450}  bgColor={isDark?"#5C7AEA":"#14279B"} p={10} borderRadius={"20px"} mr={["0px","0px","30px","30px"]} mb="30px">
                    <Flex flexDir={"column"} justifyContent={"space-between"} alignItems={"center"} h="100%">
                        <Flex flexDir={"column"} justifyContent={"center"} alignItems={"center"}>
                            <Icon as={FaShoppingBasket} w={24} h={24} mb="10px" color="white"/>
                            <Heading fontSize="28px" mb="10px" color="white">Ingredients</Heading>
                            <Text mb="10px" color="white" textAlign={"center"} >Bagian ini digunakan untuk menampilkan daftar bahan baku, membuat bahan baku baru, dan menampilkan detail bahan baku</Text>
                        </Flex>
                        <Link to="/ingredients">
                            <Button backgroundColor="#FFFFFF" color="#888888" border="1px solid #888888" _hover={{backgroundColor:"#3D56B2", color:"#FFFFFF", border:"1px solid #FFFFFF"}} _active={{backgroundColor:"#3D56B2", color:"#FFFFFF", border:"1px solid #FFFFFF"}}>
                                Kunjungi Sekarang
                            </Button>
                        </Link>
                    </Flex>
                </Box>
                <Box w={300} h={450}  bgColor={isDark?"#5C7AEA":"#14279B"} p={10} borderRadius={"20px"} mr={["0px","0px","0px","0px"]} mb="30px">
                    <Flex flexDir={"column"} justifyContent={"space-between"} alignItems={"center"} h="100%">
                        <Flex flexDir={"column"} justifyContent={"center"} alignItems={"center"}>
                            <Icon as={BsCardChecklist} w={24} h={24} mb="10px" color="white"/>
                            <Heading fontSize="28px" mb="10px" color="white">Request</Heading>
                            <Text mb="10px" color="white" textAlign={"center"} >Bagian ini digunakan untuk menerima(accept) / menolak(decline) request</Text>
                        </Flex>
                        <Link to="/request">
                            <Button backgroundColor="#FFFFFF" color="#888888" border="1px solid #888888" _hover={{backgroundColor:"#3D56B2", color:"#FFFFFF", border:"1px solid #FFFFFF"}} _active={{backgroundColor:"#3D56B2", color:"#FFFFFF", border:"1px solid #FFFFFF"}}>
                                Kunjungi Sekarang
                            </Button>
                        </Link>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    </Container>
    )
}
  
  export default Index
  