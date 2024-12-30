const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// // Load the AI model
// let model;
// async function loadModel() {
//     try {
//         model = await tf.loadLayersModel(`file://${path.join(__dirname, "model", "model.json")}`);
//         console.log("Model loaded successfully!");
//     } catch (error) {
//         console.error("Error loading model:", error);
//     }
// }
// loadModel();

// File storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/"); // Save files in the 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname); // Unique filenames
    },
});

// Upload endpoint
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("Only image files are allowed!"), false);
        }
        cb(null, true);
    },
});

app.post("/upload", upload.single("image"), (req, res) => {
    try {
        res.json({ message: "File uploaded successfully", file: req.file });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Image analysis endpoint
// app.post("/analyze", upload.single("image"), async (req, res) => {
//     try {
//         if (!model) return res.status(500).json({ error: "Model not loaded yet" });

//         const filePath = req.file.path; // Path to the uploaded image
//         const imageBuffer = fs.readFileSync(filePath);

//         // Preprocess the image
//         const imageTensor = tf.node.decodeImage(imageBuffer, 3)
//             .resizeBilinear([224, 224])
//             .expandDims(0)
//             .div(255.0);

//         // Perform prediction
//         const predictions = model.predict(imageTensor);
//         const predictionArray = await predictions.array();

//         // Build response
//         const analysisResult = {
//             status: "success",
//             timestamp: new Date(),
//             result: {
//                 predictions: predictionArray[0],
//             },
//         };

//         res.json(analysisResult);
//     } catch (error) {
//         console.error("Error analyzing image:", error);
//         res.status(500).json({ error: error.message });
//     }
// });

app.post("/analyze", async(req,res)=>{
    try{
        const {imagePath} = req.body;

        const analysisResult = {
            status: 'success',
            timestamp: new Date(),
            imagePath : imagePath,
            result: {
                prediction: 'sample prediction',
                confidence: 0.95,
                recommendation: "Consult with a doctor"
            }
        }
        res.json(analysisResult)
    }
    catch(err){
        res.status(500).json({err: err.message})
    }
})

// Test endpoint
app.get("/test", (req, res) => {
    res.json({ message: "Backend server is running!" });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
