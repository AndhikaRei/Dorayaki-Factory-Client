import React, { useState, useEffect } from 'react';
import {
    Box,
    Center,
    Heading,
    Flex,
    Input,
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
} from '@chakra-ui/react'
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
import { Container } from '../components/Container'
import { Header } from '../components/Header'
import axios from "axios";

const IngredientTableItem = (props) => {
    const id = props.ingredient.id
    const [name, setName] = useState(props.ingredient.name);
    const [nameInput, setNameInput] = useState(props.ingredient.name);
    const [stock, setStock] = useState(props.ingredient.stock);
    const [stockInput, setStockInput] = useState(props.ingredient.stock);
    const [isEditing, setIsEditing] = useState(false)

    function updateValue() {
        if (nameInput && stockInput) {
            // TODO: update with axios
            setName(nameInput);
            setStock(stockInput);
            setIsEditing(false);
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
                    <ButtonGroup justifyContent="center" size="sm">
                        <IconButton icon={<CheckIcon />} onClick={() => updateValue()} />
                        <IconButton icon={<CloseIcon />} onClick={() => cancelUpdate()} />
                    </ButtonGroup>
                ) : (
                    <Flex justifyContent="center">
                        <IconButton size="sm" icon={<EditIcon />} onClick={() => setIsEditing(!isEditing)} />
                    </Flex>
                )}
            </Td>
        </Tr>
    )
}

const Ingredient = () => {
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        // TODO: set header for auth
        axios.request({
            method:'GET',
            url: `http://localhost:4000/api/v1/ingredients`,
            headers:{'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUyODI3ZDg3LWNiZTYtNDFlNS04NGY5LWMwYTYyN2U3NTlhNCIsInVzZXJuYW1lIjoiZ2RlYW5hbnRoYSIsImlhdCI6MTYzNzc0NzM1M30.iGp3F7CvLV-0B_BCHGeSwkgkq5wYNua42WSMTzD5_z8'},
            data:{}
        }).then(res => {
            const resingredients = res.data;
            setIngredients(resingredients);
        })
            
    }, []);

    // TODO: add ingredient

    return(
    <Container>
        <Header />
        <Box mt="50px" minH={"80vh"}>
            <Center mb="30px">
                <Heading fontSize="48px" textAlign={"center"}>Ingredient Page</Heading>
            </Center>
            <Table variant="simple" colorScheme="blue" minW={"40vw"}>
                {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                <Thead>
                    <Tr>
                        <Th textAlign={"center"}>Nama</Th>
                        <Th textAlign={"center"}>Stok</Th>
                        <Th textAlign={"center"}>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {ingredients.map((ing) => <IngredientTableItem key={ing.id} ingredient={ing}/>)}
                </Tbody>
            </Table>
        </Box>
    </Container>
    )
}
  
  export default Ingredient