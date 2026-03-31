async function updatesStats() {
    try {
        const res = await fetch("http://127.0.0.1:8000/stats");
        const data = await res.json();
        console.log("Disks from backend:", data.disks);

        document.getElementById("cpu").innerText = data.cpu + "%";
        document.getElementById("ram").innerText = data.ram + "%";

        if (data.gpu !== null) {
            document.getElementById("gpu").innerText = data.gpu.toFixed(1) + "%";
        } else {
            document.getElementById("gpu").innerText = "N/A";
        }
        document.getElementById("gpu-temp").textContent = data.gpu_temp !== null ? `${data.gpu_temp}°C` : "N/A";

        const disksContainer = document.getElementById("disks-container");
        disksContainer.innerHTML = "";

        for (const [device, usage] of Object.entries(data.disks)) {
            disksContainer.innerHTML += `
                <div class="disk-bar">
                    ${device}: <span class="disk-fill" style="width:${usage}%"></span> ${usage}%
                </div>
            `;
        }

        const gpuTempEl = document.getElementById("gpu-temp");

        if (data.gpu_temp !== null) {
            gpuTempEl.textContent = `${data.gpu_temp}°C`;
            gpuTempEl.style.color = getTempColor(data.gpu_temp);
        }
    } catch (err) {
        console.error(err);
    }
    
}

async function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Jan = 0
    const year = now.getFullYear();

    document.getElementById("clock").textContent = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock();
setInterval(updatesStats, 2000);
updateStats();
console.log("Fetching stats...");
const data = await.response.json();
console.log(data.disks);

function getTempColor(temp) {
    if(temp < 50) return "lightgreen";
    if(temp < 75) return "orange";
    return "red";
}

const gpuTempEl = document.getElementById("gpu-temp");

if (data.gpu_temp !== null) {
    gpuTempEl.textContent = `${data.gpu_temp}°C`;
    gpuTempEl.style.color = getTempColor(data.gpu_temp);
}