@echo off
setlocal
:PROMPT
SET /P AREYOUSURE=Want to make a new build (Y/[N])?
IF /I "%AREYOUSURE%" NEQ "Y" GOTO END

cd LabViewer
meteor build --server-only ../build/%date:~-4,4%%date:~-7,2%%date:~-10,2%/


:END
endlocal

cmd /k