const apiUrl = "https://end-of-phase-2.onrender.com";  // Replace with your JSON-server URL

// Function to get all babysitters and display them
async function getBabysitters() {
    try {
        const response = await fetch(`${apiUrl}/babysitters`);
        const data = await response.json();
        console.log("Babysitters: ", data);
        displayBabysitters(data); // Display babysitters in the DOM
    } catch (error) {
        console.error("Error fetching babysitters: ", error);
    }
}

// Function to display babysitters in the DOM
function displayBabysitters(babysitters) {
    const babysitterList = document.getElementById('babysitterList');
    babysitterList.innerHTML = ''; // Clear the list first
    babysitters.forEach(babysitter => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${babysitter.name}</strong> (Age: ${babysitter.age}) 
            <button class="update-btn" data-id="${babysitter.id}">Update</button>
            <button class="delete-btn" data-id="${babysitter.id}">Delete</button>
        `;
        babysitterList.appendChild(listItem);
    });

    // Add event listeners for update and delete buttons
    document.querySelectorAll('.update-btn').forEach(button => {
        button.addEventListener('click', function () {
            const babysitterId = this.getAttribute('data-id');
            const updatedBabysitter = {
                name: prompt("Enter new name:"),
                age: prompt("Enter new age:"),
                email: prompt("Enter new email:"),
                phone: prompt("Enter new phone:"),
                experience: prompt("Enter new experience:")
            };
            updateBabysitter(babysitterId, updatedBabysitter);
        });
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function () {
            const babysitterId = this.getAttribute('data-id');
            deleteBabysitter(babysitterId);
        });
    });
}

// Function to update babysitter
async function updateBabysitter(id, updatedBabysitter) {
    try {
        const response = await fetch(`${apiUrl}/babysitters/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedBabysitter)
        });
        const updatedData = await response.json();
        console.log("Babysitter updated: ", updatedData);
        getBabysitters();  // Refresh the list after updating
    } catch (error) {
        console.error("Error updating babysitter: ", error);
    }
}

// Function to delete babysitter
async function deleteBabysitter(id) {
    try {
        await fetch(`${apiUrl}/babysitters/${id}`, {
            method: "DELETE"
        });
        console.log(`Babysitter with ID ${id} deleted.`);
        getBabysitters();  // Refresh the list after deleting
    } catch (error) {
        console.error("Error deleting babysitter: ", error);
    }
}

// Function to get all children and display them
async function getChildren() {
    try {
        const response = await fetch(`${apiUrl}/children`);
        const data = await response.json();
        console.log("Children: ", data);
        displayChildren(data); // Display children in the DOM
    } catch (error) {
        console.error("Error fetching children: ", error);
    }
}

// Function to display children in the DOM
function displayChildren(children) {
    const childList = document.getElementById('childList');
    childList.innerHTML = ''; // Clear the list first
    children.forEach(child => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${child.name}</strong> (Age: ${child.age}) 
            <button class="update-btn" data-id="${child.id}">Update</button>
            <button class="delete-btn" data-id="${child.id}">Delete</button>
        `;
        childList.appendChild(listItem);
    });

    // Add event listeners for update and delete buttons
    document.querySelectorAll('.update-btn').forEach(button => {
        button.addEventListener('click', function () {
            const childId = this.getAttribute('data-id');
            const updatedChild = {
                name: prompt("Enter new name:"),
                age: prompt("Enter new age:"),
                enrollmentDate: prompt("Enter new enrollment date:"),
                motherContact: prompt("Enter new mother contact:"),
                fatherContact: prompt("Enter new father contact:"),
                sickness: prompt("Enter new sickness details:")
            };
            updateChild(childId, updatedChild);
        });
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function () {
            const childId = this.getAttribute('data-id');
            deleteChild(childId);
        });
    });
}

// Function to update child
async function updateChild(id, updatedChild) {
    try {
        const response = await fetch(`${apiUrl}/children/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedChild)
        });
        const updatedData = await response.json();
        console.log("Child updated: ", updatedData);
        getChildren();  // Refresh the list after updating
    } catch (error) {
        console.error("Error updating child: ", error);
    }
}

// Function to delete child
async function deleteChild(id) {
    try {
        await fetch(`${apiUrl}/children/${id}`, {
            method: "DELETE"
        });
        console.log(`Child with ID ${id} deleted.`);
        getChildren();  // Refresh the list after deleting
    } catch (error) {
        console.error("Error deleting child: ", error);
    }
}

// Event listeners for adding new babysitter and child
document.getElementById("submitBabysitter").addEventListener("click", function () {
    const babysitter = {
        name: document.getElementById("babysitterName").value,
        age: document.getElementById("babysitterAge").value,
        email: document.getElementById("babysitterEmail").value,
        phone: document.getElementById("babysitterPhone").value,
        experience: document.getElementById("babysitterExperience").value,
    };
    addBabysitter(babysitter);
});

document.getElementById("submitChild").addEventListener("click", function () {
    const child = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        enrollmentDate: document.getElementById("enrollmentDate").value,
        motherContact: document.getElementById("motherContact").value,
        fatherContact: document.getElementById("fatherContact").value,
        sickness: document.getElementById("sickness").value,
    };
    addChild(child);
});

// Function to add a new babysitter
async function addBabysitter(babysitter) {
    try {
        const response = await fetch(`${apiUrl}/babysitters`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(babysitter)
        });
        const newBabysitter = await response.json();
        console.log("New Babysitter added: ", newBabysitter);
        getBabysitters(); // Refresh list after adding
    } catch (error) {
        console.error("Error adding babysitter: ", error);
    }
}

// Function to add a new child
async function addChild(child) {
    try {
        const response = await fetch(`${apiUrl}/children`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(child)
        });
        const newChild = await response.json();
        console.log("New Child added: ", newChild);
        getChildren(); // Refresh list after adding
    } catch (error) {
        console.error("Error adding child: ", error);
    }
}

// Initialize data on page load
document.addEventListener("DOMContentLoaded", function () {
    getBabysitters();
    getChildren();
});
