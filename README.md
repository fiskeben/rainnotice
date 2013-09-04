Rainnotice
==========

This is a small weather monitor based on [yr.no](http://yr.no) and [Pushover](http://pushover.net).

The idea is to run it every morning and have Pushover notify me if it's going to rain enough during the day to bother bringing an umbrella to work.

Installation & usage
--------------------

Once cloned from Git, install the dependencies with `npm install`.

You will need an account with [Pushover](http://pushover.net) and create a new app to get an API key.

Then remove the `example` from `settings.js.example` and `pushovertoken.js.example` and add your keys, set your weather report source from yr.no and pick an amount of rain you wish to use as limit.

You can run the app with `node rainnotice.js` but you would preferably use `cron` or something similar.

License
-------

This projected is licensed under the terms of the MIT license.