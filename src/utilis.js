import axios from 'axios';
import {BASE_URL, header} from "./appVaribles";

export function createRandomId(numbOfDigits)
{
    // This is based off of a stack overflow post from user Momomo
    // https://stackoverflow.com/questions/21816595/generate-a-random-number-of-fixed-length-using-javascript
    let add = 1, max = 12 - add;

    if (numbOfDigits > max)
    {
        createRandomId(max) + createRandomId(numbOfDigits - max);
    }

    max = Math.pow(10, numbOfDigits + add);
    let min = max/10;
    let number = Math.floor( Math.random() * (max - min + 1)) + min;

    return ("" + number).substring(add);
}

export function getCommentCount(id,callback)
{

    const request = axios.get(`${BASE_URL}/posts/${id}/comments`, header).then( (data) => callback(data.data));
    return request

}