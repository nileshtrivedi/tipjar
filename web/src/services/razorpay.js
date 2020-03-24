import { createSubscription, createPledge } from "services/pledge";
import { loadScript } from "utils";

const checkout = async ({ membership, onSuccess, onDismiss }) => {
  try {
    const { id: subscriptionId } = await createSubscription({
      planId: membership.razorpayPlanId
    });

    await loadScript({ url: "https://checkout.razorpay.com/v1/checkout.js" });

    const rzpOptions = {
      key: process.env["REACT_APP_RAZORPAY_KEY_ID"],
      subscription_id: subscriptionId,
      handler: response =>
        createPledge({
          razorpaySubscriptionId: subscriptionId,
          membership: membership.id
        }).then(onSuccess),
      modal: {
        ondismiss: onDismiss
      }
    };

    const razorpay = new window.Razorpay(rzpOptions);

    razorpay.open();
  } catch (error) {
    console.error(error);
    throw new Error(
      `Failed to checkout for planId ${membership.razorpayPlanId}`
    );
  }

  return null;
};

export { checkout };
