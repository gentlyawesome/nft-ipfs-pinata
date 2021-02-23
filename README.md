# Intro
This is a sample of NFT and IPFS (Pinata)

## Requirements
1. NodeJS
2. Truffle 
```sh 
  npm install -g truffle 
```
3. Ganache-cli 
```sh 
  npm install -g ganache-cli 
```

## Pre-requisite
copy `.envsample` and name it `.env`

## Pinata Setup
1. signup to https://pinata.cloud and verify account (important)
2. create new api key by clicking top right > API Key
3. click 'new api key'
4. enable 'admin key'
5. click 'generate'
6. copy API KEY and API Secret
7. Paste them in your .env file
example:
```env
PINATAAPIKEY=b029e5c7214a46c65e20 
PINATASECRETKEY=1295dac46a16a5230a1d6a044d34532df6f37ee14b0f8f6baa3dffa439a8a99e
```


### Setup
1. `npm i`

### Run
1. Open Ganache-CLI in 1 terminal or cmd (keep this open)
```sh
ganache-cli
```

2. Open new cmd or terminal then Compile Contract and Deploy
```sh
truffle compile
truffle deploy
```

3. Open new cmd or terminal
```sh
npm run client
``` 

4. Open browser to http://localhost:3000 

5. Upload a picture 

