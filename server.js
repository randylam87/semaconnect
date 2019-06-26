const express = require('express');
const request = require('request');

const PORT = process.env.PORT || 8080;

const app = express();
app.listen(PORT, () => console.log(`Server started: http://localhost:${PORT}`));

const OPTIONS = { 
  method: 'POST',
  url: 'https://network.semaconnect.com/get_data.php',
  formData: {
    action: 'mapLocationDetails',
    div_id: '2830'
  } 
}

app.get('/', (req, res) => {
  request(OPTIONS, function (error, response, body) {
    if (error) throw new Error(error);
    
    const jsonBody = JSON.parse(body)
    // console.log(jsonBody);
    res.json(jsonBody);
  });
})


