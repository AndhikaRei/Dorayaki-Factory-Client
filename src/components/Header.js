import { useColorMode, Switch, Flex, Button, Icon, Spacer, Text, IconButton } from '@chakra-ui/react'
import { useState } from 'react'
import { HamburgerIcon, CloseIcon} from '@chakra-ui/icons'
import { Link } from "react-router-dom"

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const bgHeaderColor = { light: 'white', dark: 'black' }
  const [display, changeDisplay] = useState("none")
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
                    <Link to="/request">
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
                <Text mr="20px" fontWeight="bold">Hi, Anantha</Text>
                <Link to="/login">
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
                        Logout
                    </Button>
                </Link>
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
                <Text fontWeight="900" fontSize={"24px"} mb="20px">Hi, Anantha</Text>
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
                <Link to="/request">
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
                <Link to="/logout">
                    <Button
                        as="a"
                        variant="ghost"
                        aria-label="Logout"
                        my={5}
                        w="100%"
                    >
                        Logout
                    </Button>
                </Link>
            </Flex> 
        </Flex>
    </Flex>

  )
}
