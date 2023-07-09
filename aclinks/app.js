//cookies
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
  geturl(user)
    } 
  }


//click enter fun
var input = document.getElementById("email");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("submit_email").click();
  }
});

//db connection
const db = new polybase.Polybase({
    defaultNamespace: "pk/0x26b7b24287218ea9427e03112e34fb29e6603d1421903bedf5b825296f2d4f32831d76d700f243fbb768d935937675735ca28568f8604b10a33ac636a81fd9d2/links",
})
const col = db.collection("LinkData");

function geturl(email)
{
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (input.match(validRegex)) {
          alert("Valid email address!");
        } else { alert("Invalid email address!");}
      
      }





//find records
async function geturl(email) {
    document.getElementById("submit_email").disabled = true;

    document.getElementById("loader").innerHTML='<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'
    try {
        const records = await col.where("email", "==", email).get();
        let s = records
        console.log(s)
        tabu(s.data)
        
    }
    catch (e) { console.log(e);     document.getElementById("loader").innerHTML=`<p>No Url's found please verify your email`
}
}




//delete link
async function deleteRecord(cid) {
  try {
    const recordData = await col
      .record(cid)
      .call("deleteLink", []);
    console.log(recordData);
  }
  catch (err) { console.log(err)}
}

function deleteCard(button,a) {
  var cardContainer = button.closest(".card");
  cardContainer.remove();
  deleteRecord(a)
  console.log(a);
}

function generateRandomImageLink() {
  var randomImages = [
      "https://img.freepik.com/free-photo/cream-smooth-textured-paper-background_53876-101819.jpg?size=626&ext=jpg&ga=GA1.2.2080235410.1688872253&semt=ais",
      "https://img.freepik.com/free-photo/white-texture_1160-788.jpg?size=626&ext=jpg&ga=GA1.2.2080235410.1688872253&semt=ais",
      "https://img.freepik.com/free-photo/blue-cotton-fabric_53876-88939.jpg?size=626&ext=jpg&ga=GA1.2.2080235410.1688872253&semt=ais",
      "https://img.freepik.com/free-photo/cardboard-wallpaper-template_1194-6785.jpg?size=626&ext=jpg&ga=GA1.1.2080235410.1688872253&semt=ais",
      "https://img.freepik.com/free-photo/blue-smooth-wall-textured-background_53876-106133.jpg?size=626&ext=jpg",
      "https://img.freepik.com/free-vector/grunge-watercolor-background-using-pastel-colours_1048-6530.jpg?size=626&ext=jpg&ga=GA1.1.290949994.1688879249&semt=ais",
      "https://img.freepik.com/free-vector/abstract-pink-watercolor-texture-design-background_1055-14111.jpg?size=626&ext=jpg&ga=GA1.1.290949994.1688879249&semt=ais",
      "https://img.freepik.com/free-vector/white-abstract-background-3d-paper-style_23-2148398981.jpg?size=626&ext=jpg&ga=GA1.1.290949994.1688879249&semt=ais",
      "https://img.freepik.com/free-vector/watercolor-stains-abstract-background_23-2149107181.jpg?size=626&ext=jpg&ga=GA1.1.290949994.1688879249&semt=ais",
      "https://img.freepik.com/premium-photo/colorful-watercolor-grunge-texture-background-soft-background_3248-586.jpg?size=626&ext=jpg&ga=GA1.1.290949994.1688879249&semt=ais",
      "https://img.freepik.com/free-photo/3d-geometrical-texture_23-2149168862.jpg?size=626&ext=jpg&ga=GA1.1.290949994.1688879249&semt=ais",
      "https://img.freepik.com/free-photo/white-splash-ink-blue-background_1409-1757.jpg?size=626&ext=jpg&ga=GA1.1.290949994.1688879249&semt=ais",
      "https://img.freepik.com/free-vector/watercolor-background_91008-2.jpg?size=626&ext=jpg&ga=GA1.1.290949994.1688879249&semt=ais",
      "https://img.freepik.com/premium-vector/white-abstract-texture-background_745217-602.jpg?size=626&ext=jpg&ga=GA1.1.290949994.1688879249&semt=ais"
  ];

  var randomIndex = Math.floor(Math.random() * randomImages.length);
  return randomImages[randomIndex];
}

function generateQRCode(link, qrCodeId, imageSize) {
  var qrCodeElement = document.getElementById(qrCodeId);
  var qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(link)}&size=${imageSize}x${imageSize}`;
  qrCodeElement.src = qrCodeURL;
  qrCodeElement.style.width = imageSize + "px";
  qrCodeElement.style.height = imageSize + "px";
}


function initializeCard(cardId, imageId, qrCodeId, imageSize, qrCodeLink) {
  var card = document.getElementById(cardId);
  var image = document.getElementById(imageId);
  var qrCode = document.getElementById(qrCodeId);

  var randomImageLink = generateRandomImageLink();
  image.src = randomImageLink;

  generateQRCode(qrCodeLink, qrCodeId, imageSize);

  card.addEventListener("mouseover", function() {
      qrCode.style.display = "block";
  });

  card.addEventListener("mouseout", function() {
      qrCode.style.display = "none";
  });
}
//populate table


function intialize(data)
{
  data.forEach(d => {
    s=d.data
    initializeCard("c"+s.short_url, "ab"+s.short_url, "qr"+s.short_url, 100, "https://9url.tech/"+s.short_url);
  });
  var searchInput = document.getElementById("searchInput");
var cardContainers = document.getElementsByClassName("card");

searchInput.addEventListener("input", function() {
    var searchValue = searchInput.value.toLowerCase();

    Array.from(cardContainers).forEach(function(cardContainer) {
        
        var cardTitle = cardContainer.getElementsByTagName("h1")[0].innerText.toLowerCase();

        if (cardTitle.includes(searchValue)) {
            cardContainer.style.display = "block";
        } else {
            cardContainer.style.display = "none";
        }
    });
});
  document.getElementById("loader").innerHTML=``
  document.getElementById("submit_email").disabled = false;
}


function tabu(data)
{
    var n=0
    var htm=`<div class="container">
    <div class="search-bar">
        <input type="text" id="searchInput" placeholder="Search...">
    </div>
</div>


<div class="container">
<div class="card-container">`
    console.log(data.length)
    data.forEach(d => {
        n=n+1
        s=d.data
        htm=htm+`
        <div class="card" id="c${s.short_url}">
            <div class="qr-code">
                <img id="qr${s.short_url}" src="https" alt="QR Code">
            </div>
            <img id="ab${s.short_url}" src="" alt="Abstract Image">
            <h1>${s.short_url}</h1>
            <h3>No of Clicks : ${s.clicks}</h3>
            <p>${s.full_url}</p>
            <div class="button-container">
                <a href="./update/?shorty=${s.short_url}" target="_blank">Update</a>
                <button class="delete-button" onclick="deleteCard(this,'${s.id}')">Delete</button>
            </div>
        </div>`
    });
    htm=htm+` </div>
    </div>`
    document.getElementById("cont").innerHTML=htm
    intialize(data)

}



