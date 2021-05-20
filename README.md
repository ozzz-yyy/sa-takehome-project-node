## Application overview
This demo is written in Javascript (Node.js) with the [Express framework](https://expressjs.com/). 

You'll need to retrieve a set of testmode API keys from the Stripe dashboard (you can create a free test account [here](https://dashboard.stripe.com/register)) to run this locally.

We're using the [Bootstrap](https://getbootstrap.com/docs/4.6/getting-started/introduction/) CSS framework. It's the most popular CSS framework in the world and is pretty easy to get started with — feel free to modify styles/layout if you like. 

To simplify this project, we're also not using any database here, either. Instead `app.js` includes a simple switch statement to read the GET params for `item`. 

To get started, clone the repository and run `npm install` to install dependencies:

```
git clone https://github.com/ozzz-yyy/sa-takehome-project-node && cd sa-takehome-project-node
npm install
```

## Then run the application locally:

Replace/update .env file with keys and port

Also, client.js uses publishable key, need to add the key there as well

This application runs on port 3000 by default. It can be changed from .env file 
```
npm start
```

Navigate to [http://localhost:3000](http://localhost:3000) to view the index page.
