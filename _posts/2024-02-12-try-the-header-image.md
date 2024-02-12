---
layout: single
title:  "A beautiful post"
date:   2024-02-12 19:45:37 +0800
categories: Tech-learn-jekyll-mmistakes
# classes: wide
# toc: true
excerpt: "A practice in learning the headers."
tagline: "A little different with the *excerpt* by using the *tagline*. This Website also can be used to obtain some beautiful pic."
header:
    # image: /assets/images/three-beauty-maybe1280px.png
    # image_description: "A beautiful girl picture"
    # caption: "Photo credit: Yomzi"
    overlay_image: /assets/images/three-beauty-maybe1280px.png
    overlay_filter: 0.5
    caption: "Photo credit: Yomzi"
    actions:
        - label: "About the unsplash"
          url: "https://unsplash.com"
        - label: "A casual website"
          url: "https://prohub.com"
sidebar:
    nav: "docs1"
---
This picture was drawn by an artist named Yomzi, and I hold a great admiration for this piece. Unfornately, I have been unable to find further information about both the artwork and its creator.
<!-- [**Unsplash**](https://unsplash.com) is a website for picture. -->

And the sidebar show the navigation menu of the tutorial, you can click anyone to learn.

And there are something below maybe useful but temporarily I don't have enough energy to learn. When I need them, I learn them.
## In [helpers](https://mmistakes.github.io/minimal-mistakes/docs/helpers/)
- gallery
- bilibili vido embed
- docs: I have solve most problems, (such as in _config.yml changing the include, in navigation.yml adding the navigation menu, adding a folder to store docs), except when in _config.yml I add the _docs in defaults, but it don't work in docs, The navigation bar (sidebar :nav) disappear where it should be. And actually the two post("A beautiful post" and "Welcome to Jekyll!") use different navigation menu in sidebar, although they look lise same. The "A beautiful post" use the "nav: docs1" which is directly link to official docs, while the "Welcome to Jekyll!" use the "nav:docs2" which link to a copy of docs. You can see them in navigation.yml in _data folder.
- collections

