@echo off
echo =====================================
echo ASCII Scribe - Tauri Setup Script
echo =====================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed!
    echo Please download and install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [1/5] Node.js found: 
node --version
echo.

:: Check if Rust is installed
where rustc >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [2/5] Rust not found. Installing Rust...
    echo This will download and install Rust. Press any key to continue...
    pause >nul
    
    :: Download and run rustup installer
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs -o rustup-init.exe
    rustup-init.exe -y
    del rustup-init.exe
    
    :: Add Rust to PATH for current session
    call "%USERPROFILE%\.cargo\env.bat"
    
    echo Rust installed successfully!
) else (
    echo [2/5] Rust found:
    rustc --version
)
echo.

:: Install npm dependencies
echo [3/5] Installing npm dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install npm dependencies
    pause
    exit /b 1
)
echo.

:: Install Tauri CLI
echo [4/5] Installing Tauri CLI...
call npm install --save-dev @tauri-apps/cli
call npm install @tauri-apps/api
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install Tauri packages
    pause
    exit /b 1
)
echo.

:: Initialize Tauri (if needed)
echo [5/5] Tauri setup complete!
echo.
echo =====================================
echo Next Steps:
echo =====================================
echo 1. Run 'npm run tauri dev' to test the app
echo 2. Run 'npm run tauri build' to create the .exe
echo.
echo The .exe will be in: src-tauri\target\release\bundle\
echo =====================================
echo.
pause
