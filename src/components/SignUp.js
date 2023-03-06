import React , {useEffect, useState} from 'react';
import styles from './SignUp.module.css';
import {Link} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {toastifySubmit} from './toastify';
import { validation } from './validate';
// import styled from 'styled-components';

// let Button = styled.button``;

const SignUp = () => {

    const [ data , setData] = useState({
        username : "",
        email : "",
        password : "",
        confirmedPassword : "",
        isAccepted : false,
    });

    const [errors , setErrors] = useState({});

    const [touch , setTouch] = useState({})

    const [runAway , setRunAway] = useState("true");

    const [moveToggle, setMoveToggle] = useState(false) ;

    useEffect(()=>{
        setErrors(validation(data, "signup"))
    },[data, runAway]);

    const changeHandler = event => {
        if(event.target.name === "isAccepted"){
            setData({...data, [event.target.name] : event.target.checked})
            // console.log(event.target.checked)

        }else{
            setData({...data , [event.target.name] : event.target.value })
        }
        // console.log(data)
    }

    const touchHandler = event => {
        setTouch({...touch , [event.target.name] : true});
    }

    const submitHandler = event => {
        event.preventDefault();
        
        if(!Object.keys(errors).length){
            toastifySubmit("Success","You Signed In Successfully");
            console.log('Success');
        }else{
            setTouch({
                username : true,
                email : true,
                password : true,
                confirmedPassword : true,
                isAccepted : true,
            });
            toastifySubmit("Error","Invalid Data!");
            console.log('Error')
        }
    }


    const clickHandler = event => {
        if(Object.keys(errors).length){
            setRunAway("true")
            const randomNum = moveToggle ? 0 : -100;
            // console.log(randomNum)
            event.target.style.transform = `translateX(${randomNum}px)`
        }
        else{
            setRunAway("false")
        }
        setMoveToggle(!moveToggle);
        // console.log(moveToggle)
    }
    return (
        <div className={styles.container}>
            <form onSubmit={submitHandler}  className={styles.formFields} >
                <h2>Sign Up</h2>
                <div className={styles.inputGroup}>
                    <label htmlFor='username'>Username</label>
                    <input type="text" 
                        className={(errors.username && touch.username) && styles.invalid}
                        id='username' 
                        name="username" 
                        value={data.username} 
                        onChange={changeHandler} 
                        onFocus={touchHandler} />
                    <p>{ errors.username && touch.username && errors.username}</p>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor='email'>Email</label>
                    <input type="email" 
                        className={errors.email && touch.email && styles.invalid}
                        id='email' 
                        name="email" 
                        value={data.email} 
                        onChange={changeHandler} 
                        onFocus={touchHandler} />
                    <p>{ errors.email && touch.email && errors.email}</p>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor='password'>Password</label>
                    <input type="password" 
                        className={errors.password && touch.password && styles.invalid}
                        id='password' 
                        name="password" 
                        value={data.password} 
                        onChange={changeHandler} 
                        onFocus={touchHandler} />
                    <p>{ errors.password && touch.password && errors.password}</p>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor='confirmedPassword' >Confirmed Password</label>
                    <input type="password" 
                        className={errors.confirmedPassword && touch.confirmedPassword && styles.invalid }
                        id='confirmedPassword' 
                        name="confirmedPassword" 
                        value={data.confirmedPassword} 
                        onChange={changeHandler} 
                        onFocus={touchHandler} />
                    <p>{ errors.confirmedPassword && touch.confirmedPassword && errors.confirmedPassword}</p> 
                </div>
                <div className={styles.inputGroup}>
                    <div>
                        <input type="checkbox" 
                            id='isAccepted' 
                            name="isAccepted" 
                            value={data.isAccepted} 
                            onChange={changeHandler} 
                            onFocus={touchHandler} />
                        <label htmlFor='isAccepted' > I accept terms of the privacy policy.</label>
                    </div>
                    <p>{ errors.isAccepted && touch.isAccepted && errors.isAccepted}</p>
                </div>
                <div className={styles.formButtons}>
                    <Link to="/Login">Login</Link>
                    <button type="submit"
                        onMouseEnter={clickHandler}
                         >
                            Sign Up    
                    </button>
                </div>
            </form>
            <ToastContainer/>
        </div>
    );
};



export default SignUp;