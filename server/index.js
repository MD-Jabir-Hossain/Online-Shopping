const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));



const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    subject: String,
    message: String,

}, { timestamps: true });
const Contact = mongoose.model("Contact", contactSchema);

const subscribeSchema = new mongoose.Schema({

    email: { type: String, required: true },

}, { timestamps: true });
const Subscribe = mongoose.model("Subscribe", subscribeSchema);

const orderSchema = new mongoose.Schema({
    customerInfo: {
        fullName: String,
        phoneNumber: String,
        address: String
    },
    products: [{
        title: String,
        price: Number,
        image: String,
        quantity: Number
    }],
    totalAmount: Number,
    orderDate: Date
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);


app.get("/", async (req, res) => {
    res.json({ succes: true, message: "Welcome to notes" })
});


app.get("/api/contacts", async (req, res) => {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
});

app.post("/api/contacts", async (req, res) => {
    try {
        const { Name, Email, Subject, Message } = req.body;
        const newContact = await Contact.create({
            name: Name,
            email: Email,
            subject: Subject,
            message: Message
        });
        res.status(201).json({
            success: true,
            data: {
                id: newContact._id,
                name: newContact.name,
                email: newContact.email,
                subject: newContact.subject,
                message: newContact.message,
                createdAt: newContact.createdAt
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
});
app.post("/api/subscribe", async (req, res) => {
    try {
        const { Email } = req.body;
        const newSubscribe = await Subscribe.create({
            email: Email,
        });
        res.status(201).json({
            success: true,
            data: {
                id: newSubscribe._id,
                email: newSubscribe.email,
                createdAt: newSubscribe.createdAt
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
});

app.post("/api/orders", async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        
        res.status(201).json({ 
            success: true,
            message: "Order placed successfully",
            data: order
        });
    } catch (error) {
        console.error("Order error:", error);
        res.status(500).json({ 
            success: false,
            error: error.message || 'Server error'
        });
    }
});






// user auth
const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);


app.post("/api/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user || user.password !== password) {
            return res.status(401).json({ success: false, error: "Invalid credentials" });
        }

        res.json({
            success: true, user: {
                fullName: user.fullName,
                email: user.email,
                username: user.username
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error" });
    }
});

app.post("/api/signup", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({
            success: true, user: {
                fullName: user.fullName,
                email: user.email,
                username: user.username
            }
        });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ success: false, error: "Username or email already exists" });
        } else {
            res.status(500).json({ success: false, error: "Server error" });
        }
    }
});

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    rating: {
        rate: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

app.post("/api/admin/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "JABIR";
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "JABIR";

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            res.json({ 
                success: true, 
                isAdmin: true,
                user: {
                    username: ADMIN_USERNAME,
                    isAdmin: true
                }
            });
        } else {
            res.status(401).json({ 
                success: false, 
                error: "Invalid admin credentials" 
            });
        }
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: "Server error" 
        });
    }
});

// Product  endpoints
app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error" });
    }
});

app.post("/api/products", async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error" });
    }
});

app.put("/api/products/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error" });
    }
});

app.delete("/api/products/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// Get all users
app.get("/api/users", async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// Get all orders
app.get("/api/orders", async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error" });
    }
});
app.delete("/api/orders/:id", async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error" });
    }
});


// Get all contacts
app.get("/api/contacts", async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json({ success: true, data: contacts });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error" });
    }
});


app.get("/api/products/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, error: "Product not found" });
        }
        res.json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error" });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});