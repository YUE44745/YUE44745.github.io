---
layout: single
title:  "Summary of building a personal website"
date:   2024-02-15 22:27 +0800
categories: "Life&Emotions"
# categories: "Circuit-Comprehension"
# categories: "Tech"

# excerpt: "A practice in learning the headers."
# tagline: # "A little different with the *excerpt* by using the *tagline*. "

# classes: wide
# toc: true # default false

header:
    image: /assets/images/2024-02-15-summary-build-site.png
    # image_description: ""
    
    # overlay_color: "#333"

    # overlay_image: /assets/images/three-beauty-maybe1280px.png
    # overlay_filter: 0.5
    # actions:
    #     - label: "About the unsplash"
    #       url: "https://unsplash.com"

    #caption: "Photo credit: Yomzi"
    
    teaser: "/assets/images/2024-02-15-summary-build-site.png"


# sidebar:
#     nav: "docs1"
---
# 总结以及文件介绍
我的个人博客网站的搭建和部署总算是完成了，这其中主要看了许多教程，也做了许多实践。我将介绍我使用到的一些教程以及本文路径下的文件。

## 教程介绍

[GitHub Pages tutorial](https://docs.github.com/en/pages/quickstart) | Quickstart for GitHub Pages - GitHub Docs
[jekyll tutorial](https://jekyllrb.com/docs/) | Quickstart, Jekyll • Simple, blog-aware, static sites
[Minimal Mistakes tutorial](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/) | quick start guide - Minimal Mistakes
[mmistaks github repository](https://github.com/mmistakes/minimal-mistakes) | mmistakes/minimal-mistakes: :triangular_ruler: Jekyll theme for building a personal site, blog, project documentation, or portfolio.
[通义千万](https://tongyi.aliyun.com/qianwen/) | 通义千问

我的学习路线如下：

虽然建设一个仅仅能使用的网站并不难，但是如果希望美观且功能强大就需要学习大量的知识和花费成倍地时间和精力，并且由于搭建一个动态网站的话需要昂贵（对于一名学生来说）的域名和服务器费用，以及大量相关的维护费用，所以使用github pages来搭建一个静态网站是一个很好的选择。使用github pages部署静态网站可以拥有一个免费的域名，以及不需要收费的部署服务，并且搭建静态网站不需要对后端语言进行过多的学习，仅仅了解即可，大大地节约了有限的精力和时间。

使用github pages来搭建网站最初的想法是使用css/html/javascript前端语言进行完全地手动编写，但是由于美观性以及文件架构的复杂性，渐渐选择了另一个想法。那就是使用jekyll网站生成器，这样就可以轻松地搭建出美观且功能强大的网站，且当搭建完成后，每次发布帖子只需要上传一个对应的post（.md文件），也不用花费心思去整理文件结构，也不用写编写目录。

使用jekyll来搭建网站可以选择许多不同的主题，且其中有可以兼容使用github pages发布的网站页面。我选择的是mmistaks这个主题，上面附有教程和项目库的链接。

在整个过程中，也遇到很多问题和不了解的知识，感谢AI让我更容易去实现我的想法。

## 总结其中遇到的种种问题
首先由于学习的路线在实践之中不停地变化着，所以在整个过程中其实都在持续遇到一些问题，考虑到我说写下的对他人的价值，所以我只写下我在开始用使用mmistaks的主题来搭建网站的过程中遇到的一些问题。
1. 使用ruby下载gem的过程中由于网络原因，会等待很久，如果有代理会好很多，但是在后面即使我使用了代理，在某些命令也要等待很长的时间，解决办法是使用国内的镜像网站来进行资源的下载。不过当确定gemfile.lcok之后，就不用担心这个问题了。
2. 首先是在部署的过程中，在_config.yml文件中的theme和remote theme的配置中，存在比较模糊的地方，在观看教程的同时多加实践。
3. 在页面显示的时间对帖子的发出有些影响，建议最好使用完整的时间。
4. 在使用archive相关的layout页面的时候，注意永久链接和文件内容是否正确。

## 该路径下的文件
./learing/  最初用来对学习前端语言搭建的旧网站

./minimal-mistaks-mater/    下载下来的主题的项目库

./tmp_jekyll/   在学习jekyll和使用mmistakes主题时进行的种种实践



