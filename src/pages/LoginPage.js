import React, { useState,useEffect } from 'react';
import { Paper, Grid } from '@mui/material';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword,getAuth} from '../functions/firebase'
import { saveData , getData } from '../functions/functions'
export default function LoginPage() {
    const auth = getAuth()
    const registerUser = () => {
        createUserWithEmailAndPassword(auth,email, password).then(
            async (res) => {
                saveData("users", res.user.uid, {
                    userType: userType,
                    email: email,
                    uid: res.user.uid,
                    vistedLocations:[]
                }).then(
                    ()=>{
                        localStorage.setItem("uid",res.user.uid)
                        localStorage.setItem("userType",userType)
                        window.location.href = "/map"
                    }
                )
            }
        ).catch(function (error) {
            alert(error.message);
        });
    }
    
    const loginUser = () =>{
        signInWithEmailAndPassword(auth,email, password).then(
            (res)=>{
                localStorage.setItem("uid",res.user.uid)
                getData("users", res.user.uid).then(
                    (doc)=>{
                        const user = doc.data();
                        localStorage.setItem("userType",user.userType)
                        window.location.href = "/map"
                    }
                )
            }
        )
    }

    useEffect(() => {
        console.log("=>>",auth?.currentUser?.uid)
        if(auth.currentUser)
        {
            localStorage.setItem("uid",auth.currentUser.uid)
            window.location.href = "/map"
        }
    }, [])
    

    const [userType, setUserType] = useState("standard")
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div>
            <div id="recaptcha-container"></div>
            <Grid container style={{ height: "100vh" }} alignItems={"center"} justifyContent={"center"}>
                <Paper elevation={6} style={{ padding: 20, width: 300 }}>
                    <Grid container direction={"column"} alignItems={"center"} >
                        <Grid container justifyContent={"center"}>
                            <button  type="button" onClick={() => { setUserType("standard") }} className={userType === 'standard' ? 'button-active' : 'button'}>Standard</button>
                            <button  type="button" onClick={() => { setUserType("admin") }} className={userType === 'admin' ? 'button-active' : 'button'}>Admin</button>
                        </Grid>
                        <input placeholder='UserName' value={email} onChange={(e) => { setEmail(e.target.value) }}></input>
                        <input placeholder='Password' type='password' value={password} onChange={(e) => { setPassword(e.target.value) }}></input>
                        <button id="logout" type="button" className='button-active' onClick={()=>{loginUser()}}>Login</button>
                        <button id="logout" type="button" className='button-active-large' onClick={() => { registerUser() }}>Register</button>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    )
}
