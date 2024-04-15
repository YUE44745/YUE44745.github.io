---
layout: single
title:  "Change background in remote linux"
# date:   2024-02-15 22:27 +0800
# categories: "Life&Emotions"
# categories: "Circuit-Comprehension"
# categories: "Tech-"
categories: "Tech-"

# excerpt: "A practice in learning the headers."
# tagline: # "A little different with the *excerpt* by using the *tagline*. "

# classes: wide
# toc: true # default false

header:
    # image: /assets/images/IMG_20240312_174914.jpg
    
    # overlay_color: "#333"

    # overlay_image: /assets/images/three-beauty-maybe1280px.png
    # overlay_filter: 0.5
    # actions:
    #     - label: "About the unsplash"
    #       url: "https://unsplash.com"

    caption: ""
    
    teaser: "/assets/images/teaser-beauty.png"
---
Tutorial about how to change your background in you remote linux sever without network
由于我们的远程服务器没有连接网络，所以我们无法把我们想作为壁纸的图片传输到服务器上面。
于是我使用了一个方法，详见图片以base64的方式进行编码，得到编码后的字符串，利用本地和远程之间可以传递剪贴板内容的机制，将编码后字符传入远程服务器上，再在远程服务器上面解码得到图片，就可以将此作为壁纸啦。其实过程方法很简单，思路也很简洁，但是在过程中还是遇到了一点问题和细节需要注意，在下面的步骤中，我会详细描述。
1. 首先，进入该[网页](https://www.base64-image.de/)，将你的图片导入进行编码，编码成功后选择复制，复制任意一个都可以，之后需要删除"base64,"及它前面的所有内容，剩下留着的才是编码，将编码先复制到本地.txt文件中。
2. 之后值得注意的是，如果直接复制这些编码到远程服务器的话，会导致出现卡顿，且无法实现，我猜测其原因是传输剪贴板的内容时，是已换行符作为停顿，以此来传输，才能避免卡顿，所以需要做的是对复制到本地的.txt文件进行处理。
3. 新建一个.ps1脚本，粘贴以下内容
```powershell
# 定义源文件和目标文件路径
$sourceFilePath = "base64_encoded.txt"
$targetFilePath = "base64_encoded_1.txt"

# 读取源文件内容并去除所有换行符
$content = Get-Content -Path $sourceFilePath -Raw -Encoding UTF8 | ForEach-Object { $_ -replace "`r?`n", "" }

# 对内容进行格式化，每76个字符添加换行符
$formattedContent = [System.Text.RegularExpressions.Regex]::Replace($content, ".{76}", "$&`r`n")

# 将格式化后的内容写入目标文件
$formattedContent | Out-File -FilePath $targetFilePath -Encoding UTF8
```
之后运行该脚本，在powershell中输入该脚本名称即可。
4. 对新得到文件进行复制后，进入远程服务器，开启一个新的文件she.b64，粘贴编码即可。
5. 运行命令
```bash
base64 -d she.b64 > she.png
```
之后虽然点击生成的图片并不能显示，并且显示该图片错误，但是不用管他，直接更改背景为此图片就成功啦。