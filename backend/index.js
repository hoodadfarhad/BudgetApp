import express from 'express';
import cors from 'cors';


const app = express();
const PORT = 5001;

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.json({ message: 'Test route working!' });
  });

app.post('/api/newTransaction', (req, res) => {
    console.log("reqqq receiveeed");
    
    console.log(req.body);
    res.json({ message: 'Data received!' });
  });



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });