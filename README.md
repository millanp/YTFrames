# google-image-scraper
A Chrome extension that automatically grabs thousands of image urls from Google Images for a list of given search queries.

**Video**
...

**Quickstart**
  1. Clone this repository to your local computer
  2. Edit NAME_LIST in content.js to your desired list of search queries
  3. Enable developer mode in Chrome, then load as an unpacked extension
  4. Go to http://google.com/images, then type in something and press enter. You should be taken to a view with a searchbox on top
  and a bunch of image thumbnails filling most of the screen.
  5. Click the chrome extension's icon (a black "reload" symbol on a white background)
  6. STAY ON THE GOOGLE IMAGES TAB UNTIL SCRAPER IS FINISHED. From here on out, it will do all the work for you.
  The urls will be downloaded as newline separated text files with the search query as the filename.

**Extra configuration**
  * The SCROLLS constant represents the number (integer) of full scrolls the script should perform before grabbing the URLs of all displayed images. Increase SCROLLS to produce more URLs per query, and decrease it to produce less.
