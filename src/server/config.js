const config = {
    client:"mysql",
    db : {
        user: 'testuser',
        password: 'D14B45189EB91817A0B167A0AD401BD539B58C994C2C42D88C80E7BD39F37840',
        database: process.env.DEV_DB_NAME || 'webpro-s2022-db',
        socketPath: '/cloudsql/webpro-s2022:europe-west1:webpro-s2022-db'
    }
}

module.exports = config;