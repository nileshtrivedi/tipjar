import { firestore } from "firebase-admin"

type Profile = {
  "id": ProfileId
  "firebase_uid": string
  "first_name": string
  "last_name": string
  "vanity_name": string
  "email": string
  "about": string
  "created": firestore.Timestamp
  "featured_video_url": string
  "banner_image_url": string
  "profile_image_url": string
  "memberships": string[]
  "created_at": firestore.Timestamp
}

type Membership = {
  "id": MembershipId
  "razorpay_plan_id": string
  "created_at": firestore.Timestamp
  "creator": ProfileId
  "amount_paise": number
  "description": string
  "payment_cycle": "MONTHLY" | "YEARLY" | "ONETIME"
}

type Pledge = {
  "id": PledgeId
  "razorpay_subscription_id": string
  "membership": MembershipId
  "created_at": firestore.Timestamp
}

type ProfileId = string
type MembershipId = string
type PledgeId = string
