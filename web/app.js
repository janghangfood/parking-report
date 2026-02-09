const API = "https://dawn-frost-9b1a.wlasqqq.workers.dev/api/report";

async function toBase64(file) {
  return new Promise(res => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.readAsDataURL(file);
  });
}

async function submitReport() {
  const files = document.getElementById("img").files;
  const images = [];
  for (const f of files) images.push(await toBase64(f));

  const payload = {
    location: loc.value,
    plate: plate.value,
    phone: phone.value,
    note: note.value,
    images,
    ip: "-"
  };

  const r = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  document.getElementById("result").textContent =
    JSON.stringify(await r.json(), null, 2);
}
