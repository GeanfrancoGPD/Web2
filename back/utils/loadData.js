<<<<<<< HEAD
=======
import { load } from "@grpc/proto-loader";
>>>>>>> 68f7f96574ec336f081a010ad560ac12549b61e8
import { SERVER_URL } from "../config.js";

export const loadData = async () => {
  const postProfiles = (profiles) => {
    profiles.forEach(async (profile) => {
      await fetch(`${SERVER_URL}/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: profile })
      })
      .then(response => response.json())
      .then(data => {
        console.log('Profile posted:', data);
      })
      .catch(error => {
        console.error('Error posting profile:', error);
      })
    })
  }
  
  const printProfiles = async () => {
    await fetch(`${SERVER_URL}/profiles`,
      { method: 'GET' }
    )
      .then(response => response.json())
      .then(data => {
        console.log('All profiles:', data);
      })
      .catch(error => {
        console.error('Error fetching profiles:', error);
      })
  }
<<<<<<< HEAD

  const printAllUsers = async () => {
    await fetch(`${SERVER_URL}/users`,
      { method: 'GET' }
    )
      .then(response => response.json())
      .then(data => {
        console.log('All users:', data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      })
  }
=======
>>>>>>> 68f7f96574ec336f081a010ad560ac12549b61e8
  

  // Llamadas
  
  // const profiles = ['administrador de seguridad', 'administrador de eventos', 'participante']
  // await postProfiles(profiles);
  // await printProfiles();
<<<<<<< HEAD
  await printAllUsers();
=======
>>>>>>> 68f7f96574ec336f081a010ad560ac12549b61e8
}

loadData();