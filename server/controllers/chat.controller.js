import axios from 'axios';

export const chatCompletion = async (req, res) => {
  const requestConfig = {
    method: 'post',
    url: 'http://127.0.0.1:5000/api/ask',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      query: req.body.prompt
    },
    timeout: 5000 // Timeout value in milliseconds
  };
    
  try {
    const response = await axios(requestConfig);
    const data = response.data;
    console.log(data.response);
    res.status(200).json({ text: data.response });
  } catch (error) {
    if (axios.isCancel(error)) {
      console.error('Request canceled:', error.message);
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request timeout:', error.message);
    } else {
      console.error('Error:', error.message);
    }
    res.status(500).json({
      message: error.message
    });
  }
};