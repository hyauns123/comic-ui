"use client"

import type React from "react"

import { useState } from "react"
import { CreditCard, Check, AlertCircle } from "lucide-react"
import { useUser } from "@/contexts/user-context"

export function SubscriptionDetails() {
  const { user, updateUserProfile } = useUser()
  const [showBillingForm, setShowBillingForm] = useState(false)
  const [billingInfo, setBillingInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })

  // Determine current plan based on user role
  const currentPlan = user?.role === "premium" || user?.role === "admin" ? "premium" : "free"

  const handleBillingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBillingInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmitBilling = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would process the payment here
    console.log("Processing payment with:", billingInfo)
    setShowBillingForm(false)
    // Update user role to premium upon successful subscription
    updateUserProfile({ ...user, role: "premium" })
  }

  const handleCancelSubscription = () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel your premium subscription? You'll lose access to premium features at the end of your billing period.",
    )

    if (confirmed) {
      // In a real app, you would cancel the subscription here
      console.log("Cancelling subscription...")
      // Update user role to free upon cancellation
      updateUserProfile({ ...user, role: "free" })
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Subscription Details</h2>

      {/* Current Plan */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Current Plan</h3>
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <span className="font-bold text-lg">{currentPlan === "premium" ? "Premium Plan" : "Free Plan"}</span>
              {currentPlan === "premium" && (
                <span className="ml-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">Active</span>
              )}
            </div>
            {currentPlan === "premium" && (
              <button onClick={handleCancelSubscription} className="text-sm text-red-500 hover:text-red-400">
                Cancel
              </button>
            )}
          </div>
          {currentPlan === "premium" ? (
            <div>
              <p className="text-gray-300 mb-2">
                Your premium subscription is active until <span className="font-medium">May 15, 2024</span>.
              </p>
              <p className="text-gray-400 text-sm">
                You are being billed $9.99/month. Next billing date: April 15, 2024
              </p>
              <div className="mt-3 text-sm text-gray-400">Payment method: •••• •••• •••• 4242 (Visa)</div>
            </div>
          ) : (
            <div>
              <p className="text-gray-300 mb-2">You are currently on the free plan with limited access.</p>
              <p className="text-gray-400 text-sm">
                Upgrade to Premium for ad-free reading, exclusive content, and more.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Plan Comparison */}
      {currentPlan === "free" && (
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Compare Plans</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Free Plan */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="mb-4">
                <h4 className="text-xl font-bold">Free</h4>
                <p className="text-gray-400">$0/month</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Access to free comics and manga</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Basic reading features</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Ad-supported experience</span>
                </li>
                <li className="flex items-start gap-2 text-gray-500">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>No offline reading</span>
                </li>
                <li className="flex items-start gap-2 text-gray-500">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>Limited library</span>
                </li>
              </ul>
              <div>
                <span className="text-gray-400 text-sm">Current Plan</span>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="bg-gray-800 rounded-lg p-6 border border-red-900 relative">
              <div className="absolute -top-3 -right-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full">
                Recommended
              </div>
              <div className="mb-4">
                <h4 className="text-xl font-bold">Premium</h4>
                <p className="text-gray-400">$9.99/month</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Access to all comics and manga</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Ad-free reading experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Offline reading</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Early access to new releases</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Exclusive premium content</span>
                </li>
              </ul>
              <div>
                <button
                  onClick={() => setShowBillingForm(true)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md"
                >
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Billing Form */}
      {showBillingForm && (
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Payment Information</h3>
          <form onSubmit={handleSubmitBilling} className="space-y-4">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-400 mb-1">
                Card Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CreditCard className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={billingInfo.cardNumber}
                  onChange={handleBillingInfoChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md pl-10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="cardName" className="block text-sm font-medium text-gray-400 mb-1">
                Name on Card
              </label>
              <input
                type="text"
                id="cardName"
                name="cardName"
                placeholder="John Doe"
                value={billingInfo.cardName}
                onChange={handleBillingInfoChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-400 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={billingInfo.expiryDate}
                  onChange={handleBillingInfoChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                />
              </div>
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-400 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  placeholder="123"
                  value={billingInfo.cvv}
                  onChange={handleBillingInfoChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                />
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md">
                Subscribe Now
              </button>
              <button
                type="button"
                onClick={() => setShowBillingForm(false)}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Billing History */}
      {currentPlan === "premium" && (
        <div>
          <h3 className="text-lg font-medium mb-4">Billing History</h3>
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    Invoice
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">March 15, 2024</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">$9.99</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-900 text-green-300">
                      Paid
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <a href="#" className="text-red-600 hover:text-red-500">
                      Download
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">February 15, 2024</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">$9.99</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-900 text-green-300">
                      Paid
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <a href="#" className="text-red-600 hover:text-red-500">
                      Download
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">January 15, 2024</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">$9.99</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-900 text-green-300">
                      Paid
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    <a href="#" className="text-red-600 hover:text-red-500">
                      Download
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
