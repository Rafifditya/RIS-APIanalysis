# RIS-APIanalysis


The API of Retail Analysis Sistem to predict costumer this is the core of processing MAC-address from https;//probr.ch/ generic passive wifi tracking using customer smartphone to Forecast data Customer


### Technology

The frameworks, languages, tools and technologies used and required in the this project are:

* Python 2.7
* [Nodejs](https://www.nodejs.org/)
* [Expressjs](http://expressjs.com/)




## Installation

We highly recommended to use [Virtualenv](https://virtualenv.pypa.io/en/latest/) to manage the python environment for probr-core.

After cloning the project, create a virtual environment for probr outside the probr-core directory:

```
virtualenv .env_RISapi

```

Activate the virtual python environment:

```
source .env_RISapi/bin/activate

```

Go into the `RIS-APIanalysis` directory.
Now install the python dependencies of the project:

```
pip install -r requirements.txt

```

You're pretty much set to start RIS-APIanalysis at this moment. What is left to do is:

Make sure the [probr-core](https://github.com/probr/probr-core/) & [probr-analysis](https://github.com/probr/probr-analysis/) running


## Start-Up

Finally, you're ready to start your probr-core server by running:

Don't forget activate the virtual python environment :

```
source .env_RISapi/bin/activate

```

Start project :

```
npm start
```

And you can check it out by visiting `http://localhost:8200`.
