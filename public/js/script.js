// ===============================
// SIGNUP PROCESS
// ===============================

const sign = document.getElementById("signupform");

if (sign){
sign.addEventListener("submit", async function (e) {

e.preventDefault();

const name = document.getElementById("name").value;
const mobile = document.getElementById("mobile").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

try{

const response = await fetch("/api/auth/signup",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
name:name,
mobile:mobile,
email:email,
password:password
})
});

const data = await response.json();

if(response.ok){
alert("Signup Successful");
window.location.href="dashboard.html";
}else{
alert(data.msg || "Signup Failed");
}

}catch(error){
console.log(error);
alert("Server Error");
}

});
}


// ===============================
// ADMIN DASHBOARD DATA
// ===============================

const adminTable = document.getElementById("adminTable");

if(adminTable){

fetch("/api/auth/all-users")

.then(res => res.json())

.then(data => {

adminTable.innerHTML = ""; // purana data clear

data.forEach((user,index) => {

const row = document.createElement("tr");

row.innerHTML = `
<td>${index + 1}</td>
<td>${user.Fullname || ""}</td>
<td>${user.mobile || ""}</td>
<td>${user.email || ""}</td>
<td>${user.address || ""}</td>
`;

adminTable.appendChild(row);

});

})

.catch(err => {
console.log("Error loading users:", err);
});

}


// ===============================
// LOGIN PROCESS
// ===============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

loginForm.addEventListener("submit", async function(e){

e.preventDefault();

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

try{

const response = await fetch("/api/auth/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({
email:email,
password:password
})

});

const data = await response.json();

if(data.token){

localStorage.setItem("token", data.token);
localStorage.setItem("role", data.role);

alert("Login Successful");

if(data.role === "admin"){
window.location.href="admin.html";
}else{
window.location.href="dashboard.html";
}

}else{

alert(data.msg || "Login Failed");

}

}catch(error){

console.log(error);
alert("Server error");

}

});

}


// ===============================
// NAVBAR CHANGE AFTER LOGIN
// ===============================

const navbar = document.getElementById("navbar");

if(navbar){

const role = localStorage.getItem("role");

if(role === "user"){

navbar.innerHTML = `
<a href="index.html">Home</a>
<a href="dashboard.html">User Dashboard</a>
<a href="#" onclick="logout()">Logout</a>
`;

}

if(role === "admin"){

navbar.innerHTML = `
<a href="index.html">Home</a>
<a href="admin.html">Admin Dashboard</a>
<a href="#" onclick="logout()">Logout</a>
`;

}

}


// ===============================
// LOGOUT
// ===============================

function logout(){

localStorage.removeItem("token");
localStorage.removeItem("role");

alert("Logged out");

window.location.href="login.html";

}


// ===============================
// USER INFO FORM
// ===============================

const infoForm = document.getElementById("infoForm");

if(infoForm){

infoForm.addEventListener("submit", async function(e){

e.preventDefault();

const name = document.getElementById("name").value;
const mobile = document.getElementById("mobile").value;
const email = document.getElementById("email").value;
const address = document.getElementById("address").value;

console.log(name, mobile, email, address);

const response = await fetch("/api/auth/submit-info",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({
name,
mobile,
email,
address
})

});

const data = await response.json();

alert(data.msg);

});

}