const {parse} = require("csv-parse");
const path=require("path");
const fs = require("fs");

const planets=require("./planets.mongo");



function isHabitablePlanets(planet){
 return planet["koi_disposition"] === "CONFIRMED"
  && planet["koi_insol"] > 0.36 && planet["koi_insol"] < 1.11
  && planet["koi_prad"] < 1.6;
}

function loadPlanetsData(){

    return new Promise((resolve,reject)=>
    {
        fs.createReadStream(path.join(__dirname,"..","..","data","kepler_data.csv"))
        .pipe(parse({
            comment: "#",
            columns: true,
        }))
        .on("data",async (data) => {
          if(isHabitablePlanets(data)){
           await savePlanet(data);
          }
        
        })
        .on("error", (err) => {
          console.error(err);
          reject(err);
        })
        .on("end", async() => {
          const countPlanetsFromMongo=(await getAllPlanets()).length;
     
          console.log(`${countPlanetsFromMongo} Habitable Planet Found`);
      resolve();
        });
       
    }
    )

}

async function getAllPlanets(){
  return await planets.find({},{
    '_id':0,
    '__v':0
});
 
}


 async function savePlanet(planet){
  try{
  await planets.updateOne({
      keplerName:planet.kepler_name,
    },{
      keplerName:planet.kepler_name,
    },
      {
        //updateOnly if present
        upsert:true,
      } 
  );

  }catch(e){
    console.error(`Error saving planets: ${e}`);
  }

}




  module.exports={
    loadPlanetsData,
    getAllPlanets   
  };