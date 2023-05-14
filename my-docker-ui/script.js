function validateForm() {
    var id = document.getElementById("id").value;
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var gender = document.getElementById("gender").value;
    var email = document.getElementById("email").value;

    if (id == '') {
        alert("ID is required");
        return false;
    }

    if (name == '') {
        alert("Name is required");
        return false;
    }

    if (age == '') {
        alert("Age is required");
        return false;
    }
    else if (age < 1) {
        alert("Age must not be Zero or less than Zero");
        return false;
    }

    if (gender == '') {
        alert("Gender is required");
        return false;
    }

    if (email == '') {
        alert("E-Mail is required");
        return false;
    }
    else if (!email.includes('@')) {
        alert("Invalid E-Mail");
        return false;
    }
    return true;
}

function showData() {
    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    }
    else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    var html = "";
    peopleList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.id + "</td>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.gender + "</td>";
        html += "<td>" + element.email + "</td>";
        html += '<td><button onclick="deleteData(' + index + ')" class="btn btn-danger">Delete</button><button onclick="updateData(' + index + ')" class="btn btn-warning m-2">Edit</button></td>';
        html += "</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

window.onload = showData;

function AddData() {
    if (validateForm()) {
        var id = document.getElementById("id").value;
        var name = document.getElementById("name").value;
        var age = document.getElementById("age").value;
        var gender = document.getElementById("gender").value;
        var email = document.getElementById("email").value;

        // Create an object with the data to be sent to the server
        var data = {
            id: id,
            name: name,
            age: age,
            gender: gender,
            email: email
        };

        // Send an HTTP POST request to the server to add the data
        fetch('http://localhost:5000/data/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // If the data is successfully added, refresh the table
                showData();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}

function deleteData(index) {
    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    }
    else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}

function updateData(index) {
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    }
    else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    document.getElementById("id").value = peopleList[index].id;
    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("age").value = peopleList[index].age;
    document.getElementById("gender").value = peopleList[index].gender;
    document.getElementById("email").value = peopleList[index].email;

    document.querySelector("#Update").onclick = function () {
        if (validateForm() == true) {
            peopleList[index].id = document.getElementById("id").value;
            peopleList[index].name = document.getElementById("name").value;
            peopleList[index].age = document.getElementById("age").value;
            peopleList[index].gender = document.getElementById("gender").value;
            peopleList[index].email = document.getElementById("email").value;

            localStorage.setItem("peopleList", JSON.stringify(peopleList));

            showData();

            document.getElementById("id").value = "";
            document.getElementById("name").value = "";
            document.getElementById("age").value = "";
            document.getElementById("gender").value = "";
            document.getElementById("email").value = "";

            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";

        }
    }

}