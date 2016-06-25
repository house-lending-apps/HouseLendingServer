# Travis Build Status #
![Build Status](https://travis-ci.org/house-lending-apps/HouseLendingServer.svg?branch=develop)](https://travis-ci.org/house-lending-apps/HouseLendingServer)

House-Lending-Server Application
---

## Reference URLs used while designing the application :

### Website MindMap :
https://www.mindmeister.com/706437847

### Hosting Platform :
HerokuApps 

### Application URL:


### MongoDB Platform used for development 
https://mlab.com
mongodb://<dbuser>:<dbpassword>@ds047524.mlab.com:47524/house-lending-db

## How to Build The Application

### Prerequisites
- Install mongodb locally
- install node.js

### Step1 : Install Dependencies
npm install

### Step2 : Build Application for Local
- This step will analyze the code and start server on 9000
- The applicastion will run in watched mode, so if there is any change in any file the gulp watcher will restart application
```javascript
gulp run
```

### Step3 : Build Application for deployment
- This step Will build the application to be deployed on environment
```javascript
gulp run-prod
```
