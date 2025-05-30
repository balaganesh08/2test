/**
 * DealsFilter - Filter component for deals listing
 * Following the Single Responsibility Principle - this component only handles filtering of deals
 */
'use client';

import React, { useEffect, useState } from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/uiElements/select';
import { Separator } from '@/components/uiElements/separator';
import { Checkbox } from '@/components/uiElements/checkbox';
import { DealFilter, DealStatus } from '@/typeDefinitions/commonTypes';
import { useDeal } from '@/context/dealManagementContext';

interface PriceRange {
  min: number;
  max: number;
}

const DEFAULT_PRICE_RANGES: PriceRange[] = [
  { min: 0, max: 100 },
  { min: 100, max: 500 },
  { min: 500, max: 1000 },
  { min: 1000, max: 5000 },
];

export const DealsFilter: React.FC = () => {
  const { 
    filters, 
    updateFilters, 
    clearFilters, 
    categories, 
    popularTags, 
    fetchCategories, 
    fetchPopularTags 
  } = useDeal();
  
  const [selectedTags, setSelectedTags] = useState<string[]>(filters.tags || []);
  const [priceRanges, setPriceRanges] = useState<PriceRange[]>(DEFAULT_PRICE_RANGES);

  // Fetch categories and tags on mount
  useEffect(() => {
    fetchCategories();
    fetchPopularTags();
  }, [fetchCategories, fetchPopularTags]);

  // Handle category change
  const handleCategoryChange = (category: string) => {
    updateFilters({ category });
  };

  // Handle status change
  const handleStatusChange = (status: DealStatus) => {
    updateFilters({ status });
  };

  // Handle price range change
  const handlePriceRangeChange = (range: PriceRange) => {
    updateFilters({ minPrice: range.min, maxPrice: range.max });
  };

  // Handle tag selection
  const handleTagSelect = (tag: string, checked: boolean) => {
    let newTags: string[];
    
    if (checked) {
      newTags = [...selectedTags, tag];
    } else {
      newTags = selectedTags.filter(t => t !== tag);
    }
    
    setSelectedTags(newTags);
    updateFilters({ tags: newTags.length > 0 ? newTags : undefined });
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setSelectedTags([]);
    clearFilters();
  };

  return (
    <div className="space-y-6 p-4 border rounded-lg">
      <div>
        <h3 className="text-lg font-medium mb-2">Filter Deals</h3>
        <button 
          className="text-sm text-blue-600 hover:underline"
          onClick={handleClearFilters}
        >
          Clear all filters
        </button>
      </div>
      
      <Separator />
      
      {/* Category Filter */}
      <div>
        <h4 className="font-medium mb-2">Category</h4>
        <Select value={filters.category} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Status Filter */}
      <div>
        <h4 className="font-medium mb-2">Deal Status</h4>
        <Select value={filters.status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Statuses</SelectItem>
            <SelectItem value={DealStatus.ACTIVE}>Active</SelectItem>
            <SelectItem value={DealStatus.UPCOMING}>Upcoming</SelectItem>
            <SelectItem value={DealStatus.EXPIRED}>Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Price Range Filter */}
      <div>
        <h4 className="font-medium mb-2">Price Range</h4>
        <div className="space-y-2">
          {priceRanges.map((range, index) => (
            <div key={index} className="flex items-center">
              <Checkbox 
                id={`price-range-${index}`}
                checked={filters.minPrice === range.min && filters.maxPrice === range.max}
                onCheckedChange={(checked) => {
                  if (checked) handlePriceRangeChange(range);
                }}
              />
              <label 
                htmlFor={`price-range-${index}`}
                className="ml-2 text-sm"
              >
                ${range.min} - ${range.max === Infinity ? '+' : range.max}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Tags Filter */}
      <div>
        <h4 className="font-medium mb-2">Popular Tags</h4>
        <div className="flex flex-wrap gap-2">
          {popularTags.map(tag => (
            <div key={tag} className="flex items-center">
              <Checkbox 
                id={`tag-${tag}`}
                checked={selectedTags.includes(tag)}
                onCheckedChange={(checked) => handleTagSelect(tag, !!checked)}
              />
              <label 
                htmlFor={`tag-${tag}`}
                className="ml-2 text-sm"
              >
                {tag}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
