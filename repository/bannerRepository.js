var connection = require('./connection')

class BannerRepository {
    getBanners(valueCallback) {
        connection.connect()
        connection.query("Select id, image_url, redirect_url from banners", (err, rows, fields) => {
            if (err != null) {
                valueCallback([])
            } else {
                valueCallback(rows)
            }
        })

        connection.end()
    }

    storeBanner(banner, filePath) {
        connection.connect()
        const query = `insert into banners values(NULL, ?, ?)`
        connection.query(query, [filePath, banner.redirectUrl])

        connection.end()
    }

    deleteBanner(id) {
        connection.connect()
        const query = `delete from banners where id = ?`
        connection.query(query, [id])

        connection.end()
    }

    editBanner(banner, filePath) {
        connection.connect()
        const query = `update banners set image_url = ?, redirect_url = ? where id = ?`
        connection.query(query, [filePath, banner.redirectUrl, banner.id])

        connection.end()
    }
}

module.exports = new BannerRepository()
