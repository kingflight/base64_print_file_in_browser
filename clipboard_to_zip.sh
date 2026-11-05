#!/usr/bin/env bash
# Run in MinGW/Git Bash after copying Base64 text to the Windows clipboard.
# Saves to Downloads/recovered.zip, replacing that file if it already exists.
set -euo pipefail

powershell.exe -NoProfile -STA -Command '
  $ErrorActionPreference = "Stop"
  try {
    $b64 = Get-Clipboard -Raw
    if ([string]::IsNullOrWhiteSpace($b64)) {
      throw "The clipboard is empty. Copy the Base64 text first."
    }
    $bytes = [Convert]::FromBase64String($b64)
    $output = Join-Path $env:USERPROFILE "Downloads\recovered.zip"
    [IO.File]::WriteAllBytes($output, $bytes)
    Write-Output ("Saved: " + $output)
  } catch {
    [Console]::Error.WriteLine($_.Exception.Message)
    exit 1
  }
'
