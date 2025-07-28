@echo off
SETLOCAL

:: Build React frontend
cd frontend\poker-solver-gui
call npm install
call npm run build
cd ..\..
xcopy /E /I /Y frontend\poker-solver-gui\build frontend\build

:: Build Python package
cd backend
call python setup.py bdist_wheel
cd ..

:: Package everything
mkdir dist
xcopy /E /I /Y backend dist\PokerSolverPro
xcopy /E /I /Y frontend\build dist\PokerSolverPro\frontend
copy installer\poker_solver_pro.nsi dist
copy README.md dist

:: Create installer
cd dist
makensis poker_solver_pro.nsi
move PokerSolverPro_Setup.exe ..

echo Build complete! Installer created at PokerSolverPro_Setup.exe