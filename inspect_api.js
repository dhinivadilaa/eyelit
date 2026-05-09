const fetch = require('node-fetch');
(async () => {
  try {
    const prov = await fetch('http://127.0.0.1:8002/api/provinsi');
    const provs = await prov.json();
    console.log('PROV LENGTH', provs.length);
    const dki = provs.find(p => /jakarta/i.test(p.nama_provinsi));
    console.log('DKI', dki);
    if (dki) {
      const kota = await fetch(`http://127.0.0.1:8002/api/kota/${dki.id}`);
      const kotas = await kota.json();
      console.log('KOTA LENGTH', kotas.length);
      console.log(JSON.stringify(kotas.slice(0, 10), null, 2));
    }
  } catch (err) {
    console.error(err);
  }
})();