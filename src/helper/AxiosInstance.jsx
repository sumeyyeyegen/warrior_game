import axios from 'axios';

const axiosInstance = axios.create({
  headers: { 'probnet-api-key': `2CcT7TJ3Y8Dzj0Vkv1tLUNMT41xSBYNrnJu77re8gTmQXTlG0wpXhO5AV6qP8Qk5` }
});
export default axiosInstance;
