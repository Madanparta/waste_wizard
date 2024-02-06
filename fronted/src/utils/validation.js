export const isValid_Aadhaar_Number = (aadhaar_number) => {
    let regex = new RegExp(/^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/);

    if(aadhaar_number === null){
        return "Please enter your aadhar your ID"
    }
    if(regex.test(aadhaar_number) === true){
        return true
    }else{
        return "Please enter valide aadhar your ID"
    }
}

export const isValid_Password = (password) =>{
    if(password.length === 0 ){
        return "Please enter Password"
    }
    if (password.length > 15){ 
    return password + " Password is too lengthy"
    }else if (password.length < 8) 
    return password + " Password is too short"; 

    let regex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!^%*?&]{8,15}$/;
    if (regex.test(password) !== true) {
      return password + " password is strong"
    }else{
        return true
    }
}

export const isValid_VoterId = (voterId)=>{
    let regex = new RegExp(/^[A-Z]{3}[0-9]{7}$/);

    if (voterId == null) {
        return "Please enter VoterId number";
    }

    if (regex.test(voterId) == true) {
        return true;
    }
    else {
        return "Please enter valide Voter ID Number";
    }
}

export const isValid_Phonenumber = (number)=>{
    const regex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

    if(regex.test(number) !== true){
        return "Please enter vaide phone number  "
    }else{
        return true
    }
}

export const isValid_EmailID = (email)=>{
    var regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(regexp.test(email) !== true){
        return "Please enter valide Email."
    }else{
        return true
    }
}