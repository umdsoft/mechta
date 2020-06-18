const Order = require('../models/order');

exports.addOrder =  async (req, res) => {
    const data = req.body;

    const orderIdCandidate = await Order.find().select({orderId: 1, _id: 0});
    if(data.orderId === orderIdCandidate){
        res.json({
            message: "id found"
        })
    }
    const newOrder = new Order({
        name: data.name,
        phone: data.phone,
        address: data.address,
        totalPrice: data.price,
        totalNum: data.num,
        products: data.products,
        // colorId: data.colorId,
        orderId: data.orderId,
        status : data.status,
        region : data.region,
        date: Date.now()
    });

    await newOrder.save()
        .then(result => {
            // console.log('result', result);
            res.status(200).json({
                message: "Success"
            })
        })
        .catch(err => {
            console.log(err);
        })
};
exports.getAllOrders = async (req,res) => {
    const orders = await Order.find()
        .sort({date: -1})
    res.send(orders);
};

exports.getOrderStatus = async(req, res) => {
    console.log("GET ORDER STATUS");
    const {orderId} = req.params;
    console.log(orderId);
    try {
        const order = await Order.findOne({orderId:orderId});
        console.log(order);
        res.status(200).json({status: order.status});
    } catch (error) {
        console.log(error);
    }

};

