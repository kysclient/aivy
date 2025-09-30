import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageCarouselModalProps {
  images: string[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  initialIndex: number;
}

export default function ImageCarouselModal({
  images,
  isOpen,
  setIsOpen,
  initialIndex,
}: ImageCarouselModalProps) {
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal>
      <DialogTitle></DialogTitle>
      <DialogOverlay
        is="image"
        onClick={handleOverlayClick}
        className="bg-black/90 absolute left-0 top-0"
      />
      <DialogContent
        className="p-0 border-none bg-transparent"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        onPointerDownOutside={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onInteractOutside={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-800 text-white hover:bg-gray-800/50"
        >
          {' '}
          <XIcon />
          <span className="sr-only">Close</span>
        </button>
        <Carousel className="w-full h-full" opts={{ startIndex: initialIndex }}>
          <CarouselContent className="h-[80vh]">
            {images.map((image, idx) => (
              <CarouselItem key={`${image}_${idx}`} className="flex items-center justify-center">
                <Image
                  alt={image}
                  width={1200}
                  height={1200}
                  className="rounded-md max-w-full max-h-[80vh] object-contain"
                  src={image}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
