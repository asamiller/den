# Den
Den is an iPhone app built with React Native for viewing houses for sale in the NW from rmls.com. After being frsutrated with a site that hasn't changed since 2004, I decided to build a better viewing experince in the phone.

The app was built in a weekend (or so) by one designer and one developer.

![Den](https://cloud.githubusercontent.com/assets/5133623/7338978/01976cce-ec13-11e4-9b79-f2e2e47503b6.jpg)

## JSON workaround
Write now, React Native's bundler doesn't support JSON files. This means any module that requires a JSON file, doesn't work. [Cheerio](https://github.com/cheeriojs/cheerio) requires one, so to get it to work, I had to run it through Browserify first to package it all togheter. The React team has fixed this and it will be in the next release, but until then, I included a bundled version.

## Setup
1. Clone the repo `git clone https://github.com/asamiller/den`
2. Install dependencies `npm install`
3. Move the `cheerio` folder into `node_modules` (see above)
4. Open `Den.xcodeproj` in Xcode
5. Hit Build and test it in the iPhone simulator

![Den](https://cloud.githubusercontent.com/assets/5133623/7338976/017b5728-ec13-11e4-9482-f335be506733.gif)