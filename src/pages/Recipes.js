import React, {useState, useEffect} from 'react';
import {
    Box,
    Center,
    Heading,
    Flex,
    Button,
    useColorMode,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Spinner,
} from '@chakra-ui/react'
import { Container } from '../components/Container'
import { Header } from '../components/Header'
import { Link } from "react-router-dom"
import axios from "axios"
import Cookies from "js-cookie";

const RecipesTableItem = (props) => {
    const { colorMode } = useColorMode()
    const isDark = colorMode === 'dark'
    return (
        <Tr>
        <Td>{props.recipe.name}</Td>
        <Td>
            <Link to={`/recipe?id=${props.recipe.id}`}>
                <Button
                    as="a"
                    variant="ghost"
                    aria-label="Logout"
                    my={5}
                    w="100%"
                    bgColor={isDark?"#5C7AEA":"#14279B"}
                    color="white"
                    _hover={{color:"white"}}
                >
                    Detail
                </Button>
            </Link>
        </Td>
        </Tr>
    )
}

const Recipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        axios.request({
            method:'GET',
            url: `${process.env.REACT_APP_API_URL}recipes`,
            headers:{'auth-token':Cookies.get('user')},
            data:{}
        }).then(res => {
            const resRecipes = res.data;
            setRecipes(resRecipes);
            setIsLoading(false)
        })
            
    }, []);

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
                <Heading fontSize="48px" textAlign={"center"}  mb="30px">DoraYummy Recipes</Heading>
                <Link to={`/add-recipe`}>
                    <Button
                        as="a"
                        variant="ghost"
                        aria-label="Logout"
                        my={5}
                        w="100%"
                        bgColor={isDark?"#5C7AEA":"#14279B"}
                        color="white"
                        _hover={{color:"white"}}
                    >
                        Add Recipe
                    </Button>
                </Link>
            </Flex>
            <Center>
                <Table size="lg">
                    <Thead bgColor={isDark? "#5C7AEA" : "#14279B"} >
                        <Tr>
                        <Th color="white" textAlign={"center"}>Name</Th>
                        <Th color="white" textAlign={"center"}>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {recipes.map((recipe) => <RecipesTableItem key={recipe.id} recipe={recipe}/>)}
                    </Tbody>
                </Table>
            </Center>
        </Box>}
    </Container>
    )
}
  
  export default Recipes