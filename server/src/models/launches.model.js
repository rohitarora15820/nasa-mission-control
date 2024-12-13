const launchesMongo = require('./launches.mongo');
const planetsMongo = require('./planets.mongo');
const axios=require('axios');

const DEFAULT_FLIGHT_NUMBER =100
const launches=new Map();


 const SPACEX_API_URL="https://api.spacexdata.com/v4/launches/query";

async function populateLaunches(){
    const response= await axios.post(SPACEX_API_URL,
        {
            query:{},
            options:{
                pagination:false,
                populate:[
                    {
                        path:"rocket",
                        select:{
                            name:1
                        }
                    },
                    {
                        path:"payloads",
                        select:{
                            customers:1
                        }
                    }
                ]
            }
        }
      );

      if(response.status != 200){
        console.log("Failed to fetch launches from SpaceX API");
        throw new Error("Failed to fetch launches from SpaceX API");
       
      }
    
      const launchDocs=response.data.docs;
    
      for(const doc of launchDocs){
        const payloads=doc['payloads'];
        const customers=payloads.flatMap((payload)=>{
            return payload['customers'];
        })
    
        const launch={
            flightNumber: doc['flight_number'],
            mission: doc['name'],
            rocket: doc['rocket']['name'],
            launchDate: doc['date_local'],
            success: doc['success'],
            upcoming: doc['upcoming'],
            customers
        };
    
        // console.log(`${launch.flightNumber} ${launch.mission}`);

        await saveLaunch(launch);
    
      }
}

async function loadLaunchData(){
 const firstLaunch=await findLaunch({
    flightNumber:1,
    rocket:"Falcon 1",
    mission:"FalsconSat"
 });

 if(firstLaunch){
    console.log("Launch Data already loaded");
 }else{
    populateLaunches();
 }
}

// launches.set(launch.flightNumber, launch);


async function findLaunch(filter){
    return await launchesMongo.findOne(filter);
}

async function existLaunhWithId(launchId) {
   return findLaunch({
    flightNumber:launchId
    });
}

async function getAllLaunches(skip,limit){
    return await launchesMongo.find({},{
        '_id':0,
        '__v':0
    })
    .sort({flightNumber:1})
    .skip(skip)
    .limit(limit);
}

async function getLatestFlightNumber(){
    const latestLaunch= await launchesMongo
    .findOne()
    .sort('-flightNumber');

    if(!latestLaunch){
        return DEFAULT_FLIGHT_NUMBER;
    }
    return latestLaunch.flightNumber;
}

async function saveLaunch(launch){
    try{

       

        await launchesMongo.findOneAndUpdate({
            flightNumber:launch.flightNumber
         },
        launch,{
            upsert:true,
        });
    }catch(e){
        console.error(`Error saving launch: ${e}`);
    }
   
}



async function scheduleNewLaunch(launch){
    const planets = await planetsMongo.findOne({
        keplerName:launch.target
    });
       if(!planets){
throw new Error(`No planet found with name: ${launch.target}`);
         }
    const newFlightNumber=await getLatestFlightNumber() +1;
    const newLaunch= Object.assign(launch,{
        flightNumber: newFlightNumber,
        upcoming: true,
        success:true,
        customers:["Nasa","Apache"]
    });

    await saveLaunch(newLaunch);
}



async function abortLaunchById(launchId){
 const aborted=  await launchesMongo.updateOne({
    flightNumber:launchId
    },
    {
        upcoming: false,
        success: false
    
   });

   return aborted;

}

module.exports ={
    loadLaunchData,
    existLaunhWithId,
    getAllLaunches,
    scheduleNewLaunch,
    abortLaunchById

    
 
}