# FTP Upload Script for Hostinger
# Загрузка cards_quiz_standalone.html на хостинг

$ftpServer = "ftp://ftp.gold-oyster-258946.hostingersite.com"
$ftpUsername = "u724602277.Dipscard"
$ftpPassword = Read-Host "Enter FTP Password" -AsSecureString
$ftpPassword = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($ftpPassword))

$localFile = "cards_quiz_standalone.html"
$remoteFile = "/public_html/cards_quiz_standalone.html"

Write-Host "Uploading $localFile to Hostinger..." -ForegroundColor Cyan

try {
    $ftpUri = "$ftpServer$remoteFile"
    $ftpRequest = [System.Net.FtpWebRequest]::Create($ftpUri)
    $ftpRequest.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
    $ftpRequest.Credentials = New-Object System.Net.NetworkCredential($ftpUsername, $ftpPassword)
    $ftpRequest.UseBinary = $true
    $ftpRequest.UsePassive = $true

    $fileContent = [System.IO.File]::ReadAllBytes($localFile)
    $ftpRequest.ContentLength = $fileContent.Length

    $requestStream = $ftpRequest.GetRequestStream()
    $requestStream.Write($fileContent, 0, $fileContent.Length)
    $requestStream.Close()

    $response = $ftpRequest.GetResponse()
    Write-Host "Upload Complete! Status: $($response.StatusDescription)" -ForegroundColor Green
    $response.Close()
    
    Write-Host "`nFile uploaded to: https://gold-oyster-258946.hostingersite.com/cards_quiz_standalone.html" -ForegroundColor Yellow
}
catch {
    Write-Host "Error: $_" -ForegroundColor Red
}
