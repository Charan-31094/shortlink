function setCookie(cname,cvalue,exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function checkCookie() {
  let user = getCookie("email");
  if (user != "") {
    console.log(user)
k=document.getElementById("email")
k.value=user
  } 
  else {
    k=document.getElementById("email")
k.value=""}
try{
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('email');
  const name = urlParams.get('name');
  const full_url = urlParams.get('full_url');
   referral = urlParams.get('referral');
  console.log(email,name,full_url)
  if(email!=null && name!=null && full_url!=null && referral!=null){ 
  document.getElementById("nam").value=atob(name)
  document.getElementById("full_url").value=atob(full_url)
  document.getElementById("email").value=email
  document.getElementById("short_url").value=atob(name)
  }}
  catch(e){
    console.log(e)
  }

}
var referral=""

//db connection
const db = new polybase.Polybase({
  defaultNamespace: "pk/0x26b7b24287218ea9427e03112e34fb29e6603d1421903bedf5b825296f2d4f32831d76d700f243fbb768d935937675735ca28568f8604b10a33ac636a81fd9d2/links",
})
const col = db.collection("LinkData");
//get from form
function send() {
  try {
    
    a = document.getElementById("nam").value;
    b = document.getElementById('full_url').value
    c = document.getElementById('short_url').value
    d = document.getElementById('email').value
    setCookie("email", d, 30);
  }
  catch (e) {
    console.log(e)
  }
  createRecord(a, b, c, d)
  console.log("sent")
  return false;
}

//validate and post to db
async function createRecord(name, full_url, short_url, email) {

  document.getElementById("hh").innerHTML = `<strong style="color:white">Checking Availability</strong>`

  console.log(name, full_url, short_url, email)
  var date = new Date()
  var id = btoa(short_url)
  try {
    const recordData = await col.create([
      id, name, full_url, short_url, email, date,0
    ]);
    document.getElementById("hh").innerHTML = `<strong style="color:white">Shorty Created Successfully</strong>&nbsp&nbsp<a href="/${short_url}" target="_blank"">Visit</a>&nbsp&nbsp<button type="button" id="but1" class="button" onClick="copy('https://9URL.TECH/${short_url}')">https://9URL.TECH/${short_url}   Copy</button>`
    generateQRCode("https://9url.tech/"+short_url, "qrcode", 150)
    console.log(referral)
    console.log(referral=="snotes")

    if(referral=="snotes"){
      console.log("snotes")
    window.open(`${full_url}&shorturl=https://9url.tech/${short_url}`, '_blank');
  }
  }
  catch (e) {
    if (e == "Error: record id already exists in collection") {
      // alert("Short URL /"+short_url+" already exists ")
      document.getElementById("hh").innerHTML = `<strong style="color:red">Short URL  /${short_url} is taken</strong>`

    }
  }
}

//qr
function generateQRCode(link, qrCodeId, imageSize) {
  var qrCodeElement = document.getElementById(qrCodeId);
  var qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(link)}&size=${imageSize}x${imageSize}`;
  qrCodeElement.src = qrCodeURL;
  qrCodeElement.style.width = imageSize + "px";
  qrCodeElement.style.height = imageSize + "px";
}


//copy
function copy(a) {
  navigator.clipboard.writeText(a);
  var k = document.getElementById("but1")
  k.innerHTML = a+"Copied"
}




checkCookie()
