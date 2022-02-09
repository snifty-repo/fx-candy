# 🍬 FX Candy 
A Candy Machine like setup and artwork generator for [fx(hash)](https://www.fxhash.xyz/).

#### Why
If you want to launch any sort of generative type artwork on most blockchains you first have to...
- Generate all your art and metadata.
- Build and wire up a server running a website with a "connect your wallet" flow and Candy Machine on the backend which handles distributing tokens.
- Once minted, apply and submit work and metadata to marketplaces of your chose.

[fx(hash)](https://www.fxhash.xyz/) allows for us to do a lot of these things all in one step and FX Candy helps you do so.

## 📦 Download
- [Download Blank Template]()
- [Download Template w/Examples]()

## 🤝 Getting Started

To ensure the highest quality, we recommend that your exported image files meet the following requirements.
- At least or close to 1080px by 1080px in size.
- Image file names and folders DO NOT contain any spaces. If you need a space in a file/folder name, you can use "_" and it will be replaced with a space upon generation.
- Images are all type `.png` if your project uses more than one attribute.
- Add image files to the `/images` folder in your FX Candy template.
- Files are same size and aspect ratio.
- Organize art files by attribute similar to the example below.

Example Files            |  Example Images
:-------------------------:|:-------------------------:
![Image](./doc/example-files.png) |  ![Image](./doc/example-layers.png)

## 🎨 Attributes
Attributes are the characteristics of an NFT defined by the artists such as `Background: Black` `Hair: Blonde` or `Headgear: Crown`.

FX Candy works by...
1. Picking a random image file from each attribute folder in the `/images` folder.
2. Saving the **folder name** and **file name** as the attribute name and value.
3. Merging the chosen attribute files together into one image resulting in the NFTs final image.

Names/Values            |  Images
:-------------------------:|:-------------------------:
![Image](./doc/example-attributes.png) |  ![Image](./doc/example-result.png)

## 🛠 Config
In order for FX Candy to know about any of your attribute files, you have to define them in `config.js`.

#### Structure
Add as many attribute objects as you wish inside of the `const fxCandyConfig = []` array with as many values as you wish. Just make sure they follow JavaScript Object patterns.

Does this sound confusing to you? Ping me on Discord and I'll build a config for ya. Also, I am planning on releasing a UI soon. 🤝

```javascript
const fxCandyConfig = [
    
    // This is an attribute
    {
        // THis is a path to the attribute folder containing images.
        folder : "images/Background",

        // Optional: By default the name will be derived from the folder name. You can give specify a custom name to override the default.
        name : "",
        
        // These are all of the values for the above attribute.
        values : [
            {
                // The .png file to look for inside of the attribute folder.
                file : "Base",

                // Optional: By default the name will be derived from the file name. You can give specify a custom name to override the default.
                name : "Black",
            }
        ]
    },
]


```
#### Value Configuration
Configure attribute values by adding `.config` files inside of the attribute folders. Be sure everything before `.config` matches up with an attribute file (.png) in the same folder.

![Image](./doc/example-attribute-value-config.png)

| Option | Description |
| - | - |
| `name` | Rename the value to something other than the file name associated with this config. |
| `chance` | A percentage chance this value will be used such as `25` for 25%. | After all defined chances have been choses or not chosen.
| `order` | In the case of values, order refers to the order in which rarity is calculated. If you set one attribute value to be `order=1` and it's chance is set to `25`, then the generator will first check if this should be included, and if not, randomly pick from the remaining values. If you define the `order` for multiple values, those will first run in order and if nothing has been chosen, pick one from the pile.

**Example Value Config**
- 50% chance that the "Glasses" attribute (`/images/Glasses`) will be used.
- Rename the attribute from "Glasses" to "Eyewear".
- Order this as the 3rd layer when merging attributes together.

`/images/Eyes/Normal Eyes.config`
```bash
name=Sexy Eyes
chance=50
order=3
```


## 👀 Preview
1. Open project folder in Finder/File Explorer.
2. Double Click `index.html`
3. Each time you refresh the page, new combinations of attributes will be generated.

*Be sure to preview your work often and frequently refresh as you are adding artwork.*



## 🚀 Deploy to fx(hash)

### 📁 Compress It
In order to upload to [fx(hash)](https://www.fxhash.xyz/) the FX Candy project needs to be a `.zip`.

**Important:** Make sure your zip file doesn't exceed 15mb as mentioned by [fx(hash) mint guide](https://www.fxhash.xyz/articles/guide-mint-generative-token).

#### MacOS
1. Open your project folder in Finder.
2. Highlight all of your project files/folders.
3. Right click and select "Compress...".

You should get an `Archive.zip` which is what you upload to fx(hash).

### 📦 Upload To fx(hash)
Now that you have a `.zip`, you can upload it to [fx(hash)](https://www.fxhash.xyz/).

Make sure you have previewed your project both locally and in the [fx(hash)](https://www.fxhash.xyz/) sandbox before actually deploying.

- Sandbox: [fx(hash) Sandbox](https://www.fxhash.xyz/sandbox)
- Mint Guide: [fx(hash) Sandbox](https://www.fxhash.xyz/articles/guide-mint-generative-token)

#### Support
If you need help or want to chat, reach out in the [Snifty Creative Discord](https://discord.com/invite/ahstt6BwyS) and we'll be happy to help. 