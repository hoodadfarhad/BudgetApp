import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';
import session from 'express-session';
import passport from './auth/passport.js';
import authRoutes from './routes/auth.js';



// console.log("From server.js:", process.env.GOOGLE_CLIENT_ID);

dotenv.config();

const app = express();
const PORT = 5001;





const allowedOrigins = ['http://localhost:3000', 'https://budgetapp.it.com'];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {

    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // Respond to preflight requests
  }

  next();
});


app.use(express.json());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
const isProduction = process.env.NODE_ENV === 'production';


const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port:5432,
  ssl: isProduction ? { rejectUnauthorized: false } : false
  
})

db.connect();




app.post('/api/setID', async (req, res) => {
  
  console.log("Incoming ID:", req.body.OAuthID);

  if (!req.body.OAuthID) {
    return res.status(400).json({ error: "Missing OAuthID in request body" });
  }



  const result = await db.query(
    `INSERT INTO "userID" ("OAuthID")
     VALUES ($1)
     ON CONFLICT ("OAuthID") DO NOTHING
     RETURNING "APPID"`,
    [req.body.OAuthID]
  );
  console.log("reached here??"
  );
  // If nothing was inserted
  let appID;
  if (result.rows.length === 0) {
    const existing = await db.query(
      `SELECT "APPID" FROM "userID" WHERE "OAuthID" = $1`,
      [req.body.OAuthID]
    );
    appID = existing.rows[0].APPID;
  } else { // NEW USER

    appID = result.rows[0].APPID;
// console.log("EMAIL::: "+req.body.email);


   await db.query(
      `INSERT INTO "owners" (id, fname, lname, email)
     VALUES ($1, $2, $3 , $4)`,
      [appID, req.body.fname, req.body.lname, req.body.email ]
    );

await db.query(
      `INSERT INTO categories (name, owner_id)
       VALUES ($1,$2), ($3,$2), ($4,$2)`,
      ['Rent',appID, 'Groceries', 'Utilities']
    );


    
  }
  
  res.json( {appID} );
  
});


app.post('/auth/logout', (req, res) => {
  res.clearCookie('connect.sid'); // remove session cookie from browser
  res.status(200).json({ message: "Logged out " });
});

app.post('/api/figureCalc', async (req, res) => {
  
  
  // console.log( typeof(req.body.date.month));
  // console.log( (req.body.date.year));
  console.log(req.body.accountID);
  

  const sum = req.body.accountID === undefined? 
  
  
    await db.query(
      `SELECT t.is_income, SUM(t.amount)
       FROM transactions t
       WHERE t.owner_id = $1 
         AND EXTRACT(MONTH FROM t.date) = $2
         AND EXTRACT(YEAR FROM t.date) = $3
       GROUP BY t.is_income`,
      [req.body.id, req.body.date.month, req.body.date.year ]
    )
  :
  await db.query(
    `SELECT t.is_income, SUM(t.amount)
     FROM transactions t
     WHERE t.owner_id = $1 
       AND EXTRACT(MONTH FROM t.date) = $2
       AND EXTRACT(YEAR FROM t.date) = $3
       AND account_id = $4
     GROUP BY t.is_income`,
    [req.body.id, req.body.date.month, req.body.date.year, req.body.accountID ]
  ) 
  
  //  console.log(sum.rows);
  console.log(req.body.accountID);
  
  res.json(sum.rows);
});

app.get("/", (req, res) => {
  res.send("API is live. This is for devops testing");
});


app.post('/api/compareMonthCalc', async (req, res) => {


  const inputMonth = req.body.date.month;
const inputYear = req.body.date.year;

let all3Combined = [];

  // console.log( (req.body.date.year));


  for (let i = 0; i < 3; i++) {
    
    let sum = req.body.accountID === undefined? 
    
    await db.query(
      `SELECT 
    t.is_income, SUM(t.amount)
  FROM transactions t
  WHERE t.owner_id = $1 
    AND (EXTRACT(MONTH FROM t.date) = $2 AND EXTRACT(YEAR FROM t.date) = $3)
  GROUP BY t.is_income;`,
  [req.body.id, inputMonth-i, inputYear]
  )
  :
  await db.query(
    `SELECT 
  t.is_income, SUM(t.amount)
FROM transactions t
WHERE t.owner_id = $1 
  AND (EXTRACT(MONTH FROM t.date) = $2 AND EXTRACT(YEAR FROM t.date) = $3)
  AND account_id= $4
GROUP BY t.is_income;`,
[req.body.id, inputMonth-i, inputYear, req.body.accountID]
) 
// console.log(sum.rows);

all3Combined.push(
  {
    income: sum.rows.find(item => (item.is_income== true))?.sum || 0,
    expense: sum.rows.find(item => (item.is_income== false))?.sum || 0
  }
  
  );



  }

  
  
  //  console.log(all3Combined);
  
  res.json(all3Combined);
});



app.post('/api/getCatAmount', async (req, res) => {

  // console.log("this got called");

  const PieRecord = req.body.accountID === undefined? 
  
  await db.query(
    `SELECT SUM(t.amount) AS total, c.name AS category_name
     FROM transactions t
     INNER JOIN categories c ON c.id = t.category_id
     WHERE t.owner_id = $1 AND t.is_income = false
       AND EXTRACT(MONTH FROM t.date) = $2
       AND EXTRACT(YEAR FROM t.date) = $3
     GROUP BY c.name`,
    [req.body.id, req.body.date.month, req.body.date.year]
  )
  :
  await db.query(
    `SELECT SUM(t.amount) AS total, c.name AS category_name
     FROM transactions t
     INNER JOIN categories c ON c.id = t.category_id
     WHERE t.owner_id = $1 AND t.is_income = false
       AND EXTRACT(MONTH FROM t.date) = $2
       AND EXTRACT(YEAR FROM t.date) = $3
       AND account_id= $4
     GROUP BY c.name`,
    [req.body.id, req.body.date.month, req.body.date.year, req.body.accountID]
  )
  

  //  console.log(PieRecord.rows);
  
  res.json(PieRecord.rows);
});


app.post('/api/getAllTransactions', async (req, res) => {

  const history = req.body.accountID === undefined?
  
  await db.query(
    `SELECT 
        t.amount,
        t.date,
        t.is_income,
        t.description,
        c.name AS category_name,
        a.name AS account_name,
        t.id
      FROM transactions t
      LEFT JOIN categories c ON t.category_id = c.id
      LEFT JOIN accounts a ON t.account_id = a.id
      WHERE 
        t.owner_id = $1 AND 
        c.owner_id = $1 AND 
        a.owner_id = $1 AND
        EXTRACT(MONTH FROM t.date) = $2 AND 
        EXTRACT(YEAR FROM t.date) = $3
      ORDER BY t.date DESC`,
    [req.body.id, req.body.date.month, req.body.date.year ]
    
  )
  :
  await db.query(
    `SELECT 
        t.amount,
        t.date,
        t.is_income,
        t.description,
        c.name AS category_name,
        a.name AS account_name,
        t.id
      FROM transactions t
      LEFT JOIN categories c ON t.category_id = c.id
      LEFT JOIN accounts a ON t.account_id = a.id
      WHERE 
        t.owner_id = $1 AND 
        c.owner_id = $1 AND 
        a.owner_id = $1 AND
        EXTRACT(MONTH FROM t.date) = $2 AND 
        EXTRACT(YEAR FROM t.date) = $3 AND
        account_id = $4
      ORDER BY t.date DESC`,
    [req.body.id, req.body.date.month, req.body.date.year, req.body.accountID]
    
  ) 

  //  console.log(history.rows);
  
  res.json(history.rows);
});


  app.post('/api/accountsGetter', async (req, res) => {

    const existingAccounts = await db.query(
      `SELECT id, name, new_balance FROM accounts WHERE owner_id=$1 AND to_show=$2`,
      [req.body.owner_id, true]
    );
    
    res.json({ existingAccounts: existingAccounts.rows });
  });

  app.post('/api/newAccountInfo', async (req, res) => {
  
    
  

    const resultAddingAccount = await db.query(
      `INSERT INTO accounts (name, owner_id, balance)
       VALUES ($1,$2, $3)
       ON CONFLICT (name, owner_id)
DO UPDATE SET to_show = true;`,
      [req.body.info.bank + " " + req.body.info.name , req.body.owner_id, req.body.info.balance]
    );


    res.status(201).json({ message: "account added!", resultAddingAccount: resultAddingAccount.rows[0] });
  });



  app.post('/api/updateAccountInfo', async (req, res) => {
  

    // initial balance = updatedBalance - interCalc
  const res1 =  await db.query(
      `SELECT
      COALESCE((SELECT sum(amount) FROM transactions WHERE is_income = true AND owner_id = $1 AND account_id = $2), 0)
      - 
      COALESCE((SELECT sum(amount) FROM transactions WHERE is_income = false AND owner_id = $1 AND account_id = $2), 0)
      AS interCalc`,
      [ req.body.owner_id, req.body.accountID]
    )
  console.log("meghdar tashkilat: "+ parseInt(res1.rows[0].intercalc));
  
  let interCalc = parseInt(res1.rows[0].intercalc);
  let  updatedBalance = req.body.info.balance
    let newSyncing = updatedBalance - interCalc;
    const resultUpdatingAccount = await db.query(
      `UPDATE accounts 
      SET name=$1,
      balance=$2
      WHERE owner_id = $3 AND id= $4`,
      [req.body.info.bank + " " + req.body.info.name, newSyncing , req.body.owner_id, req.body.accountID]
    );


    res.status(201).json({ message: "account updated!", resultUpdatingAccount: resultUpdatingAccount.rows[0] });
  });













  app.post('/api/getCategories', async (req, res) => {

    const categories = await db.query(
      `SELECT name FROM categories
      WHERE owner_id=$1 AND to_show=$2`,
      [req.body.id,true]
    );
    // console.log(categories.rows);
    
    res.json(categories.rows);
  });



  app.post('/api/cardTransactions', async (req,res)=>{

     await db.query(
      `UPDATE accounts
      SET new_balance = (
      SELECT 
      COALESCE((SELECT balance FROM accounts WHERE accounts.id = $2), 0)
      +
      COALESCE((SELECT sum(amount) FROM transactions WHERE is_income = true AND owner_id = $1 AND account_id = $2), 0)
      - 
      COALESCE((SELECT sum(amount) FROM transactions WHERE is_income = false AND owner_id = $1 AND account_id = $2), 0)
    )
      WHERE accounts.id = $2`,      [req.body.id, req.body.accountID]
    );

    const result =  await db.query('SELECT new_balance from accounts WHERE accounts.id = $1', [req.body.accountID]);
  
  console.log(result.rows[0].new_balance);
  
    res.status(201).json({new_balance: result.rows[0].new_balance});
  })

app.post('/api/deleteTransaction', async (req,res)=>{

  const result = await db.query(
    `DELETE FROM transactions WHERE id = $1`,
    [req.body.modifiedRow]
  );


  res.status(201).json({ message: "Transaction deleted!"});
})











app.post('/api/AddUpdateTransaction', async (req, res) => {
    // console.log("new add mr received khan");
    
    // console.log(req.body);

    const { isIncome, account, category, date, fee, description, userID, modifiedRow   } = req.body;
    
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
 
        
        console.log(modifiedRow);
        
      
  if (modifiedRow === -1) {
    
  

    const result = await db.query(
      `INSERT INTO transactions (owner_id, amount, is_income, date, account_id, category_id,  description)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [userID, parseFloat(fee), isIncome, date, accountID.rows[0].id, categoryID.rows[0].id, description]
    );

  
    res.status(201).json({ message: "Transaction saved", transaction: result.rows[0] });

  } else{  // when updating a row

    const result = await db.query(

'UPDATE transactions SET owner_id = $1, amount = $2, is_income = $3, date = $4, account_id = $5, category_id = $6,  description= $7 WHERE id = $8 RETURNING *',
      [userID, parseFloat(fee), isIncome, date, accountID.rows[0].id, categoryID.rows[0].id, description, modifiedRow]
    );
    res.status(201).json({ message: "Transaction updated", transaction: result.rows[0] });

  }
  });

  
  



  app.post('/api/addCategory', async (req, res) => {
    // console.log("req for adding cat receiveeed");
    
    // console.log(req.body.name);

    const resultAddingCat = await db.query(
      `INSERT INTO categories (name, owner_id)
       VALUES ($1,$2)
       ON CONFLICT (name, owner_id)
DO UPDATE SET to_show = true;`,
      [req.body.name, req.body.owner_id]
    );


    res.status(201).json({ message: "added!", resultAddingCat: resultAddingCat.rows[0] });
  });



  app.post('/api/rmvCategory', async (req, res) => {
    // console.log("req for deleting cat receiveeed");
    
    // console.log(req.body.name);

    const resultremovingCat = await db.query(
      `UPDATE categories
SET to_show = false
WHERE name = $1 AND owner_id = $2;
`,
      [req.body.name, req.body.owner_id]
    );


    res.status(201).json({ message: "hid!", resultremovingCat: resultremovingCat.rows[0] });
  });

  app.post('/api/deleteAccountInfo', async (req, res) => {
    // console.log("req for deleting cat receiveeed");
    
    // console.log(req.body.name);

    const resultHidingAccount = await db.query(
      `UPDATE accounts
SET to_show = false
WHERE id = $1 AND owner_id = $2;
`,
      [req.body.accountID, req.body.owner_id]
    );


    res.status(201).json({ message: "hid!", resultHidingAccount: resultHidingAccount.rows[0] });
  });




  




// app.listen(PORT, () => {
//     console.log(`Server running on port: ${PORT}`);
//   });

app.listen(5001, '0.0.0.0', () => {
  console.log("Server running on port: 5001");
});