import './general';

class Memes {
  constructor() {
    console.log("Inside the Memes JS File.");

    this.$bottomTextInput = document.querySelector('#bottomText');
    this.$imageInput = document.querySelector('#image');
    this.$downloadButton = document.querySelector('#downloadMeme');
    this.$defaultImage = document.querySelector('#defaultImage');
    this.$fontSelect = document.querySelector('#fontSelect'); // Font selection input
    this.$colorInput = document.querySelector('#fontColor'); // Font color selection input
    console.log(this.$colorInput);
    this.image = new Image(); // Create a new Image instance
    this.image.src = this.$defaultImage.src; // Set the source of the new image instance

    this.$canvas = document.querySelector('#imgCanvas');
    this.$context = this.$canvas.getContext('2d');
    this.deviceWidth = window.innerWidth;

    this.addEventHandlers();
    // Wait for the image to load before creating the canvas and meme
    this.image.onload = () => {
      this.createCanvas();
      this.createMeme();
    };
  }

  createCanvas() {
    console.log("Creating canvas...");
    // Set the canvas size to the minimum of 1000 and deviceWidth - 30
    this.$canvas.height = Math.min(1000, this.deviceWidth - 30);
    this.$canvas.width = Math.min(1000, this.deviceWidth - 30);

    // Draw the image after setting the canvas size
    this.createMeme();
  }

  createMeme() {
    // Clear the canvas
    this.$context.clearRect(0, 0, this.$canvas.height, this.$canvas.width);
    // Set up text drawing
    this.$canvas.height = this.image.height;
    this.$canvas.width = this.image.width;
    this.$context.drawImage(this.image, 0, 0);

    // Setup the text for drawing
    const fontSize = ((this.$canvas.width + this.$canvas.height) / 2) * 4 / 100;
    this.$context.font = `${fontSize}pt ${this.$fontSelect.value}`; // Use selected font
    this.$context.textAlign = 'center';
    this.$context.textBaseline = 'top';
    this.$context.lineJoin = 'round';
    this.$context.lineWidth = fontSize / 5;
    this.$context.strokeStyle = 'black';
    this.$context.fillStyle = this.$colorInput.value; // Use selected font color

    const bottomText = this.$bottomTextInput.value.toUpperCase();
    this.$context.strokeText(bottomText, this.$canvas.width / 2, this.$canvas.height * (90 / 100));
    this.$context.fillText(bottomText, this.$canvas.width / 2, this.$canvas.height * (90 / 100));
  }

  addEventHandlers() {
    this.createMeme = this.createMeme.bind(this);
    this.downloadMeme = this.downloadMeme.bind(this);
    this.loadImage = this.loadImage.bind(this);
    this.resizeCanvas = this.resizeCanvas.bind(this);

    this.$bottomTextInput.onchange = this.createMeme;
    this.$bottomTextInput.onkeyup = this.createMeme;
    this.$downloadButton.onclick = this.downloadMeme;
    this.$imageInput.onchange = this.loadImage;
    this.$fontSelect.onchange = this.createMeme; // Trigger createMeme on font selection change
    this.$colorInput.oninput = this.createMeme; // Trigger createMeme on font color selection change
  }

  downloadMeme() {
    const imageSource = this.$canvas.toDataURL('image/png');
    this.$downloadButton.setAttribute('href', imageSource);
  }

  loadImage() {
    if (this.$imageInput.files && this.$imageInput.files[0]) {
      let reader = new FileReader();

      reader.onload = () => {
        this.image = new Image();
        this.image.onload = () => {
          this.createMeme();
        };
        this.image.src = reader.result;
      };

      reader.readAsDataURL(this.$imageInput.files[0]);
    }
  }

  resizeCanvas(canvasHeight, canvasWidth) {
    let height = canvasHeight;
    let width = canvasWidth;
    let scale = 1;
    while (height > Math.min(1000, this.deviceWidth - 30) && width > Math.min(1000, this.deviceWidth - 30) && width > Math.min(1000, this.deviceWidth - 30)) {
      height /= 2;
      width /= 2;
      scale /= 2;
    }
    this.$canvas.height = height;
    this.$canvas.width = width;
    this.$context.scale(scale, scale);
  }
}

window.onload = () => { new Memes() };



// Create a class called Memes
// - Part 1 - Setup the canvas and draw the default meme
//   - Initialize instance variables for all of the ui elements in the constructor
      
//   - Write the method createCanvas
//     - set the width of the canvas to the minimum of 1000 and deviceWidth - 30
//     - set the height of the canvas to the min of 1000 and the deviceWidth
//     - add a call to this method in the constructor

//   - Write the method createMeme.  It should
//     - clear the previous image from the page
//     - draw the image
//       - initialize the height and width of the canvas to the height and width of the (default) image
//       - draw the image on the context
//     - setup text drawing
//       - initialize a local constant for the font size.  Here's the calculation   
//         this.$canvas.width+this.$canvas.height)/2)*4/100;
//       - set the font of the context to `${fontSize}pt sans-serif`
//         Notice the template literal instead of concatenation!
//       - set the textAlign property to center
//       - set the textBaseline property to top
//       - set the lineWidth property to 1/5 of the fontSize
//       - set the strokeStyle (outline) property to black
//       - set the fillStyle to white
//     - draw the text
//       - get the default bottom text from the ui and put it in a variable
//       - make sure it is all caps
//       - write it on the context 
//       - don't forget to outline the text in black!
//     - add a call to this method in the constructor
//   END OF PART 1 - TEST AND DEBUG YOUR CODE - YOU SHOULD SEE THE MEME ON THE PAGE

// - PART 2 - Change the code as the user types
//   - Write the method addEventListeners
//     - bind this to the class for the method createMeme
//     - add the keyup event and the change event to the bottom text input element
//   - Add a call to this method in the constructor
//   END OF PART 2 - TEST AND DEBUG YOUR CODE - YOU SHOULD SEE THE MEME CHANGE WHEN YOU TYPE

// - PART 3 - Download the meme
//   - Write the method downloadMeme
//     - declare a constant imageSource and set it to the canvas converted to data
//     - set the href attribute of the download button to the imageSource
//   - Change the addEventListers method to include downloading
//     - bind the class to the downloadMeme method
//     - add an event handler to the click event for the download button
// END OF PART 3 - TEST AND DEBUG YOUR CODE - YOU SHOULD BE ABLE TO DOWNLOAD THE MEME

// - PART 4 - Choose an image
//   - Write the method loadImage
//     - if there's something in the file input on the page
//       - declare and instantiate a FileReader object
//       - set it's onload hander to an anonymous function that
//         - set the image instance variable to a new image
//         - set it's onload handler to an anonymou function that
//           - calls the createMeme method
//           - calls the downloadMeme method (this was not included in the screencast)
//         - set the src property of the image to the result from reading the file
//       - read the file
//   - Change the addEventListeners
//     - bind the class to the loadImage method
//     - add an event handler to the change event for the file input element on the page
// END OF PART 4 - TEST AND DEBUG YOUR CODE - YOU SHOULD BE ABLE TO PICK AN IMAGE FOR THE MEME

// - Part 5 - Resize the image if the user picks a really big image
//   - Write the method resizeImage
//     resizeCanvas(canvasHeight, canvasWidth) {
//       let height = canvasHeight;
//       let width = canvasWidth;
//       let scale = 1;
//       while(height > Math.min(1000, this.deviceWidth-30) && width > Math.min(1000, this.deviceWidth-30)) {
//         height /= 2;
//         width /= 2;
//         scale /= 2
//       }
//       this.$canvas.height = height;
//       this.$canvas.width = width;
//       this.$context.scale(scale, scale);
//     }
//   - Change the method addEventListener
//     - bind the class to the resizeImage method
//     - call resizeCanvas in createMeme just before you draw the image
// END OF PART 5 - TEST AND DEBUG YOUR CODE - YOU SHOULD BE ABLE TO PICK A REALLY LARGE IMAGE

// - Part 6 - Provide the user with some additional functionality.  You could
//   - allow the user to pick the font for the text
//   - allow the user to pick the font color for the text

//   - FOR at least 2 of the additional features 
//     - add html element to the html page to allow the user to work with your feature
//     - change the JS class to add event handlers to your ui elements.  The event should trigger a call to createMeme
//     - change the createMeme method to add your features to the canvas.


