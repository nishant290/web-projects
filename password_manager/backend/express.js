const express = require('express')
const model = require('./connection')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors({
    origin:'http://localhost:5173'
}))

app.get('/',async (req,res)=>{
    const data = await model.find()
    res.json(data)
})
app.post('/',async (req,res)=>{
    try {
    const { url, username, password } = req.body;
    const data = new model({ url, username, password });
    await data.save();
    res.json(data);
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ error: 'Username already exists for this URL!' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
})
app.put('/:id',async(req,res)=>{
   try {
        const updated = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
})

app.delete('/:id', async (req, res) => {
    try {
        const deleted = await model.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, message: 'Item not found' });
        }
        res.json({ success: true, message: 'Item deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

app.listen(5000,()=>{console.log('server is running on http://localhost:5000')})