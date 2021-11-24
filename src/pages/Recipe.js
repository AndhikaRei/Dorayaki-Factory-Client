import React, {useState, useEffect} from 'react';
import {
    Text,
    Box,
    Center,
    Heading,
    Flex,
    Icon,
    Button,
    useColorMode,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td
} from '@chakra-ui/react'
import { Container } from '../components/Container'
import { Header } from '../components/Header'
import {Link, useLocation} from "react-router-dom"
import axios from "axios"

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
    console.log(id)
    const [recipe, setRecipe] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.request({
            method:'GET',
            url: `http://localhost:4000/api/v1/recipes/${id}`,
            headers:{'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUyODI3ZDg3LWNiZTYtNDFlNS04NGY5LWMwYTYyN2U3NTlhNCIsInVzZXJuYW1lIjoiZ2RlYW5hbnRoYSIsImlhdCI6MTYzNzc0NzM1M30.iGp3F7CvLV-0B_BCHGeSwkgkq5wYNua42WSMTzD5_z8'},
            data:{}
        }).then(res => {
            setRecipe(res.data);
            setIsLoading(false);
        })
    }, [id]);

    const { colorMode, toggleColorMode } = useColorMode()
    const isDark = colorMode === 'dark'
    return(
    <Container>
        <Header />
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
                        {recipe.ingredients.map((ing) => <IngredientTableItem key={ing.id} ingredient={ing}/>)}
                    </Tbody>
                </Table>
            </Center>
        </Box>}
    </Container>
    )
}
  
  export default Recipe