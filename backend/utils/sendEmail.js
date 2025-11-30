const nodemailer = require("nodemailer");

const sendOrderEmail = async (order, user) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const itemsHtml = order.items
      .map(
        (item) =>
          `<p>${item.name} (${item.size}) x${item.qty} - ₹${item.price}</p>`
      )
      .join("");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `Order Confirmation - #${order._id}`,
      html: `
        <h2>Order Confirmation</h2>
        <p>Order ID: <b>${order._id}</b></p>
        <p>Date: ${new Date(order.orderDate).toLocaleDateString()}</p>
        <h3>Items:</h3>
        ${itemsHtml}
        <h2>Total: ₹${order.totalPrice}</h2>
        <p>Thank you for shopping!</p>
      `
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log("Email error:", err);
  }
};

module.exports = sendOrderEmail;
