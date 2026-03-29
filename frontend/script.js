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
        const disksContainer = document.getElementById("disks-container");
        disksContainer.innerHTML = "";

        for (const [device, usage] of Object.entries(data.disks)) {
            disksContainer.innerHTML += `
                <div class="disk-bar">
                    ${device}: <span class="disk-fill" style="width:${usage}%"></span> ${usage}%
                </div>
            `;
        }
    } catch (err) {
        console.error(err);
    }
    
}

setInterval(updatesStats, 2000);
updateStats();
console.log("Fetching stats...");
const data = await.response.json();
console.log(data.disks);