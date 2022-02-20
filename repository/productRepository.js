var connection = require('./connection')

class ProductRepository {
    getProducts(valueCallback) {
        connection.query("select products.id, category_id, products.name, image_url, price, description, weight, stock, categories.name as category_name from products JOIN categories on products.category_id = categories.id", (err, rows, fields) => {
            if (err != null) {
                valueCallback([])
            } else {
                valueCallback(rows)
            }
        })
    }

    getProductsWithCategory(categoryId, valueCallback) {
        connection.query("select products.id, category_id, products.name, image_url, price, description, weight, stock, categories.name as category_name from products JOIN categories on products.category_id = categories.id where products.category_id = ?", [categoryId], (err, rows, fields) => {
            if (err != null) {
                valueCallback([])
            } else {
                valueCallback(rows)
            }
        })
    }

    deleteProduct(id) {
        const query = `delete from products where id = ?`
        connection.query(query, [id])
    }

    createProduct(data, imageUrl) {
        const query = `insert into products values(NULL, ?, ?, ?, ?, ?, ?, ?)`
        connection.query(query, [data.name, imageUrl, data.price, data.description, data.category_id, data.weight, data.stock])
    }

    editProduct(data, imageUrl) {
        const query = `update products SET name = ?, image_url = ?, price = ?, description = ?, category_id = ?, weight = ?, stock = ? where id = ?`
        connection.query(query, [data.name, imageUrl, data.price, data.description, data.category_id, data.weight, data.stock, data.id])
    }

    setStock(id, stock) {
        const query = `update products SET stock = ? where id = ?`
        console.log(query)
        connection.query(query, [stock, id])
    }

    setPrice(id, price) {
        const query = `update products set price = ? where id = ?`
        connection.query(query, [price, id])
    }

    setWeight(id, weight) {
        const query = `update products set weight = ? where id = ?`
        connection.query(query, [weight, id])
    }
}

module.exports = new ProductRepository()