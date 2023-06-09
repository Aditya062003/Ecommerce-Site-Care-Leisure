import connectDb from "../../middleware/mongoose";
import Order from "../../models/Order";
import Product from "../../models/Product";

const handler = async (req, res) => {
  let order = await Order.findOneAndUpdate(
    { orderID: req.body.oid },
    { status: "Paid", paymentinfo: JSON.stringify(req.body) }
  );
  let products = order.products
  for (let slug in products){
    await Product.findOneAndUpdate({slug:slug},{$inc:{"availableQty": -products[slug].qty }})
  }

  res.redirect("/order?clearcart=1&id="+order._id, 200);
};

export default connectDb(handler);
