const db = new polybase.Polybase({
    defaultNamespace: "pk/0x26b7b24287218ea9427e03112e34fb29e6603d1421903bedf5b825296f2d4f32831d76d700f243fbb768d935937675735ca28568f8604b10a33ac636a81fd9d2/links",
  })
  const col = db.collection("LinkData");
  async function listRecords () {
    const records = await col.get();
    console.log(JSON.stringify(records));
    document.getElementById("dd").innerHTML = JSON.stringify(records.data);
  }
  createRecord ()
  async function createRecord () {
    const recordData = await col.create([
      "23456756", 
      "/hi",
      "www.kluniversity.in",
      "kltest",
      "info........"
    ]);
}