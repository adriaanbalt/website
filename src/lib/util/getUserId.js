export default () => { 
    const userID = localStorage.getItem('userId');  
    if (userID) {
        return userID;
    } else {
        const newUserID = Math.floor(Math.random() * 100) + Date.now();
        localStorage.setItem('userId', newUserID);
        return newUserID;
    }
}