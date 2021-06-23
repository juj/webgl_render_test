mergeInto(LibraryManager.library, {
  uploadFlipped: function(img) {
    GLctx.pixelStorei(0x9240/*GLctx.UNPACK_FLIP_Y_WEBGL*/, true);
    GLctx.texImage2D(0x0DE1/*GLctx.TEXTURE_2D*/, 0, 0x1908/*GLctx.RGBA*/, 0x1908/*GLctx.RGBA*/, 0x1401/*GLctx.UNSIGNED_BYTE*/, img);
    GLctx.pixelStorei(0x9240/*GLctx.UNPACK_FLIP_Y_WEBGL*/, false);
  },
  upload_unicode_char_to_texture__deps: ['uploadFlipped'],
  upload_unicode_char_to_texture: function(unicodeChar, charSize, applyShadow) {
    var canvas = document.createElement('canvas');
    canvas.width = canvas.height = charSize;
//  document.body.appendChild(canvas); // Enable for debugging
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.globalCompositeOperator = 'copy';
    ctx.globalAlpha = 0;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'white';
    ctx.font = charSize + 'px Arial Unicode';
    if (applyShadow) {
      ctx.shadowColor = 'black';
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.shadowBlur = 3;
      ctx.strokeStyle = 'gray';
      ctx.strokeText(String.fromCharCode(unicodeChar), 0, canvas.height-7);
    }
    ctx.fillText(String.fromCharCode(unicodeChar), 0, canvas.height-7);
    _uploadFlipped(canvas);
  },

  find_character_pair_kerning: function(ch1, ch2, charSize) {
    if (ch1 <= 32) ch1 = 105; // replace spaces with 'i' character to be able to measure their advance with fillText()
    if (ch2 <= 32) ch2 = 105;
    var s2 = String.fromCharCode(ch2);
    var canvas = document.createElement('canvas');
    canvas.height = charSize;
    canvas.width = charSize*3;
    var ctx = canvas.getContext('2d');
    ctx.font = charSize + 'px Arial Unicode';

    function getPixelAdvance() {
      var data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var d = new Uint32Array(data.data.buffer);
      for(var x = data.width-1; x > 0; --x) {
        for(var i = x; i < d.length; i += data.width) {
          if (d[i]) return x;
        }
      }
    }

    ctx.fillText(s2, 0, canvas.height-7);
    var advance1 = getPixelAdvance();
    ctx.fillText(String.fromCharCode(ch1) + s2, 0, canvas.height-7);
    return getPixelAdvance() - advance1;
  },

  load_texture_from_url__deps: ['uploadFlipped'],
  load_texture_from_url: function(glTexture, url, outW, outH) {
    var img = new Image();
    img.onload = function() {
      HEAPU32[outW>>2] = img.width;
      HEAPU32[outH>>2] = img.height;
      GLctx.bindTexture(0x0DE1/*GLctx.TEXTURE_2D*/, GL.textures[glTexture]);
      _uploadFlipped(img);
    };
    img.src = UTF8ToString(url);
  },
  play_audio: function(url, loop) {
    var a = new Audio(UTF8ToString(url));
    a.loop = !!loop;
    a.play();
  },
});
