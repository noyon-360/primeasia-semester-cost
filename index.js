const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json())

app.post('/calculate', (req, res) => {
    const { total_credit, total_waiver } = req.body;

    if(typeof total_credit === undefined || typeof total_waiver === undefined) {
        return res.status(400).json({
            success: false,
            message : 'Please provide both total_credit and total_waiver values'
        });
    }

    if (typeof total_credit !== 'number' || typeof total_waiver !== 'number') {
        return res.status(400).json({
            success: false,
            message: 'Invalid input. Please provide numerical values for total_credit and total_waiver.'
        });
    }

    const per_credit_const = 2200;
    const semister_cost = 5500;

    const credit_cost = total_credit * per_credit_const;
    const waiver_new_cost = credit_cost * (total_waiver * 0.01);

    const new_cost = credit_cost - waiver_new_cost;

    const add_semister_cost = new_cost + semister_cost;

    res.status(200).json({
        success: true,
        data : {
            per_credit_const,
            semister_cost,
            total_cost : add_semister_cost,
        }
    });
});

app.listen(port, () => {
    console.log(`Server ruing on http://localhost:${port}`);
});
