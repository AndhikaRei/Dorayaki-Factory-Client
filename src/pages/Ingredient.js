import React, { useState, useEffect } from 'react';
import {
    Box,
    Center,
    Heading,
    Stack,
    HStack,
    Button,
    Flex,
    Input,
    Spinner,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    ButtonGroup,
    IconButton,
    useColorMode,
    useToast
} from '@chakra-ui/react'
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
import { Container } from '../components/Container'
import { Header } from '../components/Header'
import axios from "axios";

const IngredientTableItem = (props) => {
    const toast = useToast();
    const id = props.ingredient.id;
    const [name, setName] = useState(props.ingredient.name);
    const [nameInput, setNameInput] = useState(props.ingredient.name);
    const [stock, setStock] = useState(props.ingredient.stock);
    const [stockInput, setStockInput] = useState(props.ingredient.stock);
    const [isEditing, setIsEditing] = useState(false)
    const { colorMode } = useColorMode()
    const isDark = colorMode === 'dark'

    function updateValue() {
        if ((nameInput === name && stockInput === stock)) {
            cancelUpdate();
        } else if (nameInput && stockInput) {
            const ingredients = props.ingredients.filter(el => el.id !== id)
            if (!ingredients.find(el => el.name === nameInput)) {
                axios.request({
                    method:'PATCH',
                    url: `http://localhost:4000/api/v1/ingredients/${id}`,
                    headers:{'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ4MmExNjY5LTEyOTUtNDU4Ni1hYTVjLWYyYjBhYTQ1MGM5YSIsInVzZXJuYW1lIjoicmV5aGFuZW15ciIsImlhdCI6MTYzNzc3MzUxOX0.0DLyu0Xx-k0QVpcDNdbhkiRkb_ockePQbItypvfzi_Y'},
                    data:  {
                        name : nameInput,
                        stock : stockInput
                    }
                }).then(res => {
                    setName(nameInput);
                    setStock(stockInput);
                    setIsEditing(false);
                    toast({
                        title: res.data,
                        description: "Factory successfully updated ingredient in the database.",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    })
                    props.handleEdit(props.index, nameInput, stockInput);
                }).catch((err)=>{
                    toast({
                        title: "Failed to update ingredient.",
                        description: err.response.data.error.errors[0].message,
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    })
                })
            } else {
                toast({
                    title: "Failed to update ingredient.",
                    description: "Ingredient already exists.",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
            }
        } else {
            toast({
                title: "Failed to update ingredient.",
                description: "Name and stock cannot be empty.",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }
    }

    function cancelUpdate() {
        setNameInput(name);
        setStockInput(stock);
        setIsEditing(false);
    }

    return (
        <Tr>
            <Td>
                {isEditing ? (
                    <Input value={nameInput} onChange={(e) => setNameInput(e.target.value)}/>
                ) : (
                    nameInput
                )}
            </Td>
            <Td isNumeric>
                {isEditing ? (
                    <NumberInput value={stockInput} min={0} onChange={(val) => setStockInput(val)} size="md" >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </ NumberInput>
                ) : (
                    stockInput
                )}
            </Td>
            <Td>
                {isEditing ? (
                    <ButtonGroup color="white" justifyContent="center" size="sm">
                        <IconButton bgColor={isDark?"#5C7AEA":"#14279B"} icon={<CheckIcon />}  onClick={() => updateValue()} />
                        <IconButton bgColor={isDark?"#5C7AEA":"#14279B"} icon={<CloseIcon />} onClick={() => cancelUpdate()} />
                    </ButtonGroup>
                ) : (
                    <Flex justifyContent="center">
                        <IconButton color="white" bgColor={isDark?"#5C7AEA":"#14279B"} size="sm" icon={<EditIcon />} onClick={() => setIsEditing(!isEditing)} />
                    </Flex>
                )}
            </Td>
        </Tr>
    )
}

const Ingredient = () => {
    const toast = useToast();
    const [ingredients, setIngredients] = useState([]);
    const [newIngredientName, setNewIngredientName] = useState("");
    const [newIngredientStock, setNewIngredientStock] = useState(1);
    const [isLoading, setIsLoading] = useState(true)
    const [addDisabled, setAddDisabled] = useState(true);

    const { colorMode } = useColorMode();
    const isDark = colorMode === 'dark';

    useEffect(() => {
        // TODO: set header for auth
        axios.request({
            method:'GET',
            url: `http://localhost:4000/api/v1/ingredients`,
            headers:{'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ4MmExNjY5LTEyOTUtNDU4Ni1hYTVjLWYyYjBhYTQ1MGM5YSIsInVzZXJuYW1lIjoicmV5aGFuZW15ciIsImlhdCI6MTYzNzc3MzUxOX0.0DLyu0Xx-k0QVpcDNdbhkiRkb_ockePQbItypvfzi_Y'},
            data:{}
        }).then(res => {
            const resingredients = res.data;
            setIngredients(resingredients);
            setIsLoading(false);
        })
            
    }, []);

    function handleNewIngredient(){
        if (!addDisabled) {
            const newIngre = {name : newIngredientName, stock:parseInt(newIngredientStock)};
            if (!ingredients.find(el => el.name === newIngredientName)) {
                axios.request({
                    method:'POST',
                    url: `http://localhost:4000/api/v1/ingredients`,
                    headers:{'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ4MmExNjY5LTEyOTUtNDU4Ni1hYTVjLWYyYjBhYTQ1MGM5YSIsInVzZXJuYW1lIjoicmV5aGFuZW15ciIsImlhdCI6MTYzNzc3MzUxOX0.0DLyu0Xx-k0QVpcDNdbhkiRkb_ockePQbItypvfzi_Y'},
                    data:  newIngre
                }).then(res => {
                    console.log(res.data);
                    setIngredients([...ingredients, res.data.ingredient]);
                    toast({
                        title: "Ingredient successfully added.",
                        description: "Factory successfully added new ingredient to the database.",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    })
                    console.log(ingredients)
                }).catch((err)=>{
                    toast({
                        title: "Failed to add ingredient.",
                        description: err.response.data.error.errors[0].message,
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    })
                })
            } else {
                toast({
                    title: "Failed to add ingredient.",
                    description: "Ingredient already exists.",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
            }
            
        }
    }

    function handleEdit(index, name, count) {
        let newIngredients = [...ingredients];
        newIngredients[index] = {...newIngredients[index], name: name, stock: parseInt(count)};
        console.log(newIngredients)
        setIngredients(newIngredients);
        console.log(ingredients)
    }

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
        <Box mt="50px" minH={"80vh"}>
            <Center mb="30px">
                <Heading fontSize="48px" textAlign={"center"}>Ingredients Page</Heading>
            </Center>
            <Stack spacing={5}>
                <HStack >
                    <Input placeholder="Enter new ingredient" value={newIngredientName} onChange={(val)=>{setNewIngredientName(val.target.value); setAddDisabled(val.target.value==='')}} />
                    <NumberInput value={newIngredientStock} min={0  } onChange={(val)=>setNewIngredientStock(val)} isDisabled={newIngredientName===''}>
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
                        isDisabled={newIngredientName===''}
                        onClick={handleNewIngredient}
                    >
                        Add Ingredient
                    </Button>
                </HStack>
                <Table size="lg" minW={"40vw"}>
                    <Thead bgColor={isDark? "#5C7AEA" : "#14279B"}>
                        <Tr>
                            <Th color="white" textAlign={"center"}>Name</Th>
                            <Th color="white" textAlign={"center"}>Stock</Th>
                            <Th color="white" textAlign={"center"}>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {ingredients.map((ing, idx) => <IngredientTableItem key={ing.id} index={idx} ingredient={ing} ingredients={ingredients} handleEdit={handleEdit}/>)}
                    </Tbody>
                </Table>
            </Stack>
        </Box>}
    </Container>
    )
}
  
  export default Ingredient