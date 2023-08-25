const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const url = 'https://jth-udge2.hj.se/submit';

//Enter login
const userName = 'username'
const pwd = "password"

if (process.argv.length < 2) {
    console.log("enter problem name")
    return;
}

const problem = process.argv[2];

const formData = new FormData();
formData.append('user', userName);
formData.append('password', pwd);
formData.append('program', fs.createReadStream(problem+'.hs'));
formData.append('problem', problem);
formData.append('language', 'hs');
formData.append('submit', 'Submit');

const headers = {
  'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
  'Host': 'jth-udge2.hj.se',
  'Cache-Control': 'max-age=0',
};

axios.post(url, formData, { headers })
  .then(response => {
    console.log('Response:', response.data);

})
  .catch(error => {
    console.error('Error:', error);

});