const {parse} = require("csv-parse");
const path=require("path");
const fs = require("fs");
const results = [];


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
        .on("data", (data) => {
          if(isHabitablePlanets(data)){
            results.push(data);
          }
        
        })
        .on("error", (err) => {
          console.error(err);
          reject(err);
        })
        .on("end", () => {
     
          console.log(`${results.length} Habitable Planet Found`);
      resolve();
        });
       
    }
    )

}

function getAllPlanets(){
  return results;
 
}




  module.exports={
    loadPlanetsData,
    getAllPlanets   
  };