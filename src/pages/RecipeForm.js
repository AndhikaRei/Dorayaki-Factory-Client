import React, {useState, useEffect,} from 'react';
import {
    Text,
    Box,
    Center,
    Heading,
    Flex,
    CloseButton,
    Button,
    useColorMode,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Input,
    Stack,
    HStack,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Spinner,
    useToast
} from '@chakra-ui/react'
import { Container } from '../components/Container'
import { Header } from '../components/Header'
import axios from "axios"
import Cookies from "js-cookie";

const IngredientTableItem = ( {key, index, ingredient, onDeleteIngridient}) => {
    const { colorMode } = useColorMode()
    const isDark = colorMode === 'dark'

    return (
        <Tr>
        <Td>{ingredient.ingredient}</Td>
        <Td textAlign={"center"}>{ingredient.count}</Td>
        <Td textAlign={"center"}>
            <Center >
                <CloseButton bgColor={isDark?"#5C7AEA":"#14279B"} onClick={()=>onDeleteIngridient(index)}/>
            </Center>
        </Td>
        </Tr>
    )
}

const RecipeForm = () => {
    const toast = useToast()
    const [ingredients, setIngredients] = useState([]);
    const [name, setName] = useState('');
    const [selectedIngredient, setSelectedIngredient] = useState('');
    const [count, setCount] = useState(1);
    const [refreshTable, setRefreshTable] = useState(true)
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingAdd, setIsLoadingAdd] = useState(false)

    useEffect(() => {
        axios.request({
            method:'GET',
            url: `${process.env.REACT_APP_API_URL}ingredients`,
            headers:{'auth-token':Cookies.get('user')},
            data:{}
        }).then(res => {
            setIngredients(res.data);
            setIsLoading(false);
        })
    }, []);

    const { colorMode } = useColorMode()
    const isDark = colorMode === 'dark'

    function handleNewIngredient(){
        if(selectedIngredient !== ''){
            if (recipeIngredients.filter(e => e.ingredient === selectedIngredient).length > 0) {
                let ingIndex = recipeIngredients.findIndex((x => x.ingredient === selectedIngredient));
                recipeIngredients[ingIndex].count = parseInt(recipeIngredients[ingIndex].count)+parseInt(count)
                setRefreshTable(!refreshTable)
            }else{
                const newIngre = {ingredient : selectedIngredient, count:parseInt(count)};
                recipeIngredients.push(newIngre);
                setRefreshTable(!refreshTable)
            }
            setRecipeIngredients(recipeIngredients)
        }
    }

    function deleteIngredient(id){
        recipeIngredients.splice(id, 1);
        setRefreshTable(!refreshTable)
    }

    function addRecipe(){
        setIsLoadingAdd(true)
        console.log(recipeIngredients)
        axios.request({
            method:'POST',
            url: `${process.env.REACT_APP_API_URL}recipes`,
            headers:{'auth-token':Cookies.get('user')},
            data:  {
                name : name,
                ingredients : recipeIngredients
            }
        }).then(res => {
            console.log(res);
            setIsLoadingAdd(false);
            toast({
                title: "Recipe successfully added.",
                description: "Factory successfully added new recipe to the database.",
                status: "success",
                position: "top",
                duration: 9000,
                isClosable: true,
              })
        }).catch((err)=>{
            toast({
                title: "Failed to Add Recipe",
                description: err.response.data.error,
                status: "error",
                position: "top",
                duration: 9000,
                isClosable: true,
              })
        })
    }

    return(
    <Container>
        <Header />
        {isLoadingAdd && 
        <Center width="100%" height="100%" bg="rgba(0, 0, 0, 0.5)" zIndex="20" position="absolute" >
        <Spinner
            thickness="5px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
        />
        </Center>
        }
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
        <Box mt="50px" minH={"80vh"} maxW={"80vw"} minW={"50%"}>
            <Flex flexDir={"column"} justifyContent={"center"} alignItems={"center"}>
                <Heading fontSize="48px" textAlign={"center"}  mb="30px"> Recipe Form</Heading>
            </Flex>
            <Stack spacing={5}>
                <Text fontSize="20px">Recipe Name: </Text>
                <Input
                    value={name}
                    onChange={(val)=>setName(val.target.value)}
                    placeholder="Insert recipe name here..."
                    size="lg"
                />
                <Text fontSize="20px">Ingredient: </Text>
                <HStack >
                    <Select placeholder="Select ingredient" value={selectedIngredient} onChange={(val)=>setSelectedIngredient(val.target.value)}>
                        {ingredients.map((ing) => <option value={ing.name}>{ing.name}</option>)}
                    </Select>
                    <NumberInput value={count} min={1} onChange={(val)=>setCount(val)} isDisabled={selectedIngredient===''}>
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <Button
                        as="a"
                        variant="ghost"
                        aria-label="Logout"
                        my={5}
                        w={["60%","50%","40%","40%"]}
                        bgColor={isDark?"#5C7AEA":"#14279B"}
                        color="white"
                        _hover={{color:"white"}}
                        cursor={"pointer"}
                        isDisabled={selectedIngredient===''}
                        onClick={handleNewIngredient}
                    >
                        Add Ingredient
                    </Button>
                </HStack>

                <Table size="lg">
                    <Thead bgColor={isDark? "#5C7AEA" : "#14279B"} >
                        <Tr>
                        <Th color="white" textAlign={"center"}>Name</Th>
                        <Th color="white" textAlign={"center"}>Amount</Th>
                        <Th color="white" textAlign={"center"}>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {recipeIngredients.map((ing, index) => <IngredientTableItem key={ing.id} index={index} ingredient={ing} onDeleteIngridient={deleteIngredient}/>)}
                    </Tbody>
                </Table>

            </Stack>
            <Center>
                <Button
                    as="a"
                    variant="ghost"
                    aria-label="Logout"
                    my={5}
                    w={["60%","50%","40%","40%"]}
                    bgColor={isDark?"#5C7AEA":"#14279B"}
                    color="white"
                    _hover={{color:"white"}}
                    cursor="pointer"
                    mt="50px"
                    onClick={addRecipe}
                >
                    Add Recipe Now
                </Button>
            </Center>

        </Box>}
    </Container>
    )
}
  
  export default RecipeForm