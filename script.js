document.getElementById('serverForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById('username').value.trim();
    const size = document.getElementById('size').value;

    // Determine RAM, Disk, and CPU based on size
    let ram, disknya, cpu;

    switch (size) {
        case "1gb": ram = "1000"; disknya = "1000"; cpu = "40"; break;
        case "2gb": ram = "2000"; disknya = "1000"; cpu = "60"; break;
        case "3gb": ram = "3000"; disknya = "2000"; cpu = "80"; break;
        case "4gb": ram = "4000"; disknya = "2000"; cpu = "100"; break;
        case "5gb": ram = "5000"; disknya = "3000"; cpu = "120"; break;
        case "6gb": ram = "6000"; disknya = "3000"; cpu = "140"; break;
        case "7gb": ram = "7000"; disknya = "4000"; cpu = "160"; break;
        case "8gb": ram = "8000"; disknya = "4000"; cpu = "180"; break;
        case "9gb": ram = "9000"; disknya = "5000"; cpu = "200"; break;
        case "10gb": ram = "10000"; disknya = "5000"; cpu = "220"; break;
        case "unlimited":
        case "unli": 
        default: ram = "0"; disknya = "0"; cpu = "0"; break;
    }

    // Assuming you have the required global variables
    const global = {
        egg: "15",
        nestid: "5",
        loc: "1",
        domain: "https://yourdomain.com",
        apikey: "ptla_",
        capikey: "ptlc_"
    };

    const email = `${username.toLowerCase()}@gmail.com`;
    const name = `${capitalize(username)} Server`;
    const password = `${username}${generateRandomPassword()}`;

    // Assuming you would implement the fetch calls to create the server here
    // Here you would typically handle the server creation process with an API call
    const responseDiv = document.getElementById('response');
    
    // Simulating a successful server creation response for this example
    responseDiv.innerText = `Server created successfully! 
    ID: ${username.toLowerCase()}
    Name: ${name}
    Password: ${password}`;
});

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateRandomPassword() {
    return Math.random().toString(36).substring(2, 8); // Just for demo; you can use a better method
}
