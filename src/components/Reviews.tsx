'use client'

import { useState } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface Review {
  id: number
  name: string
  location: string
  rating: number
  text: string
  shortText: string
  avatar: string
}

function ReviewCard({ review }: { review: Review }) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  // Check if button should be shown
  const shouldShowButton = review.text !== review.shortText

  return (
    <div className="group">
      <div className="bg-white/80 backdrop-blur-sm border border-brand-200/50 rounded-2xl p-8 shadow-lg h-96 transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 flex flex-col">
        {/* Rating Stars */}
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-5 h-5 text-brand-400 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Review Text Container */}
        <div className="flex-1 flex flex-col">
          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-brand-400 scrollbar-track-brand-100 pr-2' : 'max-h-32'}`}>
            <p className="text-brand-800 leading-relaxed italic">
              "{isExpanded ? review.text : review.shortText}"
            </p>
          </div>
          
          {/* Read More/Read Less Button */}
          {shouldShowButton && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-3 text-brand-600 hover:text-brand-700 text-sm font-medium transition-colors duration-200 self-start underline hover:no-underline cursor-pointer bg-brand-50 hover:bg-brand-100 px-3 py-1 rounded-md"
            >
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>
          )}
        </div>

        {/* Reviewer Info */}
        <div className="flex items-center mt-6">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mr-4 bg-gradient-to-r from-brand-500 to-brand-600">
            {review.avatar}
          </div>
          <div>
            <h4 className="font-semibold text-brand-900">{review.name}</h4>
            <p className="text-sm text-brand-600">{review.location}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Reviews() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation()
  const { ref: reviewsRef, isVisible: reviewsVisible } = useScrollAnimation()
  const { ref: ratingRef, isVisible: ratingVisible } = useScrollAnimation()

  const reviews = [
    {
      id: 1,
      name: "Sourath",
      location: "2 reviews",
      rating: 5,
      text: "Do you believe in love? A question that's been asked throughout the annals of history of love. But do you believe in love when your very existence is shaken and betrayed by your blood? Do you believe, love can heal pain when wounds incurred by someone who you trust with your life? Can you offer love when you are hurt yourself? Do you think love is enough? Do you think love can fix everything? It's rare that I reread books and find it amusing and interesting, 'You never cried' by @read_at_nawa gave me pleasure in abundance. Author beautifully describes the scenic beauty of a little town in an English countryside where people live with love, peace and harmony. They enjoy their leisure time at cafe, bookstore, woods and mountains. They look after each other, there is so much peace and serenity in atmosphere. The protongonist Dan who's loving, goodlooking, single father who considers his daughter his only asset. He is somehow mysteriously sad and is trying to manage his monochrome life until his eyes meet someone in stary night, the night that will change everything is Dan's life. So grab your copies soon to discover this beautifully horrifying story. You might grasp from this paragraph it would be another love story but it isn't. It's blend of mystery, psychology, thriller, and suspense. Author keeps the suspense alive through out the last lines of the book. She brilliantly described psychological aspects of trauma and PTSD, how PTSD directs your decisions in life and how it haunts your future.",
      shortText: "Do you believe in love? A question that's been asked throughout the annals of history of love. But do you believe in love when your very existence is shaken and betrayed by your blood? It's rare that I reread books and find it amusing and interesting, 'You never cried' by @read_at_nawa gave me pleasure in abundance.",
      avatar: "👤"
    },
    {
      id: 2,
      name: "Hassan Ali",
      location: "1 review",
      rating: 5,
      text: "Amazing portrayal of emotions. I literally felt every part of it. The plot, the buildup, the happy moments, the sad parts, the painful scenes—everything felt like it was happening to me personally. I'm also amazed at how the writer presented something that is considered taboo in our society, but should actually be taught from the very beginning. Hats off to the courage and effort. An amazing piece of art. I really appreciate the quality and dedication put into it. Definitely a recommendation for every soulful reader.",
      shortText: "Amazing portrayal of emotions. I literally felt every part of it. The plot, the buildup, the happy moments, the sad parts, the painful scenes—everything felt like it was happening to me personally.",
      avatar: "👤"
    },
    {
      id: 3,
      name: "Fatima Faisal",
      location: "1 review",
      rating: 5,
      text: "Beloved writer, I am not really good with words. But I just want to tell you. You did an excellent job. I mean, it was exactly what I was looking for. The story literally took my heart. It was really amazing!",
      shortText: "Beloved writer, I am not really good with words. But I just want to tell you. You did an excellent job. I mean, it was exactly what I was looking for. The story literally took my heart. It was really amazing!",
      avatar: "👤"
    },
    {
      id: 4,
      name: "Saba",
      location: "23 reviews",
      rating: 5,
      text: "'You never cried' is a reflection of the reality of how we humans want to escape from bitter incidents that happened in past, leaving ugly scars not only on our body but on our souls. Everyone has their own way to escape. Some harm others to get relief, some think that if they are sad no one has the right to stay happy. But some set the most beautiful example by not dwelling on dark past. They choose to never cry in front of others. This story revolves around a bookshop owner, named 'Daniel'. He is living a happy life with his mother and daughter in an aesthetically decorated house. He was widowed earlier. Apparently, Dan is tranquil with happenings of life. But In loneliness, he finds his life incomplete. He craves to be loved like many others. Then, the story adds a new character 'Rose' in Dan's town. Rose's innocence impresses him. Their multiple meetups show how two incomplete persons together complete the meaning of life. Rose's character adds an intriguing twist into story. This story tells readers that how one person's mistake can let hate to run in generations. How sweet people aren't always who they seem to be. How love makes you selfless not selfish. This book's compelling narrative and vivid details show how writer's heart resonates deeply. But for me, this book always be remembered for Dan's bookstore where he has coffee and huge variety of books😭 and Nan's (Dan's mother) iconic bob cut, liveliness and lantern. Joe's character is my favourite as he has soft corner in heart for others when their own loved ones let them down. He is a king without crown👑.",
      shortText: "'You never cried' is a reflection of the reality of how we humans want to escape from bitter incidents that happened in past, leaving ugly scars not only on our body but on our souls. This story revolves around a bookshop owner, named 'Daniel'.",
      avatar: "👤"
    },
    {
      id: 5,
      name: "Faiq Ahmed",
      location: "1 review",
      rating: 5,
      text: "You Never Cried is an emotionally rich story that seamlessly blends romance, mystery, and thriller elements, creating a beautiful journey between Dan and Rose. At its core, the book explores raw human emotions —all delicately woven into Dan and Rose's evolving relationship. The story unfolds with an air of gentle intimacy, yet there's an undeniable sense of suspense, making each chapter more gripping than the last. The way the romance and mystery intertwine keeps the reader engaged, balancing heartwarming moments with thrilling unpredictability. The writing style is smooth and evocative, creating a dreamy yet suspenseful ambiance. One of the book's strongest elements is its emotional depth. The reader is constantly taken on an emotional rollercoaster, experiencing joy, frustration, and anticipation. The cliffhangers are expertly placed, keeping the suspense alive without feeling forced. ⭐ 4.5/5 – You Never Cried is a beautiful mix of cozy romance and heart-pounding mystery, filled with well-crafted emotions, deep character connections, and masterful storytelling. Also, the book cover very well sums up the theme of the whole story.",
      shortText: "You Never Cried is an emotionally rich story that seamlessly blends romance, mystery, and thriller elements, creating a beautiful journey between Dan and Rose. ⭐ 4.5/5 – You Never Cried is a beautiful mix of cozy romance and heart-pounding mystery.",
      avatar: "👤"
    },
    {
      id: 6,
      name: "Rida Javed",
      location: "1 review",
      rating: 5,
      text: "Just finished reading You Never Cried by Nawa Sohail, and my mind is still reeling. It's an emotional roller coaster—set in a quaint small town with fuzzy cottage-like houses, hilltops, the scent of freshly baked cookies, blooming flowers, and warmth that wraps around you—yet beneath it all lie past traumas, unhealed scars, broken hearts, and emotions left unspoken. Nawa's writing is both powerful and tender. Her way with words and the depth with which she expresses emotions is truly remarkable. She transports you into another world—one that's beautiful on the surface but quietly shadowed by pain. The story keeps you hooked till the very end, and the cliffhanger leaves you aching for more. I'm in awe of how effortlessly Nawa brings difficult emotions to life, breathing soul into her characters and letting them linger in your heart long after you've turned the last page. A must-read. I can't wait to see what she writes next.",
      shortText: "Just finished reading You Never Cried by Nawa Sohail, and my mind is still reeling. It's an emotional roller coaster—set in a quaint small town with fuzzy cottage-like houses, hilltops, the scent of freshly baked cookies.",
      avatar: "👤"
    },
  ]

  return (
    <section id="reviews" className="py-20 bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200 relative overflow-hidden">
      {/* Elegant Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-brand-200/20 to-brand-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-brand-300/20 to-brand-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-brand-200/10 to-brand-300/10 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={titleRef}
          className={`text-center mb-16 scroll-animate ${titleVisible ? 'animate-in' : ''}`}
        >
          <h2 className="text-mobile-4xl md:text-5xl lg:text-6xl font-bold text-brand-900 mb-6 font-jost">
            What Readers <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-600">Say</span>
          </h2>
          <p className="text-mobile-lg text-brand-800 max-w-3xl mx-auto font-jost">
            <span className="hidden sm:inline">Discover why readers around the world are falling in love with "You Never Cried" and Nawa's storytelling.</span>
            <span className="sm:hidden">What readers say about "You Never Cried".</span>
          </p>
          <div className="w-24 h-1 mx-auto rounded-full mt-6 bg-gradient-to-r from-brand-500 to-brand-600"></div>
        </div>

        {/* Reviews Grid */}
        <div 
          ref={reviewsRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 scroll-animate scroll-animate-delay-200 ${reviewsVisible ? 'animate-in' : ''}`}
        >
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Overall Rating */}
        <div 
          ref={ratingRef}
          className={`text-center scroll-animate scroll-animate-delay-400 ${ratingVisible ? 'animate-in' : ''}`}
        >
          <div className="bg-white/70 backdrop-blur-sm border border-brand-200/50 rounded-3xl p-10 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-3xl font-serif text-brand-900 mb-4">
              Overall Rating
            </h3>
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-8 h-8 text-brand-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-3xl font-bold text-brand-800 ml-4">5.0</span>
            </div>
            <p className="text-brand-700 text-lg">
              Based on 6+ reviews from readers worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}