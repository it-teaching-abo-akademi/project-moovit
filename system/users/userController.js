const registerLogic = require('./services/register.js');
const loginLogic = require('./services/login.js');
const logoutLogic = require('./services/logout.js');
const userInfoLogic = require('./services/userInfo.js');
const editUserLogic = require('./services/editUser.js');

function registerUser(username, email, password){
    return registerLogic.registerUser(username, email, password);
}

async function login(email, password){
    return await loginLogic.loginUser(email, password);
 
}

async function logout(res){
    return await logoutLogic.logoutUser(res);
}

async function getUserInfo(userId){
    return await userInfoLogic.getUserById(userId);
}

async function editUserInfo(userData){
    return await editUserLogic.editUser(userData)
}

module.exports = {
    registerUser,
    login,
    getUserInfo,
    logout,
    editUserInfo
}