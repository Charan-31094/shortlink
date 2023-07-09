value=window.location.pathname
val=value.split("/")
// val="kllm"
//id=btoa(val)
console.log(val[1])
id=btoa(val[1])
var click=0
const db = new polybase.Polybase({
  defaultNamespace: "pk/0x26b7b24287218ea9427e03112e34fb29e6603d1421903bedf5b825296f2d4f32831d76d700f243fbb768d935937675735ca28568f8604b10a33ac636a81fd9d2/links",
})
const col = db.collection("LinkData");


//update records
async function updateclicks(clicks) {
  try{
    click=clicks+1;
    const recordData = await col
        .record(id)
        .call("incrementClicks", [click]);
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
    try{
      console.log("sending s.clicks",s.clicks)
      redirectToURL(s.full_url)
    updateclicks(s.clicks)}
    catch(e){
      console.log(e)}
    // redirectToURL(s.full_url) 
    
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
    alert("Short URL not found \n click 'OK' to redirect to home page")
    location.replace("../gnew")
  }
  }
  findRecords ()    

