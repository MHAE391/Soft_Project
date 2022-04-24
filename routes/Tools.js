const express = require("express");

const tools = require("../static-data/Tools");
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send(hobbies);
  });

  router.get("/:id", (req, res) => {
    const toolEntity = tools.find((h) => h.id === +req.params.id);
  
    return !toolEntity
      ? res.status(404).send("The hobby with the given Id was not found")
      : res.status(200).send(toolEntity);
  });

  router.post("/", (req,res)=>{
    const toolEntity = {
        id: tools.length + 1,
        name: req.body.name,
        hobbyid: req.body.hobbyid,
        description: req.body.description,
        language: req.body.language,
        status: req.body.status,
        price: req.body.price,
      };
      tools.push(toolEntity);
      return res.status(201).send(toolEntity); 
  });

   router.put("/:id", (req, res) => {
    const toolEntity = tools.find((h) => h.id === +req.params.id);
    if (!toolEntity)
      return res.status(404).send("The hobby with the given Id was not found");

      toolEntity.name = req.body.name;
      toolEntity.description = req.body.description;
      toolEntity.hobbyid = req.body.hobbyid;
      toolEntity.language = req.body.language;
      toolEntity.status = req.body.status;
      toolEntity.price = req.body.price;
    
      return res.status(201).send(toolEntity);
    });


    router.delete("/:id", (req, res) => {
        const toolEntity = tools.find((h) => h.id === +req.params.id);
        if (!toolEntity)
          return res.status(404).send(" Id was not found");
      
        const toolEntityIndex = tools.indexOf(toolEntity);
        tools.splice(toolEntityIndex, 1);
      
        return res.status(204).send(toolEntity);
   });

      module.exports = router;