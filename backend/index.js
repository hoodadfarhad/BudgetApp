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


app.post('/api/figureCalc', async (req, res) => {

  const sum = await db.query(
    `SELECT t.is_income, SUM(t.amount)
     FROM transactions t
     WHERE t.owner_id = $1 
       AND EXTRACT(MONTH FROM t.date) = EXTRACT(MONTH FROM CURRENT_DATE)
     GROUP BY t.is_income`,
    [req.body.id]
  );
  
  //  console.log(sum.rows);
  
  res.json(sum.rows);
});





app.post('/api/getCatAmount', async (req, res) => {

  // console.log("this got called");

  const PieRecord = await db.query(
    `SELECT SUM(t.amount), c.name AS category_name
     FROM transactions t
     LEFT JOIN categories c ON t.category_id = c.id
     WHERE t.owner_id = $1 AND c.owner_id = $1 AND t.is_income= false
      GROUP BY category_name`,
    [req.body.id]
  );

  //  console.log(PieRecord.rows);
  
  res.json(PieRecord.rows);
});


app.post('/api/getAllTransactions', async (req, res) => {

  const history = await db.query(
    `SELECT t.amount, t.date, t.is_income, t.description, c.name AS category_name
     FROM transactions t
     LEFT JOIN categories c ON t.category_id = c.id
     WHERE t.owner_id = $1 AND c.owner_id = $1
     ORDER BY date DESC;`,
    [req.body.id]
  );

  //  console.log(history.rows);
  
  res.json(history.rows);
});


  app.post('/api/accountsGetter', async (req, res) => {

    const existingAccounts = await db.query(
      `SELECT name FROM accounts WHERE owner_id=$1`,
      [req.body.owner_id]
    );
    
    res.json({ existingAccounts: existingAccounts.rows });
  });

  app.post('/api/newAccountInfo', async (req, res) => {
  
    
  

    const resultAddingAccount = await db.query(
      `INSERT INTO accounts (name, owner_id, balance)
       VALUES ($1,$2, $3)`,
      [req.body.info.bank + " " + req.body.info.name , req.body.owner_id, req.body.info.balance]
    );


    res.status(201).json({ message: "account added!", resultAddingAccount: resultAddingAccount.rows[0] });
  });

  app.get('/api/getCategories', async (req, res) => {

    const categories = await db.query(
      `SELECT name FROM categories`
    );
    // console.log(categories.rows);
    
    res.json(categories.rows);
  });

app.post('/api/newTransaction', async (req, res) => {
    console.log("reqqq receiveeed");
    
    // console.log(req.body);

    const { isIncome, account, category, date, fee, description, userID  } = req.body;
    
    // console.log(description);
    //category,account,

    

    const accountID = await db.query(
      `SELECT id FROM accounts 
       WHERE TRIM(LOWER(name))=TRIM(LOWER($1)) AND owner_id = $2`,
      [account, userID]
    );
    // console.log(accountID.rows[0].id);

      const categoryID = await db.query('SELECT id FROM categories WHERE owner_id=$1 AND name=$2',
        [userID, category]
        );
        // console.log(categoryID.rows[0].id);
      
  

    const result = await db.query(
      `INSERT INTO transactions (owner_id, amount, is_income, date, account_id, category_id,  description)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [userID, parseFloat(fee), isIncome, date, accountID.rows[0].id, categoryID.rows[0].id, description]
    );


    res.status(201).json({ message: "Transaction saved", transaction: result.rows[0] });
  });



  app.post('/api/addCategory', async (req, res) => {
    console.log("req for adding cat receiveeed");
    
    // console.log(req.body.name);

    const resultAddingCat = await db.query(
      `INSERT INTO categories (name, owner_id)
       VALUES ($1,$2)`,
      [req.body.name, req.body.owner_id]
    );


    res.status(201).json({ message: "added!", resultAddingCat: resultAddingCat.rows[0] });
  });



  app.post('/api/rmvCategory', async (req, res) => {
    console.log("req for deleting cat receiveeed");
    
    // console.log(req.body.name);

    const resultremovingCat = await db.query(
      `DELETE FROM categories WHERE name = $1 AND owner_id=$2`,
      [req.body.name, req.body.owner_id]
    );


    res.status(201).json({ message: "added!", resultremovingCat: resultremovingCat.rows[0] });
  });




app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });