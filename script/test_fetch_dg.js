const BASE_URL_TEST = "https://testjoin-36a23-default-rtdb.europe-west1.firebasedatabase.app/user";



async function getUsers() {
    let response = await fetch(BASE_URL_TEST + ".json");
    let responseToJson = await response.json();
    console.log(responseToJson);

    // Objekt -> Array konvertieren
    let users = Object.values(responseToJson);
    console.log(users);

    let email = "csinner31@gmail.com";
    let password = "123456";

    let currentUserIndex = users.findIndex(u => u.email === email && u.password === password);
    console.log(currentUserIndex);

    let keys = Object.keys(responseToJson);

    let userPath = keys[currentUserIndex];
    console.log(userPath);
    
}