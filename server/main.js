const express = require('express')
const app = express()
const port = 3000
const axios = require('axios');
const cors = require('cors');
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const mime = require('mime')
const FormData = require('form-data')
require('dotenv').config();

const Web3 = require('web3')
const contract = require('truffle-contract')
const artifact = require('../build/contracts/Han.json')

if (typeof web3 !== 'undefined') {
  var web3 = new Web3(web3.currentProvider)
} else {
  var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
}

const HAN = contract(artifact)
HAN.setProvider(web3.currentProvider)

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        cb(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype));
      });
    }
  });

var upload = multer({ storage: storage });

app.use(cors())

app.post('/upload', upload.single('imageFile'), (req, res) => {
    (async() => {
      const accounts = await web3.eth.getAccounts();
      const han = await HAN.deployed()

      console.log("Upload")

      const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

      let data = new FormData();

      data.append('file', fs.createReadStream(`./uploads/${req.file.filename}`))

      const result = await axios.post(url, data, {
        maxContentLength: "Infinity", 
        headers: {
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          pinata_api_key: process.env.PINATAAPIKEY, 
          pinata_secret_api_key: process.env.PINATASECRETKEY,
        },
      });

      const hanResult = await han.awardItem(accounts[1], result.data.IpfsHash, JSON.stringify(result.data), { from : accounts[1]})
      console.log({ hanResult })

      res.status(200).json({ message: 'Upload Successfull', result : result.data })
    })().catch(err => console.log(err))
})

app.use(express.static(path.join(__dirname, '../public')))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})