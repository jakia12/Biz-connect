$filePath = "components/layout/DashboardLayout.jsx"
$content = Get-Content $filePath -Raw

# The text to find (Reviews menu item)
$find = @"
    { 
      icon: '⭐', 
      label: 'Reviews', 
      href: '/dashboard/seller/reviews',
      path: '/dashboard/seller/reviews'
    },
    { 
      icon: '💬', 
      label: 'Messages',
"@

# The replacement text (Reviews + Verification + Messages)
$replace = @"
    { 
      icon: '⭐', 
      label: 'Reviews', 
      href: '/dashboard/seller/reviews',
      path: '/dashboard/seller/reviews'
    },
    { 
      icon: '✅', 
      label: 'Verification', 
      href: '/dashboard/seller/verification',
      path: '/dashboard/seller/verification'
    },
    { 
      icon: '💬', 
      label: 'Messages',
"@

$content = $content.Replace($find, $replace)
Set-Content $filePath -Value $content -NoNewline

Write-Host "✅ Verification menu item added successfully!" -ForegroundColor Green
