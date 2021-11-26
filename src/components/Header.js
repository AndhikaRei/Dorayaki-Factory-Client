import { useColorMode, Switch, Flex, Button, Icon, Spacer, Text, IconButton } from '@chakra-ui/react'
import React, { useState, useEffect, useContext} from 'react'
import { HamburgerIcon, CloseIcon} from '@chakra-ui/icons'
import { Link, useNavigate} from "react-router-dom"
import Cookies from "js-cookie";
import { decodeToken } from "react-jwt";
import AuthApi from "../AuthApi";

export const Header = () => {
    const Auth = useContext(AuthApi);
    const { colorMode, toggleColorMode } = useColorMode()
    const navigate = useNavigate();
    const isDark = colorMode === 'dark'
    const bgHeaderColor = { light: 'white', dark: 'black' }
    const [display, changeDisplay] = useState("none")
    const [username, setUsername] = useState('')

    function handleLogout(){
        Cookies.remove('user');
        Auth.setAuth(false);
        navigate('/login')
    }

    useEffect(()=>{
            if(Cookies.get('user')){
                const user = Cookies.get('user');
                const myDecodedToken = decodeToken(user);
                setUsername(myDecodedToken.username);
            }else{
                setUsername('kak seto');
            }
        
        }, []);
    return (
    <Flex flexDir={"column"} width="100%" >
        <Flex 
        width="100%" 
        bg={bgHeaderColor[colorMode]}
        boxShadow={["none","none","md","md"]}
        px="20px"
        >
            <Flex>
                <Link to="/">
                    <Button
                        as="a"
                        variant="ghost"
                        aria-label="Home"
                        my={5}
                        w="100%"
                        color={isDark?"#5C7AEA":"#14279B"}
                        fontSize={"28px"}
                        fontWeight={"900"}
                    >
                        DY Factory
                    </Button>
                </Link>
                <Flex display={['none','none','flex', 'flex']}>
                    <Link to="/recipes">
                        <Button
                            as="a"
                            variant="ghost"
                            aria-label="Recipe"
                            my={5}
                            w="100%"
                        >
                            Recipe
                        </Button>
                    </Link>
                    <Link to="/ingredients">
                        <Button
                            as="a"
                            variant="ghost"
                            aria-label="Ingredients"
                            my={5}
                            w="100%"
                        >
                            Ingredients
                        </Button>
                    </Link>
                    <Link to="/requests">
                        <Button
                            as="a"
                            variant="ghost"
                            aria-label="Request"
                            my={5}
                            w="100%"
                        >
                            Request
                        </Button>
                    </Link>
                </Flex> 
            </Flex>
            <Spacer />
            <Flex align="center" display={['none','none','flex', 'flex']}>

                <Switch
                colorScheme="blue"
                isChecked={isDark}
                onChange={toggleColorMode}
                />
            </Flex>
            <Spacer />
            <Flex align="center" display={['flex','flex','none', 'none']}>
                <IconButton 
                    aria-label='Open Menu'
                    size = 'lg'
                    mr={2}
                    icon={<HamburgerIcon/>}
                    display={['flex','flex','none', 'none']}
                    onClick={()=>changeDisplay('flex')}
                />
                <Switch
                colorScheme="blue"
                isChecked={isDark}
                onChange={toggleColorMode}
                />
            </Flex>
            <Flex align="center" display={['none','none','flex', 'flex']}>
                <Text mr="20px" fontWeight="bold">{`Hi,${username}`}</Text>
                <Button
                    as="a"
                    variant="ghost"
                    aria-label="Logout"
                    my={5}
                    w="100%"
                    bgColor={isDark?"#5C7AEA":"#14279B"}
                    color="white"
                    _hover={{color:"white"}}
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </Flex>
            
        </Flex>
        <Flex
            width={"100vw"}
            bgColor={isDark?"#5C7AEA":"#E6E6E6"}
            zIndex={50}
            h="100vh"
            pos={"fixed"}
            top="0"
            left="0"
            overflowY="auto"
            flexDir="column"
            display={display}
        >
            <Flex justify={"flex-end"} align={"center"}>
                <IconButton 
                    mt="2"
                    mr="6"
                    aria-label='Close Menu'
                    size="lg"
                    icon={
                        <CloseIcon />
                    }
                    onClick={()=>changeDisplay('none')}
                />
            </Flex>
            <Flex flexDir={"column"} align={"center"} >
                <Text fontWeight="900" fontSize={"24px"} mb="20px">{`Hi, ${username}`}</Text>
                <Link to="/recipes">
                    <Button
                        as="a"
                        variant="ghost"
                        aria-label="Recipe"
                        my={5}
                        w="100%"
                    >
                        Recipe
                    </Button>
                </Link>
                <Link to="/ingredients">
                    <Button
                        as="a"
                        variant="ghost"
                        aria-label="Ingredients"
                        my={5}
                        w="100%"
                    >
                        Ingredients
                    </Button>
                </Link>
                <Link to="requests">
                    <Button
                        as="a"
                        variant="ghost"
                        aria-label="Request"
                        my={5}
                        w="100%"
                    >
                        Request
                    </Button>
                </Link>
                <Button
                    as="a"
                    variant="ghost"
                    aria-label="Logout"
                    my={5}
                    w="100%"
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </Flex> 
        </Flex>
    </Flex>

  )
}
