import Image from "next/image";

interface CardProps {
  title: string;
  excerpt: string;
  image: string;
  category: string;
}

export default function Card({ title, excerpt, image, category }: CardProps) {
  return (
    <div className="group">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          priority
        />
      </div>
      <span className="text-sm text-neutral-600 mb-2 block">{category}</span>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-neutral-600">{excerpt}</p>
    </div>
  );
}