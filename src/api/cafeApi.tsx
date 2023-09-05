/* eslint-disable prettier/prettier */

import axios from 'axios';

const baseURL = 'https://node-rn-cafe.onrender.com/api';

const cafeApi = axios.create({baseURL});


export default cafeApi;
