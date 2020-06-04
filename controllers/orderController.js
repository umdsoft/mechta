const Order = require('../models/order');

exports.addOrder =  async (req,res) => {

   const data = req.body;

    const order = await new Order({
        name: data.name,
        phone: data.phone,
        address: data.address,
        price: data.price,
        num: data.num,
        productId: data.productId,
        colorId: data.colorId,
        date: Date.now()
    });

    order.save()
        .then(result => {
            res.status(200).json({
                message: "Success"
            })
        })

}
exports.getAllOrders = async (req,res) => {
    const orders = await Order.find()
        .sort({date: -1})
    res.send(orders);
}

