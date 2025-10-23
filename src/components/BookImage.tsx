import { Book } from '@/types/uniformData'

interface BookImageProps {
  book: Book
}

export function BookImage({ book }: BookImageProps) {
  return (
    <div className="flex justify-center">
      <div className="relative group">
        <div className="absolute -inset-6 bg-gradient-to-br from-brand-200 via-brand-300 to-brand-400 rounded-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
        <div className="absolute -inset-3 bg-white rounded-2xl shadow-xl"></div>
        <img 
          src={book.coverImageUrl || '/bookhomepage.jpeg'} 
          alt={book.title}
          className="relative w-96 h-[28rem] object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
        />
      </div>
    </div>
  )
}