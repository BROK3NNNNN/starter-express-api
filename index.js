const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")


const diaksema = new mongoose.Schema({
  name:{
    type: String,
  },
  school:{
    type: String,
  },
  age:{
    type: String
  }
})

const Diak = mongoose.model("diakok", diaksema)






router.get("/", async (req, res) =>{
  const lista = await Diak.find().sort("name")
  res.send(lista)
})



router.post("/", async(req, res) => {
  var ujdiak = new Diak({
    school: req.body.school,
    name: req.body.name,
    age: req.body.age
  })
  ujdiak = await ujdiak.save()
  res.send(ujdiak)
})


router.put("/:id", async(req, res) =>{
  const csere = await  Diak.findByIdAndUpdate(req.params.id, {name: req.body.name},{
    new: true
  })

  if(!csere){
    return res.status(400).send("HIBA :(")
  }
  res.send(csere)

})

router.delete("/:id", async(req, res) =>{
  const torol = await Diak.findByIdAndDelete(req.params.id, {name: req.body.name},{
    new: true
  })
  if(!torol){
    return res.status(400).send("HIBA :(")
  }
  res.send(torol)
})

module.exports = router