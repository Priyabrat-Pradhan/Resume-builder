let uploadedImage = null;

document.getElementById("profile-pic").addEventListener("change", function () {
  const reader = new FileReader();
  reader.onload = function (e) {
    uploadedImage = e.target.result;
    const preview = document.getElementById("profile-preview");
    preview.src = uploadedImage;
    preview.style.display = "block";
  };
  reader.readAsDataURL(this.files[0]);
});

function addProject() {
  const container = document.getElementById('projects-container');
  const group = document.createElement('div');
  group.classList.add('project-group');
  group.innerHTML = `
    <input type="text" class="project-title" placeholder="Project Title" required>
    <input type="text" class="project-desc" placeholder="Short Description" required>
    <button type="button" class="secondary" onclick="removeProject(this)">Remove</button>
  `;
  container.appendChild(group);
}

function removeProject(btn) {
  btn.parentElement.remove();
}

function addCertification() {
  const container = document.getElementById('certifications-container');
  const group = document.createElement('div');
  group.classList.add('cert-group');
  group.innerHTML = `
    <input type="text" class="cert-name" placeholder="Certification Name" required>
    <input type="text" class="cert-org" placeholder="Issuing Organization" required>
    <button type="button" class="secondary" onclick="removeCertification(this)">Remove</button>
  `;
  container.appendChild(group);
}

function removeCertification(btn) {
  btn.parentElement.remove();
}

function generateResume() {
  document.getElementById("p-name").innerText = document.getElementById("name").value;
  document.getElementById("p-email").innerText = document.getElementById("email").value;
  document.getElementById("p-phone").innerText = document.getElementById("phone").value;
  document.getElementById("p-address").innerText = document.getElementById("address").value;


const edu = `${document.getElementById("degree").value}, ${document.getElementById("institute").value} (${document.getElementById("edu-year").value}) - CGPA: ${document.getElementById("cgpa").value}`;
   document.getElementById("p-edu").innerText = edu;

  const exp = `${document.getElementById("job-title").value} at ${document.getElementById("company").value} (${document.getElementById("exp-duration").value})`;
  document.getElementById("p-exp").innerText = exp;

  document.getElementById("p-skills").innerText = document.getElementById("skills").value;

  // Projects
  const pProjects = document.getElementById("p-projects");
  pProjects.innerHTML = "";
  document.querySelectorAll(".project-group").forEach(group => {
    const title = group.querySelector(".project-title").value;
    const desc = group.querySelector(".project-desc").value;
    const projItem = document.createElement("p");
    projItem.textContent = `${title}: ${desc}`;
    pProjects.appendChild(projItem);
  });

  // Certifications
  const pCerts = document.getElementById("p-certs");
  pCerts.innerHTML = "";
  document.querySelectorAll(".cert-group").forEach(group => {
    const name = group.querySelector(".cert-name").value;
    const org = group.querySelector(".cert-org").value;
    const certItem = document.createElement("p");
    certItem.textContent = `${name} - ${org}`;
    pCerts.appendChild(certItem);
  });
}

function downloadPDF() {
  const resume = document.getElementById("resume-preview");
  
  html2canvas(resume).then(canvas => {
    const imgData = canvas.toDataURL("image/png");
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const margin = 10; // black border thickness
    const contentWidth = pdfWidth - margin * 2;
    const contentHeight = (canvas.height * contentWidth) / canvas.width;

    // Add black rectangle border
    pdf.setDrawColor(0); // Black color
    pdf.setLineWidth(2); // Thickness of the border
    pdf.rect(margin / 2, margin / 2, pdfWidth - margin, pdfHeight - margin); // Draw rectangle

    // Add the resume image inside the margin
    pdf.addImage(imgData, 'PNG', margin, margin, contentWidth, contentHeight);

    pdf.save("Resume.pdf");
  });
}
