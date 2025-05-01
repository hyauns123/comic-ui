export interface Review {
  id: string
  userId: string
  username: string
  userAvatar?: string
  comicId: string
  rating: number
  content: string
  createdAt: string
  updatedAt?: string
  likes: number
  isLiked?: boolean
  isVerifiedPurchase?: boolean
}

export interface ReviewsResponse {
  data: Review[]
  meta: {
    currentPage: number
    totalPages: number
    totalItems: number
    averageRating: number
  }
}

export interface ReviewFormData {
  rating: number
  content: string
}
