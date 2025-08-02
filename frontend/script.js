const container = document.getElementById("users");

async function fetchUsers() {
    try {
        const response = await fetch("http://localhost:3000/api/users");
        const data = await response.json();
        console.log("Fetched users:", data);
        
        displayUsers(data.users);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

fetchUsers();

function displayUsers(users) {
    container.innerHTML = ""; // Clear previous content
    users.forEach((user) => {
        const userDiv = document.createElement("div");
        userDiv.className = "user";
        userDiv.innerHTML = `
            <p>Email: ${user.email}</p>
            <p>CreatedAt: ${new Date(user.createdAt).toLocaleString()}</p>
            <button onclick="deleteUser(${user.id})">Delete User</button>
        `;
        container.appendChild(userDiv);
    });
}

async function deleteUser(userId) {
    try {
        const response = await fetch(
            `http://localhost:3000/api/user/${userId}`,
            {
                method: "DELETE",
            }
        );
        console.log(`Deleting user with ID: ${userId}`);
        
        const data = await response.json();
        fetchUsers(); // Refresh the user list
    } catch (error) {
        console.error("Error deleting user:", error);
    }
}

document.getElementById("loginButton").addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission
    loginUser();
});

document.getElementById("submitButton").addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission
    registerUser();
});

async function loginUser() {
    const email = document.getElementById("usernameLogin").value;
    const password = document.getElementById("passwordLogin").value;
    
    try {
        const response = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        
        if (!response.ok) {
            throw new Error("Login failed");
        }
        
        const data = await response.json();
        console.log("Login successful:", data);
        localStorage.setItem("userId", data.user.id);
        document.getElementById(
            "userId"
        ).textContent = `User ID: ${data.user.id}`;
        // Redirect or update UI as needed
    } catch (error) {
        console.error("Error logging in:", error);
    }
}

document.getElementById("createGame").addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission
    createGame();
});

async function createGame() {
    const roomCode = "123456";
    const owner = "test";
    try {
        const response = await fetch("http://localhost:3000/api/game", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ roomCode, owner }),
        });
        const data = await response.json();
        console.log("Game created successfully:", data);
        // Update UI or redirect as needed
    } catch (error) {
        console.error("Error creating game:", error);
    }
}


async function registerUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
        const response = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        console.log(response);
        const data = await response.json();
        console.log("User registered successfully:", data);
        // Update UI or redirect as needed
    } catch (error) {
        console.error("Error registering user:", error);
    }
}