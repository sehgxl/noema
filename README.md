
![dictionary (2)](https://github.com/sehgxl/noema/assets/83122406/2abce641-aab3-4fbe-9ab9-713943511176)


# Noema 
A chrome extension for finding the meaning of a word.

Major Libraries Used:
- [Parcel](https://parceljs.org/)
- [React](https://react.dev/)
- [Vaul](https://vaul.emilkowal.ski/)
  
## Why it is called noema?
The word noema in greek means mental object. Since words are mental objects, I thought the name fits the usecase for the extension.

## What are the primary features?

### Look Up
- Shows the meaning of the word along with its source in a sheet that pops from the bottom of the page.

### Find Selection
- Highlights all the words which match the selected word. (It is regex behind the scene).

### Copy
- Copies the selected word to the clipboard.

### Search Web
- Opens a new tab with a google search of the word.

## What was the inspiration to build this?
I observed that, I often used this feature in my iphone. In IOS, this is a native feature. The experience of using this feature was pretty delightful and useful. So I thought building something similar but for the web would be fun. Plus an attempt to build something apple-like is in itself a good excersie to understand how well the apple folks master the details of all their interactions.

## How to set it up on your system?
1. Clone the repo.
```
git clone git@github.com:{your_username}/noema.git
```
2 Go in the noema folder and run this command 
```
npm run build
```

3 Go to the manage extensions page of your browser.

> Note: Here the instructions are based on chrome. 

4 On the top right side click on the three vertical dots.

5 Click on Extensions -> Manage Extensions and a new page will open.

6 On the top right side, turn on the developer mode.

7 On the top left side, click on an option called `Load Unpacked`.

8 Go to the noema folder and select the `dist` folder and the extension should appear.

## Screenshots
![screenshot-rocks (2)](https://github.com/sehgxl/noema/assets/83122406/2295df08-daa3-459a-b29d-0d29ec7dbd72)

![screenshot-rocks](https://github.com/sehgxl/noema/assets/83122406/ce1fc9fa-175d-4129-83ec-7762f6e65b90)

## Video 

https://github.com/sehgxl/noema/assets/83122406/7edbd730-0adf-4caf-a826-5c031a4af53a

## Mockups drawn for thinking about state
If you click on any of the extensions installed in the browser, a menu appears. We will call this a popup menu. Chrome extensions give you the ability to design this popup menu as per your own liking. 

This is nothing between but rather your good old document object just like any other website. But the the thing is this document object does not have any link with the document object which is rendered to you by the browser allowing you to see a website. So to do something in the popup and make it affect something in the website felt a bit difficult initially. You sort of have to send messages between the two document objects. Drawing these states was helpul in visualling that logic.     

![image](https://github.com/sehgxl/noema/assets/83122406/55447484-47c6-4530-96a2-1126a60aad8f)

## Attributes 
For the icon used: 
<a href="https://www.flaticon.com/free-icons/dictionary" title="dictionary icons">Dictionary icons created by PixelVerse - Flaticon</a>
