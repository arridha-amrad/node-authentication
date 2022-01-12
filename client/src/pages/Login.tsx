import { Button, Container, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";

const Login = () => {
   const [state, setState] = useState({
      identity: "",
      password: ""
   })
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setState({
         ...state,
         [e.target.name]: e.target.value
      })
   }
   const handleLogin = () => {
      console.log("state : ", state)
   }
   return (
      <Container>
         <Text fontSize="xl" fontWeight="bold">Login</Text>
         <FormControl>
            <FormLabel>Email or Username</FormLabel>
            <Input type="text" name="identity" value={state.identity} onChange={handleChange} />
         </FormControl>
         <FormControl>
            <FormLabel>Password</FormLabel>
            <Input name="password" type="text" value={state.password} onChange={handleChange} />
         </FormControl>
         <Button mt="10" w="100%" onClick={handleLogin} color="blue">Login</Button>
      </Container>
   )
}

export default Login;

