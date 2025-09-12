document.getElementById('create-server-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const plan = document.getElementById('plan').value;
    const responseDiv = document.getElementById('response-message');
    
    // Clear previous messages
    responseDiv.innerHTML = 'Creating server...';

    try {
        const response = await fetch('/create-server', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, plan }),
        });

        const data = await response.json();

        if (response.ok) {
            responseDiv.style.backgroundColor = '#d4edda';
            responseDiv.style.color = '#155724';
            responseDiv.innerHTML = data.message;
        } else {
            responseDiv.style.backgroundColor = '#f8d7da';
            responseDiv.style.color = '#721c24';
            responseDiv.innerHTML = `Error: ${data.error}`;
        }
    } catch (error) {
        responseDiv.style.backgroundColor = '#f8d7da';
        responseDiv.style.color = '#721c24';
        responseDiv.innerHTML = `Error: Could not connect to the server.`;
    }
});
