export const validation = (data,type) => {

    const errors = {};

    if( !data.email ){
        errors.email = "Email Required!"
    }else if( !/\S+@\S+\.\S+/.test(data.email) ){
        errors.email = "Enter a Valid Email Address"
    }else{
        delete errors.email;
    }

    
    if( !data.password ){
        errors.password = "Password Required!"
    }else if(data.password.length < 6){
        errors.password = "Password need to be 6 characters or more"
    }else{
        delete errors.password;
    }

    if (type === "signup"){
        if( !data.username.trim() ){
            errors.username = "Username Required!"
        }else{
            delete errors.username;
        }
        if( !data.confirmedPassword ){
            errors.confirmedPassword = "Confirmed Password Required!"
        }else if(data.confirmedPassword !== data.password){
            errors.confirmedPassword = "Password not match"
        }else{
            delete errors.confirmedPassword;
        }
    
        if( data.isAccepted ){
            delete errors.isAccepted
        }else{
            errors.isAccepted = "Accept our policy!"
        }
    }

    return errors;
}