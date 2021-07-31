# criptalia-auto-invest
## Automatically invest on Criptalia projects when they open.

Tired of loosing the opportunity to invest on Criptalia projects because they close too fast? This extension allows you to set your amount while the countdown is still running, and place your investment right when the project opens.

### DISCLAIMER
This project is not affiliated to or endorsed by Criptalia in any way, I made this for my personal use and I'm sharing it to help other users. I take no responsibility if something goes wrong.

### How to install
The extension is pending validation for the Chrome Web Store, and will be eventually available as an official extension.

Meanwhile, you can try it in the Chrome developer mode:
- Clone this repository or download it and extract it to a folder
- Open Google Chrome and navigate to `chrome://extensions`
- Select the "Developer mode" in the upper right corner
- Click on the "Load unpacked extension" button
- Select the folder of this repository

### How to use
Before a Criptalia project opens, when there is the countdown, you will see, under the countdown itself, an option to enable auto-investment. Just enable the option, set the amount you want to invest, and don't touch anything else before the project opens. As soon as the countdown ends, your investment will immediately be placed.

### Security
This is a custom browser extension that interacts with the Criptalia web pages. Therefore, it could possibily do anything, including undesired action. I could tell you that it does nothing bad, but you should not take my word for it. Here are some suggestion to verify it yourself:
- The `js/invest.js` script is the one that carries the auto-invest logic. It's not obfuscated and it's quite clear. If you're familiar with JavaScript, I suggest you to read it before installing the extension, to be sure it's doing nothing wrong.
- The `libs/popper.min.js` and `tippy-bundle.umd.min.js` are needed to display the auto-invest enable tooltip. They're third-party libraries and I didn't touch them. To be sure of this, you should compare their checksum with the official distributions at https://unpkg.com/@popperjs/core@2 and https://unpkg.com/tippy.js@6 or just replace them with the ones at those URLs.