from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psutil
import GPUtil
import string
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Backend is running"}

def get_gpu_usage():
    gpus = GPUtil.getGPUs()
    if not gpus:
        return None
    
    gpu = gpus[0]
    return gpu.load * 100

def get_all_disks():
    disks = {}
    for letter in string.ascii_uppercase:
        path = f"{letter}:\\"
        if os.path.exists(path):
            try:
                usage = psutil.disk_usage(path).percent
                disks[letter+":\\"] = usage
            except PermissionError:
                continue
    return disks
    

@app.get("/stats")
def get_stats():
    cpu = psutil.cpu_percent(interval=1)
    ram = psutil.virtual_memory().percent
    gpu = get_gpu_usage()
    disks = get_all_disks()

    return {
        "cpu" : cpu,
        "ram" : ram,
        "disks" : disks,
        "gpu" : gpu
    }
