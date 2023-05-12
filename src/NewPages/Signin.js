
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,getAuth } from 'firebase/auth';
import React,{ useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getData, saveData } from '../functions/functions';

function Signin() {
    const [userType, setUserType] = useState("standard")
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
const navigate=useNavigate()
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
                        navigate( "/map")
                        // window.location.href = "/map"
                    }
                )
            }
        ).catch(function (error) {
            alert(error.message);
        });
    }
    
    const loginUser = (e) =>{
        e.preventDefault()
        signInWithEmailAndPassword(auth,email, password).then(
            (res)=>{
                localStorage.setItem("uid",res.user.uid)
                getData("users", res.user.uid).then(
                    (doc)=>{
                        const user = doc.data();
                        localStorage.setItem("userType",user.userType)
                      
                        navigate( "/map")
                        // window.location.href = "/map"
                    }
                )
            }
        )
        console.log("loging in",email,password)
    }

    useEffect(() => {
        // console.log("=>>",auth?.currentUser?.uid)
        if(auth.currentUser)
        {
            localStorage.setItem("uid",auth.currentUser.uid)
            // window.location.href = "/map"
            navigate( "/map")
        }
    }, [])
    

    



  return (
    <main className="bg-white">

      <div className="relative md:flex">

        {/* Content */}
        <div className="w-full">
          <div className="min-h-screen h-full flex flex-col after:flex-1">

            {/* Header */}
            <div className="flex-1">
            
            </div>

            <div className="w-full sm:w-1/3 mx-auto px-4 py-8">
              {/* <h1 className="text-3xl text-slate-800 font-bold mb-6">Sign in /Sign Up </h1> */}
              <h1 className="text-lg text-slate-800 font-bold mb-6 
  sm:text-3xl sm:leading-tight">Sign in / Sign Up</h1>


              {/* Form */}
              <form>
              

                <div className="space-y-6">
                    <div>
                    <button id="logout" type="button" onClick={() => { setUserType("standard") }} className={userType === 'standard' ? 'button-active' : 'button'}>Standard</button>
                            <button id="logout" type="button" onClick={() => { setUserType("admin") }} className={userType === 'admin' ? 'button-active' : 'button'}>Admin</button>
                    </div>

                  <div>
                    <label className="block text-lg text-slate-600 font-medium mb-1" htmlFor="email">Email Address</label>
                    <input id="email" className="form-input w-full  px-4 h-11 border-slate-300 " type="email" value={email} onChange={(e) => { setEmail(e.target.value) }}  />
                  </div>
                  <div>
                    <label className="block text-lg text-slate-600  font-medium mb-1" htmlFor="password">Password</label>
                    <input id="password" className="form-input w-full px-4 h-11 border border-slate-300" type="password" autoComplete="on" value={password} onChange={(e) => { setPassword(e.target.value) }}  />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="mr-1">
                    <Link className="text-md text-slate-600 underline hover:text-indigo-500" to="/reset-password">Forgot Password?</Link>
                  </div>
                  <button className='btn bg-indigo-500 hover:bg-indigo-600 px-3 py-2 sm:px-4 sm:py-3 rounded-md text-white ml-3' onClick={(e)=>loginUser(e)}>Sign In</button>

                </div>
              </form>
              <div className="pt-5 mt-6 border-t border-slate-200">
                <div className=" text-sm cursor-pointer sm:text-md">
                  Don’t  have an account? <Link className="font-medium text-indigo-500 hover:text-indigo-600"  onClick={() => { registerUser() }}>Sign Up</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}

export default Signin;