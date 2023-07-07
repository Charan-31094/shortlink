var html=`<div class="col-lg-5">
<div class="contact-wrap w-100 p-md-5 p-4">
<h3 class="mb-4">New Shorty</h3>
<div id="form-message-warning" class="mb-4"></div>
<div id="form-message-success" class="mb-4">

</div>
<form >
<div class="row">
<div class="col-md-12">

</div>
<div class="col-md-12">
<div class="form-group">
<input type="text" class="form-control" name="email" id="email" placeholder="Email" required>
</div>
</div>
<div class="col-md-12">
<div class="form-group">
<input type="text" class="form-control" name="full_url" id="full_url" placeholder="Enter Full URL www.ex.com/rufbrbujrfbujrbv..........">
</div>
</div>
<div class="col-md-12">
<div class="form-group">
    <input type="text" class="form-control" name="short_url" id="short_url" placeholder="/short_url"  >
</div>
<div class="form-group">
    <input type="text" class="form-control" name="nam" id="nam" placeholder="NickName for short url">
    </div>
    <!-- <div class="form-group">
        <input type="text" class="form-control" name="name" id="name"  placeholder="info about url">
        </div> -->
</div>
<div class="col-md-12">
<div class="form-group">
<input type="button" value="Send Message" onclick="createRecord(nam.value,full_url.value,short_url.value,email.value)"  class="btn btn-primary">
<div class="submitting"></div>
</div>
</div>
</div>
</form>
</div>`

function redirectToURL(k) {
    if(text.includes("https://"))
    {
      window.location.href =k;
    }
    else{
      window.location.href ="https://"+k;}
    }
  const db = new polybase.Polybase({
      defaultNamespace: "pk/0x26b7b24287218ea9427e03112e34fb29e6603d1421903bedf5b825296f2d4f32831d76d700f243fbb768d935937675735ca28568f8604b10a33ac636a81fd9d2/links",
    })
    const col = db.collection("LinkData");
    async function findRecords () {
      try{
      const records = await col.where("id", "==", id).get();
     
      let s=records.data[0].data  
     let k=JSON.stringify(records.data[0].data)
     console.log(k)
      document.getElementById("ch").innerHTML =` <div class="col-lg-5">
      <div class="contact-wrap w-100 p-md-5 p-4">
      <h3 class="mb-4">New Shorty</h3>
      <div id="form-message-warning" class="mb-4"></div>
      <div id="form-message-success" class="mb-4">
      
      </div>
      <form >
      <div class="row">
      <div class="col-md-12">
      
      </div>
      <div class="col-md-12">
      <div class="form-group">
      <input type="text" class="form-control" name="email" id="email" placeholder="Email" required>
      </div>
      </div>
      <div class="col-md-12">
      <div class="form-group">
      <input type="text" class="form-control" name="full_url" value="${s.full_url}" id="full_url" placeholder="Enter Full URL www.ex.com/rufbrbujrfbujrbv..........">
      </div>
      </div>
      <div class="col-md-12">
      <div class="form-group">
          <input type="text" class="form-control" name="short_url" id="short_url" value=${short_url} placeholder="/short_url"  >
      </div>
      <div class="form-group">
          <input type="text" class="form-control" name="nam" id="nam" value=${s.name} placeholder="NickName for short url">
          </div>
          <!-- <div class="form-group">
              <input type="text" class="form-control" name="name" id="name"  placeholder="info about url">
              </div> -->
      </div>
      <div class="col-md-12">
      <div class="form-group">
      <input type="button" value="Update" onclick="createRecord(nam.value,full_url.value,short_url.value,email.value)"  class="btn btn-primary">
      <div class="submitting"></div>
      </div>
      </div>
      </div>
      </form>
      </div>` }
    catch(e){
      document.getElementById("ch").innerHTML =` <div class="info">
      <p>Full URL: <strong>Not Found</strong></p>
      <p>Short Name: <strong>Not Found</strong></p>
      <p>Email: <strong>Not Found</strong></p>
      </div>
      <button type="button" onclick="redirectToURL('link.nixer.ml/gnew')" name="redirect">Create a New Link</button>`
    }
    }
    findRecords ()