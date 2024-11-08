const request=require('supertest');
const app=require('../../app');

describe('Test Get Request launches API', () => {
    test('should respond to 200', () => {
       const response=request(app)
       .get('/launches')
       .expect('Content-Type', /json/)
       .expect(200);
      
    })
      
})


describe('Test POST Launch Api',()=>{
    const launchData={
        mission:"Explored A233",
        rocket:"NCC 1701-D",
        target:"Mars",
        launchDate:"24 January, 2089"
    };

    const launchDataWithoutDate={
        mission:"Explored A233",
        rocket:"NCC 1701-D",
        target:"Mars"
    };

    test('should respond to 201 Created Request',async () => {
      const response=await request(app)
       .post('/launches')
       .send(launchData)
       .expect("Content-Type", /json/)
       .expect(201);

       const requestDate=new Date(launchData.launchDate).valueOf();
       const responseDate=new Date(response.body.launchDate).valueOf();

       expect(responseDate).toBe(requestDate);
       expect(response.body).toMatchObject(launchDataWithoutDate);

    });
    
})


