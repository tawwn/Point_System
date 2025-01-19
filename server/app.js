const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Mock Databases
const users = [
    { id: 1, email: 'test@example.com', password: '123456', points: 120 },
];

let rewards = [
    {
        id: 1,
        image: "https://media.amway.id/sys-master/images/hab/hdf/9100410224670/ath-foa-privilege-img02a-may2021.jpg",
        name: "Reward A",
        cost: 50,
        expiresAt: "2025-02-20",
        redeemed: false,
    },
    {
        id: 2,
        image: "https://media.amway.id/sys-master/images/h15/h21/9100409962526/ath-foa-privilege-img01a-may2021.jpg",
        name: "Reward B",
        cost: 80,
        expiresAt: "2026-01-15",
        redeemed: false,
    },
    {
        id: 3,
        name: "Reward C",
        cost: 40,
        expiresAt: "2026-01-10",
        redeemed: false,
    },
    {
        id: 4,
        name: "Reward D",
        cost: 100,
        expiresAt: "2024-01-25",
        redeemed: false,
    },
    {
        id: 5,
        name: "Reward E",
        cost: 100,
        expiresAt: "2024-01-25",
        redeemed: false,
    },
    {
        id: 6,
        name: "Reward F",
        cost: 100,
        expiresAt: "2024-01-25",
        redeemed: false,
    },
    {
        id: 7,
        name: "Reward G",
        cost: 100,
        expiresAt: "2024-01-25",
        redeemed: false,
    },
    {
        id: 8,
        name: "Reward H",
        cost: 100,
        expiresAt: "2024-01-25",
        redeemed: false,
    },
];

// Login API
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        console.log('Missing email or password:', { email, password });
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
        console.log('Login successful:', { email });
        return res.status(200).json({
            message: 'Login successful!',
            token: 'mock-jwt-token',
        });
    } else {
        console.log('Invalid login attempt:', { email });
        return res.status(401).json({ message: 'Invalid email or password!' });
    }
});

// Get Rewards API
app.get('/rewards', (req, res) => {
    console.log('Fetching rewards...');
    res.status(200).json(rewards);
});

// Redeem Reward API
app.post('/redeem/:rewardId', (req, res) => {
    const rewardId = parseInt(req.params.rewardId);

    const reward = rewards.find((r) => r.id === rewardId);

    if (!reward) {
        return res.status(404).json({ message: 'Reward not found' });
    }

    if (reward.redeemed) {
        return res.status(400).json({ message: 'Reward already redeemed' });
    }

    if (user.points < reward.cost) {
        return res.status(400).json({ message: 'Not enough points' });
    }

    if (new Date(reward.expiresAt) < new Date()) {
        return res.status(400).json({ message: 'Reward has expired' });
    }

    // Deduct points and mark reward as redeemed
    user.points -= reward.cost;
    reward.redeemed = true;

    res.status(200).json({ message: 'Reward redeemed successfully!' });
});

// Test API
app.get('/', (req, res) => {
    res.send('Backend is running...');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});