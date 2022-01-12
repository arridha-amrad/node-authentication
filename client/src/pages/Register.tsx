import { Button, Container, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";

const Register = () => {
   const [state, setState] = useState({
      email: "",
      username: "",
      password: ""
   })
   const registrationSteps = ["registration", "emailVerification"]
   const [step, setStep] = useState(1)
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setState({
         ...state,
         [e.target.name]: e.target.value
      })
   }
   const handleRegister = () => {
      console.log("state : ", state)
   }
   const verifyCode = () => { }
   const [code, setCode] = useState("")
   return (
      <Container>
         {registrationSteps[step] === "registration" && (
            <>
               <Text fontSize="xl" fontWeight="bold">Register</Text>
               <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input type="text" name="email" value={state.email} onChange={handleChange} />
               </FormControl>
               <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input name="username" type="text" value={state.username} onChange={handleChange} />
               </FormControl>
               <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input name="password" type="text" value={state.password} onChange={handleChange} />
               </FormControl>
               <Button mt="10" w="100%" onClick={handleRegister} color="blue">Register</Button>
            </>
         )}
         {registrationSteps[step] === "emailVerification" && (
            <>
               <Text fontSize="xl" fontWeight="bold">Email Verification</Text>
               <FormControl>
                  <FormLabel>Verification Code</FormLabel>
                  <Input
                     type="text"
                     name="verificationCode"
                     value={code}
                     onChange={(e) => setCode(e.target.value)}
                  />
               </FormControl>
               <Button mt="10" w="100%" onClick={verifyCode} color="blue">Verify</Button>
            </>
         )}
      </Container>
   )
}

export default Register;