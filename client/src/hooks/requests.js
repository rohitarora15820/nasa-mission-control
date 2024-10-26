const API_URL = "http://localhost:8000"


const httpGetPlanets = async () => {
  const response = await fetch(`${API_URL}/planets`)
 

  return await response.json()
}


async function httpGetLaunches() {
  
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {

}

// Delete launch with given ID.
async function httpAbortLaunch(id) {

}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch }
