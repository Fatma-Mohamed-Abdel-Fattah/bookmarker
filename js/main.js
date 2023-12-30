var siteNameInput = document.getElementById("siteNameInput");
var siteUrlInput = document.getElementById("siteUrlInput");
var searchInput = document.getElementById("searchInput");
var allList = [];
var addBtn=document.getElementById("addBtn")
var updateBtn=document.getElementById("updateBtn")
var indexUpdate=0
if (localStorage.getItem("book marker") != null) {
   allList = JSON.parse(localStorage.getItem("book marker"));
   displayItem();
}

function addItem() {
   if (validationWebsiteName() == true && validationUrl()==true) {
      var list = {
         name: siteNameInput.value,
         url: siteUrlInput.value
      };
      allList.push(list);
      localStorage.setItem("book marker", JSON.stringify(allList));
      displayItem();
      clear();
      siteNameInput.classList.remove("is-valid");
   }
else {
   var htmlContent = `
      <div class="text-start">
       <ul class="my-rules">
       <li><i class="fa-solid fa-circle-right text-danger "></i>Site name must contain at least 2 characters</li>
       <li><i class="fa-solid fa-circle-right text-danger "></i>Site URL must be a valid one it must contain http:</li></ul>
      </div>`
   Swal.fire({
      title: "<p> Site Name or Url is not valid, Please follow the rules below :</p>",
     
      html:htmlContent
    });
}
}

// display
function displayItem() {
   var cartona = "";
   for (var i = 0; i < allList.length; i++) {
      cartona += `<tr>
         <td>${i}</td>
         <td>${allList[i].name}</td>
         <td><a  class="btn btn-primary" href="${allList[i].url}" ><i class="fa-solid fa-eye pe-2"></i>Visit</a
      >
         </td>
         <td><a onclick="deleteItem(${i});"  class="btn btn-danger" href="#"role="button">Delete</a
         >
         </td>
         <td><button onclick="setBookMarker(${i});" class="btn  btn-success">Update</button></td>
      </tr>`;
   }
   document.getElementById("tableBody").innerHTML = cartona;
}
// clear
function clear() {
   siteNameInput.value = "";
   siteUrlInput.value = "";
}
// Delete
function deleteItem(index) {
   allList.splice(index, 1);
   localStorage.setItem("book marker", JSON.stringify(allList));
   displayItem();
}
// search
function search(){
   var text=searchInput.value;
   var cartona="";
   for(var i =0;i<allList.length;i++) {
   if(allList[i].name.toLowerCase().includes(text.toLowerCase())) {
      cartona += `<tr>
      <td>${i}</td>
      <td>${allList[i].name}</td>
      <td><a  class="btn btn-primary" href="${allList[i].url}" ><i class="fa-solid fa-eye pe-2"></i>Visit</a
      >
      </td>
      <td><a onclick="deleteItem(${i});"  class="btn btn-danger" href="#"role="button">Delete</a
      >
      </td>
      <td><button onclick="setBookMarker(${i});" class="btn btn-success">Update</button></td>
   </tr>`;
   }
   document.getElementById("tableBody").innerHTML = cartona;
   }
}

var nameMessage = document.getElementById("nameMessage");
var nameMessageUrl = document.getElementById("nameMessageUrl");
function validationWebsiteName() {
   var websiteName = siteNameInput.value;
   var regexName =/^[A-Za-z\s.'-]{2,50}$/;
   console.log(regexName.test(websiteName));
   if (regexName.test(websiteName)) {
      siteNameInput.classList.add("is-valid");
      siteNameInput.classList.remove("is-invalid");
      nameMessage.classList.add("d-none");
      return true;
   } else {
      siteNameInput.classList.add("is-invalid");
      siteNameInput.classList.remove("is-valid");
      nameMessage.classList.remove("d-none");
      return false;
   }
}

function validationUrl() {
   var urlValue = siteUrlInput.value;
      var urlRegex = /(?:https?|ftp):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/g;
      if (urlRegex.test(urlValue)) {
         siteUrlInput.classList.add("is-valid");
         siteUrlInput.classList.remove("is-invalid")
         nameMessageUrl.classList.add("d-none");
         return true;
      }
      else {
         siteUrlInput.classList.remove("is-valid");
         siteUrlInput.classList.add("is-invalid");
         nameMessageUrl.classList.remove("d-none");
         return false;
      }
}

function setBookMarker(index) {
   indexUpdate=index;
   var currentBook=allList[index];
   siteNameInput.value=currentBook.name;
   siteUrlInput.value=currentBook.url;
   addBtn.classList.add('d-none')
   updateBtn.classList.remove('d-none')
}
function updateBook() {
   var list = {
      name: siteNameInput.value,
      url: siteUrlInput.value
   };
   allList.splice(indexUpdate,1,list)
   localStorage.setItem("book marker", JSON.stringify(allList));
   displayItem();
   updateBtn.classList.add("d-none")
   addBtn.classList.remove("d-none")
   clear()
}