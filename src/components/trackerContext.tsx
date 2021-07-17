import React, {createContext, useEffect, useState, ReactNode, FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import  Tracker from "../interfaces";
import { isJSDocNamepathType } from 'typescript';
import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';

export type ContextState =  {
    //children: ReactNode | ReactNode[];
    sortedTrackers : Tracker[];
    addTracker : (newTrac : Tracker) => void;
    deleteTracker : (id : any) => void;
    updateTracker : (id : any, updatedTracker : Tracker) => void;
};

const contextDefaultValues: ContextState = {
    sortedTrackers : [],
    addTracker : () => {},
    deleteTracker : () => {},
    updateTracker : () => {}
  };


//React.createContext<Partial<Props>>({});

//let trackers = fs.readFileSync('trackers.json');

//let student = JSON.parse(rawdata);
  
  
export const TrackerContext =  createContext<ContextState>(
    contextDefaultValues
  );


//export const TrackerContext = React.createContext(null);

// type Props = {
//     children: React.ReactNode
//   };


const TrackerProvider : FC = ({ children }) => {

let trackList : Tracker[] = [];

const [trackers, setTrackers] = useState<Tracker[]>(trackList);

useEffect(()  => {

    const getData = async () => {
        await axios.get('http://localhost:5000/trackers').then((result: any) =>{
            setTrackers(result.data);

            // localStorage.setItem('trackers', result.data);
            
        })
      };

      getData();  

}, [trackers]);

// useEffect(() => {
//     // localStorage.setItem('trackers', JSON.stringify(trackers));

  

// })


console.log('trackers------------>>>' + trackers);

const sortedTrackers  = trackers.sort((a,b)=>(a.pageName < b.pageName ? -1 : 1));


console.log('sortedTrackers------------>>>>' + JSON.stringify(sortedTrackers));

const addTracker = (newTrac : Tracker) => { 

 setTrackers([...trackers ,  newTrac]);

 appendJson(newTrac);

}

const appendJson = ( jsonToAdd: Tracker ) => {

    // fs.readFile('trackers.json', function (err : any, data : any) {
    //     var json = JSON.parse(data)
    //     json.push('search result: ' + jsonToAdd)
    
    //     fs.writeFile("trackers.json", JSON.stringify(json), function(){

    //     })
    // })

    // var json = loadJsonaData();
    // json.push(jsonToAdd);

    // const jsonFile = "../trackers.json";
    // writeJsonFile(jsonFile, json, undefined).catch(err => console.log(err));

    //writeJsonFile('trackers.json', json);

        axios.post('http://localhost:5000/write', jsonToAdd)
            .then((response : any) => {
                console.log(response);

                console.log(response.data );
            });

    }

    const appendDeletedJson = ( Id : any ) => {

        // fs.readFile('trackers.json', function (err : any, data : any) {
        //     var json = JSON.parse(data)
        //     json.push('search result: ' + jsonToAdd)
        
        //     fs.writeFile("trackers.json", JSON.stringify(json), function(){
    
        //     })
        // })
    
        // var json = loadJsonaData();
        // json.push(jsonToAdd);
    
        // const jsonFile = "../trackers.json";
        // writeJsonFile(jsonFile, json, undefined).catch(err => console.log(err));
    
        //writeJsonFile('trackers.json', json);
    
            axios.get('http://localhost:5000/delete/' + Id )
                .then((response : any) => {
                    console.log(response);
    
                    console.log(response.data );
                });
    
        }   


const deleteTracker = (id : any) => {
    setTrackers(trackers.filter(track => track.Id !== id))

    appendDeletedJson(id);
    console.log('ID-------------------->>>>>>' + id);
}

const updateTracker = (id : any, updatedTracker : Tracker) => {

    console.log('ID-------------------->>>>>>' + id);
 

    setTrackers(trackers.map((track) => track.Id === id ? updatedTracker : track))


}

    return (
        <TrackerContext.Provider value = {{ sortedTrackers, updateTracker, addTracker,deleteTracker }}>       
            {children}
        </TrackerContext.Provider>
    )
}

export default TrackerProvider;
