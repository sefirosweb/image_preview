const xOffset = 205;
const yOffset = 205;
const border = 6;
let width;

const elements = document.getElementsByClassName('preview');

const addMouseOver = (e) => {
    let width = e.target.dataset.preview_width;
    if (width === undefined) {
        width = 290;
    }

    let imagePreview = e.target.getAttribute('href');
    if (imagePreview === undefined) {
        e.target.getAttribute('src');
    }

    let text = e.target.getAttribute('alt');
    if (imagePreview === undefined) {
        const text = '';
    }

    // Create box element
    let previewBox = document.createElement('p');
    previewBox.setAttribute('id', 'preview');

    const imageBox = new Image();
    imageBox.setAttribute('src', imagePreview);
    if (imageBox.naturalWidth < width) {
        width = imageBox.naturalWidth;
    }
    imageBox.style.cssText = `max-width:${width}px`;
    imageBox.setAttribute('alt', 'Image preview');

    const textBox = document.createElement('div');
    textBox.textContent = text;
    textBox.style.textAlign = 'center';
    textBox.style.width = '100%';
    textBox.style.color = '#DDD';
    textBox.style.marginTop = '-4px';
    textBox.style.backgroundColor = '#555';

    previewBox.appendChild(imageBox);
    previewBox.appendChild(textBox);

    document.body.appendChild(previewBox);

    const $preview = document.getElementById('preview');
    $preview.style.display = 'block';
    $preview.style.position = 'absolute';
    $preview.style.width = width + 'px';
    $preview.style.border = `${border}px solid #CCCCCC`;
    fadeIn($preview, 200);
};

const addMouseout = () => {
    document.getElementById('preview').remove();
};

const addMousemove = (e) => {
    const $preview = document.getElementById('preview');
    const imageHeight = $preview.clientHeight;
    const imageWidth = $preview.clientWidth;

    const w = window,
        d = document,
        es = d.documentElement,
        g = d.getElementsByTagName('body')[0];

    const xMax = w.innerWidth || es.clientWidth || g.clientWidth;
    const yMax = w.innerHeight || es.clientHeight || g.clientHeight;

    let $x;
    let $y;

    // 20 px is for avoid the scrollbarr
    if (e.pageX + imageWidth + xOffset + 30 > xMax + window.pageXOffset) {
        $x = e.pageX - imageHeight + window.pageXOffset - xOffset;
        if ($x < window.pageXOffset) {
            $x = window.pageXOffset + xMax - imageHeight - 11;
        }
    } else {
        $x = e.pageX + xOffset + window.pageXOffset;
    }

    // 27 px is for the textbar of image
    if (e.pageY + imageHeight + yOffset + 29 > yMax + window.pageYOffset) {
        $y = yMax - imageHeight + window.pageYOffset - yOffset - 3;
    } else {
        $y = e.pageY + yOffset;
    }

    $preview.style.top = $y + 'px';
    $preview.style.left = $x + 'px';
};

for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('mouseover', addMouseOver);
    elements[i].addEventListener('mouseout', addMouseout);
    elements[i].addEventListener('mousemove', addMousemove);
}

function fadeIn(element, duration = 200) {
    element.style.opacity = 0;
    var last = +new Date();
    var tick = function () {
        element.style.opacity =
            +element.style.opacity + (new Date() - last) / duration;
        last = +new Date();
        if (+element.style.opacity < 1) {
            (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
                setTimeout(tick, 16);
        } else {
            element.style.opacity = null;
        }
    };
    tick();
}