; NSIS Installer Script
!include "MUI2.nsh"

Name "Poker Solver Pro"
OutFile "PokerSolverPro_Setup.exe"
InstallDir "$PROGRAMFILES\PokerSolverPro"
RequestExecutionLevel admin

!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_LANGUAGE "English"

Section "Main Application"
  SetOutPath "$INSTDIR"
  
  ; Install Python if not present
  IfFileExists "$WINDIR\py.exe" python_installed 0
    File "python-3.13.5-amd64"
    ExecWait '"$INSTDIR\python-3.13.5-amd64" /quiet InstallAllUsers=1 PrependPath=1'
    Delete "$INSTDIR\python-3.13.5-amd64.exe"
  python_installed:
  
  ; Copy application files
  File /r "backend\*"
  File /r "frontend\build\*"
  
  ; Create desktop shortcut
  CreateShortCut "$DESKTOP\Poker Solver Pro.lnk" "$INSTDIR\backend\python\run_gui.py" "" "$INSTDIR\icon.ico"
  
  ; Create start menu entry
  CreateDirectory "$SMPROGRAMS\Poker Solver Pro"
  CreateShortCut "$SMPROGRAMS\Poker Solver Pro\Poker Solver Pro.lnk" "$INSTDIR\backend\python\run_gui.py"
  CreateShortCut "$SMPROGRAMS\Poker Solver Pro\Uninstall.lnk" "$INSTDIR\uninstall.exe"
  
  ; Write uninstaller
  WriteUninstaller "$INSTDIR\uninstall.exe"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\PokerSolverPro" \
                   "DisplayName" "Poker Solver Pro"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\PokerSolverPro" \
                   "UninstallString" "$\"$INSTDIR\uninstall.exe$\""
SectionEnd

Section "Uninstall"
  RMDir /r "$INSTDIR"
  Delete "$DESKTOP\Poker Solver Pro.lnk"
  RMDir /r "$SMPROGRAMS\Poker Solver Pro"
  DeleteRegKey HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\PokerSolverPro"
SectionEnd