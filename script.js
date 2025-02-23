function getOrdinal(n) {
  let s = ["th", "st", "nd", "rd"], v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
function updateTemplate(template) {
  template.querySelector("#previewPin").innerText = document.getElementById("pin").value;
  template.querySelector("#previewOr").innerText = document.getElementById("orNumber").value;
  template.querySelector("#previewRequester").innerText = document.getElementById("requester").value;
  template.querySelector("#previewApprover").innerText = document.getElementById("approver").value;
  template.querySelector("#previewAmount").innerText = document.getElementById("amount").value;
  const propertyType = document.getElementById("propertyType").value;
  template.querySelector("#previewType").innerText = propertyType.charAt(0).toUpperCase() + propertyType.slice(1);
  const rawDate = document.getElementById("date").value;
  let formattedDate = "";
  if (rawDate) {
    const dt = new Date(rawDate);
    formattedDate = dt.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  }
  template.querySelector("#previewDate").innerText = formattedDate;
}
function updateIssuedSentence(template) {
  const rawDate = document.getElementById("date").value;
  let issuedDay = "", issuedMonth = "", issuedYear = "";
  if (rawDate) {
    const dt = new Date(rawDate);
    issuedDay = getOrdinal(dt.getDate());
    issuedMonth = dt.toLocaleString("en-US", { month: "long" });
    issuedYear = dt.getFullYear();
  }
  template.querySelector("#issuedDay").innerText = issuedDay;
  template.querySelector("#issuedMonth").innerText = issuedMonth;
  template.querySelector("#issuedYear").innerText = issuedYear;
}
function updatePreview() {
  const taxContainer = document.getElementById("taxPreviewContainer");
  const noImpContainer = document.getElementById("noImpPreviewContainer");
  taxContainer.innerHTML = "";
  noImpContainer.innerHTML = "";
  const taxChecked = document.getElementById("taxDeclaration").checked;
  if (taxChecked) {
    const taxCopies = parseInt(document.getElementById("taxCopies").value) || 1;
    let taxTemplate = document.getElementById("taxPreview");
    if (!taxTemplate) {
      taxTemplate = document.createElement("div");
      taxTemplate.id = "taxPreview";
      taxTemplate.className = "document docTemplate";
      taxTemplate.style.display = "none";
      taxTemplate.innerHTML = `
            <h3 style="text-align:center;">TAX DECLARATION</h3>
            <p><strong>Property PIN:</strong> <span id="previewPin"></span></p>
            <p><strong>OR Number:</strong> <span id="previewOr"></span></p>
            <p><strong>Requester:</strong> <span id="previewRequester"></span></p>
            <p><strong>Approved By:</strong> <span id="previewApprover"></span></p>
            <p><strong>Amount:</strong> <span id="previewAmount"></span></p>
            <p><strong>Property Type:</strong> <span id="previewType"></span></p>
            <p><strong>Date:</strong> <span id="previewDate"></span></p>
            <div id="previewMachinery" style="display:none;">
              <p><strong>Machinery Details:</strong></p>
              <p>Model: XYZ-123</p>
              <p>Year: 2020</p>
              <p>Status: Operational</p>
            </div>
            <p style="text-align:right;">[Tax Declaration Footer]</p>
          `;
      document.body.appendChild(taxTemplate);
    }
    updateTemplate(taxTemplate);
    for (let i = 0; i < taxCopies; i++) {
      const page = document.createElement("div");
      page.className = "page";
      let clone = taxTemplate.cloneNode(true);
      clone.style.display = "block";
      page.appendChild(clone);
      taxContainer.appendChild(page);
    }
  }
  const noImpChecked = document.getElementById("noImprovement").checked;
  if (noImpChecked) {
    const noImpCopies = parseInt(document.getElementById("noImpCopies").value) || 1;
    let noImpTemplate = document.getElementById("noImpPreview");
    if (!noImpTemplate) {
      noImpTemplate = document.createElement("div");
      noImpTemplate.id = "noImpPreview";
      noImpTemplate.className = "document docTemplate";
      noImpTemplate.style.display = "none";
      noImpTemplate.innerHTML = `
            <h3 style="text-align:center;">CERTIFICATION OF NO IMPROVEMENT</h3>
            <p style="text-align:center;">
              Republic of the Philippines<br>
              Province of [Your Province]<br>
              Municipality of [Your Municipality]
            </p>
            <p>
              This is to certify that the property identified as PIN <strong><span id="previewPin"></span></strong> with the official receipt number <strong><span id="previewOr"></span></strong> is declared under the name of <strong><span id="previewRequester"></span></strong> and that there is <em>no improvement</em> declared on said property as of the date of issuance of this certification.
            </p>
            <p id="issuedOnText">
              Issued this <span id="issuedDay"></span> day of <span id="issuedMonth"></span>, <span id="issuedYear"></span> at [Location].
            </p>
            <hr>
            <p><strong>Property PIN:</strong> <span id="previewPin"></span></p>
            <p><strong>OR Number:</strong> <span id="previewOr"></span></p>
            <p><strong>Requester:</strong> <span id="previewRequester"></span></p>
            <p><strong>Approved By:</strong> <span id="previewApprover"></span></p>
            <p><strong>Amount:</strong> <span id="previewAmount"></span></p>
            <p><strong>Property Type:</strong> <span id="previewType"></span></p>
            <p><strong>Date:</strong> <span id="previewDate"></span></p>
            <div id="previewMachinery" style="display:none;">
              <p><strong>Machinery Details:</strong></p>
              <p>Model: XYZ-123</p>
              <p>Year: 2020</p>
              <p>Status: Operational</p>
            </div>
            <p style="text-align:right;">[No Improvement Footer]</p>
          `;
      document.body.appendChild(noImpTemplate);
    }
    updateTemplate(noImpTemplate);
    updateIssuedSentence(noImpTemplate);
    for (let i = 0; i < noImpCopies; i++) {
      const page = document.createElement("div");
      page.className = "page";
      let clone = noImpTemplate.cloneNode(true);
      clone.style.display = "block";
      page.appendChild(clone);
      noImpContainer.appendChild(page);
    }
  }
}
document.addEventListener("DOMContentLoaded", function() {
  const today = new Date().toISOString().substring(0, 10);
  document.getElementById("date").value = today;
  updatePreview();
});
document.getElementById("pin").addEventListener("input", updatePreview);
document.getElementById("orNumber").addEventListener("input", updatePreview);
document.getElementById("requester").addEventListener("input", updatePreview);
document.getElementById("amount").addEventListener("input", updatePreview);
document.getElementById("propertyType").addEventListener("change", updatePreview);
document.getElementById("date").addEventListener("input", updatePreview);
document.getElementById("taxDeclaration").addEventListener("change", updatePreview);
document.getElementById("noImprovement").addEventListener("change", updatePreview);
document.getElementById("taxCopies").addEventListener("input", updatePreview);
document.getElementById("noImpCopies").addEventListener("input", updatePreview);
document.querySelectorAll(".approver-btn").forEach(btn => {
  btn.addEventListener("click", function() {
    document.querySelectorAll(".approver-btn").forEach(b => b.classList.remove("selected"));
    this.classList.add("selected");
    const name = this.getAttribute("data-name");
    document.getElementById("approver").value = name;
    updatePreview();
  });
});
