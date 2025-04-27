export const checkEmail = (email) => {
    const emailRgx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return email !== '' && emailRgx.test(email);
}
export const checkPassword = (password) => {
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    return password !== '' && passwordRegex.test(password);
}
export const increaseQuantityLogic = ({id, arr}) => {
    return arr.map(item =>
            item.meal.id === id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        )
    
}