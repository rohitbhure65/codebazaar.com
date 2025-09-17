"use client";
import { useState } from 'react';

const Reviews = () => {
  const [expanded, setExpanded] = useState(false);
  
  const reviews = [
    {
      stars: 5,
      category: "Code Quality",
      date: "March 14, 2021",
      content: "Nice and big variety of themes and templates. The best thing is their support though, very helpful and friendly.",
      author: "Jrsome Bell"
    },
    {
      stars: 5,
      category: "Design Quality",
      date: "February 26, 2021",
      content: "Awesome product and very Good customer support. Loved the UI kit design. Highly recommended.",
      author: "Albert Flores"
    },
    {
      stars: 5,
      category: "Customer Support",
      date: "February 08, 2021",
      content: "Nice and big variety of themes and templates. The best thing is their support though, very helpful and friendly.",
      author: "Ralph Edwards"
    }
  ];

  const displayedReviews = expanded ? reviews : reviews.slice(0, 2);

  return (
    <div className="mx-auto bg-white rounded-lg shadow-md mt-10 p-6 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6">Reviews</h2>
      
      <div className="flex items-center mb-6">
        <span className="text-gray-700 mr-2">{reviews.length} Reviews</span>
      </div>
      
      <div className="space-y-6">
        {displayedReviews.map((review, index) => (
          <div key={index} className="border-b pb-6 last:border-b-0 last:pb-0">
            <div className="flex items-center mb-2">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(review.stars)].map((_, i) => (
                  <span key={i} className="text-lg">★</span>
                ))}
              </div>
              <span className="text-gray-600 text-sm">for {review.category}</span>
            </div>
            
            <span className="text-gray-500 text-sm">{review.date}</span>
            
            <p className="my-3 text-gray-700">{review.content}</p>
            
            <p className="font-medium text-gray-900">{review.author}</p>
          </div>
        ))}
      </div>
      
      {reviews.length > 2 && (
        <button 
          onClick={() => setExpanded(!expanded)}
          className="mt-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
        >
          {expanded ? 'Show Less' : `Show All ${reviews.length} Reviews`}
        </button>
      )}
    </div>
  );
};

export default Reviews;