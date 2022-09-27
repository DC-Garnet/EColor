let emotion = document.getElementsByName('emotion'); // 感情の選択を取得する変数
let strength = document.getElementsByName('strength');// 感情の強弱を取得する変数

var E; // 感情の種類を代入する変数
var Er = 255; // 感情色 r
var Eg = 220; // 感情色 g
var Eb = 123; // 感情色 b

function OnChange(self,friend,option){
  
    // エラーチェック
    if (!self.checkValidity()){
      self.value = friend.value;
      return;
    }  
    friend.value = self.value
    
    var r,g,b,h,s,v;
    
    // RGBからHSV変換
    if(option == 1){
      r = parseInt(document.getElementById('r_ran').value,10);
      g = parseInt(document.getElementById('g_ran').value,10);
      b = parseInt(document.getElementById('b_ran').value,10);  
      
      var hsv = rgb2hsv(r,g,b); 
      
      document.getElementById('h_ran').value = hsv.h;
      document.getElementById('h_num').value = hsv.h;
      document.getElementById('s_ran').value = hsv.s;
      document.getElementById('s_num').value = hsv.s;
      document.getElementById('v_ran').value = hsv.v;
      document.getElementById('v_num').value = hsv.v;
      
      h = hsv.h;
      s = hsv.s;
      v = hsv.v;
    
    // HSVからRGB変換
    }else if(option == 2){
      h = parseInt(document.getElementById('h_ran').value,10);
      s = parseInt(document.getElementById('s_ran').value,10);
      l = parseInt(document.getElementById('v_ran').value,10); 
      
      var rgb = hsv2rgb(h,s,l); 
  
      document.getElementById('r_ran').value = rgb.r;
      document.getElementById('r_num').value = rgb.r;
      document.getElementById('g_ran').value = rgb.g;
      document.getElementById('g_num').value = rgb.g;
      document.getElementById('b_ran').value = rgb.b;
      document.getElementById('b_num').value = rgb.b;    
      
      r = rgb.r; 
      g = rgb.g; 
      b = rgb.b;
    }
    
    // 設定
    var r = parseInt(document.getElementById('r_ran').value,10);
    var g = parseInt(document.getElementById('g_ran').value,10);
    var b = parseInt(document.getElementById('b_ran').value,10); 
   
    var o = getComplementarycolor(r,g,b);
    var c = getOpposite_color(r,g,b);  
    
    var obj = document.getElementById('color_div');
    var color = RGB2bgColor(r,g,b);
     
    obj.style.background = color;
    obj.innerHTML = color + '<br />' + 
                    'rgb(' + r + ',' + g + ',' + b+');' + '<br />' +
                    '反対色 ' + RGB2bgColor(o.r,o.g,o.b) + '<br />' +                  
                    '補色 '   + RGB2bgColor(c.r,c.g,c.b);                 
    obj.style.color = RGB2bgColor(o.r,o.g,o.b);
                    
    document.getElementById('txt_color').value = color;
}

// 反対色
function getComplementarycolor(r,g,b){
    return {'r':255-r,'g':255-g,'b':255-b};
 }
 
 // 補色
 function getOpposite_color(r,g,b){
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);   
    var val = max + min;   
    return {'r':val-r,'g':val-g,'b':val-b};
 }  
  
 // RGBから#ffffff形式へ変換する
 function RGB2bgColor(r,g,b) {
 
   r = r.toString(16);
   if (r.length == 1) r = "0" + r;
 
   g = g.toString(16);
   if (g.length == 1) g = "0" + g;
 
   b = b.toString(16);
   if (b.length == 1) b = "0" + b;
 
   return '#' + r + g + b;  
 }

 // RGB色空間からHSV色空間へ変換する 
 //  r(red)  : 赤色 0-255の値
 //  g(green): 緑色 0-255の値
 //  b(blue) : 青色 0-255の値 
 function rgb2hsv(r, g, b){   
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);   
    var hsv = {'h':0,
               's':0,
               'v':max}; // V(明度)   
    
    if (max != min) {
      // H(色相)  
      if (max == r) hsv.h = 60 * (g - b) / (max-min);
      if (max == g) hsv.h = 60 * (b - r) / (max-min) + 120;
      if (max == b) hsv.h = 60 * (r - g) / (max-min) + 240;
      
      // S(彩度)
      hsv.s = (max - min) / max;
    }   
  
    if (hsv.h < 0){
      hsv.h = hsv.h + 360;
    }
    
    hsv.h =  Math.round(hsv.h);
    hsv.s =  Math.round(hsv.s * 100);
    hsv.v =  Math.round((hsv.v / 255) * 100);     
    return hsv;   
}

 // HSV(HSB)色空間からRGB色空間へ変換する 
 //  h(hue)       : 色相/色合い   0-360度の値
 //  s(saturation): 彩度/鮮やかさ 0-100%の値
 //  v(Value)     : 明度/明るさ   0-100%の値 
 //  ※v は b(Brightness)と同様 
 function hsv2rgb(h, s, v){
    var max = v;
    var min = max - ((s / 255) * max);
    var rgb = {'r':0,'g':0,'b':0};  
    
    if (h == 360){
      h = 0;
    }
    
    s = s / 100;   
    v = v / 100;   
    
    if (s == 0){
      rgb.r = v * 255;
      rgb.g = v * 255;
      rgb.b = v * 255;
      return rgb;
    } 
    
    var dh = Math.floor(h / 60);
    var p = v * (1 - s);
    var q = v * (1 - s * (h / 60 - dh));
    var t = v * (1 - s * (1 - (h / 60 - dh)));
    
    switch (dh){
     case 0 : rgb.r = v; rgb.g = t; rgb.b = p;  break;
     case 1 : rgb.r = q; rgb.g = v; rgb.b = p;  break;
     case 2 : rgb.r = p; rgb.g = v; rgb.b = t;  break;
     case 3 : rgb.r = p; rgb.g = q; rgb.b = v;  break;
     case 4 : rgb.r = t; rgb.g = p; rgb.b = v;  break;
     case 5 : rgb.r = v; rgb.g = p; rgb.b = q;  break
    }   
    
    rgb.r =  Math.round(rgb.r * 255);
    rgb.g =  Math.round(rgb.g * 255);
    rgb.b =  Math.round(rgb.b * 255);
    return rgb; 
} 
 


function BSHChange(){
    var Or = parseInt(document.getElementById('r_ran').value,10);
    var Og = parseInt(document.getElementById('g_ran').value,10);
    var Ob = parseInt(document.getElementById('b_ran').value,10); 

    //基本色出力
    r = Math.floor(Or*((Or+Er)-Or*Er/255)/255);
     
    g = Math.floor(Og*((Og+Eg)-Og*Eg/255)/255);
    
    b = Math.floor(Ob*((Ob+Eb)-Ob*Eb/255)/255);

    if(r >= 255 && g >= 255 && b >= 255){

        r = Math.floor(Or - (255-Er)/10);
         
        g = Math.floor(Og - (255-Eg)/10);
        
        b = Math.floor(Ob - (255-Eb)/10);

    }else if(r == 0 && g == 0 && b == 0){

        r = Math.floor((Er)/100);
         
        g = Math.floor((Eg)/100);
        
        b = Math.floor((Eb)/100);

    };
  
  
  
    if(r >= 255){

        r = Math.floor(Or - (255-Er)/10);

    }else if(r <= 0){

        r = Math.floor(Or + Er/100);

    };
    
    if(g >= 255){

        g = Math.floor(Og - (255-Eg)/10);

    }else if(g <= 0){

        g = Math.floor(Og + Eg/100);

    };
  
    if(b >= 255){

        b = Math.floor(Ob - (255-Eb)/10);

    }else if(b <= 0){

        b = Math.floor(Ob + Eb/100);

    };


    var Bo = getComplementarycolor(r,g,b);
    var Bc = getOpposite_color(r,g,b);  
    
    var Bobj = document.getElementById('BColor');
    var Bcolor = RGB2bgColor(r,g,b);
     
    Bobj.style.background = Bcolor;
    Bobj.innerHTML = Bcolor + '<br />' + 
                    'rgb(' + r + ',' + g + ',' + b+');' + '<br />' +
                    '反対色 ' + RGB2bgColor(Bo.r,Bo.g,Bo.b) + '<br />' +                  
                    '補色 '   + RGB2bgColor(Bc.r,Bc.g,Bc.b);

    Bobj.style.color = RGB2bgColor(Bo.r,Bo.g,Bo.b);

    //影色出力

    var r = Math.floor(Or*Er/255);
    var g = Math.floor(Og*Eg/255);
    var b = Math.floor(Ob*Eb/255);

    var So = getComplementarycolor(r,g,b);
    var Sc = getOpposite_color(r,g,b);  
    
    var Sobj = document.getElementById('SColor');
    var Scolor = RGB2bgColor(r,g,b);
     
    Sobj.style.background = Scolor;
    Sobj.innerHTML = Scolor + '<br />' + 
                    'rgb(' + r + ',' + g + ',' + b+');' + '<br />' +
                    '反対色 ' + RGB2bgColor(So.r,So.g,So.b) + '<br />' +                  
                    '補色 '   + RGB2bgColor(Sc.r,Sc.g,Sc.b);

    Sobj.style.color = RGB2bgColor(So.r,So.g,So.b);

    //ハイライト色出力
    

    var r = Math.floor((Or+Er)-Or*Er/255);
    var g = Math.floor((Og+Eg)-Og*Eg/255);
    var b = Math.floor((Ob+Eb)-Ob*Eb/255);

    if(r >= 255 && g >= 255 && b >= 255){

        r = Math.floor(Or - (255-Er)/20);
         
        g = Math.floor(Og - (255-Eg)/20);
        
        b = Math.floor(Ob - (255-Eb)/20);

    };

    var Ho = getComplementarycolor(r,g,b);
    var Hc = getOpposite_color(r,g,b);  
    
    var Hobj = document.getElementById('HColor');
    var Hcolor = RGB2bgColor(r,g,b);
     
    Hobj.style.background = Hcolor;
    Hobj.innerHTML = Hcolor + '<br />' + 
                    'rgb(' + r + ',' + g + ',' + b+');' + '<br />' +
                    '反対色 ' + RGB2bgColor(Ho.r,Ho.g,Ho.b) + '<br />' +                  
                    '補色 '   + RGB2bgColor(Hc.r,Hc.g,Hc.b);

    Hobj.style.color = RGB2bgColor(So.r,So.g,So.b);
    
}

function BChange(r,g,b){

}


/*感情の変更時*/
function EChange(){
    var r, g, b; 

    //弱
    if(strength[0].checked == true){

        if (emotion[0].checked == true){
            r = 255, g = 237, b = 159;
            E = '平穏';
        }
        if (emotion[1].checked == true){
            r = 202, g = 223, b = 139;
            E = '容認';
        }
        if (emotion[2].checked == true){
            r = 122, g = 198, b = 152;
            E = '不安';
        }
        if (emotion[3].checked == true){
            r = 137, g = 199, b = 228;
            E = '放心';
        }

        if (emotion[4].checked == true){
            r = 160, g = 192, b = 229;
            E = '哀愁';
        }
        if (emotion[5].checked == true){
            r = 185, g = 170, b = 211;
            E = '退屈';
        }
        if (emotion[6].checked == true){
            r = 244, g = 141, b = 128;
            E = '苛立ち';
        }
        if (emotion[7].checked == true){
            r = 252, g = 196, b = 135;
            E = '関心';
        }

    }
    
    //中
    if(strength[1].checked == true){

        if (emotion[0].checked == true){
            r = 255, g = 220, b = 123;
            E = '喜び';
        }
        if (emotion[1].checked == true){
            r = 171, g = 210, b = 106;
            E = '信頼';
        }
        if (emotion[2].checked == true){
            r = 48, g = 181, b = 117;
            E = '恐れ';
        }
        if (emotion[3].checked == true){
            r = 54, g = 174, b = 215;
            E = '驚き';
        }

        if (emotion[4].checked == true){
            r = 116, g = 168, b = 218;
            E = '悲しみ';
        }
        if (emotion[5].checked == true){
            r = 163, g = 144, b = 196;
            E = '嫌悪';
        }
        if (emotion[6].checked == true){
            r = 242, g = 115, b = 109;
            E = '怒り';
        }
        if (emotion[7].checked == true){
            r = 249, g = 173, b = 102;
            E = '期待';
        }

    }
    
    //強
    if(strength[2].checked == true){

        if (emotion[0].checked == true){
            r = 255, g = 202, b = 5;
            E = '恍惚';
        }
        if (emotion[1].checked == true){
            r = 138, g = 198, b = 80;
            E = '敬愛';
        }
        if (emotion[2].checked == true){
            r = 0, g = 165, b = 81;
            E = '恐怖';
        }
        if (emotion[3].checked == true){
            r = 0, g = 153, b = 205;
            E = '驚嘆';
        }

        if (emotion[4].checked == true){
            r = 41, g = 131, b = 197;
            E = '悲観';
        }
        if (emotion[5].checked == true){
            r = 137, g = 115, b = 179;
            E = '憎悪';
        }
        if (emotion[6].checked == true){
            r = 240, g = 91, b = 97;
            E = '激怒';
        }
        if (emotion[7].checked == true){
            r = 246, g = 146, b = 61;
            E = '警戒';
        }
        
    }

    Er = r;
    Eg = g;
    Eb = b;
   
    var o = getComplementarycolor(r,g,b);
    var c = getOpposite_color(r,g,b);  
    
    var obj = document.getElementById('EColor');
    var color = RGB2bgColor2(r,g,b);
     
    obj.style.background = color;
    obj.innerHTML = color + '<br />' + 
                    'rgb(' + r + ',' + g + ',' + b+');' + '<br />' +
                    '反対色 ' + RGB2bgColor(o.r,o.g,o.b) + '<br />' +                  
                    '補色 '   + RGB2bgColor(c.r,c.g,c.b) + '<br />' +
                    '感情 ' + E;
    obj.style.color = RGB2bgColor(o.r,o.g,o.b);
}

 // RGBから#ffffff形式へ変換する
 function RGB2bgColor2(r,g,b) {
 
    r = r.toString(16);
    if (r.length == 1) r = "0" + r;
  
    g = g.toString(16);
    if (g.length == 1) g = "0" + g;
  
    b = b.toString(16);
    if (b.length == 1) b = "0" + b;
  
    return '#' + r + g + b;  
  }



const origin = document.getElementById('circle_origin');
const ctx = canvas.getContext('2d');
