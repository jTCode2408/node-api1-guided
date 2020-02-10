const express = require ('express'); //imports express CommonJSModules syntax
const Hubs = require('./data/hubs-model.js');

const server = express();
server.use(express.json()); //needed for post and put req. (middleware for express to tell how to read json from body)


server.get('/', (req,res) =>{
res.json({hello:'Web 26'})

})

//view a list of hubs(get endpoint)
server.get('/api/hubs', (req,res)=>{
//get hubs from database
Hubs.find()
.then(hubs=>{
res.status(200).json({hubs});
})
.catch(err=>{
    console.log(err);
    res.status(500).json({errorMessage: 'oops'})
})

})

//add a hub
server.post('/api/hubs',(req,res)=>{
    const hubInfo =req.body  //reads data from body of req. validatesd ata, if data is valid it is sent
    Hubs.add(hubInfo)
    .then(hub =>{
    res.status(201).json(hub);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({errorMessage:'bad'})
    })
})

//remove hub
server.delete('/api/hubs/:id', (req,res)=>{
 //const {id} = req.params;
 //Hubs.remove(id).then...
Hubs.remove(req.params.id)
.then(removed =>{
    res.status(200).json(removed);
})
.catch(err=>{
    console.log(err)
    res.status(500).json({errorMessage:'bad delete'})
})

})


const port =5000;
server.listen(port, ()=>console.log(`\n** API on port ${port}\n`));
