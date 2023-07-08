
const urlParams = new URLSearchParams(window.location.search);
const uid = urlParams.get('shorty');

console.log(uid)
id=btoa(uid);
var m;

//copy
function copy(a) {
  navigator.clipboard.writeText(a);
  var k=document.getElementById("but1")
  k.innerHTML="Copied"
}



//connection to db
  const db = new polybase.Polybase({
      defaultNamespace: "pk/0x26b7b24287218ea9427e03112e34fb29e6603d1421903bedf5b825296f2d4f32831d76d700f243fbb768d935937675735ca28568f8604b10a33ac636a81fd9d2/links",
    })
    const col = db.collection("LinkData");



//update records
async function updateRecord(full_url,name) {
  try{
    const recordData = await col
        .record(id)
        .call("updateLink", [full_url,name]);

document.getElementById("hh").innerHTML=`<strong style="color:white">Shorty Updated Successfully</strong>&nbsp&nbsp<a href="/${uid}">Visit</a>&nbsp&nbsp<button type="button" id="but1" class="button" onClick="copy('https://link.nixer.ml/${uid}')">Copy</button>`

}
catch(err){
    console.log(err)
}
}

//find records
    async function findRecords () {
      try{
      const records = await col.where("id", "==", id).get();
     
      let s=records.data[0].data
      m=s.email  
      document.getElementById("ch").innerHTML =`<section class="ftco-section img bg-hero" style="background-image: url(../files/images/back.webp);">
      <div class="container">
      <div class="row justify-content-center">
      <div class="col-md-6 text-center mb-5">
      <h2 class="heading-section">Update Short Link</h2>
      </div>
      </div>
      <div class="row justify-content-center">
      <div class="col-lg-11">
      <div class="wrapper">
      <div class="row no-gutters justify-content-between">
      <div class="col-lg-6 d-flex align-items-stretch">
      <div class="info-wrap w-100 p-5">
      <!-- <h3 class="mb-4">Contact us</h3> -->
      <div class="dbox w-100 d-flex align-items-start">
      <div class="icon d-flex align-items-center justify-content-center">
      <span class="fa fa-link"></span>
      </div>
      <div class="text pl-4">
      <p><span>No.of links active</span> <p id="nu"></p></p>
      </div>
      </div>
      
      <div class="dbox w-100 d-flex align-items-start">
      <div class="icon d-flex align-items-center justify-content-center">
      </div>
      
      </div>
      <div class="dbox w-100 d-flex align-items-start">
      <div class="icon d-flex align-items-center justify-content-center">
      <span class="fa fa-globe"></span>
      </div>
      <div class="text pl-4">
      <p><span>Website</span> <a href="#">link.nixer.ml</a></p>
      </div>
      </div>
      <div class="dbox w-100 d-flex align-items-start">
          <div class="icon d-flex align-items-center justify-content-center">
              <span class="fa fa-database"></span> 
          </div>
          <div class="text pl-4">
              <p><span>Status</span> <a id="hh"></a></p>
          </div>
          </div>
      </div>
      </div>
      <div class="col-lg-5">
      <div class="contact-wrap w-100 p-md-5 p-4">
      <h3 class="mb-4">Update Shorty</h3>
      <div id="form-message-warning" class="mb-4"></div>
      <div id="form-message-success" class="mb-4">
      
      </div>
      <form  id="myForm"  onsubmit="return send()" >
      <div class="row">
      <div class="col-md-12">
      
      </div>
      <div class="col-md-12">
      <div class="form-group">
      <input type="text" class="form-control" name="email" id="email" placeholder="Enter Email to update" required>
      </div>
      </div>
      <div class="col-md-12">
      <div class="form-group">
      <input type="text" class="form-control" name="full_url" id="full_url" value=${s.full_url} required placeholder="Enter Full URL www.ex.com/rufbrbujrfbujrbv..........">
      </div>
      </div>
      <div class="col-md-12">
      <div class="form-group">
          <input type="text" class="form-control" name="short_url" id="short_url" value=${s.short_url} minlength="4" required disabled>
      </div>
      <div class="form-group">
          <input type="text" class="form-control" name="nam" id="nam" value=${s.name} required placeholder="NickName for short url">
          </div>
          <!-- <div class="form-group">
              <input type="text" class="form-control" name="name" id="name"  placeholder="info about url">
              </div> -->
      </div>
      <div class="col-md-12">
      <div class="form-group">
      <input type="submit" value="Update url"  class="btn btn-primary">
      <div class="submitting" ></div>
      
      
      </div>
      </div>
      </div>
      </form>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      </section>` }
    catch(e){
     console.log(e)
    }
    }


    function send()
    {
      try{
       
        a=document.getElementById("nam").value;
        b= document.getElementById('full_url').value
        c=uid
        d=document.getElementById('email').value
        if(d == m)
        {
          updateRecord(b,a);
        }
        else{
          document.getElementById("hh").innerHTML=`<p><strong style="color:palered">Email Doesn't match please enter the mail that have been entered while creating url</strong></p>`
        }
      }
        catch(e){
          console.log(e)
        }
        return false;
    }



 



    findRecords ()