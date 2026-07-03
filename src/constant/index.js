import dotenv from 'dotenv';
dotenv.config();

const ENV = (process?.env || {});
const DELETE_DATA_MESSAGE = 'Data deleted successfully';
const UPDATE_DATA_MESSAGE = 'Data updated successfully';
const INTERNAL_SERVER_ERROR_MESSAGE = 'Internal server error';
const POST_DATA_MESSAGE = 'Data added successfully';
const GET_DATA_SUCESSFULLY = "Data Get Sucessfully";
const INVALID_ID = "Invalid ID";
const SIGNUP_SUCESSFULLY = "User SignUp Sucessfully";
const LOGIN_SUCESSFULLY = "User LogIn Sucessfully";

export {
    ENV,
    DELETE_DATA_MESSAGE,
    UPDATE_DATA_MESSAGE,
    INTERNAL_SERVER_ERROR_MESSAGE,
    POST_DATA_MESSAGE,
    GET_DATA_SUCESSFULLY,
    INVALID_ID,
    SIGNUP_SUCESSFULLY,
    LOGIN_SUCESSFULLY
}