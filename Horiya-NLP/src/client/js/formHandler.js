// Replace checkForName with a function that checks the URL
import { checkForName } from './nameChecker'
import { isUrlValid } from './urlvalidate'

// If working on Udacity workspace, update this with the Server API URL e.g. `https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api`
// const serverURL = 'https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api'
const serverURL = 'https://localhost:8000/api'

const form = document.getElementById('urlForm');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    // Get the URL from the input field
    const formText = document.getElementById('name').value;
    console.log("The url",formText)

    // This is an example code that checks the submitted name. You may remove it from your code
    //checkForName(formText);
    
    // Check if the URL is valid
 
        // If the URL is valid, send it to the server using the serverURL constant above
        if(isUrlValid(formText)){
            console.log("url valid")
            postData('/analyze-url', {url:formText}).then((resData)=>showResults(resData));
        }else{
            console.log("url not valid")
        }
      
}

// Function to send data to the server

const postData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });
  
      try {
        const newData = await response.json();
        console.log("recieve response from server",newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }
  function showResults(data){
    const results = document.getElementById("results")
    results.innerHTML = '${data.sentiment}'
  }

// Export the handleSubmit function
export { handleSubmit };

