const express = require('express');
const app = express();
const path = require('path');
const request = require('request'); 

app.use('/:id', express.static(path.join(__dirname, 'public')));

app.get('/:id/photosBundle.js', (req, res) => {
  request(`http://localhost:3003/${req.params.id}/photosBundle.js`, (error, response, body) => {
    if (error) {
      console.log(error);
    }
    res.send(body);
  })
});

app.get(`/photos/:id`, (req, res) => {
  request(`http://localhost:3003/photos/${req.params.id}`, (error, response, body) => {
    if (error) {
      console.log(error);
    }
    res.send(body);
  })
});

app.get('/:id/bookingBundle.js', (req, res) => {
  request(`http://localhost:3002/${req.params.id}/bookingBundle.js`, (error, response, body) => {
    if (error) {
      console.log(error);
    }
    res.send(body);
  })
});

app.get(`/info/:id`, (req, res) => {
  request(`http://localhost:3002/info/${req.params.id}`, (error, response, body) => {
    if (error) {
      console.log(error);
    }
    res.send(body);
  })
});

app.get(`/dates/:id`, (req, res) => {
  request(`http://localhost:3002/dates/${req.params.id}`, (error, response, body) => {
    if (error) {
      console.log(error);
    }
    res.send(body);
  })
});

app.get('/:id/reviewBundle.js', (req, res) => {
  request(`http://localhost:3007/reviewBundle.js`, (error, response, body) => {
    if (error) {
      console.log(error);
    }
    res.send(body);
  })
});

app.get("/house/:houseId/",(req,res) =>  {
  console.log('houseIdFrom,',req.params)
  request(`http://localhost:3007/house/${req.params.houseId}`,function(err,response,body) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(body);
    }
  })
});
app.get(`/house/:houseId/reviews`,(req,res) =>  {
  request(`http://localhost:3007/house/${req.params.houseId}/reviews?page=${req.query.page}`,function(err,response,body) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(body);
    }
  })
});

app.get('/users',(req,res) =>  {
request("http://localhost:3007/users",function(err,response,body) {
  if (err) {
    res.sendStatus(500);
  } else {
    res.send(body);
  }
})
});
app.get('/user/:userId',(req,res) =>  {
  request(`http://localhost:3007/user/${req.params.userId}`,function(err,response,body) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(body);
    }
  })
});

app.get('/:id/bundle.js', (req, res) => {
  request(`http://localhost:3009/:id/bundle.js`, (error, response, body) => {
    if (error) {
      console.log(error);
    }
    res.send(body);
  })
});

app.get('/listing/:id', (req, res) => {
  request('http://localhost:3009/listing/:id', function (error, response, body) { 
    if (!error && response.statusCode === 200) {  
      res.send(body); 
    } 
  });
});

app.get('/lists/:id', (req, res) => {
  request('http://localhost:3009/lists/:id', function (error, response, body) { 
    if (!error && response.statusCode === 200) {  
      res.send(body); 
    } 
  });
});

app.get('/list/:id', (req, res) => {
  request('http://localhost:3009/list/:id', function (error, response, body) { 
    if (!error && response.statusCode === 200) {  
      res.send(body); 
    } 
  });
});

app.get('/lists2listings/:id', (req, res) => {
  request({url: 'http://localhost:3009/lists2listings/:id', qs: { listingIds: req.query.listingIds}}, function (error, response, body) { 
    if (!error && response.statusCode === 200) {  
      res.send(body); 
    } 
  });
});

app.get('/like/:id', (req, res) => {
  request({url: 'http://localhost:3009/like/:id', qs: { data: req.query.data }}, function (error, response, body) { 
    if (!error && response.statusCode === 200) {  
      res.send(body); 
    } 
  });
});

app.post('/like', (req, res) => {
  request.post('http://localhost:3009/like', {form:{data: req.body.data}}, (err, res) => { 
    if (err) {
      console.log(err);   
    } else {
      console.log('we did it') 
    }
  });
});

app.post('/lists', (req, res) => {
  request.post('http://localhost:3009/lists', {form:{
    listingId: req.body.listingId, 
    listId: req.body.listId,
    liked: req.body.liked}
  }, (err, res) => { 
    if (err) {
      console.log(err);   
    } else {
      console.log('we did it lists') 
    }
  });
});

app.listen(3001, () => console.log('Proxy listening on port 3001'));
