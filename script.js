const express = require('express');
const fetch = require('node-fetch');
const crypto = require('crypto');
const app = express();
const port = 3000;

app.use(express.json()); // To parse JSON bodies
app.use(express.static('.')); // To serve your HTML/CSS files

// Pterodactyl API configuration
const eggid = "15";
const nestid = "5";
const loc = "1";
const domain = "https://mypanel.public-void.nusantarahost.web.id"; // <-- **CHANGE THIS**
const apikey = "ptla_nbVphesJSkjpEOL1d8nC13aSTkfpIvxbZi0FZgsIZJR"; // <-- **CHANGE THIS**

app.post('/create-server', async (req, res) => {
    const { username, plan } = req.body;

    if (!username || !plan) {
        return res.status(400).json({ error: "Username and plan are required." });
    }

    let ram, disknya, cpu;
    switch (plan) {
        case "1gb":
            ram = "1000"; disknya = "1000"; cpu = "40";
            break;
        case "2gb":
            ram = "2000"; disknya = "1000"; cpu = "60";
            break;
        case "3gb":
            ram = "3000"; disknya = "2000"; cpu = "80";
            break;
        case "4gb":
            ram = "4000"; disknya = "2000"; cpu = "100";
            break;
        case "5gb":
            ram = "5000"; disknya = "3000"; cpu = "120";
            break;
        case "6gb":
            ram = "6000"; disknya = "3000"; cpu = "140";
            break;
        case "7gb":
            ram = "7000"; disknya = "4000"; cpu = "160";
            break;
        case "8gb":
            ram = "8000"; disknya = "4000"; cpu = "180";
            break;
        case "9gb":
            ram = "9000"; disknya = "5000"; cpu = "200";
            break;
        case "10gb":
            ram = "10000"; disknya = "5000"; cpu = "220";
            break;
        default:
            return res.status(400).json({ error: "Invalid plan selected." });
    }

    const email = username + "@gmail.com";
    const name = username.charAt(0).toUpperCase() + username.slice(1) + " Server";
    const password = username + crypto.randomBytes(2).toString('hex');

    try {
        // Create User
        const userRes = await fetch(domain + "/api/application/users", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + apikey
            },
            body: JSON.stringify({
                email: email,
                username: username.toLowerCase(),
                first_name: name,
                last_name: "Server",
                language: "en",
                password: password
            })
        });
        const userData = await userRes.json();
        if (userData.errors) {
            return res.status(400).json({ error: userData.errors[0].detail });
        }
        const user = userData.attributes;
        const usr_id = user.id;

        // Get Egg Startup Command
        const eggRes = await fetch(domain + `/api/application/nests/${nestid}/eggs/${eggid}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + apikey
            }
        });
        const eggData = await eggRes.json();
        const startup_cmd = eggData.attributes.startup;

        // Create Server
        const serverRes = await fetch(domain + "/api/application/servers", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + apikey,
            },
            body: JSON.stringify({
                name: name,
                user: usr_id,
                egg: parseInt(eggid),
                docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
                startup: startup_cmd,
                environment: {
                    "INST": "npm",
                    "USER_UPLOAD": "0",
                    "AUTO_UPDATE": "0",
                    "CMD_RUN": "npm start"
                },
                limits: {
                    memory: ram,
                    swap: 0,
                    disk: disknya,
                    io: 500,
                    cpu: cpu
                },
                feature_limits: {
                    databases: 5,
                    backups: 5,
                    allocations: 5
                },
                deploy: {
                    locations: [parseInt(loc)],
                    dedicated_ip: false,
                    port_range: [],
                },
            })
        });
        const serverData = await serverRes.json();
        if (serverData.errors) {
            return res.status(400).json({ error: serverData.errors[0].detail });
        }

        // Send a detailed success message
        const responseMessage = `
🌟 AKUN PANEL ANDA 🌟
──────────────────────────────
ID Server: ${user.id}  
Nama Server: ${name}  
Username: ${user.username}  
Password: ${password}  
Login URL: ${domain}  
──────────────────────────────
⚠️ PERATURAN PENTING
──────────────────────────────
1. Dilarang menggunakan script *DDoS*
2. Dilarang membagikan link login/domain  
3. Garansi berlaku 10 hari  
    (dengan bukti transfer)

💾 Simpan data akun ini dengan *aman* & *bijak*
Kerugian akibat kelalaian bukan tanggung jawab kami.
`;
        res.status(200).json({ message: responseMessage });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An internal server error occurred." });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
