value=window.location.pathname
val=value.split("/")
// val="kllm"
//id=btoa(val)
console.log(val[1])
id=btoa(val[1])

const db = new polybase.Polybase({
  defaultNamespace: "pk/0x26b7b24287218ea9427e03112e34fb29e6603d1421903bedf5b825296f2d4f32831d76d700f243fbb768d935937675735ca28568f8604b10a33ac636a81fd9d2/links",
})
const col = db.collection("LinkData");


//update records
async function updateRecord(clicks) {
  try{
    k=clicks+1;
    const recordData = await col
        .record(id)
        .call("incrementClicks", [k]);

document.getElementById("hh").innerHTML=`<strong style="color:white">Shorty Updated Successfully</strong>&nbsp&nbsp<a href="/${uid}">Visit</a>&nbsp&nbsp<button type="button" id="but1" class="button" onClick="copy('https://link.nixer.ml/${uid}')">Copy</button>`

}
catch(err){
    console.log(err)
}
}


function redirectToURL(k) {
  if(k.includes("https://"))
  {
    window.location.href =k;
  }
  else{
    window.location.href ="https://"+k;}
  }


  //find records
  async function findRecords () {
    try{
    const records = await col.where("id", "==", id).get();
   
    let s=records.data[0].data 
    redirectToURL(s.full_url) 
    updateclicks(s.clicks)
  //  let k=JSON.stringify(records.data[0].data)
  //  console.log(k)
   
  //   document.getElementById("ch").innerHTML =` <div class="info">
  //   <p>Full URL: <strong>${s.full_url}</strong></p>
  //   <p>Short Name: <strong>${s.name}</strong></p>
  //   <p>Email: <strong>Hidden</strong></p>
  // </div>
  // <button type="button" onclick="redirectToURL('${s.full_url}')" name="redirect">Redirect</button>` 
    }
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

