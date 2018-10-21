module.exports = function(app, paypal) {
  app.post("/pay", (req, res) => {
    let amount = req.body.amount;
    let description = req.body.description;

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:3000/payment_success",
        cancel_url: "http://localhost:3000/payment_success",
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: "Savings Account Deposit",
                sku: "001",
                price: String(amount),
                currency: "USD",
                quantity: 1,
              },
            ],
            shipping_address: {
              recipient_name: "Equalitee",
              line1: "123 Hope St",
              city: "Saratoga",
              country_code: "US",
              postal_code: "95070",
              state: "CA",
            },
          },
          amount: {
            currency: "USD",
            total: String(amount),
          },
          description: description || "Savings Account Deposit",
        },
      ],
    };

    paypal.payment.create(create_payment_json, function(error, payment) {
      if (error) {
        throw error;
      } else {
        console.log("Create Payment Response");
        console.log(payment);
        for (var index = 0; index < payment.links.length; index++) {
          //Redirect user to this endpoint for redirect url
          if (payment.links[index].rel === "approval_url") {
            const redirectUrl = payment.links[index].href;
            console.log(payment.links[index].href);
            res.json(redirectUrl);
          }
        }
      }
    });
  });

  app.get("/success", (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
      payer_id: payerId,
      transactions: [
        {
          amount: {
            currency: "USD",
            total: "25.00",
          },
        },
      ],
    };

    paypal.payment.execute(paymentId, execute_payment_json, function(
      error,
      payment
    ) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        console.log(JSON.stringify(payment));
        res.send("Success");
      }
    });
  });

  app.get("/cancel", (req, res) => res.send("Cancelled"));
};
