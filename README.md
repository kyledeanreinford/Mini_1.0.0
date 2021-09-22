I play the NY Times Mini Crossword with several of my friends, and while we could see the daily leaderboard, there was no way to see who had yesterday's best time, or who had the most wins. This made trash talking difficult.

I created this app which uses Python and Beautiful Soup to log in to my NY Times account and scrape all of the times into a database. I set up a cron on my server to do this one minute before the current day's puzzle disappears (9pm central Monday-Friday, 5pm Saturday-Sunday). Initially I was using a Postgres DB and Streamlit, but decided I wanted a more robust setup, so I shifted to MongoDB and built a MERN app, with visualizations using Nivo.

This is the MERN app secion of code, which uses the data from my <a href="https://github.com/kyledeanreinford/NYT_Mini_Leaderboard_Scraper">scraper.</a>

Author: Kyle Dean Reinford (kyledeanreinford@gmail.com)
