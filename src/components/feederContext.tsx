import React, {createContext, useEffect, useState, ReactNode, FC } from 'react';
import { stringify, v4 as uuidv4 } from 'uuid';
import  Feeder from "../feederInterface";
import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';
import IFeed from '../feederInterface';
import config from '../configs.json';
import webhook from "webhook-discord";


const useDelayedRender = (delay : any ) => {
    const [delayed, setDelayed] = useState(true);
    useEffect(() => {
      const timeout = setTimeout(() => setDelayed(false), delay);
      return () => clearTimeout(timeout);
    }, []);
    return (fn : any) => !delayed && fn();
  };

export type ContextState =  {
    //children: ReactNode | ReactNode[];
    sortedFeeders : Feeder[];
    sendDiscord :  (feed : IFeed) =>  Promise<Boolean> ;

};

const contextDefaultValues: ContextState = {
    sortedFeeders : [],
    sendDiscord : async () => false

  };

//React.createContext<Partial<Props>>({});

//let trackers = fs.readFileSync('trackers.json');

//let student = JSON.parse(rawdata);
  
  
export const FeederContext =  createContext<ContextState>(
    contextDefaultValues
  );


//export const TrackerContext = React.createContext(null);

// type Props = {
//     children: React.ReactNode
//   };


const FeederProvider : FC = ({ children }) => {

let feederList : Feeder[] = [];

const [feeders, setFeeders] = useState<Feeder[]>(feederList);



useEffect(()  => {

    const getData = async () => {
        await axios.get('http://localhost:5000/feeds').then((result: any) =>{
            setFeeders(result.data);

            for(let feed of result.data)
            {

              let urlPrep = '';

              if(String(feed.url).substring(0,8) !== 'https://')
              {
                urlPrep = 'https://' + String(feed.url);
              }
              else{
                urlPrep = String(feed.url);

              }

              if(urlPrep.substring(0,9) ==='http:///' || 'https:///'){

                urlPrep = 'https://' + urlPrep.substring(9);

              }

              const Hook = new webhook.Webhook(config.hookUrl);



              //console.log("config.hookUrl------------->>>>>"+ config.hookUrl);
               
              //const hookUrl = "https://discord.com/api/webhooks/849946200991858688/ZSq_0jAKx0PhCPbURNlDNAoXm4zyyrE4V4W9cPdlRv_iNXk8lf5NMgvSqzXdUIrghQrn";
              const msg = new webhook.MessageBuilder()
              .setName(config.userName)
              .setText(feed.trackerName)
              .setTitle(feed.articleTitle.substring(0,100))    
              .setDescription(urlPrep);
                             
                        
          
              Hook.send(msg).then((response : any)=>{
                console.log('response-------->>>' + JSON.stringify(response))
                return true;
               
              }).catch(err => {
                return false
              });   

            }     
        
        })
      };

      getData();  

}, feeders);

useEffect(() => {
    localStorage.setItem('feeders', JSON.stringify(feeders));
})

console.log('trackers------------>>>' + feeders);

const sortedFeeders  = feeders.sort((a,b)=>(a.trackerName < b.trackerName ? -1 : 1));

const sendDiscord = async (feed : IFeed): Promise<Boolean>  => { 
   // const webhook = require("https://discord.com/api/webhooks/849910843863990292/8wpZc4QEshdVrCtjYyy-L54LhWy66WeK4GwWpMGwU-WV2jtllXmEU1vflBMBUHkZq-4s");
 
    const Hook = new webhook.Webhook(config.hookUrl);

    //console.log("config.hookUrl------------->>>>>"+ config.hookUrl);
     
    //const hookUrl = "https://discord.com/api/webhooks/849946200991858688/ZSq_0jAKx0PhCPbURNlDNAoXm4zyyrE4V4W9cPdlRv_iNXk8lf5NMgvSqzXdUIrghQrn";
    const msg = new webhook.MessageBuilder()
                    .setAuthor(config.userName)
                    .setDescription('')
                    .setName(feed.trackerName.substring(0,100))
                    .setText(feed.articleTitle.substring(0,100))
                    .addField('username',config.userName);
              

    await Hook.send(msg).then((response : any)=>{
      console.log('response-------->>>' + JSON.stringify(response))
      return true;
     
    }).catch(err => {
      return false
    });   

    return false;
}

console.log('sortedTrackers------------>>>>' + sortedFeeders);



return (
        <FeederContext.Provider value = {{ sortedFeeders, sendDiscord }}>       
            {children}
        </FeederContext.Provider>
    )
}

export default FeederProvider;
