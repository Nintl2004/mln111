Add-Type -AssemblyName 'System.IO.Compression.FileSystem'
$files = Get-ChildItem 'c:\Users\khang\Downloads\MLN' -Filter '*.pptx'
$pptxFile = $files[0].FullName
$destDir = "c:\Users\khang\Downloads\MLN\public\assets"
if (!(Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir
}

$zip = [System.IO.Compression.ZipFile]::OpenRead($pptxFile)
$mediaEntries = $zip.Entries | Where-Object { $_.FullName -like 'ppt/media/*' }
foreach ($entry in $mediaEntries) {
    $fileName = Split-Path $entry.FullName -Leaf
    $targetPath = Join-Path $destDir $fileName
    Write-Host "Extracting $fileName to $targetPath"
    [System.IO.Compression.ZipFileExtensions]::ExtractToFile($entry, $targetPath, $true)
}
$zip.Dispose()
Write-Host "Extraction completed!"
