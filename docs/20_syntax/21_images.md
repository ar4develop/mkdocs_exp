## Images

*Source link:* <https://squidfunk.github.io/mkdocs-material/reference/images/>

*Local article:* [Images](../_articles/Images - Material for MkDocs.html)

---

This configuration adds the ability to align images, add captions to images (rendering them as figures), and mark large images for lazy-loading. Add the following lines to mkdocs.yml:
    
    markdown_extensions:
    - attr_list
    - md_in_html

If you want to add image zoom functionality to your documentation, the glightbox plugin is an excellent choice, as it integrates perfectly with Material for MkDocs. Install it with pip:

    pip install mkdocs-glightbox

Then, add the following lines to mkdocs.yml:

    plugins:
    - glightbox:
       touchNavigation: true
       loop: false
       effect: zoom
       slide_effect: slide
       width: 100%
       height: auto
       zoomable: true
       draggable: true
       skip_classes:
         - custom-skip-class-name
       auto_caption: false
       caption_position: bottom

[Configuration options](https://github.com/blueswen/mkdocs-glightbox#usage)

When Attribute Lists is enabled, images can be aligned by adding the respective alignment directions via the align attribute, i.e. align=left or align=right:

    ![Image title](https://dummyimage.com/600x400/eee/aaa){ align=left loading=lazy width=150}

Image with caption

    <figure markdown>
    ![Image title](https://dummyimage.com/600x400/){ width="300" }
    <figcaption>Image caption</figcaption>
    </figure>

Light and dark mode

    ![Image title](https://dummyimage.com/600x400/f5f5f5/aaaaaa#only-light){ width="300" }
    ![Image title](https://dummyimage.com/600x400/21222c/d5d7e2#only-dark){ width="300" }

![Image title](../_images/zelda-light-world.png#only-light){ width="300" }
![Image title](../_images/zelda-dark-world.png#only-dark){ width="300" }