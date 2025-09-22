"use client"
import { useState } from "react"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Badge } from "@/components/ui/badge"
import { BadgeCheckIcon } from "lucide-react"

interface ReviewProps {
  review?: Array<{
    rating: number
    comment: string
    createdAt: Date
    user: {
      name: string | null
      email: string
    }
  }>
}

const Reviews = ({ review = [] }: ReviewProps) => {
  const [expanded, setExpanded] = useState(false)

  const displayedReviews = expanded ? review : review.slice(0, 2)

  if (!review || review.length === 0) {
    return (
      <div className="mx-auto bg-white rounded-lg shadow-md mt-10 p-6 border border-gray-200">
        <h2 className="text-2xl font-bold mb-6">Reviews</h2>
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No reviews yet</p>
          <p className="text-gray-400 text-sm mt-2">Be the first to review this project!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto bg-white rounded-lg shadow-md mt-10 p-6 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6">Reviews</h2>

      <div className="flex items-center mb-6">
        <span className="text-gray-700 mr-2">{review.length} Reviews</span>
      </div>

      <div className="space-y-6">
        {displayedReviews.map((reviewItem, index) => (
          <div key={index} className="border-b pb-6 last:border-b-0 last:pb-0">
            <div className="flex items-center mb-2"> <span className="text-gray-600 font-bold text-sm mr-2">Rating: </span>
              <div className="flex text-yellow-400 mr-2">
                {[...Array(reviewItem.rating)].map((_, i) => (
                  <span key={i} className="text-lg">
                    ★
                  </span>
                ))}
                {[...Array(5 - reviewItem.rating)].map((_, i) => (
                  <span key={`empty-${i}`} className="text-lg text-gray-300">
                    ★
                  </span>
                ))}
              </div>
              <span className="text-gray-600 text-sm ml-2">{reviewItem.rating}/5</span>
            </div>
            <div className="flex justify-between">
              <p className="font-medium text-gray-900"><AccountCircleIcon /> {reviewItem.user.name || "Anonymous"}
                <Badge
                  variant="secondary"
                  className="bg-green-500 ml-4 hover:bg-green-600 text-white dark:bg-green-600"
                >
                  <BadgeCheckIcon className="h-3" />
                  Purchased
                </Badge>
              </p>

              <span className="text-gray-500 text-sm">
                {new Date(reviewItem.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <p className="my-3 text-gray-700">{reviewItem.comment}</p>


          </div>
        ))}
      </div>

      {review.length > 2 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
        >
          {expanded ? "Show Less" : `Show All ${review.length} Reviews`}
        </button>
      )}
    </div>
  )
}

export default Reviews
