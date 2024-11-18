// const {
//  launches   
//     }=require('./launches.mongo');

const launches=new Map();


let latestFlightNumber=100;
const launch={
    flightNumber: 100,
    mission:'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27,2030'),
    target:"Kepler-442 b",
    success: true,
    customers:['NASA','ZTM'],
    upcoming: false
};

launches.set(launch.flightNumber, launch);

function existLaunhWithId(launchId) {
   return launches.has(launchId);
}
function getAllLaunches(){
    return Array.from(launches.values());
}



function addNewLaunches(launch){
    latestFlightNumber++;
    launches.set(latestFlightNumber,
        Object.assign(launch,{
            flightNumber: latestFlightNumber,
            upcoming: true,
            success:true,
            customers:["Nasa","Apache"]
        })
    );
}

function abortLaunchById(launchId){
    const aborted=launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}

module.exports ={
    existLaunhWithId,
    getAllLaunches,
    addNewLaunches,
    abortLaunchById

    
 
}