const http=require('http');
const mongoose=require('mongoose');
const app=require('./app');
const {loadPlanetsData}=require('./models/planets.model');
const PORT=process.env.PORT || 8000;

const MONGO_URL="mongodb+srv://nasa_user:PNI9MvVKpTjXmzPE@nasacluster.rfh6x.mongodb.net/?retryWrites=true&w=majority&appName=NASACluster";

const server=http.createServer(app);

mongoose.connection.once('open',()=>{
    console.log('MongoDB Ready!');
});
mongoose.connection.once('error',(err)=>{
    console.log(err);
 
});

async function startServer(){

   await mongoose.connect(MONGO_URL)
await loadPlanetsData();

    server.listen(PORT,()=>{
        console.log(`Listening at ${PORT}...`);
    });
}


startServer();