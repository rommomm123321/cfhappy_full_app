const express = require('express')
const cors = require('cors')
const path = require('path') // Импортируйте модуль path

require('dotenv').config()
const apiRoutes = require('./routes')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api', apiRoutes)

app.use(express.static(path.join(__dirname, '../public')))

// Это маршрутизатор, который отправляет index.html для всех остальных маршрутов
app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
