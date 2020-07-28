const Order = require('../models/order');
const Consumer = require('../models/consumer');
exports.checkUser = async (req, res) => {
    const { phone } = req.body;
    const existingUser = await Consumer.findOne({ phone : phone });
    let user;
    if(!existingUser){
        const user = new Consumer({
            phone : phone,
            nextOrderId : 1,
            orders : [],
            date : Date.now()
        });
        try {
            const newUser = await user.save();
        } catch (error) {
            console.log(error);
        }
        return res.status(200).json({
            success  : true,
            user : user,
            message : "new User created",
            status : false
        })
    }
    return res.status(200).json({
        user: existingUser,
        success : true,
        status : true
    });
}
exports.addOrder =  async (req, res) => {
    const data = req.body;
   
    try {
        const newOrder = new Order({
            name: data.name,
            phone: data.phone,
            address: data.address,
            totalPrice: data.totalPrice,
            totalNum: data.num,
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
    res.status(200).json({success: true, data: orders})
   } catch (e) {
       res.status(500).json(e)
   }
};

exports.postOrderStatus = async(req, res) => {
    const { phone, orderId } = req.body;
    const user = await Consumer.findOne({ phone : phone });
    if(!user){
        res.status(401).json({
            message : "user not found"
        })
    }
    const ord = user.orders.map(order => {
        if(order.lastOrderId === Number(orderId)){
            return order;
        }else{
            return res.status(404).json({
                message : "order with this id does not exists"
            })
        }
    });
    // console.log('Ord' , ord[0]._id)
    try {
        const order = await Order
            .findOne({ _id : ord[0].orderId })
            .populate('products.productId');
        res.status(200).json({order: order});
    } catch (error) {
        console.log(error);
    }

exports.updateOrder = async(req, res,next) => {
    const { orderId } = req.params;

    try {
        const order = await Order.findById(orderId);
        
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
}

};

