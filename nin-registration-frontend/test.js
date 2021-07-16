var fetch = require('node-fetch')

const pushToApi = () =>{
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName: 'item.firstName', lastName: 'item.lastName',
         lga: 'item.lga', stateOfOrigin: 'item.stateOfOrigin', nin: 'item.nin', dateOfBirth: new Date(),
          bvn: 'item.bvn', phoneNumber: 'item.phoneNumber', nextOfKinName: 'item.nextOfKinName'  })
  };
  fetch('http://localhost:3000/citizens', requestOptions)
      .then(response => response.json())
      .catch(error => console.log(error))
      
  }

  pushToApi()