export const validator = (value, length)=>{
    const isValid = value.trim().length >= length;
    return isValid;
}