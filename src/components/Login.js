import React , {useEffect, useState} from 'react';
import styles from './SignUp.module.css';
import {Link} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {toastifySubmit} from './toastify';
import { validation } from './validate';

const Login = () => {

    const [ data , setData] = useState({
        email : "",
        password : "",
    });

    const [errors , setErrors] = useState({});

    const [touch , setTouch] = useState({})

    useEffect(()=>{
        setErrors(validation(data,"login"))
    },[data]);

    const changeHandler = event => {
        setData({...data , [event.target.name] : event.target.value })
    }

    const touchHandler = event => {
        setTouch({...touch , [event.target.name] : true});
    }

    const submitHandler = event => {
        event.preventDefault();
        
        if(!Object.keys(errors).length){
            toastifySubmit("Success","You Loged In");
            console.log('Success');
        }else{
            setTouch({
                email : true,
                password : true,
            });
            toastifySubmit("Error","Invalid Data!");
            console.log('Error')
        }
    }

    return (
        <div className={styles.container}>
            <form onSubmit={submitHandler}  className={styles.formFields} >
                <h2>Login</h2>
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
                <div className={styles.formButtons}>
                    <Link to="/signup">Sign Up</Link>
                    <button type="submit" >Login</button>
                </div>
            </form>
            <ToastContainer/>
        </div>
    );
};

export default Login;