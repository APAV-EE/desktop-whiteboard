# desktop-whiteboard

Real-time dashboard/whiteboard that runs as a wallpaper on Wallpaper Engine

## Features
- Live clock
- Task tracking
- System performance and usage (CPU, RAM, GPU, Storage)
- Google Calendar integration

## Demo
// Finished in use png here

## Why?
Needed a single solution approach to Windows Task Manager/ASUS Armory Crate, Calendar apps, and a physical whiteboard.
Wallpaper Engine can be set to boot on system startup, providing a seamless experience compared to separate programs/apps.

## Tech Stack
- Frontend: HTML, CSS, JavaScript
- Backend: FastAPI
- SystemData: psutil

## Getting Started
```bash
git clone ...
cd backend
pip install -r requirements.txt
uvicorn main:app -reload
