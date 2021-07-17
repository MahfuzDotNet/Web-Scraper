import * as puppeteer from 'puppeteer';
//import torRequest from 'tor-request';
import * as cheerio from 'cheerio';
import  * as fs from 'fs';
import  Tracker from "./interfaces";

const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const promisify = require('util').promisify;


var torRequest = require('tor-request');

const writeStream = fs.createWriteStream('post.csv');

// Write Headers
writeStream.write(`Title,Link,Date \n`);


torRequest.request(
  {
  url: 'https://www.binance.com/en',
  headers: {
    'user-agent': 'Mozilla/5.0'
  },
  strictSSL: true,
  agentClass: require('socks5-https-client/lib/Agent'),
  agentOptions: {
    socksHost: 'localhost', // Defaults to 'localhost'.
    socksPort: 9054, // Defaults to 1080.
    // Optional credentials
    // socksUsername: 'proxyuser',
    // socksPassword: 'p@ssw0rd',
  }
 }, function(err : string, res: any) {
  console.log(err || res.body);

  if (!err && res.statusCode == 200) {
    const $ = cheerio.load(res.body);

    console.log('res.statusCode---------------' + res.statusCode);


    //console.log('hi..' + res.body);
  }
 }).pipe(writeStream)



const app = express();
const port = 5000;
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.options('*', cors());

const writeFilePromise = promisify(fs.writeFile);

var  WriteTextToFileAsync = async (contentToWrite : Tracker) => {

    try {
    
      const path = '../trackers.json';

      var json;

      fs.readFile('../trackers.json', async function (err : any, data : any) {
        json = JSON.parse(data);
        json.push('search result: ' + contentToWrite);

            
        await writeFilePromise(json, path);

    })

        // FIXME: give your own path, this is just a dummy path
      
    } catch(err) {
        throw new Error(`Could not write file because of {err}`);
    }
}

// Default route
app.get('/', (req : any, res: any) => res.status(200).send({ message : 'Hello world' }));


// Write route
app.use('/write', async (req : any, res : any, next : any) => {

    try {
        //FIXME: Simply write the entire request body for now
        const fileContent = req.body;
        await WriteTextToFileAsync(fileContent);
        return res.status(200).send( { message: 'File written successfully!' });
    } catch (err) {
        throw new Error(`Could not write file because of {err}`);
    }
});

// Not-found route
app.use((req : any , res : any, next : any) => {
    res.status(404).send({ message: 'Could not find the specified route you requested!' });
});

app.listen(port, () => console.log(`Server up and running and listening for incoming requests on port ${port}!`));
