export interface CommentUser {
  id: string
  username: string
  avatar: string
}

export interface Reply {
  id: string
  user: CommentUser
  content: string
  createdAt: string
  likes: number
  isLiked?: boolean
}

export interface Comment {
  id: string
  user: CommentUser
  content: string
  createdAt: string
  likes: number
  isLiked?: boolean
  replies: Reply[]
}

export interface CommentFormData {
  content: string
}

export interface ReplyFormData {
  content: string
  commentId: string
}

export interface CommentsResponse {
  data: Comment[]
  meta: {
    currentPage: number
    totalPages: number
    totalItems: number
  }
}
