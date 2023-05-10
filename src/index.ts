import express, {Request, Response} from "express";
import bodyParser from "body-parser";

require('express')
const app = express()
const port = process.env.Port || 3000

const parserMiddleware = bodyParser()
app.use(parserMiddleware)

const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'potato'}]
const addresses = [{id: 1, value: 'Slavinskaga 17'}, {id: 2, title: 'Losika 27'}]

app.get('/products', (req: Request, res: Response) => {
    res.send(products)
})
app.get('/products', (req: Request, res: Response) => {
    if (req.query.title) {
        const queryParam = req.query.title.toString()
        res.send(products.filter(p => p.title.indexOf(queryParam) > -1))
    } else {
        res.send(404)
    }
})
app.get('/products/:productTitle', (req: Request, res: Response) => {
    const product = products.filter(p => p.title === req.params.productTitle)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
app.get('/addresses', (req: Request, res: Response) => {
    res.send(addresses)
})
app.get('/addresses/:id', (req: Request, res: Response) => {
    const address = addresses.find(a => a.id === +req.params.id)
    if (address) {
        res.send(address)
    } else  {
        res.send(404)
    }

})

app.delete('/products/:id', (req: Request, res: Response) => {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === +req.params.id) {
            products.splice(i, 1)
            res.send(204)
            return
        }
    }
    res.send(404)
})

app.post('/products/', (req: Request, res: Response) => {
    const newProduct = {id: +(new Date()), title: req.body.title}
    products.push(newProduct)
    res.status(204).send(newProduct)
})

app.put('/products/:id', (req: Request, res: Response) => {
    const prod = products.find(p => p.id === +req.params.id)
    if (prod) {
        prod.title = req.body.title
        res.status(204).send(prod)
    } else {
        res.send(404)
    }
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



