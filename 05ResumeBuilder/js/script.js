 var experienceCount = 1;
var educationCount = 1;
const skillSet = new Set();
var fileName = "";

function previewImage(event) {
  console.log("previewImage(event) <<");

  console.log(typeof event);
  var imagePreview = document.getElementById("image-preview");

  if (event.target.files[0]) {
    imagePreview.src = URL.createObjectURL(event.target.files[0]);
    imagePreview.style.display = "block";
    imagePreview.onload = function () {
      URL.revokeObjectURL(imagePreview.src);
    };
  }

  console.log("previewImage(event) >>");
}

function addskill() {
  console.log("addSkill() <<");
  if (document.querySelector("#skill-input").value.length == 0) {
    alert("Please enter a skill");
  } else {
    var skillValue = document.querySelector("#skill-input").value;
    if (skillSet.has(skillValue)) {
      alert("Skill already exists");
      return;
    }

    skillSet.add(skillValue);

    document.querySelector("#skills").innerHTML += `
      <div class="skill mt-1">
        <span class="skill-name">${skillValue}</span>
        <button class="btn btn-outline-danger delete" onclick="deleteSkill(this)">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>`;
  }
  console.log("addSkill() >>");
}

function deleteSkill(button) {
  console.log("deleteSkill() <<");
  var skillName = button.previousElementSibling.textContent;
  skillSet.delete(skillName);
  button.parentElement.remove();
  console.log("deleteSkill() >>");
}

   
    
  
function addWorkExperience() {
  console.log("addWorkExperience() <<");

  let newNode = document.createElement("textarea");
  newNode.classList.add("form-control", "we-field", "mt-1");
  newNode.setAttribute("rows", 3);
  newNode.setAttribute("id", "experience-" + ++experienceCount);
  newNode.setAttribute(
    "placeholder",
    "Enter work/project experience -" + experienceCount
  );

  let experienceDiv = document.getElementById("experience-div");
  let experienceAddButtonsDiv = document.getElementById("we-btns-div");
  let weDelBtn = document.getElementById("we-del-btn");

  experienceDiv.insertBefore(newNode, experienceAddButtonsDiv);
  console.log("addWorkExperience() >>");
}

function removeWorkExperience() {
  console.log("removeWorkExperience() <<");
  let latestExperience = document.getElementById("experience-" + experienceCount);
  latestExperience.remove();

  --experienceCount;

  console.log("removeWorkExperience() >>");
}

function addEducation() {
  console.log("addEducation() <<");

  let newNode = document.createElement("textarea");
  newNode.classList.add("form-control", "ed-field", "mt-1");
  newNode.setAttribute("rows", 3);
  newNode.setAttribute("id", "education-" + ++educationCount);
  newNode.setAttribute("placeholder", "Enter education details -" + educationCount);

  let educationDiv = document.getElementById("education-div");
  let educationAddButtonsDiv = document.getElementById("ed-btns-div");
  let edDelBtn = document.getElementById("ed-del-btn");

  educationDiv.insertBefore(newNode, educationAddButtonsDiv);
  console.log("addEducation() >>");
}

function removeEducation() {
  console.log("removeEducation() <<");
  let latestEducation = document.getElementById("education-" + educationCount);
  latestEducation.remove();
  --educationCount;
  console.log("removeEducation() >>");
}

function startOver() {
  console.log("startOver() <<");
  location.reload();
  console.log("startOver() >>");
}

function generateResume() {
  console.log("generateResume() <<");

  let fullName = document.getElementById("full-name").value;
  let fullNameTemplate = document.getElementById("full-name-template");
  fullNameTemplate.innerHTML = fullName;

  let dob = document.getElementById("dob").value;
  let dobTemplate = document.getElementById("dob-template");
  dobTemplate.innerHTML = dob;

  let address = document.getElementById("address").value;
  let addressTemplate = document.getElementById("address-template");
  addressTemplate.innerHTML = address;

  let email = document.getElementById("email").value;
  let emailTemplate = document.getElementById("email-template");
  emailTemplate.innerHTML = email;

  let phone = document.getElementById("phone").value;
  let phoneTemplate = document.getElementById("phone-template");
  phoneTemplate.innerHTML = phone;

  let linkedin = document.getElementById("linkedin").value;
  console.log(linkedin)
  let linkedinTemplate = document.getElementById("linkedin-template");
  console.log(linkedinTemplate)
  linkedinTemplate.href = linkedin;
  linkedinTemplate.innerHTML = linkedin;

  let github = document.getElementById("github").value;
  let githubTemplate = document.getElementById("github-template");
  githubTemplate.href = github;
  githubTemplate.innerHTML = github;

  let objective = document.getElementById("objective").value;
  let objectiveTemplate = document.getElementById("objective-template");
  objectiveTemplate.innerHTML = objective;

  // Skills Template
  let skillSetString = "";
  for (let skill of skillSet) {
    skillSetString += `<span class="badge rounded-pill bg-secondary skill-pill">${skill}</span>`;
  }
  let skillsTemplate = document.getElementById("skill-template-div");
  skillsTemplate.innerHTML = skillSetString;

  // Work Experience Template
  let experiences = document.getElementsByClassName("we-field");
  let experiencesListString = "";

  for (let experience of experiences) {
    experiencesListString += `<li>${experience.value}</li>`;
  }

  let experiencesTemplate = document.getElementById("we-template");
  experiencesTemplate.innerHTML = experiencesListString;

  // Education Template
  let academicQualifications = document.getElementsByClassName("ed-field");
  let academicQualificationsString = "";

  for (let qualification of academicQualifications) {
    academicQualificationsString += `<li>${qualification.value}</li>`;
  }

  let edTemplate = document.getElementById("ed-template");
  edTemplate.innerHTML = academicQualificationsString;

  // Profile Picture
  let file = document.getElementById("profile-img").files[0];
  console.log(file)
  if (file == undefined) {
    console.log("File not selected");
  } else {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    console.log(file)
    reader.onloadend = function () {
      document.getElementById("profile-img-template").src = reader.result;
    };
  }

  // Unhiding the resume template
  document.getElementById("resume-template").style.display = "block";
  document.getElementById("save-btn").style.display = "block";

  // Hiding the resume form
  document.getElementById("resume-form").style.display = "none";

  console.log("generateResume() >>");
}

function printResume(templateID) {
  console.log("printResume() <<");
  var printContent = document.getElementById(templateID).innerHTML;
  var originalContent = document.body.innerHTML;
  document.body.innerHTML = printContent;
  window.print();
  document.body.innerHTML = originalContent;
  console.log("printResume() >>");
}
