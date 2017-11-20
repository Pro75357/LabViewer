@echo off
setlocal
:PROMPT
SET /P AREYOUSURE=Want to make a new build (Y/[N])?
IF /I "%AREYOUSURE%" NEQ "Y" GOTO END

cd build

IF exist LabViewer.tar.gz.backup (
    echo found old backup - renaming for later deletion
    ren LabViewer.tar.gz.backup LabViewer.tar.gz.backup2
    )

IF exist LabViewer.tar.gz (
    echo found current build- making backup 
    ren LabViewer.tar.gz LabViewer.tar.gz.backup
)

cd ../Labviewer

Echo making new build
meteor build --server-only ../build/
 
cd ../backup/
IF exist LabViewer.tar.gz (
    echo new build appears successful- deleting old backup. 
    del LabViewer.tar.gz.backup2
) ELSE ( 
    echo No new build found- Perhaps something went wrong? Restoring backups
    IF exist LabViewer.tar.tz.backup( ren LabViewer.tar.gz.backup LabViewer.tar.gz)
    IF exist LabViewer.tar.gz.backup2( ren LabViewer.tar.gz.backup2 LabViewer.tar.gz.backup ) )
        

:END
endlocal

cmd /k