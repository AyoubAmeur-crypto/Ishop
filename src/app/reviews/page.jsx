import React, { useContext, useEffect, useState } from 'react'
import { getReviews, addReview } from '../api/product/Review'; 
import { userFetchedData } from '../context/AuthContext';
import {BadgeX} from 'lucide-react'
import Link from 'next/link';

function Reviews({productId}) {
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showWriteForm, setShowWriteForm] = useState(false);
  const [reviews, setReviews] = useState([])
  const {isLogged} = useContext(userFetchedData)
  const [newReview, setNewReview] = useState({
    comment: '',
    rating: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`${interactive ? 'w-5 h-5' : 'w-3 h-3 sm:w-4 sm:h-4'} cursor-pointer transition-colors duration-200 ${
          index < rating ? 'text-yellow-400' : 'text-gray-600 hover:text-yellow-300'
        } ${interactive ? 'hover:scale-110' : ''}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        onClick={interactive ? () => onRatingChange(index + 1) : undefined}
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
    ));
  };

  const averageRating = reviews.length > 0 ? (reviews.reduce((acc, review) => acc + review.raiting, 0) / reviews.length).toFixed(1) : '0.0';
  const totalReviews = reviews.length;
  
  const displayedReviews = showAll ? reviews : reviews.slice(0, 3); // Show 3 on mobile instead of 5
  const hasMoreReviews = reviews.length > 3;

  const handleViewMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setShowAll(true);
      setIsLoading(false);
    }, 500);
  };

  const handleViewLess = () => {
    setShowAll(false);
  };

  const handleWriteReview = () => {
    setShowWriteForm(true);
  };

  const handleCancelReview = () => {
    setShowWriteForm(false);
    setNewReview({ comment: '', rating: 0 });
  };

  const refreshReviewsList = async () => {
    setIsLoading(true)
    try {
      const serverReviewsRes = await getReviews(productId)
      if(serverReviewsRes.success){
        setReviews(serverReviewsRes.reviews)
      }
    } catch (error) {
      console.log("can't get reviews due to this", error);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    refreshReviewsList()
  }, [])

  const handleSubmitReview = async () => {
    if (!newReview.comment || newReview.rating === 0) {
      return; 
    }
    
    setIsSubmitting(true);

    try {
      const serverReviewRes = await addReview(productId, newReview.comment, newReview.rating)
      if(serverReviewRes.success){
        await refreshReviewsList()
      }
    } catch (error) {
      console.log("can't create the review due to this", error);
    } finally {
      setIsSubmitting(false)
      setShowWriteForm(false)
      setNewReview({comment:'', rating:0})
    }
  };

  const handleRatingChange = (rating) => {
    setNewReview(prev => ({ ...prev, rating }));
  };

  if(isLogged){
    return (
      <div className="w-full bg-black border border-yellow-400/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl mt-6 sm:mt-8">
        {/* Header */}
        <div className="mb-3 sm:mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base sm:text-lg font-bold text-yellow-400">Customer Reviews</h3>
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span className="text-yellow-400 font-bold text-xs sm:text-sm">{averageRating}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {renderStars(Math.round(averageRating))}
            </div>
            <span className="text-gray-400 text-xs">({totalReviews} reviews)</span>
          </div>
        </div>

        {/* Reviews List */}
        {displayedReviews.length > 0 ? <div className={`space-y-2 sm:space-y-3 custom-scrollbar ${showAll ? 'max-h-60 sm:max-h-80 overflow-y-auto' : ''}`}>
          {displayedReviews.map((review, index) => (
            <div 
              key={review._id} 
              className={`bg-gray-900/30 border border-yellow-400/10 rounded-lg sm:rounded-xl p-2 sm:p-3 hover:border-yellow-400/30 transition-all duration-300 ${
                showAll && index >= 3 ? 'animate-fadeIn' : ''
              }`}
            >
              <div className="flex items-start gap-2 sm:gap-3">
                {/* Avatar */}
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-black font-bold text-xs sm:text-sm">
                    {review.user?.firstName?.[0] || 'U'}{review.user?.lastName?.[0] || ''}
                  </span>
                </div>
                
                {/* Review Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                      <h4 className="text-white font-medium text-xs sm:text-sm">
                        {(review.user?.firstName || 'Anonymous') + ' ' + (review.user?.lastName || '')}
                      </h4>
                      {review.verified && (
                        <div className="bg-yellow-400/20 border border-yellow-400/50 rounded-full px-1 sm:px-2 py-0.5">
                          <span className="text-yellow-400 text-xs font-medium">✓</span>
                        </div>
                      )}
                    </div>
                    <span className="text-gray-500 text-xs whitespace-nowrap ml-2">{review?.createdAt}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-1 sm:mb-2">
                    {renderStars(review.raiting)}
                  </div>
                  
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div> : <div className='min-h-60  text-yellow-400 flex flex-col items-center justify-center gap-4'>
          <BadgeX className='w-16 h-16' />
          <h1 className='text-yellow-400 text-xl lg:text-2xl'>No Reviews Founded For This Product</h1></div>}

        {/* View More/Less Button */}
        {hasMoreReviews && (
          <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-yellow-400/20">
            {!showAll ? (
              <button 
                onClick={handleViewMore}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-yellow-400/10 to-yellow-500/10 border border-yellow-400/30 hover:border-yellow-400/50 text-yellow-400 font-medium py-2 px-3 sm:px-4 rounded-lg transition-all duration-300 hover:bg-yellow-400/20 text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      <span>View More Reviews ({reviews.length - 3} more)</span>
                    </>
                  )}
                </div>
              </button>
            ) : (
              <button 
                onClick={handleViewLess}
                className="w-full bg-gradient-to-r from-yellow-400/10 to-yellow-500/10 border border-yellow-400/30 hover:border-yellow-400/50 text-yellow-400 font-medium py-2 px-3 sm:px-4 rounded-lg transition-all duration-300 hover:bg-yellow-400/20 text-xs sm:text-sm"
              >
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                  <span>Show Less</span>
                </div>
              </button>
            )}
          </div>
        )}

        {/* Write Review Form */}
        {showWriteForm && (
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-yellow-400/20 animate-fadeIn">
            <div className="bg-gray-900/30 border border-yellow-400/20 rounded-lg sm:rounded-xl p-3 sm:p-4">
              <h4 className="text-yellow-400 font-bold text-base sm:text-lg mb-3 sm:mb-4">Write a Review</h4>
              
              {/* Rating Selection */}
              <div className="mb-3 sm:mb-4">
                <label className="block text-white font-medium text-xs sm:text-sm mb-2">Rating</label>
                <div className="flex items-center gap-1">
                  {renderStars(newReview.rating, true, handleRatingChange)}
                  <span className="ml-2 text-gray-400 text-xs sm:text-sm">
                    {newReview.rating > 0 ? `${newReview.rating} star${newReview.rating > 1 ? 's' : ''}` : 'Select rating'}
                  </span>
                </div>
              </div>

              {/* Comment Input */}
              <div className="mb-3 sm:mb-4">
                <label className="block text-white font-medium text-xs sm:text-sm mb-2">Your Review</label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder="Share your experience with this product..."
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-900/50 border border-yellow-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition text-xs sm:text-sm resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={handleCancelReview}
                  className="flex-1 bg-gray-800/50 border border-gray-600 text-gray-300 font-medium py-2 px-3 sm:px-4 rounded-lg transition-all duration-300 hover:bg-gray-700/50 hover:border-gray-500 text-xs sm:text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitReview}
                  disabled={isSubmitting || !newReview.comment || newReview.rating === 0}
                  className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-2 px-3 sm:px-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-xs sm:text-sm"
                >
                  <div className="flex items-center justify-center gap-1 sm:gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        <span>Submit</span>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Write Review Button */}
        {!showWriteForm && (
          <div className="mt-3">
            <button 
              onClick={handleWriteReview}
              className="w-full bg-gradient-to-r from-yellow-400/10 to-yellow-500/10 border border-yellow-400/30 hover:border-yellow-400/50 text-yellow-400 font-medium py-2 px-3 sm:px-4 rounded-lg transition-all duration-300 hover:bg-yellow-400/20 text-xs sm:text-sm"
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Write a Review
              </div>
            </button>
          </div>
        )}

        {/* Custom Scrollbar Styles */}
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 3px;
          }
          @media (min-width: 640px) {
            .custom-scrollbar::-webkit-scrollbar {
              width: 4px;
            }
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 2px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(251, 191, 36, 0.3);
            border-radius: 2px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(251, 191, 36, 0.5);
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out;
          }
        `}</style>
      </div>
    )
  }

  // Non-logged in state with mobile optimizations
  if (!isLogged) {
    const fakeReviews = [
      {
        _id: 'fake1',
        user: { firstName: 'Ahmed', lastName: 'M.' },
        raiting: 5,
        comment: 'Amazing product! The quality exceeded my expectations. Fast delivery to Casablanca.',
        createdAt: '2 days ago'
      },
      {
        _id: 'fake2',
        user: { firstName: 'Fatima', lastName: 'K.' },
        raiting: 4,
        comment: 'Great value for money. Exactly as described in the photos. Would definitely recommend!',
        createdAt: '1 week ago'
      },
      {
        _id: 'fake3',
        user: { firstName: 'Youssef', lastName: 'B.' },
        raiting: 5,
        comment: 'Perfect! Super fast shipping to Rabat. The customer service was excellent too.',
        createdAt: '2 weeks ago'
      }
    ];

    return (
      <div className="w-full bg-black border border-yellow-400/20 rounded-xl sm:rounded-2xl shadow-xl relative overflow-hidden mt-6 sm:mt-8">
        {/* Fake Reviews Background */}
        <div className="p-3 sm:p-4">
          {/* Header */}
          <div className="mb-3 sm:mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base sm:text-lg font-bold text-yellow-400">CustomcurrentColorer Reviews</h3>
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" fill="" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span className="text-yellow-400 font-bold text-xs sm:text-sm">4.7</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {renderStars(5)}
              </div>
              <span className="text-gray-400 text-xs">(3 reviews)</span>
            </div>
          </div>

          {/* Fake Reviews List */}
          <div className="space-y-2 sm:space-y-3">
            {fakeReviews.map((review) => (
              <div 
                key={review._id}
                className="bg-gray-900/30 border border-yellow-400/10 rounded-lg sm:rounded-xl p-2 sm:p-3"
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  {/* Avatar */}
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-black font-bold text-xs sm:text-sm">{review.user.firstName[0] + review.user.lastName[0]}</span>
                  </div>
                  
                  {/* Review Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                        <h4 className="text-white font-medium text-xs sm:text-sm">{review.user.firstName + ' ' + review.user.lastName}</h4>
                        <div className="bg-yellow-400/20 border border-yellow-400/50 rounded-full px-1 sm:px-2 py-0.5">
                          <span className="text-yellow-400 text-xs font-medium">✓</span>
                        </div>
                      </div>
                      <span className="text-gray-500 text-xs whitespace-nowrap ml-2">{review.createdAt}</span>
                    </div>
                    
                    <div className="flex items-center gap-1 mb-1 sm:mb-2">
                      {renderStars(review.raiting)}
                    </div>
                    
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Fake Write Review Button */}
          <div className="mt-3 sm:mt-4">
            <button className="w-full bg-gradient-to-r from-yellow-400/10 to-yellow-500/10 border border-yellow-400/30 text-yellow-400 font-medium py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm">
              <div className="flex items-center justify-center gap-2">
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Write a Review
              </div>
            </button>
          </div>
        </div>

        {/* Blur Overlay Filter */}
        <div className="absolute inset-0 backdrop-blur-sm bg-black/20 rounded-xl sm:rounded-2xl"></div>

        {/* Login CTA Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-20 rounded-xl sm:rounded-2xl">
          <div className="text-center px-4 py-6 sm:px-6 sm:py-8 max-w-xs sm:max-w-sm w-full mx-4">
            <div className="mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-yellow-400 mb-2">Login Required</h2>
              <p className="text-yellow-400 text-xs sm:text-sm leading-relaxed">
                Join our community to read and write product reviews from verified customers
              </p>
            </div>
            
            <div className="space-y-3">
              <Link href="/login">
                <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg text-sm sm:text-base">
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Login to Account
                  </div>
                </button>
              </Link>
            </div>
            
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-yellow-400">
              <p className="text-xs text-yellow-400/70">
                🔒 Your data is secure with us
              </p>
            </div> 
          </div>
        </div>
      </div>
    );
  }
}

export default Reviews