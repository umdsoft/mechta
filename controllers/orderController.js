const Order = require('../models/order');

exports.addOrder =  async (req, res) => {
    const data = req.body;
    try {
        const newOrder = new Order({
            name: data.name,
            phone: data.phone,
            address: data.address,
            totalPrice: data.totalPrice,
            totalNum: data.totalNum,
            products: data.products,
            status : data.status,
            region : data.region,
            date: Date.now()
        });
        const order = await newOrder.save();
        return res.status(200).json({
            message: {
                uz : "Buyurtma qabul qilindi",
                ru : "Заказ принят"
            }
        });

    } catch (error) {
        console.log(error);
    }
};


exports.getAllOrders = async (req,res) => {
   try{
    const orders = await Order
        .find()
        // .populate(['products.productId','products.categoryId'])
        .sort({date: -1})
    res.status(200).json(orders)
   } catch (e) {
       res.status(500).json(e)
   }
};


exports.updateOrder = async(req, res,next) => {
    const { id } = req.params;

    try {
        const order = await Order.findById(id);
        
        order.status = 'active';

        const updatedOrder = await order.save();
        return res.status(200).json({
            success : true,
            order : updatedOrder
        })
    } catch (error) {
        console.log(error);
        next(error);
    }

};

