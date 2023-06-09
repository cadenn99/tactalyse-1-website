![Logo](https://www.tactalyse.com/wp-content/uploads/2019/07/tactalyse-sport-analyse.png)

# Tactalyse Website + API

This repository contains the necessary resources to run the Tactalyse website and backend. This webapp is a platform that allows customers to order tactical insight reports which are fulfilled by employees.

## Run Locally

To run this project locally execute the following steps

Clone the project

```bash
  git clone https://github.com/cadenn99/tactalyse-1-website.git
```

Go to the project directory

```bash
  cd tactalyse-1-website
```

Run using docker

```bash
  docker-compose up --build
```

## Environment Variables

To run this project, you will need to edit the following environment variables in the docker-compose file.

### Locally

`NEXT_PUBLIC_BACKEND_URL` this is the url to the API, by default this will be http://localhost:5000 if run locally

`REPORT_API` this is the url and endpoint to the other teams API for generating a PDF. If you wish to use the deployed version leave it as https://report-api.testalyse.nl/pdf

## Demo

[Tactalyse Demo](https://platform.testalyse.nl)
