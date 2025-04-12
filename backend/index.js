import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from "pg";


const app = express();
const PORT = 5001;

app.use(express.json());
app.use(cors());

dotenv.config();


const db = new pg.Client({
  user: process.env.DB_USER,
  host: "localhost",
  database: "BudgetApp",
  password: process.env.DB_PASSWORD,
  port:5432
})

db.connect();


app.get('/', (req, res) => {
    res.json({ message: 'Test route working!' });
  });

  app.get('/api/getCategories', async (req, res) => {

    const categories = await db.query(
      `SELECT name FROM categories`
    );
    console.log(categories.rows);
    
    res.json(categories.rows);
  });

app.post('/api/newTransaction', async (req, res) => {
    console.log("reqqq receiveeed");
    
    console.log(req.body);

    const { isIncome, account, category, date, fee, description, ownerID  } = req.body;
    
    // console.log(description);
    //category,account,

    

    const accountID = await db.query(  );
    const categoryID = await db.query(  );

    const result = await db.query(
      `INSERT INTO transactions (owner_id, amount, is_income, date, account_id, category_id,  description)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [ownerID, amount, isIncome, date, accountID, categoryID, description]
    );


    res.status(201).json({ message: "Transaction saved", transaction: result.rows[0] });
  });



  app.post('/api/addCategory', async (req, res) => {
    console.log("req for adding cat receiveeed");
    
    console.log(req.body.name);

    const resultAddingCat = await db.query(
      `INSERT INTO categories (name, owner_id)
       VALUES ($1,$2)`,
      [req.body.name, req.body.id]
    );


    res.status(201).json({ message: "added!", resultAddingCat: resultAddingCat.rows[0] });
  });



  app.post('/api/rmvCategory', async (req, res) => {
    console.log("req for deleting cat receiveeed");
    
    console.log(req.body.name);

    const resultremovingCat = await db.query(
      `DELETE FROM categories WHERE name = $1`,
      [req.body.name]
    );


    res.status(201).json({ message: "added!", resultremovingCat: resultremovingCat.rows[0] });
  });




app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });