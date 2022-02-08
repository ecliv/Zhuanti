const repository = require('../repository/productRepository')
const multer = require('multer')
const fs = require("fs")

class ProductController {
    getProducts(req, res, next) {
        repository.getProducts((data) => {
            res.send(data)
        })
    }

    deleteProduct(req, res, next) {
        const id = req.body.id
        repository.deleteProduct(id)
        res.sendStatus(204)
    }

    createProduct(req, res, next) {
        let upload = multer({ dest: "./public/images/product" }).single('image');

        upload(req, res, function(err) {
            if (req.fileValidationError) {
                return res.send("invalid file");
            } else if (err instanceof multer.MulterError) {
                return res.send(err);
            } else if (err) {
                return res.send(err);
            }

            const tempPath = req.file.path;
            const targetPath = `./public/images/product/${req.file.originalname}`;

            fs.rename(tempPath, targetPath, err => {
                const storagePath = targetPath
                    .replace(".", `${process.env.BASE_URL}:${process.env.PORT}`)
                    .replace("/public", "")
                repository.createProduct(req.body, storagePath)
                if (err) return res.send(err);

                res.sendStatus(201)
            });
        })
    }

    editProduct(req, res, next) {
        let upload = multer({ dest: "./public/images/product" }).single('image');

        upload(req, res, function(err) {
            if (req.fileValidationError) {
                return res.send("invalid file");
            } else if (err instanceof multer.MulterError) {
                return res.send(err);
            } else if (err) {
                return res.send(err);
            }

            const tempPath = req.file.path;
            const targetPath = `./public/images/product/${req.file.originalname}`;

            fs.rename(tempPath, targetPath, err => {
                const storagePath = targetPath
                    .replace(".", `${process.env.BASE_URL}:${process.env.PORT}`)
                    .replace("/public", "")
                repository.editProduct(req.body, storagePath)
                if (err) return res.send(err);

                res.sendStatus(201)
            });
        })
    }
}

module.exports = new ProductController()