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

//populate table

function tabu(data)
{
    var n=0
    var htm=`<tr>
    <th>S.No</th>
    <th>Short Url</th>
    <th  max-width: 30%; >Long Url</th>
    <th>Name</th>
    <th>No.of Clicks</th>
    <th>Change Url</th>
  </tr>`
    console.log(data.length)
    data.forEach(d => {
        n=n+1
        htm=htm+`<tr width=90%>
        <td>${n}</td>
        <td>${d.data.short_url}</td>
        <td  max-width: 30%;>${d.data.full_url}</td>
        <td>${d.data.name}</td>
        <td>${d.data.clicks}</td>
        <td><a href="../update/?shorty=${d.data.short_url}">Update</a></td>
      </tr>`
    });
    document.getElementById("loader").innerHTML=``
    document.getElementById("table_data").innerHTML=htm
    document.getElementById("submit_email").disabled = false;

}

