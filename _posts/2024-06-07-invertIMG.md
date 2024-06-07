---
layout: single

title:  "Invert IMG to the inverse"

# categories: "Life&Emotions"
# categories: "Circuit-Comprehension"
# categories: "Tech-"

categories: "Tech-"

header:
    # image: /assets/images/IMG_20240312_174914.jpg
    # caption: ""
    # teaser: "/assets/images/teaser-beauty.png"
---

一个简单的python脚本，可以将图片反色。

本脚本依赖的库如果缺失，使用 "python pip install (缺失的库)" 命令下载即可。

```python
from PIL import Image, ImageOps
import os

def invert_image_colors(directory, des_directory):
    for filename in os.listdir(directory):
        if filename.endswith(".jpg") or filename.endswith(".png"):  # 可根据需要添加其他图片格式
            img_path = os.path.join(directory, filename)
            with Image.open(img_path) as img:
                img = img.convert('RGB')
                inverted_img = ImageOps.invert(img)
                inverted_img.save(os.path.join(des_directory, f"{filename}"))

# 使用函数
directory_path =   './imageTmp/'
des_directory_path = '../your/picture/path'
invert_image_colors(directory_path,des_directory_path)
```

你所需要做的就是将需要转换的图片放入脚本当前目录的文件夹（./imageTmp）下，目的路径改为为生成图片的路径。

之后打开终端，运行脚本即可。

注意：目的路径中的同名文件会被直接覆盖，所以原图片还需要的话注意备份，不需要的话这样代码写就很方便，所以我是故意的，不是我考虑的不够周全。