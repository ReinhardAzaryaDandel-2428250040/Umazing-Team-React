Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = 'Stop'

# 180x180 apple-touch-icon
$bmp = New-Object System.Drawing.Bitmap 180,180
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.Clear([System.Drawing.Color]::FromArgb(255,255,143,177))
$font = New-Object System.Drawing.Font('Segoe UI',72,[System.Drawing.FontStyle]::Bold)
$brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$g.DrawString('U',$font,$brush,40,42)
$bmp.Save('apple-touch-icon.png',[System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()

# 32x32 favicon
$bmp = New-Object System.Drawing.Bitmap 32,32
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.Clear([System.Drawing.Color]::FromArgb(255,255,143,177))
$bmp.Save('favicon-32.png',[System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()

Write-Host 'Images created: apple-touch-icon.png, favicon-32.png'