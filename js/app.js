
// Student Id for Delete and Update
var studentId = null;

function Student(studentName, studentAge, studentContact, guardianName, guardianAddress, guardianContact){
    this.studentName = studentName;
    this.studentAge = studentAge;
    this.studentContact = studentContact;
    this.guardianName = guardianName;
    this.guardianAddress = guardianAddress;
    this.guardianContact = guardianContact;
}

// clear text fields
function Clear(){
    const guardianAddress = document.getElementById("guardian_address");     
    const guardianContact = document.getElementById("guardian_contact"); 
    const guardianName = document.getElementById("guardian_name");    
    const studentAge = document.getElementById("student_age");          
    const studentContact = document.getElementById("student_contact");
    const studentName = document.getElementById("student_name");

    guardianAddress.value = "";
    guardianContact.value = "";
    guardianName.value = "";
    studentAge.value = "";
    studentContact.value = "";
    studentName.value = "";
    
}

// enter a student to database
function Submit(){
    console.log("submit");
    const guardianAddress = document.getElementById("guardian_address").value;     
    const guardianContact = document.getElementById("guardian_contact").value; 
    const guardianName = document.getElementById("guardian_name").value;    
    const studentAge = document.getElementById("student_age").value;          
    const studentContact = document.getElementById("student_contact").value;
    const studentName = document.getElementById("student_name").value;

    const student = new Student(studentName, studentAge, studentContact, guardianName, guardianAddress, guardianContact);

    const jsonObj = JSON.stringify(student);
    console.log(jsonObj);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOption = {
        method: 'POST',
        headers: myHeaders,
        body: jsonObj,
        redirect: 'follow'
    };

    fetch("http://localhost:8080/student", requestOption)
                .then(response => response.text())
                .then(result => alert("Done"))
                .catch(error => console.log('error', error));

}

// load students to table
function getStudentList(){
    console.log("getStList");
    fetch("http://localhost:8080/student")
    .then(Response => Response.json())
    .then(json => {

        let studntTable = document.getElementById('student-list');

        let tableRow = `<tr>
                        <td>Student ID</td>
                        <td>Student Name</td>
                        <td>Student Age</td>
                        <td>Student Contact</td>
                        <td>Guardian Name</td>
                        <td>Guardian Address</td>
                        <td>Guardian Contact</td>
                        <td>Button</td>
                        </tr>`;

        json.forEach(element => {
            tableRow +=
            `<tr>
                <td>${element.id}</td>
                <td>${element.studentName}</td>
                <td>${element.studentAge}</td>
                <td>${element.studentContact}</td>
                <td>${element.guardianName}</td>
                <td>${element.guardianAddress}</td>
                <td>${element.guardianContact}</td>
                <td><input type="button" data-student='${JSON.stringify(element)}' onclick="selectStudent(this)" value="Select Student" ></td>
            </tr>`
        });
        studntTable.innerHTML = tableRow;
    } )
}

// select a student from the table
function selectStudent(buttonElement) {
    
    const student = JSON.parse(buttonElement.getAttribute('data-student'));
    const message = `
        Student ID: ${student.id}
        Student Name: ${student.studentName}
        Student Age: ${student.studentAge}
        Student Contact: ${student.studentContact}
        Guardian Name: ${student.guardianName}
        Guardian Address: ${student.guardianAddress}
        Guardian Contact: ${student.guardianContact}
    `;

    studentId = student.id;
    const guardianAddress = document.getElementById("guardian_address");     
    const guardianContact = document.getElementById("guardian_contact"); 
    const guardianName = document.getElementById("guardian_name");    
    const studentAge = document.getElementById("student_age");          
    const studentContact = document.getElementById("student_contact");
    const studentName = document.getElementById("student_name");

    guardianAddress.value = student.guardianAddress;
    guardianContact.value = student.guardianContact;
    guardianName.value = student.guardianName;
    studentAge.value = student.studentAge;
    studentContact.value = student.studentContact;
    studentName.value = student.studentName;

    alert(message);
}


// delete student
function Delete(){

    const url = `http://localhost:8080/student/${studentId}`;

    var myHeaders = new Headers();

    var requestOption = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(url, requestOption)
        .then(response => {
            if (response.status === 200) {
                alert("Student deleted successfully.");
            } else if (response.status === 404) {
                alert("Student not found.");
            } 
        })
        .catch(error => console.log('error', error));
        Clear();
}   

// Update Student
function Update(){
    
    const url = `http://localhost:8080/student/${studentId}`;

    const guardianAddress = document.getElementById("guardian_address").value;     
    const guardianContact = document.getElementById("guardian_contact").value; 
    const guardianName = document.getElementById("guardian_name").value;    
    const studentAge = document.getElementById("student_age").value;          
    const studentContact = document.getElementById("student_contact").value;
    const studentName = document.getElementById("student_name").value;

    const updatedStudent  = {
        studentName: studentName,
        studentAge: studentAge,
        studentContact: studentContact,
        guardianName: guardianName,
        guardianAddress: guardianAddress,
        guardianContact: guardianContact
    };

    const jsonObj = JSON.stringify(updatedStudent );

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOption = {
        method: 'PATCH', 
        headers: myHeaders,
        body: jsonObj,
        redirect: 'follow'
    };

    fetch(url, requestOption)
        .then(response => {
            if (response.status === 200) {
                alert("Student updated successfully.");
            } else if (response.status === 404) {
                alert("Student not found.");
            }
        })
        .catch(error => console.log('error', error));
        Clear();
}

