import { customAlphabet } from "nanoid"

// 7-character random string
export const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
)

export const paymentPortalLinkTest =
  "https://billing.stripe.com/p/login/test_9AQ17X8Jm3207m09AA"

export const paymentPortalLink =
  "https://billing.stripe.com/p/login/bIY9BFb2WfeE9eEfYY"
