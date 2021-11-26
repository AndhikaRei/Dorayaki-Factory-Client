import React, {useState, useEffect} from 'react';
import {
    Text,
    Box,
    Center,
    Heading,
    Flex,
    useColorMode,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td, 
    Spinner
} from '@chakra-ui/react'
import { Container } from '../components/Container'
import { Header } from '../components/Header'
import {useLocation} from "react-router-dom"
import axios from "axios"
import Cookies from "js-cookie";

const IngredientTableItem = (props) => {
    return (
        <Tr>
        <Td>{props.ingredient.name}</Td>
        <Td textAlign={"center"}>{props.ingredient.count}</Td>
        </Tr>
    )
}

const Recipe = () => {
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();
    const id = query.get('id');
    const [recipe, setRecipe] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.request({
            method:'GET',
            url: `${process.env.REACT_APP_API_URL}recipes/${id}`,
            headers:{'auth-token':Cookies.get('user')},
            data:{}
        }).then(res => {
            setRecipe(res.data);
            setIsLoading(false);
        })
    }, [id]);

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
                <Heading fontSize="48px" textAlign={"center"}  mb="30px">{recipe.recipe.name}</Heading>
                <Text fontSize="28px" textAlign={"center"}  mb="10px">Ingredients List</Text>
            </Flex>
            <Center>
                <Table size="lg">
                    <Thead bgColor={isDark? "#5C7AEA" : "#14279B"} >
                        <Tr>
                        <Th color="white" textAlign={"center"}>Name</Th>
                        <Th color="white" textAlign={"center"}>Amount</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {recipe.ingredients.map((ing, index) => <IngredientTableItem key={index} ingredient={ing}/>)}
                    </Tbody>
                </Table>
            </Center>
        </Box>}
    </Container>
    )
}
  
  export default Recipe