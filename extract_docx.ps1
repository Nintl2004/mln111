Add-Type -AssemblyName 'System.IO.Compression.FileSystem'
$docxPath = 'c:\Users\khang\Downloads\MLN\2.docx'
$zip = [System.IO.Compression.ZipFile]::OpenRead($docxPath)
$entry = $zip.Entries | Where-Object { $_.FullName -eq 'word/document.xml' }
if ($entry) {
    $stream = $entry.Open()
    $reader = New-Object System.IO.StreamReader($stream)
    $content = $reader.ReadToEnd()
    $reader.Close()
    $stream.Close()
    
    # Simple XML parse or regex to extract text
    $xml = [xml]$content
    $nsMgr = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
    $nsMgr.AddNamespace("w", "http://schemas.openxmlformats.org/wordprocessingml/2006/main")
    $paragraphs = $xml.SelectNodes("//w:p", $nsMgr)
    $outputText = ""
    foreach ($p in $paragraphs) {
        $texts = $p.SelectNodes(".//w:t", $nsMgr)
        $line = ""
        foreach ($t in $texts) {
            $line += $t.InnerText
        }
        if ($line.Trim() -ne "") {
            $outputText += "$line`n"
        }
    }
    $outputText | Out-File -FilePath 'c:\Users\khang\Downloads\MLN\content_docx.txt' -Encoding UTF8
    Write-Host "DOCX text extracted successfully!"
} else {
    Write-Host "Could not find word/document.xml inside docx file"
}
$zip.Dispose()
