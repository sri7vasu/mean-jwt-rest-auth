# mean-jwt-rest-auth application

mean-jwt-rest-auth is a RESTful authentication application with Json web tokens(JWT) based out of two of the best
articles/tutorials on the web:

1.http://www.kdelemme.com/2014/03/09/authentication-with-angularjs-and-a-node-js-rest-api/ - https://github.com/kdelemme/blogjs (Back end code is from here)
2.http://code.tutsplus.com/tutorials/token-based-authentication-with-angularjs-nodejs--cms-22543 - https://github.com/huseyinbabal/token-based-auth-frontend (front end code is from here)

Combined the above two solutions, customized the same and added UI validations. Thanks to both the authors for the above articles.
User will be shown Home,Signin,Signup if he/she is not registered/logged in , else Home,Me and Logout are shown.

## Dependencies

redis needs to be up and running on port 6379

mongodb needs to be up and running on port 27017

Pick the latest versions available, change the ports accordingly as per your choice or use the same ones.

### Installation

Clone the repository with: sri7vasu@home:/$ git clone https://github.com/sri7vasu/mean-jwt-rest-auth.git

Install the Dependencies by running sri7vasu@home:/var/www/angular/mean-jwt-rest-auth$ npm install

- Edit server.js and replace the value of Access-Control-Allow-Origin to match your server configuration if required.
- Edit app/js/app.js and replace the value of options.api.base_url to match your server configuration if required.
- Edit server/config/mongo_database.js and replace the value of mongodbURL to match your server configuration or port if required.
- Edit server/config/secret.js and replace the value of exports.secretToken to a different token if required.

### Start Redis

Install redis from http://redis.io
Go to the redis-server download folder, browse to 32-bit or 64-bit based on your configuration. This folder can be placed any where
on your machine. Start your redis instance by double clicking on redis-server.exe

Or

sri7vasu@home:/var/www/angular/mean-jwt-rest-auth$ redis-server
                _._                                                  
           _.-``__ ''-._                                             
      _.-``    `.  `_.  ''-._           Redis 2.8.9 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._                                   
 (    '      ,       .-`  | `,    )     Running in stand alone mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6379
 |    `-._   `._    /     _.-'    |     PID: 13499
  `-._    `-._  `-./  _.-'    _.-'                                   
 |`-._`-._    `-.__.-'    _.-'_.-'|                                  
 |    `-._`-._        _.-'_.-'    |           http://redis.io        
  `-._    `-._`-.__.-'_.-'    _.-'                                   
 |`-._`-._    `-.__.-'    _.-'_.-'|                                  
 |    `-._`-._        _.-'_.-'    |                                  
  `-._    `-._`-.__.-'_.-'    _.-'                                   
      `-._    `-.__.-'    _.-'                                       
          `-._        _.-'                                           
              `-.__.-'                                               


[13499] 31 Oct 15:25:54.165 # Server started, Redis version 2.8.9
[13499] 31 Oct 15:25:54.165 * The server is now ready to accept connections on port 6379

### Start mongodb

Go to mongodb download folder, browse to bin folder and run mongod.exe by double clicking.Install robomongo, that would be a
helpful tool for debugging purposes.

### Running the app (Back end)

Runs like a typical express app:

node server.js

$ node server.js
Express server listening on port 3000
Redis is ready
Connection successful to: mongodb://localhost:27017/mean-jwt-rest-auth

### Running the app (Front end)

sri7vasu@home:/var/www/angular/mean-jwt-rest-auth/app/$ http-server

$ http-server
Starting up http-server, serving ./
Available on:
  http:10.0.0.10:8080
  http:127.0.0.1:8080
Hit CTRL-C to stop the server

Now, browse to http://localhost:8080 to see the app.

## Contact

Please contact me if you have any questions/issues.

## License

The MIT License (MIT)

Copyright (c) 2015 Srinivasa R Atta (sri7vasu@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
