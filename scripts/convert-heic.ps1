param(
  [string]$SourceDirectory = 'C:\Users\91884\Downloads',
  [string]$OutputDirectory = (Join-Path $PSScriptRoot '..\public\images')
)

Add-Type -AssemblyName PresentationCore
New-Item -ItemType Directory -Force -Path $OutputDirectory | Out-Null

$names = '0996','1007','1010','1011','1014','1015','1018','1020','1021','1024','1027','1028','1029','1033','1034','1036'
foreach ($name in $names) {
  $source = Join-Path $SourceDirectory "IMG_$name.HEIC"
  if (-not (Test-Path -LiteralPath $source)) { throw "Missing source photo: $source" }
  $stream = [System.IO.File]::OpenRead($source)
  try {
    $decoder = [System.Windows.Media.Imaging.BitmapDecoder]::Create($stream, [System.Windows.Media.Imaging.BitmapCreateOptions]::PreservePixelFormat, [System.Windows.Media.Imaging.BitmapCacheOption]::OnLoad)
    $frame = $decoder.Frames[0]
    $scale = [Math]::Min(1.0, 1800.0 / $frame.PixelWidth)
    $bitmap = New-Object System.Windows.Media.Imaging.TransformedBitmap($frame, (New-Object System.Windows.Media.ScaleTransform($scale, $scale)))
    $encoder = New-Object System.Windows.Media.Imaging.JpegBitmapEncoder
    $encoder.QualityLevel = 82
    $encoder.Frames.Add([System.Windows.Media.Imaging.BitmapFrame]::Create($bitmap))
    $target = Join-Path $OutputDirectory "work-$name.jpg"
    $output = [System.IO.File]::Create($target)
    try { $encoder.Save($output) } finally { $output.Dispose() }
    Write-Output "$name $($frame.PixelWidth)x$($frame.PixelHeight) -> $($bitmap.PixelWidth)x$($bitmap.PixelHeight) $((Get-Item $target).Length) bytes"
  } finally { $stream.Dispose() }
}
