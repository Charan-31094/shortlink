//db connection
const db = new polybase.Polybase({
    defaultNamespace: "pk/0x26b7b24287218ea9427e03112e34fb29e6603d1421903bedf5b825296f2d4f32831d76d700f243fbb768d935937675735ca28568f8604b10a33ac636a81fd9d2/links",
})
const col = db.collection("LinkData");

//find records
async function geturl(email) {
    try {
        const records = await col.where("email", "==", email).get();
        let s = records
        console.log(s)
        tabu(s.data)
        
    }
    catch (e) { console.log(e) }
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
    document.getElementById("table_data").innerHTML=htm
}

