const containerUser = document.getElementById("users");
const containerGame = document.getElementById("games");

document.getElementById("loginButton").addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission
    loginUser();
});

document.getElementById("submitButton").addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission
    registerUser();
});

document.getElementById("createGame").addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission
    createGame();
});

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
fetchGames();

async function fetchGames() {
    try {
        const response = await fetch("http://localhost:3000/api/games");
        const data = await response.json();
        console.log("Fetched games:", data);

        displayGames(data.games);
    } catch (error) {
        console.error("Error fetching games:", error);
    }
}

function displayUsers(users) {
    containerUser.innerHTML = ""; // Clear previous content
    users.forEach((user) => {
        const userDiv = document.createElement("div");
        userDiv.className = "user";
        userDiv.innerHTML = `
            <p>Email: ${user.email}</p>
            <p>CreatedAt: ${new Date(user.createdAt).toLocaleString()}</p>
            <button onclick="deleteUser(${user.id})">Delete User</button>
            <button onclick="createGame(${user.id})">Create Game</button>
        `;
        containerUser.appendChild(userDiv);
    });
}

function displayGames(games) {
    containerGame.innerHTML = ""; // Clear previous content
    games.forEach((game) => {
        const gameDiv = document.createElement("div");
        gameDiv.className = "game";
        gameDiv.innerHTML = `
            <p>Room Code: ${game.roomCode}</p>
            <p>Game ID: ${game.id}</p>
            <p>Game Name: ${game.name}</p>
            <p>Creator ID: ${game.creatorId}</p>
            <p>Created At: ${new Date(game.createdAt).toLocaleString()}</p>
            <button onclick="deleteGame('${game.id}')">Delete Game</button>
        `;
        containerGame.appendChild(gameDiv);
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

async function deleteGame(gameId) {
    try {
        const response = await fetch(
            `http://localhost:3000/api/game/${gameId}`,
            {
                method: "DELETE",
            }
        );
        console.log(`Deleting game with ID: ${gameId}`);

        const data = await response.json();
        fetchGames(); // Refresh the game list
    } catch (error) {
        console.error("Error deleting game:", error);
    }
}

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
        document.getElementById(
            "userId"
        ).textContent = `User ID: ${data.user.id} User Email: ${data.user.email} Created At: ${data.user.createdAt}`;
        // Redirect or update UI as needed
    } catch (error) {
        console.error("Error logging in:", error);
    }
}

async function createGame(userId) {
    const roomCode = "123456";
    try {
        const response = await fetch("http://localhost:3000/api/game", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ roomCode, userId }),
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
        fetchUsers(); // Refresh the user list
        // Update UI or redirect as needed
    } catch (error) {
        console.error("Error registering user:", error);
    }
}
