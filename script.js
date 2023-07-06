value=window.location.pathname
val=value.split("/")[2]
console.log(val)
id=btoa(val)

function redirectToURL(k) {
    window.location.href ="https://"+k;
  }
const db = new polybase.Polybase({
    defaultNamespace: "pk/0x26b7b24287218ea9427e03112e34fb29e6603d1421903bedf5b825296f2d4f32831d76d700f243fbb768d935937675735ca28568f8604b10a33ac636a81fd9d2/links",
  })
  const col = db.collection("LinkData");
  async function listRecords () {
    const records = await col.where("id", "==", id).get();
    let s=records.data[0].data
   let k=JSON.stringify(records.data[0].data)
   console.log(k)
    document.getElementById("ch").innerHTML =` <div class="info">
    <p>Full URL: <strong>${s.full_url}</strong></p>
    <p>Short Name: <strong>${s.name}</strong></p>
    <p>Email: <strong>${s.email}</strong></p>
  </div>
  <button type="button" onclick="redirectToURL('${s.full_url}')" name="redirect">Redirect</button>`
  }

  listRecords ()    
