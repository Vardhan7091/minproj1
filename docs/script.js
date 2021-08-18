var originalimage = null;
var filteroneimage = null;
var filtertwoimage = null;
var filterthreeimage = null;
var rainbowimage = null;
var canvas;

canvas = document.getElementById("can1");

function sqr(number)
{
  return number*number;
}

function upload()
{
  originalimage = new SimpleImage(imageinput);
  filteroneimage = new SimpleImage(imageinput);
  filtertwoimage = new SimpleImage(imageinput);
  filterthreeimage = new SimpleImage(imageinput);
  rainbowimage = new SimpleImage(imageinput);
  originalimage.drawTo(canvas);
}

function loadcheck(image)
{
  if(image == null || !image.complete())
    {
      return false;
    }
  else
    {
      return true;
    }
}

//GrayScale filter
function dofilterone()
{
  if(loadcheck(filteroneimage) == false)
    {
       alert('Image not loaded'); 
    }
  else
    {
      doclear();
      for(var pixel of filteroneimage.values())
        {
          var avg = (pixel.getRed()+pixel.getBlue()+pixel.getGreen())/3;
          pixel.setRed(avg);
          pixel.setGreen(avg);
          pixel.setBlue(avg);
        }
      filteroneimage.drawTo(canvas);
    }
}


//Red filter
function dofiltertwo()
{
  if(loadcheck(filtertwoimage) == false)
    {
       alert('Image not loaded'); 
    }
  else
    {
      doclear();
      for(var pixel of filtertwoimage.values())
        {
           var avg = (pixel.getRed()+pixel.getBlue()+pixel.getGreen())/3;
          if(avg < 128)
            {
              pixel.setRed(2*avg);
              pixel.setGreen(0);
              pixel.setBlue(0);
            }
          else
            {
              pixel.setRed(255);
              pixel.setBlue(2*avg - 255);
              pixel.setGreen(2*avg - 255);
            }
        }
      filtertwoimage.drawTo(canvas);
    }
}


//Ellipse filter
function dofilterthree()
{
  if(loadcheck(filterthreeimage) == false)
    {
       alert('Image not loaded'); 
    }
  else
    {
      doclear();
      var b = filterthreeimage.getHeight()/2;
      var a = filterthreeimage.getWidth()/2;
      if(b > a)
        {
          var c = b;
          b = a;
          a = c;
        }
      for(var pixel of filterthreeimage.values())
        {
          var x = pixel.getX();
          var y = pixel.getY();
          var avg = (pixel.getRed()+pixel.getBlue()+pixel.getGreen())/3;
            if(sqr((x-a)/a)+sqr((y-b)/b) > 0.5)
              {
                pixel.setRed(avg);
                pixel.setGreen(avg);
                pixel.setBlue(avg);
              }
        }
      filterthreeimage.drawTo(canvas);
    }
}

function dorainbow()
{
  if(loadcheck(rainbowimage) == false)
    {
       alert('Image not loaded'); 
    }
  else
    {
      doclear();
      var h = rainbowimage.getHeight();
      for(var pixel of rainbowimage.values())
        {
          var avg = (pixel.getRed()+pixel.getBlue()+pixel.getGreen())/3;
          var y = pixel.getY();
          if(y <= h/7)
            {
              if(avg < 128)
                {
                  pixel.setRed(2*avg);
                  pixel.setGreen(0);
                  pixel.setBlue(0);
                }
              else
                {
                  pixel.setRed(255);
                  pixel.setGreen(2*avg - 255);
                  pixel.setBlue(2*avg - 255);
                }
            }
          if(y > h/7 && y <= 2*h/7)
            {
              if(avg < 128)
                {
                  pixel.setRed(2*avg);
                  pixel.setGreen(0.8*avg);
                  pixel.setBlue(0);
                }
              else
                {
                  pixel.setRed(255);
                  pixel.setGreen(1.2*avg - 51);
                  pixel.setBlue(2*avg - 255);
                }
            }
          if(y > 2*h/7 && y <= 3*h/7)
            {
              if(avg < 128)
                {
                  pixel.setRed(2*avg);
                  pixel.setGreen(2*avg);
                  pixel.setBlue(0);
                }
              else
                {
                  pixel.setRed(255);
                  pixel.setGreen(255);
                  pixel.setBlue(2*avg - 255);
                }
            }
          if(y > 3*h/7 && y <= 4*h/7)
            {
              if(avg < 128)
                {
                  pixel.setRed(0);
                  pixel.setGreen(2*avg);
                  pixel.setBlue(0);
                }
              else
                {
                  pixel.setRed(2*avg - 255);
                  pixel.setGreen(255);
                  pixel.setBlue(2*avg - 255);
                }
            }
          if(y > 4*h/7 && y <= 5*h/7)
            {
              if(avg < 128)
                {
                  pixel.setRed(0);
                  pixel.setGreen(0);
                  pixel.setBlue(2*avg);
                }
              else
                {
                  pixel.setRed(2*avg - 255);
                  pixel.setGreen(2*avg - 255);
                  pixel.setBlue(255);
                }
            }
          if(y > 5*h/7 && y <= 6*h/7)
            {
              if(avg < 128)
                {
                  pixel.setRed(0.8*avg);
                  pixel.setGreen(0);
                  pixel.setBlue(2*avg);
                }
              else
                {
                  pixel.setRed(1.2*avg - 51);
                  pixel.setGreen(2*avg - 255);
                  pixel.setBlue(255);
                }
            }
          if(y > 6*h/7 && y <= 7*h/7)
            {
              if(avg < 128)
                {
                  pixel.setRed(1.6*avg);
                  pixel.setGreen(0);
                  pixel.setBlue(1.6*avg);
                }
              else
                {
                  pixel.setRed(0,4*avg+153);
                  pixel.setGreen(2*avg - 255);
                  pixel.setBlue(0.4*avg+153);
                }
            }
        }
      rainbowimage.drawTo(canvas);
    }
}

function doreset()
{
  if(loadcheck(originalimage) == false)
    {
      alert('image not loaded');
    }
  else
    {
      originalimage.drawTo(canvas);
      filteroneimage = new SimpleImage(imageinput);
  filtertwoimage = new SimpleImage(imageinput);
  filterthreeimage = new SimpleImage(imageinput);
      rainbowimage = new SimpleImage(imageinput);
    }
}

function doclear()
{
  var context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
}