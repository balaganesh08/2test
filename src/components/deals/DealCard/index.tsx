/**
 * DealCard - A card component for displaying deal information
 * Following the Single Responsibility Principle - this component only handles displaying a deal
 */
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Deal, DealStatus } from '@/typeDefinitions/commonTypes';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/uiElements/card/Card';
import { formatDate, getRelativeTimeString, isPast, isFuture } from '@/utilities/date-utils';

interface DealCardProps {
  deal: Deal;
  className?: string;
}

export const DealCard: React.FC<DealCardProps> = ({ deal, className }) => {
  // Calculate discount percentage
  const discountPercentage = deal.discount > 0 
    ? Math.round((deal.discount / deal.price) * 100) 
    : 0;
  
  // Determine if the deal is active, expired, or upcoming
  const isDealActive = deal.status === DealStatus.ACTIVE;
  const isDealExpired = deal.status === DealStatus.EXPIRED || isPast(deal.expiresAt);
  const isDealUpcoming = deal.status === DealStatus.UPCOMING || isFuture(deal.expiresAt);
  
  // Get the status badge styles based on deal status
  const getStatusBadge = () => {
    if (isDealExpired) {
      return (
        <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Expired
        </span>
      );
    }
    
    if (isDealUpcoming) {
      return (
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          Upcoming
        </span>
      );
    }
    
    return (
      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
        Active
      </span>
    );
  };
  
  return (
    <Card className={className}>
      <div className="relative">
        {/* Deal Image */}
        <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
          <Image
            src={deal.imageUrl || '/images/placeholder.jpg'}
            alt={deal.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
        
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold rounded-full px-3 py-1">
            {discountPercentage}% OFF
          </div>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>{deal.title}</CardTitle>
          {getStatusBadge()}
        </div>
        <CardDescription className="line-clamp-2">{deal.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        {/* Price Information */}
        <div className="flex items-end gap-2 mb-3">
          {deal.discount > 0 ? (
            <>
              <span className="text-2xl font-bold">${(deal.price - deal.discount).toFixed(2)}</span>
              <span className="text-lg text-gray-500 line-through">${deal.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-2xl font-bold">${deal.price.toFixed(2)}</span>
          )}
        </div>
        
        {/* Category and Tags */}
        <div className="mb-3">
          <div className="text-sm text-gray-500 mb-1">
            Category: <span className="font-medium">{deal.category}</span>
          </div>
          
          {deal.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {deal.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center">
        {/* Expiration Info */}
        <div className="text-sm text-gray-500">
          {isDealExpired ? (
            <span>Expired {getRelativeTimeString(deal.expiresAt)}</span>
          ) : isDealUpcoming ? (
            <span>Starts {formatDate(deal.createdAt)}</span>
          ) : (
            <span>Expires {getRelativeTimeString(deal.expiresAt)}</span>
          )}
        </div>
        
        {/* View Deal Link */}
        <Link 
          href={`/deals/${deal.id}`}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          View Deal
        </Link>
      </CardFooter>
    </Card>
  );
};
